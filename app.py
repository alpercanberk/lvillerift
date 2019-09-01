from flask import Flask, render_template, redirect, render_template, request, jsonify, Response
import os
import flask
from bs4 import BeautifulSoup
import requests

import google.oauth2.credentials
import google_auth_oauthlib.flow

import datetime
import json
import random

from routes import *
# from firebase_refs import *

import ast

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os

from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from pkg_resources import resource_filename

import time
import atexit

admin_list = [
    "alper.tu.canberk@gmail.com"
]

firebase_credentials = json.loads(os.environ['FIREBASE_CREDENTIALS'])
cred = credentials.Certificate(firebase_credentials)

firebase_admin.initialize_app(cred)
db = firestore.client()

users_ref = db.collection('users')
ratings_ref = db.collection('basic_ratings')
daily_menu_ref = db.collection('daily_menu')

app = Flask("lvillerift", static_folder="build/static", template_folder="build")
app.register_blueprint(routes)

scheduler = BackgroundScheduler({'apscheduler.timezone': 'UTC'})

debug_menu={
  "breakfast":{
    "date":"August 19",
    "type":"breakfast",
    "title":"Breakfast - August 19",
    "items":["Belgium Waffles", "Homefried Potatoes", "Sausage Links", "Assorted Pastries"]
  },
  "lunch":{
    "date":"August 19",
    "type":"lunch",
    "title":"Lunch - August 19",
    "items":["French Onion Soup", "Mako Shark Tacos", "Kale Sautee", "Ice Cream"]
  },
  "dinner":{
    "date":"August 19",
    "type":"dinner",
    "title":"Dinner - August 19",
    "items":["BBQ Chicken", "Mashed Potatoes", "Seasonal Vegetables", "Ice Cream"]
  }
}

def first_name(name):
    l = name.split(" ")
    return l[0]

def number_to_color(number):
    number = int(number)
    list = ["red", "orange", "yellow", "#bff542", "#0fd422"]
    return list[number-1]

def ratings_to_color(ratings):
    sum = 0
    for i in range(0, len(ratings)):
        sum += int(ratings[i]["star_rating"])
    average = int(sum/len(ratings))
    if(average < 1):
        average = 1
    list = ["red", "orange", "yellow", "#bff542", "#0fd422"]
    return list[average-1]


app.jinja_env.globals.update(number_to_color=number_to_color)
app.jinja_env.globals.update(ratings_to_color=ratings_to_color)


def update_meals_cron():
    docs = users_ref.limit(40).stream()
    updated = 0

    for doc in docs:
        print(u'Updating doc {} => {}'.format(doc.id, doc.to_dict()))
        users_ref.document(doc.id).update(
            {
                "breakfast":False,
                "lunch":False,
                "dinner":False
            }
        )
        updated = updated + 1

    if updated >= 30:
        return delete_collection(coll_ref, 30)

def clear_ratings():
    docs = ratings_ref.limit(40).stream()
    deleted = 0

    for doc in docs:
        print(u'Deleting doc {} => {}'.format(doc.id, doc.to_dict()))
        doc.reference.delete()
        deleted = deleted + 1

    if deleted >= 30:
        return delete_collection(ratings_ref, 30)
# scheduler.add_job(func=print_date_time, trigger="interval", seconds=3)
#utc = est + 4

def generate_code(n):
    return ''.join([random.choice('0123456789ABCDEFGHIKJLMNOPQRSTUVWXYZ') for _ in range(n)])

def create_new_user(name, email):
    id = generate_code(8)
    users_ref.document(id).set({
        'email': email,
        'name': name,
        'breakfast': False,
        'lunch':False,
        'dinner':False
    })

def gtd(generator):
    list = []
    for element in generator:
        n_dict = element.to_dict()
        n_dict['id'] = element.id
        list.append(n_dict)
    return list

def credentials_to_dict(credentials):
    return {'token': credentials.token,
          'refresh_token': credentials.refresh_token,
          'token_uri': credentials.token_uri,
          'client_id': credentials.client_id,
          'client_secret': credentials.client_secret,
          'scopes': credentials.scopes}


#debug runs:

@app.route('/get_daily_menu')
def get_daily_menu():
    return get_menu(os.environ["SCRAPER_KEY"])

@app.before_request
def before_request():
    if(not request.url.startswith('http://127')):
        if request.url.startswith('http://'):
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)

@app.route("/update_meals_all")
def update():
    update_meals_cron()
    return "ok"

@app.route("/")
def index():
    menu = gtd(daily_menu_ref.stream())[0]
    if(flask.session):
        if('credentials' in flask.session):
            if(str(flask.session["user_info"]["email"]) in admin_list):
                return render_template("all_ratings.html", ratings_list=(gtd(ratings_ref.stream())), current_host= flask.request.url_root)
            if("@lawrenceville.org" in flask.session["user_info"]["email"]):
                if(gtd(users_ref.where('email','==',str(flask.session['user_info']['email'])).stream())):
                    return render_template('index.html',
                                           user_email = str(flask.session['user_info']['email']),
                                           user_name = first_name(str(flask.session['user_info']['name'])),
                                           current_host= flask.request.url_root,
                                           menu = menu
                                           )
                else:
                    create_new_user(str(flask.session['user_info']['name']), str(flask.session['user_info']['email']))
                    return render_template('index.html',
                                           user_email = str(flask.session['user_info']['email']),
                                           user_name = first_name(str(flask.session['user_info']['name'])),
                                           current_host= flask.request.url_root,
                                           menu = menu
                                           )
            else:
                return 'You should try to sign in with your Lawrenceville email <button><a href="/logout">Go back</a></button>'

    else:
        if not request.url.startswith('http://127'):
            return render_template('index.html',
                               current_host= flask.request.url_root,
                               menu = menu
                               )

        #only for debug!! find a way to get rid of this as well.
        else:
            flask.session["user_info"]={
                "email":"acanberk21@lawrenceville.org",
                "name":"Alper Canberk"
            }

            return render_template('index.html',
                                   user_email = "acanberk21@lawrenceville.org",
                                   user_name = "Alper",
                                   current_host= flask.request.url_root,
                                   menu = menu
                                   )

@app.route("/users")
def users():
    return str(gtd(users_ref.stream()))


@app.route('/complete_meal', methods=['POST'])
def add_later_user():
    if request.method == 'POST':
        data = json.loads(request.data)
        user =  data["user"]
        meal_type = data["complete_type"]
        found_user = users_ref.where('email', '==', user)
        found_user_dict = gtd(found_user.stream())
        if(found_user_dict):
            if(not found_user_dict[0][meal_type]):
                user_id = found_user_dict[0]["id"]
                users_ref.document(user_id).update({
                    meal_type: True
                })
                return "Rating successful!"
            else:
                return "You can only rate a meal once per day."

        else:
            return "nope"
    else:
        return "whacchu doin?"

@app.route('/completed_meals')
def completed_meals():
    if(flask.session["user_info"]):
        user = str(flask.session["user_info"]["email"])
        found_user = users_ref.where('email', '==', user)
        found_user_dict = gtd(found_user.stream())[0]
        return {
            "breakfast":found_user_dict["breakfast"],
            "lunch":found_user_dict["lunch"],
            "dinner":found_user_dict["dinner"]
            }
    #debug stuff
    # else:
    #     return {
    #         "breakfast":False,
    #         "lunch":False,
    #         "dinner":False
    #     }

@app.route('/receive_rating', methods=['POST'])
def receive_rating():
    if request.method == 'POST':
        print("Receieved a rating!")
        data = json.loads(request.data)
        ratings_ref.document(generate_code(10)).set(data)
        return "Rating received!"
    else:
        return "what are you doing here?"

@app.route('/all_ratings', methods=['GET'])
def all_ratings():
    return str(gtd(ratings_ref.stream()))


app.debug=True
app.secret_key = os.environ['SECRET_KEY']


def get_menu():

    payload={'key': os.environ["SCRAPER_KEY"], 'url':
    'https://www.lawrenceville.org/campus-life/dining'}

    resp = requests.get('http://api.scraperapi.com', params=payload)
    soup=BeautifulSoup(resp.text,'html.parser')
    # print soup

    items=soup.findAll("div",{"class":"event-detail"})
    items_list = []
    final_menu = {}


    for item in items:
        items_list.append(item.get_text())

    for i in range(len(items_list)):
        items_list[i] = parse_meal(split_meal(items_list[i]))

    for meal in items_list:
        final_menu[meal["type"]]={
            "date":meal["date"],
            "type":meal["type"],
            "title":meal["type"].capitalize() + " - " + meal["date"],
            "items":meal["items"]
        }

    return final_menu

def split_meal(item):
    item = item
    underscore_indices = []

    for i in range(0, len(item)-1):
        if item[i].isalpha() and item[i+1].isalpha():
            if not(item[i].isupper()) and item[i+1].isupper():
                underscore_indices.append(i)

    for i in range(len(underscore_indices)):
        item = item[:underscore_indices[i]+i+1] + '\n' + item[underscore_indices[i]+i+1:]

    return item

def parse_meal(meal):
    date = ""
    n_indices = []
    space_indices = []
    for i in range(len(meal)):
        if meal[i] == "\n":
            n_indices.append(i)
        if meal[i] == " ":
            space_indices.append(i)

    type = meal[n_indices[0]+1:n_indices[1]]
    date = datetime.strptime(meal[n_indices[2]+1:space_indices[0]], "%m/%d/%Y").strftime('%A %B %d')
    meal = meal[space_indices[2]:].split('\n')
    del meal[0]
    del meal[-1]
    no_words = ["bar", "fruit", "yogurt", "yogurt", "muffins", "dessert"]
    i=0
    while i < len(meal):
        for no_word in no_words:
            if no_word in meal[i].lower():
                del meal[i]
                i -= 1
        i += 1

    return {"type":type.lower(), "date":date, "items":meal}

def update_daily_menu():
    docs = daily_menu_ref.limit(5).stream()
    for doc in docs:
        print(u'Deleting doc {} => {}'.format(doc.id, doc.to_dict()))
        doc.reference.delete()
    daily_menu_ref.document(generate_code(5)).set(get_menu())
    return "ok"



scheduler.add_job(update_meals_cron,'cron', hour=4, minute=00, second=00)
scheduler.add_job(clear_ratings, 'cron', day_of_week="mon", hour=4, minute=0, second=0)
scheduler.add_job(update_daily_menu, 'cron', hour=8, minute=0, second=0)
scheduler.start()
#
# debug:
# update_daily_menu()


if __name__ == '__main__':
    app.config['SESSION_TYPE'] = 'filesystem'
    # app.config['SECRET_KEY'] = 'something something'
    app.run()

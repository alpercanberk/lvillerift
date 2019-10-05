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

import os

from datetime import datetime
from pkg_resources import resource_filename

from flask_sqlalchemy import SQLAlchemy

import time
import atexit

from apscheduler.schedulers.background import BackgroundScheduler

admin_list = [
    "alper.tu.canberk@gmail.com"
]
#
# firebase_credentials = json.loads(os.environ['FIREBASE_CREDENTIALS'])
# cred = credentials.Certificate(firebase_credentials)
#
# firebase_admin.initialize_app(cred)
# firebase_db = firestore.client()
#
# users_ref = firebase_db.collection('users')
# # completed_ref = firebase_db.collection('completed')
# daily_menu_ref = firebase_db.collection('daily_menu')


app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

app = Flask("lvillerift", static_folder="build/static", template_folder="build")
app.register_blueprint(routes)

from models import *

scheduler = BackgroundScheduler({'apscheduler.timezone': 'UTC'})

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


# def clear_ratings():
#     docs = ratings_ref.limit(40).stream()
#     deleted = 0
#
#     for doc in docs:
#         print(u'Deleting doc {} => {}'.format(doc.id, doc.to_dict()))
#         doc.reference.delete()
#         deleted = deleted + 1
#
#     if deleted >= 30:
#         return delete_collection(ratings_ref, 30)
# scheduler.add_job(func=print_date_time, trigger="interval", seconds=3)
#utc = est + 4

def create_new_user(name, email):
    try:
        new_user = User(name,
                           email,
                           )
        db.session.add(new_user)
        db.session.commit()
        return "User created"
    except Exception as e:
        return str(e)


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

# @app.before_request
# def before_request():
#     if(os.environ["FLASK_DEBUG"]):
#         if(os.environ["FLASK_DEBUG"] != 1):
#             if(not request.url.startswith('http://127')):
#                 if request.url.startswith('http://'):
#                     url = request.url.replace('http://', 'https://', 1)
#                     code = 301
#                     return redirect(url, code=code)


@app.route("/")
def index():
    # a = DailyMenu.query.all()
    menu = DailyMenu.query.first().serialize()

    if(flask.session):
        if('credentials' in flask.session and 'user_info' in flask.session):

            user = User.query.filter_by(email=flask.session["user_info"]["email"]).first()

            rated_meals = []

            if(user):
                rated_meals = list((user.serialize()['rated_meals']).keys())

            if(str(flask.session["user_info"]["email"]) in admin_list):
                if not user:
                    create_new_user(str(flask.session['user_info']['name']), str(flask.session['user_info']['email']))

                ratings = [rating.serialize() for rating in Rating.query.all()]
                print(ratings)

                return render_template('index.html',
                                       user_email = str(flask.session['user_info']['email']),
                                       user_name = first_name(str(flask.session['user_info']['name'])),
                                       current_host = flask.request.url_root,
                                       rated_meals = rated_meals,
                                       menu = menu,
                                       admin = 1,
                                       ratings = ratings
                                       )

            if("@lawrenceville.org" in flask.session["user_info"]["email"]):

                if not user:
                    create_new_user(str(flask.session['user_info']['name']), str(flask.session['user_info']['email']))

                print(">>>>>>>>>>>>>")
                # print(list((user.serialize()['rated_meals']).keys()))

                return render_template('index.html',
                                       user_email = str(flask.session['user_info']['email']),
                                       user_name = first_name(str(flask.session['user_info']['name'])),
                                       current_host = flask.request.url_root,
                                       rated_meals = rated_meals,
                                       menu = menu
                                       )

            else:
                return 'You should try to sign in with your Lawrenceville email <button><a href="/logout">Go back</a></button>'

    else:
        return render_template('index.html',
                               current_host= flask.request.url_root,
                               menu = menu,
                               rated_meals = []
                               )
    #
    #     # only for debug!! find a way to get rid of this as well.
    #     else:
    #         flask.session["user_info"]={
    #             "email":"acanberk21@lawrenceville.org",
    #             "name":"Alper Canberk"
    #         }
    #
    #         return render_template('index.html',
    #                                user_email = "acanberk21@lawrenceville.org",
    #                                user_name = "Alper",
    #                                current_host= flask.request.url_root,
    #                                menu = menu
    #                                )



@app.route('/receive_rating', methods=['POST'])
def receive_rating():
    if request.method == 'POST':

        print("Receieved a rating!")
        data = json.loads(request.data)
        print(data)
        newRating = Rating(str(data["name"]),
                           str(data["email"]),
                           str(data["saltiness"]),
                           str(data["spice"]),
                           str(data["sweetness"]),
                           str(data["cooking_time"]),
                           str(data["comment"]),
                           str(data["time"])
                           )
        db.session.add(newRating)

        rating_user = User.query.filter_by(email=data['email']).first()
        print(rating_user.email)
        print(json.loads(rating_user.rated_meals))
        rated_meals = json.loads(rating_user.rated_meals)
        rated_meals[data['name']]=1
        print(rated_meals)
        rating_user.rated_meals = str(rated_meals).replace("\'","\"")

        db.session.commit()

        return "Rating received!"
    else:
        return "what are you doing here?"



@app.route('/all_ratings', methods=['GET'])
def all_ratings():
    return get_all_ratings()

@app.route('/delete_rating', methods=['POST'])
def delete_rating():
    print(json.loads(request.data.decode("utf-8"))["id"])
    if request.method == "POST":
        data = json.loads(request.data.decode("utf-8"))
        rating = Rating.query.filter_by(id=data["id"]).first()
        if(rating):
            db.session.delete(rating)
            db.session.commit()
    return "Deleted"



def get_all_ratings():
    print("Request to all ratings >>>>>>")
    try:
        print("hi")
        all_ratings = Rating.query.all()
        print(jsonify([e.serialize() for e in all_ratings]))
        return jsonify([e.serialize() for e in all_ratings])
    except Exception as e:
        return(str(e))

def get_menu():

    payload={'key': os.environ["SCRAPER_KEY"], 'url':
    'https://www.lawrenceville.org/campus-life/dining'}

    resp = requests.get('http://api.scraperapi.com', params=payload)
    soup= BeautifulSoup(resp.text,'html.parser')
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
            "items":[item.replace("&", "and") for item in meal["items"]]
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
    print("Updating daily menu...")
    previous_menu = DailyMenu.query.all()
    if len(previous_menu) > 0:
        for menu in previous_menu:
            db.session.delete(menu)
    db.session.commit()
    menu_received = str(get_menu()).replace("\'", "\"").replace("\\xa0", " ")
    print(">>>>>>>>>---<<<<<")
    print(menu_received)
    print(">>>>>>>>>-----<<<<<<")
    new_menu = DailyMenu(menu_received)
    db.session.add(new_menu)
    db.session.commit()

    return "ok"

def refresh_daily_ratings():
    all_users = User.query.all()
    for user in all_users:
        user.rated_meals = "{}"
    db.session.commit()
    return "ok"


# scheduler.add_job(clear_ratings, 'cron', day_of_week="mon", hour=4, minute=0, second=0)
update_daily_menu()
scheduler.add_job(update_daily_menu, 'interval', hours=3)
scheduler.add_job(refresh_daily_ratings, 'interval', hours=12)
scheduler.start()


app.debug=True
app.secret_key = os.environ['SECRET_KEY']

#
# debug - also find a way to do this when models are imported:


if __name__ == '__main__':
    # if os.environ["FLASK_DEBUG"]:
    update_daily_menu()
    app.config['SESSION_TYPE'] = 'filesystem'
    # app.config['SECRET_KEY'] = 'something something'
    app.run(port='3000')

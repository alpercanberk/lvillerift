
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
    "acanberk21@lawrenceville.org",
    "atokarski20@lawrenceville.org",
    "alper.tu.canberk@gmail.com",
    "ekosoff@lawrenceville.org",
    "ggiberson@lawrenceville.org"
]

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

app = Flask("lvillerift", static_folder="build/static", template_folder="build")
app.register_blueprint(routes)

from models import *

scheduler = BackgroundScheduler({'apscheduler.timezone': 'UTC'})


def check_useless(useless_list, text):
    for useless in useless_list:
        if useless.lower() in text.lower():
            return False
    return True

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

@app.before_request
def before_request():
    if(not os.environ["FLASK_DEBUG"]):
        if request.url.startswith('http://'):
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.route("/")
def index():
    a = DailyMenu.query.all()
    menu = a[0].serialize()
    # menu = DailyMenu.query.first().serialize()

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

            elif("@lawrenceville.org" in flask.session["user_info"]["email"]):

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

def parse_more(items):
    return [item.replace('w/',"with ").replace("&", "and").replace(" /", "").replace(": ", "Soup: ") for item in items]

def check_em(em):
    if(str(em)[5] == "/" or "soup" in str(em).lower()):
        return True

def get_menu():

    payload={'key': 'c25d2485c37e9764217cc5476a73be10', 'url':
    'https://www.lawrenceville.org/campus-life/dining'}

    resp = requests.get('http://api.scraperapi.com', params=payload)
    soup=BeautifulSoup(resp.text,'html.parser')
    # print soup
    first_title = soup.findAll("div",{"class":"event-detail"})[0].get_text()
    date = soup.findAll("span", {"class":"start-date"})[0].get_text()
    all_items = soup.findAll("div",{"class":"brief-description"})

    final_item_list = []

    useless_words = ["yogurt", "muffins", "dessert", "breads", "soup"]

    if "Brunch" in first_title:
        print("Brunch!")
        brunch_items = []
        dinner_items = []
        for i in range(0,2):
            ems_brunch = all_items[i].findAll("em")
            for em in ems_brunch:
                if(check_em(em)):
                    continue
                em_text = em.get_text()
                if(check_useless(useless_words, em_text)):
                    print(em_text)
                    brunch_items.append(em_text)

        for i in range(0, len(all_items)):
            print(all_items[i], "\n\n\n")

        ems_dinner = all_items[2].findAll("em")
        for em in ems_dinner:
            if(str(em)[5] == "/"):
                continue
            em_text = em.get_text()
            if(check_useless(useless_words, em_text)):
                print(em_text)
                dinner_items.append(em_text)

        result = {
            "Brunch":{
                "date":date,
                "type":"Brunch",
                "title":"Brunch - " + date,
                "items":parse_more(brunch_items)
            },
            "Dinner":{
                "date":date,
                "type":"Dinner",
                "title":"Dinner - " + date,
                "items":parse_more(dinner_items)
            }
        }

        print("Result:", result)
        return result

    else:
        daily_items = [[],[],[]]
        for i in range(0,3):
            current_ems = all_items[i].findAll("em")
            for em in current_ems:
                if(str(em)[5] == "/"):
                    continue
                em_text = em.get_text()
                if(check_useless(useless_words, em_text)):
                    print(em_text)
                    daily_items[i].append(em_text)

        result = {
            "Breakfast":{
                "date":date,
                "type":"Breakfast",
                "title":"Breakfast - " + date,
                "items":parse_more(daily_items[0])
            },
            "Lunch":{
                "date":date,
                "type":"Lunch",
                "title":"Lunch - " + date,
                "items":parse_more(daily_items[1])
            },"Dinner":{
                "date":date,
                "type":"Dinner",
                "title":"Dinner - " + date,
                "items":parse_more(daily_items[2])
            },
        }

        print("Result:", result)
        return result

def update_daily_menu():
    print("Updating daily menu...")
    previous_menu = DailyMenu.query.all()
    if len(previous_menu) > 0:
        for menu in previous_menu:
            db.session.delete(menu)
    db.session.commit()
    menu_received = str(get_menu()).replace("\'", "\"").replace("\\xa0", " ")
    print(menu_received)
    new_menu = DailyMenu(menu_received)
    db.session.add(new_menu)
    db.session.commit()
    print(new_menu)

    return "ok"

def refresh_daily_ratings():
    all_users = User.query.all()
    for user in all_users:
        user.rated_meals = "{}"
    db.session.commit()
    return "ok"


# scheduler.add_job(clear_ratings, 'cron', day_of_week="mon", hour=4, minute=0, second=0)
scheduler.add_job(update_daily_menu, 'interval', hours=3)
scheduler.add_job(refresh_daily_ratings, 'interval', hours=12)
scheduler.start()


app.debug=True
app.secret_key = os.environ['SECRET_KEY']

#
# debug - also find a way to do this when models are imported:
if __name__ == '__main__':
    db.session.rollback()
    # if os.environ["FLASK_DEBUG"]:
    update_daily_menu()
    app.config['SESSION_TYPE'] = 'filesystem'
    # app.config['SECRET_KEY'] = 'something something'
    app.run(port='3000')

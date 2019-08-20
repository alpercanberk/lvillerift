
from flask import Flask, render_template, redirect, render_template, request, jsonify, Response
import os
import flask

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

app = Flask(__name__)

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


app = Flask(__name__, static_folder="build/static", template_folder="build")
app.register_blueprint(routes)

def first_name(name):
    l = name.split(" ")
    return l[0]

firebase_credentials = ast.literal_eval(os.environ['FIREBASE_CREDENTIALS'])
cred = credentials.Certificate(firebase_credentials)

firebase_admin.initialize_app(cred)
db = firestore.client()

users_ref = db.collection('users')

@app.route("/")
def index():
    if(flask.session):
        if('credentials' in flask.session):
            if(gtd(users_ref.where('email','==',str(flask.session['user_info']['email'])).get())):
                return render_template('index.html',
                                       user_email = str(flask.session['user_info']['email']),
                                       user_name = first_name(str(flask.session['user_info']['name'])),
                                       current_host= flask.request.url_root
                                       )
            else:
                print(">>>>>>>")
                create_new_user(str(flask.session['user_info']['name']), str(flask.session['user_info']['email']))
                return render_template('index.html',
                                       user_email = str(flask.session['user_info']['email']),
                                       user_name = first_name(str(flask.session['user_info']['name'])),
                                       current_host= flask.request.url_root
                                       )

    else:
        return render_template('index.html',
                           current_host= flask.request.url_root
                           )

@app.route("/users")
def users():
    return str(gtd(users_ref.get()))


@app.route('/complete_meal', methods=['POST'])
def add_later_user():
    if request.method == 'POST':
        data = ast.literal_eval(request.data)
        user =  data["user"]
        meal_type = data["complete_type"]
        found_user = users_ref.where('email', '==', user)
        found_user_dict = gtd(found_user.get())
        if(found_user_dict):
            print "User found!!"
            print found_user_dict[0]
            print found_user_dict[0][meal_type]
            print type(found_user_dict[0][meal_type])
            if(not found_user_dict[0][meal_type]):
                user_id = found_user_dict[0]["id"]
                users_ref.document(user_id).update({
                    meal_type: True
                })
                return "Rating successful!"
            else:
                return "You can only rate a meal once per day."

        else:
            print "Nothing found :("
            return "nope"
    else:
        return "whacchu doin?"

app.debug=True
app.secret_key = os.environ['SECRET_KEY']

app.run(host='localhost')

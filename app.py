
from flask import Flask, render_template, redirect, render_template, request, jsonify, Response
import os
import flask

import google.oauth2.credentials
import google_auth_oauthlib.flow

import datetime
import json

oauth_scopes = [
"openid",
"https://www.googleapis.com/auth/userinfo.email", #gets google profile
"https://www.googleapis.com/auth/userinfo.profile", #gets google email adress
]

from routes import *

app = Flask(__name__)

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

@app.route("/")
def index():
    if(flask.session):
        if('credentials' in flask.session):
            return render_template('index.html',
                                   logged=True,
                                   user_email = flask.session['user_info']['email'],
                                   user_name = first_name(flask.session['user_info']['name']),
                                   current_host= flask.request.url_root
                                   )
    else:
        return render_template('index.html',
                           logged=False,
                           current_host= flask.request.url_root
                           )


app.debug=True
app.secret_key = os.environ['SECRET_KEY']

app.run(host='localhost')

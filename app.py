
from flask import Flask, render_template, redirect, render_template, request, jsonify, Response
import os

import google.oauth2.credentials
import google_auth_oauthlib.flow

import datetime
import json

oauth_scopes = [
"openid",
"https://www.googleapis.com/auth/userinfo.email", #gets google profile
"https://www.googleapis.com/auth/userinfo.profile", #gets google email adress
]

from firebase import *

app = Flask(__name__)
app.register_blueprint(routes)

def credentials_to_dict(credentials):
    return {'token': credentials.token,
          'refresh_token': credentials.refresh_token,
          'token_uri': credentials.token_uri,
          'client_id': credentials.client_id,
          'client_secret': credentials.client_secret,
          'scopes': credentials.scopes}



app = Flask(__name__, static_folder="build/static", template_folder="build")

@app.route("/")
def index():
    if('credentials' in flask.session):
        if(flask.session['user_info']['email'] in admins):
            return render_template('index.html',
                                   logged=True,
                                   user = flask.session['user_info']['email'],
                                   current_host= flask.request.url_root
                                   )
    else:
        return render_template('index.html',
                               logged=False,
                               user = flask.session['user_info']['email'],
                               current_host= flask.request.url_root
                               )

app.debug=True

app.run(host='0.0.0.0')

from . import routes

import os, sys, inspect
from flask import Flask, redirect, render_template, request, jsonify, url_for
from flask import render_template
import flask


oauth_scopes = [
"openid",
"https://www.googleapis.com/auth/userinfo.email", #gets google profile
"https://www.googleapis.com/auth/userinfo.profile", #gets google email adress
]

import google.oauth2.credentials
import google_auth_oauthlib.flow

import os,sys,inspect
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0,parentdir)

import datetime
import json

def credentials_to_dict(credentials):
    return {'token': credentials.token,
          'refresh_token': credentials.refresh_token,
          'token_uri': credentials.token_uri,
          'client_id': credentials.client_id,
          'client_secret': credentials.client_secret,
          'scopes': credentials.scopes}

@routes.route('/auth/google')
def auth():

    # Create flow instance to manage the OAuth 2.0 Authorization Grant Flow stepsself.
    flow = google_auth_oauthlib.flow.Flow.from_client_config(
      json.loads(os.environ['CLIENT_SECRET']),
      scopes=oauth_scopes,
      redirect_uri= flask.request.url_root + 'oauth2callback'
    )

    authorization_url, state = flow.authorization_url(
      prompt='consent',
      include_granted_scopes='true')

    flask.session['state'] = state

    return redirect(authorization_url)

@routes.route('/oauth2callback')
def oauth2callback():
    state = flask.session['state']
    flow = google_auth_oauthlib.flow.Flow.from_client_config(json.loads(os.environ['CLIENT_SECRET']), scopes=oauth_scopes, state=state)
    flow.redirect_uri = flask.url_for('routes.oauth2callback', _external=True)

    authorization_response = flask.request.url
    flow.fetch_token(authorization_response=authorization_response)

    credentials = flow.credentials
    print(credentials_to_dict(credentials))
    flask.session['credentials'] = credentials_to_dict(credentials)

    if flask.session['credentials']['refresh_token'] == None:
        print(">>>>")
        # flow.credentials.token = "1/NWvP0mjD4Vp3xs22FkvdqWHw-_7VUyC2VN7zcsthHcw"
        flask.session['credentials']['refresh_token'] = "1/NWvP0mjD4Vp3xs22FkvdqWHw-_7VUyC2VN7zcsthHcw"

    session = flow.authorized_session()
    user_info = session.get('https://www.googleapis.com/userinfo/v2/me').json()

    flask.session["user_info"] = user_info

    return redirect("/")


@routes.route('/logout')
def logout():
    # remove the username from the session if it's there
    print("someone logging out")
    flask.session.pop('credentials', None)
    flask.session.pop('state', None)
    flask.session.pop('user_info', None)
    return redirect('/')

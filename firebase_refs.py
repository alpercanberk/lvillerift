import ast

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os

class Firebase():

    firebase_credentials = ast.literal_eval(os.environ['FIREBASE_CREDENTIALS'])
    cred = credentials.Certificate(firebase_credentials)

    firebase_admin.initialize_app(cred)
    db = firestore.client()

    users_ref = db.collection(u'users')

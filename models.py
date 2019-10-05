from flask_sqlalchemy import SQLAlchemy
from app import db
import json

class Rating(db.Model):
    __tablename__ = 'Rating'

    id = db.Column(db.Integer, primary_key=True)
    meal = db.Column(db.String())
    email = db.Column(db.String())
    saltiness = db.Column(db.Integer)
    spice = db.Column(db.Integer)
    sweetness = db.Column(db.Integer)
    cooking_time = db.Column(db.Integer)
    comment = db.Column(db.String())
    time = db.Column(db.BigInteger)

    def __init__(self, meal, email, saltiness, spice, sweetness, cooking_time, comment, time):
        self.meal = meal
        self.email = email
        self.saltiness = saltiness
        self.spice = spice
        self.sweetness = sweetness
        self.cooking_time = cooking_time
        self.comment = comment.replace("\'","")
        self.time = time

    def __repr__(self):
        return '<id {} rating for {}>'.format(self.id, self.meal)

    def serialize(self):
        return {
            'id':self.id,
            'meal':self.meal,
            'email':self.email,
            'saltiness':self.saltiness,
            'spice':self.spice,
            'sweetness':self.sweetness,
            'cooking_time':self.cooking_time,
            'comment':self.comment,
            'time':self.time
        }

class User(db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    email = db.Column(db.String())
    rated_meals = db.Column(db.String())

    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.rated_meals = "{}"

    def __repr__(self):
        return '<id {} user for {}>'.format(self.id, self.name)

    def serialize(self):
        return {
            'id':self.id,
            'name':self.name,
            'email':self.email,
            'rated_meals':json.loads(self.rated_meals)
        }

class DailyMenu(db.Model):
    __tablename__ = 'DailyMenu'

    id = db.Column(db.Integer, primary_key=True)
    menu = db.Column(db.String())

    def __init__(self, menu):
        self.menu = menu

    def __repr__(self):
        return '<id {} menu>'.format(self.id)

    def serialize(self):
        print(">>>>>>>")
        menu = self.menu
        print(type(menu))
        return json.loads(menu)

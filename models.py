from app import db
# from sqlalchemy.dialects.postgresql import JSON


class Rating(db.Model):
    __tablename__ = 'results'

    id = db.Column(db.Integer, primary_key=True)
    meal = db.Column(db.String())
    email = db.Column(db.String())
    saltiness = db.Column(db.Integer)
    spice = db.Column(db.Integer)
    sweetness = db.Column(db.Integer)
    cooking_time = db.Column(db.Integer)
    comment = db.Column(db.String())
    time = db.Column(db.Integer)

    def __init__(self, meal, email, saltiness, spice, sweetness, cooking_time , comment, time):
        self.meal = meal
        self.email = email
        self.saltiness = saltiness
        self.spice = spice
        self.sweetness = sweetness
        self.cooking_time = cooking_time
        self.comment = comment
        self.time = time

    def __repr__(self):
        return '<id {} rating for {}>'.format(self.id, self.meal)

from flask import Blueprint
routes = Blueprint('routes', __name__)

from .login import *
from .scheduling import *

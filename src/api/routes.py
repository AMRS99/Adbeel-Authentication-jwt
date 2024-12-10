"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route("/token", methods=["POST"])
def generate_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    email = email.lower()
    user = User.query.filter_by(email = email, password = password).first()

    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=str(user.id))
    response = {
        "access_token":access_token,
        "user_id":user.id,
        "msg":f'Welcome {user.email}'
    }
    return jsonify(response),200


@api.route("/signup", methods=["POST"])
def register_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    email = email.lower()
    user = User.query.filter_by(email=email).first()

    if user is not None and user.email == email:
        response={
            "msg":"User already exist"
        }
        return jsonify(response), 403
    
    user = User()
    user.email = email
    user.password = password
    user.is_active = True
    db.session.add(user)
    db.session.commit()

    response ={
        "msg":f'Congratulations, {user.email} you have successfully sign up!'
    }
    return jsonify(response), 200


@api.route("/private", methods=["GET"])
@jwt_required()
def get_private_page():
    user_id = get_jwt_identity()
    # response={
    #     "msg":f'Hello{user.email}, here is your private page'
    # }

    return jsonify(f'Logged in as str({user_id})'), 200







@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

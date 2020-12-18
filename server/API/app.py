from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from flask_restplus import Api


app = Flask(__name__)
CORS(app)
api = Api(app)



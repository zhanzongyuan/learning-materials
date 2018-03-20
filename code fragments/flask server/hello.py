#coding=utf-8
from flask import Flask, url_for
app = Flask(__name__)


@app.route('/')
def hello_world1():
    return 'Hello, World1'

@app.route('/hihi')
def hello_world2(name):
    return 'Hello, World!'+name

with app.test_request_context():
    print(url_for('hello_world2'))
from bottle import route, run, static_file, post, request, get
import os


@route('/')
def serve_index():
    return static_file("index.html" , root = os.path.join("public" , "html"))

run(host='localhost',port=3000)
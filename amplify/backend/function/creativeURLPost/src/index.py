import os
import time
from flask_cors import CORS
import json
import boto3
import uuid
from flask_lambda import FlaskLambda
from flask import Flask, render_template, request, redirect, send_file, render_template_string, url_for, make_response, jsonify
app = FlaskLambda(__name__)
CORS(app)


# ------------------------------------------ dynamo DB config-------------
ddb = boto3.resource('dynamodb')
table = ddb.Table('podcastDB-dev')
# guid/showname/creativeurl/showid/podcastepisodename/timestamp

@app.route('/creativeurl', methods=['GET', 'POST'])
def put_list_creativeurl():
    if request.method == 'GET':
        podcastUrls = table.scan()['Items']
        print(jsonify(podcastUrls))
        podcastUrls_json = jsonify(podcastUrls)
        return {"message": "Hello, this is a response from backend Lambda, the current time is " + str(time.time()*1000.0)}
        # return podcastUrls_json
    else:
        creativeUrl = request.json.get('creativeurl')
        showName = request.json.get('showname')
        showId = request.json.get('showid')
        podcastEpisodeName = request.json.get('podcastepisodename')
        timestamp = int(time.time()*1000.0)
        guid = str(uuid.uuid4())
        
        print(creativeUrl)
        table.put_item(
            Item={
                'creativeurl': creativeUrl,
                'guid': guid,
            })
        return {"message": "creative url added"}
    
    



if __name__ == '__main__':
    app.run(debug=True)
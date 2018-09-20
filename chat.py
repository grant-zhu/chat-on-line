
from flask import Flask,render_template,session,request,redirect,url_for
from flask_pymongo import PyMongo
import datetime
from bson.json_util import dumps

app = Flask(__name__)

#enable dubug mode
app.debug = True
#set session secret_key
app.secret_key = 'any random string'

#connect mongodb
app.config["MONGO_URI"] = "mongodb://localhost:27017/chatonline"
mongo=PyMongo(app)

#message id
messageId = 0

#set nickname page
@app.route('/')
def index():
    #input nickname page
    return render_template('nickname.html')

#set main chat page
@app.route('/chat')
def goChatPage():
    #input nickname page
    return render_template('chat.html')

#set session for user name 
@app.route('/setNickname',methods = ['POST', 'GET'])
def setUsername():
    #set session for user
    session['username'] = request.form['nickname']
    #set session for user maxMessageId to 0
    session['maxMessageId'] = 0
    #render upload headportrait page
    return render_template('clip.html')
    #return render_template('chat.html')
    
#upload headPortrait
@app.route('/uploadHeadPortrait',methods = ['POST', 'GET'])
def uploadHeadPortrait():
    #imgBase64 value
    imageBase64Value = request.json['pic']
    #save headportrait to mongo users document
    mongo.db.users.save({'username':session['username'],'headportrait':imageBase64Value})
    #render to main chat page
    # return render_template('chat.html')
    return 'success'

#get user name
@app.route('/getUsername')
def getUsername():
    return session['username']
    
#save message
@app.route('/sendMessage',methods = ['POST', 'GET'])
def saveMessage():
    #use global variable
    global messageId
    username = session['username']
    #message = request.form['chatmessage']
    message = request.json['message']
    messageDate = datetime.datetime.today()
    messageDate = messageDate.strftime("%Y-%m-%d")
    #message id increase 1
    messageId += 1
    #get user headportrait
    userInfo = mongo.db.users.find_one({'username':username})
    headPortrait = userInfo['headportrait']
    #save user message
    mongo.db.chatmessage.save({'id':messageId,'username':username,'message':message,'headportrait':headPortrait,'date':messageDate})
    #return render_template('chat.html')
    return 'success'

#get message
@app.route('/getMessage')
def getMessage():
    #find last 5 messages today
    todayDate = datetime.datetime.today().strftime("%Y-%m-%d")
    #messageDictionary = mongo.db.chatmessage.find({'date':todayDate}).sort({_id:-1}).limit(5)
    #messageDictionary = mongo.db.chatmessage.find({'date':todayDate}).sort("_id",-1).limit(5)
    # find current day messages and message id greater than max message id
    messageDictionary = mongo.db.chatmessage.find({'date':todayDate,'id':{'$gt': session['maxMessageId']}})
    #set max message id to last message id
    #print dumps(messageDictionary)
    if messageDictionary.count() > 0:
        session['maxMessageId'] = messageDictionary[messageDictionary.count()-1]['id']
    #return json format messages
    # print('messageId',session['maxMessageId'])
    return dumps(messageDictionary)    

if __name__ == '__main__':
    #app.run()
    #let other ip can visit
    app.run(host='0.0.0.0')    

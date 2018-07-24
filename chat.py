
from flask import Flask,render_template,session,request,redirect,url_for

app = Flask(__name__)

#enable dubug mode
app.debug = True
#set session secret_key
app.secret_key = 'any random string'

#set nickname page
@app.route('/')
def index():
    #input nickname page
    return render_template('nickname.html')

#set session for user name 
@app.route('/setNickname',methods = ['POST', 'GET'])
def setUsername():
    #set session for user
    session['username'] = request.form['nickname']
    return render_template('chat.html')

#get user name
@app.route('/getUsername')
def getUsername():
    return session['username']
    

    
if __name__ == '__main__':
    app.run()

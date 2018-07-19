from flask import Flask,render_template

app = Flask(__name__)

#enable dubug mode
app.debug = True

@app.route('/')
def index():
    user = 'grant'
    #input nickname page
    return render_template('nickname.html',name = user)


if __name__ == '__main__':
    app.run()

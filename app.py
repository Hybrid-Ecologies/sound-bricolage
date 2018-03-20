from flask import Flask, render_template
import os

app = Flask(__name__)
sounds = {}
for folder in os.listdir("static/sounds"):
    if folder[0] != "." and folder[-4:] != ".txt":              #don't want to grab hidden files
        sounds[folder] = [sound for sound in os.listdir("static/sounds/{}".format(folder)) if sound[0] !="."]

@app.route("/")
def main():
    return render_template("index.html", sounds = sounds)

@app.route("/sounds/<folder>/<sound>")
def get_sound(folder, sound):
    return app.send_static_file('sounds/{}/{}'.format(folder, sound))

port = os.getenv('PORT', '8080')
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(port))
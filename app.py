from flask import Flask, render_template
import os

app = Flask(__name__)

#   making a dictionary of all the sounds
sounds = {}
for folder in os.listdir("static/sounds"):
    path = "static/sounds/{}".format(folder)
    if os.path.isdir(path):
        sounds[folder] = [sound for sound in os.listdir(path) if sound[-4:] == ".wav"]

@app.route("/")
def main():
    return render_template("index.html", sounds = sounds)

@app.route("/sounds/<folder>/<sound>")
def get_sound(folder, sound):
    return app.send_static_file('sounds/{}/{}'.format(folder, sound))

port = os.getenv('PORT', '8080')
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(port))
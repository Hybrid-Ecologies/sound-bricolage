from flask import Flask, render_template
import os

app = Flask(__name__)

#   making a dictionary of all the sounds
folders = {}
sounds = {}
for folder_name in os.listdir("static/sounds"):
    path = "static/sounds/{}".format(folder_name)
    if os.path.isdir(path):
        folder = {}
        folders[folder_name] = folder
        for filename in os.listdir(path):
            if filename[-4:] == '.wav':
                sound = filename[:-4]
                sound_info ={ 
                    'filename' : filename,
                    'sound' : sound,
                    'size' : os.path.getsize(path + "/" + filename),
                    'folder' : folder_name
                    }
                folder[sound] = sound_info
                sounds[sound] = sound_info


@app.route("/")
def main():
    return render_template("index.html", folders = folders)

@app.route("/wordcloud")
def word_cloud():
    return render_template("wordcloud.html", folders = folders)

#route for static sound files
@app.route("/sounds/<folder>/<sound>")
def get_sound(folder, sound):
    return app.send_static_file('sounds/{}/{}'.format(folder, sound))

# 404 handling
@app.errorhandler(404)
def page_not_found(e):
    return "404: Page not found"

port = os.getenv('PORT', '8080')
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(port))
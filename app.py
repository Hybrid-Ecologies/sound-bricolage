from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route("/")
def main():
    return render_template("index.html")

port = os.getenv('PORT', '8080')
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(port))
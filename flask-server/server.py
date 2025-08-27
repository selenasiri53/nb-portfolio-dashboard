from flask import Flask

app = Flask(__name__)

@app.route("/funds")
def funds():
    return {"funds": ["Fund1", "Fund2", "Fund3"]}

if __name__ == "__main__":
    app.run(debug=True)
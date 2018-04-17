from flask import Flask, render_template, url_for
import csv, json, os

app = Flask(__name__)

@app.route('/')
def root():
    data = []

    for x in range(0, 22):
        SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
        json_url = os.path.join(SITE_ROOT, 'static', 'popdata/', str(1790 + (10 * x)) + '.csv')

        tempdata = []

        with open(json_url) as f:
            for row in csv.DictReader(f):
                tempdata.append(row)
        data.append(json.dumps(tempdata))

    return render_template('index.html', data=data)

if __name__ == '__main__':
    app.run(debug = True, use_reloader=False)

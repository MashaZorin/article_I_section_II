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
        
        data.append(tempdata)
    
    coords = []

    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, 'static', 'popdata/coords.csv')

    with open(json_url) as f:
        for row in csv.DictReader(f):
            coords.append(row)

    return render_template('index.html', data=json.dumps(data), coords=json.dumps(coords))

if __name__ == '__main__':
    app.run(debug = True, use_reloader=False)

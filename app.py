from flask import Flask, render_template

app = Flask(__name__)

# /// Avaleht
@app.route('/')
def home():
    return render_template('avaleht.html')
# /// Meist leht
@app.route('/about')
def about():
    return render_template('meist.html')
# /// Kontakt leht
@app.route('/kontakt')
def kontakt():
    return render_template('kontakt.html')

# /// Käivita rakendus
if __name__ == '__main__':
    app.run(debug=True)
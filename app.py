from flask import Flask, render_template, request, redirect, url_for

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

# /// Tagasiside leht
@app.route('/tagasiside', methods=['GET', 'POST'])
def tagasiside():
    if request.method == 'POST':
        nimi = request.form['nimi']
        email = request.form['email']
        tagasiside = request.form['tagasiside']

        # /// Tagasiside salvestamine faili või andmebaasi
        with open('tagasiside.txt', 'a') as f:
            f.write(f"Nimi:{nimi}\nEmail: {email}\ntagasiside {tagasiside}\n{'-'*20}\n")

        return redirect(url_for('home')) # /// Pärast tagasiside saatmist suunatakse kasutaja tagasi kodulehele
    
    return render_template('tagasiside.html')
    
# /// Käivita rakendus
if __name__ == '__main__':
    app.run(debug=True)
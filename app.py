from flask import Flask, jsonify, request, render_template
from flask import request
from flask_mail import Mail, Message

import pandas as pd
import os 
import json

app = Flask(__name__)

# Configuration du serveur SMTP pour l'envoi d'e-mails
app.config['MAIL_SERVER'] = 'smtp.mail.com'  
app.config['MAIL_PORT'] = 587  
app.config['MAIL_USE_TLS'] = True  
app.config['MAIL_USERNAME'] = 'ekpomachi@gmail.com' 
app.config['MAIL_PASSWORD'] = 'edembinks12'  
app.config['MAIL_DEFAULT_SENDER'] = 'ekpomachi@gmail.com'

mail = Mail(app)

def count_sentiments(file):
    df = pd.read_csv(file)
    sentiment_counts = df['sentiment'].value_counts().to_dict()
    return {
        'positive': sentiment_counts.get('positive', 0),
        'negative': sentiment_counts.get('negative', 0),
        'neutral': sentiment_counts.get('neutral', 0)
    }

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/select')
def select():
    return render_template('select.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/compare', methods=['POST'])
def compare():
    data = request.json
    network1 = data['network1']
    network2 = data['network2']

    network1_stats = count_sentiments(f'datasets/{network1}')
    network2_stats = count_sentiments(f'datasets/{network2}')

    result = {
        'network1': network1_stats,
        'network2': network2_stats
    }

    print(result)  
    return jsonify(result)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']

        msg = Message(subject='Message de contact', recipients=['ekpomachi@gmail.com'])
        msg.body = f'Nom : {name}\nEmail : {email}\n\nMessage :\n{message}'

        mail.send(msg)

        return 'Message envoyé avec succès !'
    else:
        return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)

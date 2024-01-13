import os
import pytesseract
import re
from pymongo import MongoClient
import pytesseract
from PIL import Image
from pytesseract import Output
from spacy import displacy
from flask import Flask, request, render_template, redirect, url_for,jsonify
import yaml
from flask_cors import CORS
from bson.objectid import ObjectId
import re
#import pandas as pd
import os

app = Flask(__name__)

mongo_uri = 'mongodb+srv://lanetguy:PlEpqor2xtmZq3jo@cluster0.g7mhazp.mongodb.net/'
client = MongoClient(mongo_uri)
db_name = 'grad-project'
collection_name = 'receipts'
db = client[db_name]
collection = db[collection_name]
CORS(app)

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/receipts', methods=['POST', 'GET'])
def data():
    
    # POST a data to database
    if request.method == 'POST':
        body = request.json
        company_name = body['company_name']
        address = body['address']
        date = body['date'] 
        time = body['time']
        product_names = body['product_names']
        product_price = body['product_price']
        total_amount = body['total_amount']
        topKDV = body['topKDV']

        # db.users.insert_one({
        collection.insert_one({
            "company_name": company_name,
            "address": address,
            "date":date,
            "time":time,
            "product_names":product_names,
            "product_price":product_price,
            "total_amount":total_amount,
            "topKDV":topKDV
        })
        return jsonify({
            'status': 'Data is posted to MongoDB!',
            "company_name": company_name,
            "address": address,
            "date":date,
            "time":time,
            "product_names":product_names,
            "product_price":product_price,
            "total_amount":total_amount,
            "topKDV":topKDV
        })
    
    # GET all data from database
    if request.method == 'GET':
        allData = collection.find()
        dataJson = []
        for data in allData:
            id = data['_id']
            company_name = data['company_name']
            address = data['address']
            date = data['date']
            time = data['time']
            product_names = data['product_names']
            product_price = data['product_price']
            total_amount = data['total_amount']
            topKDV = data['topKDV']
            dataDict = {
                'id': str(id),
                'company_name': company_name,
                'address': address,
                'date': date,
                'time': time,
                'product_names': product_names,
                'product_price': product_price,
                'total_amount': total_amount,
                'topKDV': topKDV
            }
            dataJson.append(dataDict)
        print(dataJson)
        return jsonify(dataJson)
@app.route('/receipts/<string:id>', methods=['GET', 'DELETE', 'PUT'])
def onedata(id):

    # GET a specific data by id
    if request.method == 'GET':
        data = collection.find_one({'_id': ObjectId(id)})
        id = data['_id']
        company_name = data['company_name']
        address = data['address']
        date = data['date']
        time = data['time']
        product_names = data['product_names']
        product_price = data['product_price']
        total_amount = data['total_amount']
        topKDV = data['topKDV']
        dataDict = {
                'id': str(id),
                'company_name': company_name,
                'address': address,
                'date': date,
                'time': time,
                'product_names': product_names,
                'product_price': product_price,
                'total_amount': total_amount,
                'topKDV': topKDV
        }
        print(dataDict)
        return jsonify(dataDict)
        
    # DELETE a data
    if request.method == 'DELETE':
        collection.delete_many({'_id': ObjectId(id)})
        print('\n # Deletion successful # \n')
        return jsonify({'status': 'Data id: ' + id + ' is deleted!'})

    # UPDATE a data by id
    if request.method == 'PUT':
        body = request.json
        company_name = body['company_name']
        address = body['address']
        date = body['date'] 
        time = body['time']
        product_names = body['product_names']
        product_price = body['product_price']
        total_amount = body['total_amount']
        topKDV = body['topKDV']

        collection.update_one(
            {'_id': ObjectId(id)},
            {
                "$set": {
                    'company_name': company_name,
                    'address': address,
                    'date': date,
                    'time': time,
                    'product_names': product_names,
                    'product_price': product_price,
                    'total_amount': total_amount,
                    'topKDV': topKDV
                }
            }
        )

        print('\n # Update successful # \n')
        return jsonify({'status': 'Data id: ' + id + ' is updated!'})
    
@app.route('/upload')
def read_image():
    images_file = "gradproject-main\pictures"
    dosya_listesi = os.listdir(images_file)
    resim_dosyalar = [dosya for dosya in dosya_listesi if dosya.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp'))]

    for resim_dosya in resim_dosyalar:
        print("-------------------------------------------")

        dosya_yolu = os.path.join(images_file, resim_dosya)
        metin = pytesseract.image_to_string(Image.open(dosya_yolu), lang='tur')
        print(f"{resim_dosya} dosyasından okunan metin: {metin}")
        date_pattern = r'(\d{1,2}/\d{1,2}/\d{4})' # sadece gun ve ay seklinde de olursa date bulsun
        date = re.findall(date_pattern, metin)
        time_pattern = r'(\d{1,2}:\d{2})'
        time = re.findall(time_pattern, metin) # xx:xx:Xx seklinde olutsa da saat oalrak alsın
        print(metin)
        print("Date: ", date)
        print("Time: ", time)
        company_name= 'Null'
        address= 'Null' 
        date=date
        time=time
        product_names='Null' 
        product_price=0
        total_amount=0
        topKDV=0
        new_document = {
            'company_name': company_name,
            'address': address, 
            'date':date, 
            'time':time, 
            'product_names':product_names, 
            'product_price':product_price,
            'total_amount':total_amount,
            'topKDV':topKDV,
            'items': ['item1', 'item2', 'item3']
        }

        result = collection.insert_one(new_document)
        print(f'Document inserted with _id: {result.inserted_id}')
    
if __name__ == '__main__':
    app.run(debug=True)


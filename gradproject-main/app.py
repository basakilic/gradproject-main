import os
import pytesseract
import cv2
import re
import spacy
from pymongo import MongoClient
from PIL import Image
from pytesseract import Output
from spacy import displacy


mongo_uri = 'mongodb+srv://lanetguy:PlEpqor2xtmZq3jo@cluster0.g7mhazp.mongodb.net/'  # MongoDB sunucu adresini ve portunu ayarlayın
client = MongoClient(mongo_uri)

# Veritabanı adı ve koleksiyon adı
db_name = 'grad-project'
collection_name = 'receipts'

# Veritabanına bağlan
db = client[db_name]
collection = db[collection_name]
#Burada OCR okuyacak ve hangi verilerin olduğuna karar verip atama yapacak
company_name= 'Örnek Firma'
address= 'Örnek Adres' 
date='01.01.2024'
time='12.00'
product_names='Örnek Ürün' 
product_price=10.00
total_amount=10.0
topKDV=2 

# Yeni belge eklemek için örnek veri
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

# Koleksiyona belge eklemek
result = collection.insert_one(new_document)
print(f'Document inserted with _id: {result.inserted_id}')

""" image_dir='gradproject-main\\'
images = [file for file in os.listdir(image_dir) if file.lower().endswith(".jpg")]
#img = cv2.imread('gradproject-main\\gradproject-main\\test.jpg')


#custom_config = r'--oem 3 --psm 6 -l tur'
for image_name in images:
    image_path = os.path.join(image_dir, image_name)
    
    # Görüntüyü oku
    img = cv2.imread(image_path)
    
    # OCR işlemi uygula
    text = pytesseract.image_to_string(img,lang='tur')
    print(f"File: {image_name}")
    print(text)
    print("--------------------------") """

#text = pytesseract.image_to_string(img, config=custom_config)


#date_pattern = r'(\d{1,2}/\d{1,2}/\d{4})'
#date = re.findall(date_pattern, text)

#time_pattern = r'(\d{1,2}:\d{2})'
#time = re.findall(time_pattern, text)
#print(text)
#print("--------------------------")
#print("Date: ", date)
#print("Time: ", time)
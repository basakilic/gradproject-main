from pymongo import MongoClient
import pytesseract
from PIL import Image
import re
import pandas as pd
import os


mongo_uri = 'mongodb+srv://basak:basakgradproject@cluster0.g7mhazp.mongodb.net/'
client = MongoClient(mongo_uri)

# Veritabanı adı ve koleksiyon adı
db_name = 'grad-project'
collection_name = 'receipts'

# Veritabanı
db = client[db_name]
collection = db[collection_name]


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
    


from pymongo import MongoClient
import pytesseract
from PIL import Image
import re
import pandas as pd
import os


mongo_uri = 'mongodb+srv://basak:basakgradproject@cluster0.g7mhazp.mongodb.net/'  # MongoDB sunucu adresini ve portunu ayarlayın
client = MongoClient(mongo_uri)

# Veritabanı adı ve koleksiyon adı
db_name = 'grad-project'
collection_name = 'receipts'

# Veritabanına bağlan
db = client[db_name]
collection = db[collection_name]
#Burada OCR okuyacak ve hangi verilerin olduğuna karar verip atama yapacak



images_file = "gradproject-main\pictures"
dosya_listesi = os.listdir(images_file)
resim_dosyalar = [dosya for dosya in dosya_listesi if dosya.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp'))]
df_date = pd.DataFrame()
df_time = pd.DataFrame()

for resim_dosya in resim_dosyalar:
    print("-------------------------------------------")

    dosya_yolu = os.path.join(images_file, resim_dosya)
    metin = pytesseract.image_to_string(Image.open(dosya_yolu), lang='tur')
    print(f"{resim_dosya} dosyasından okunan metin: {metin}")
    date_pattern = r'(\d{1,2}/\d{1,2}/\d{4})' # sadece gun ve ay seklinde de olursa date bulsun
    date = re.findall(date_pattern, metin)
    #df_date.append(date)
    time_pattern = r'(\d{1,2}:\d{2})'
    time = re.findall(time_pattern, metin) # xx:xx:Xx seklinde olutsa da saat oalrak alsın
    #df_time.append(time)
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
    

# Yeni belge eklemek için örnek veri



# Koleksiyona belge eklemek


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
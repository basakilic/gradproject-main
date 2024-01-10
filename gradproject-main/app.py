import os
import pytesseract
import cv2
import re
import spacy
from pymongo import MongoClient
from PIL import Image
from pytesseract import Output
from spacy import displacy


image_dir='gradproject-main\\'
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
    print("--------------------------")

#text = pytesseract.image_to_string(img, config=custom_config)


#date_pattern = r'(\d{1,2}/\d{1,2}/\d{4})'
#date = re.findall(date_pattern, text)

#time_pattern = r'(\d{1,2}:\d{2})'
#time = re.findall(time_pattern, text)
#print(text)
#print("--------------------------")
#print("Date: ", date)
#print("Time: ", time)
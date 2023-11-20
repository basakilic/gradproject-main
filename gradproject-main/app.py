from PIL import Image
import pytesseract

print(pytesseract.image_to_string(Image.open('test1.jpg'),lang='tur'))
print(pytesseract.image_to_string(Image.open('test.jpg'),lang='tur'))

print(pytesseract.image_to_string(Image.open('test1.jpg'),lang='tur'))
print(pytesseract.image_to_string(Image.open('test.jpg'),lang='tur'))


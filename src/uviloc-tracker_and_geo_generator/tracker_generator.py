import random
import string
import requests
import os
import qrcode
from PIL import Image

install_dependencies = False
api_url = "http://localhost/api/"


if install_dependencies == True:
    os.system("python3 -m pip install random")
    os.system("python3 -m pip install string")
    os.system("python3 -m pip install requests")
    os.system("python3 -m pip install os")
    os.system("python3 -m pip install qrcode")
    os.system("python3 -m pip install Pillow")
else:
    print("Auto-installing dependencies deactivated, let's begin!")


def generate_restricted_random_string():
    length = 18
    allowed_chars = string.ascii_lowercase + string.digits
    random_string = ''.join(random.choice(allowed_chars) for _ in range(length))
    return random_string

def post_tracker(token):
    url = api_url+"trackers/create/"
    tracker_obj = {"token": token}
    x = requests.post(url, json = tracker_obj)
    return x.text

def unique_token_check(token):
    response_json_str = str((requests.get(api_url+'trackers/get-all/')).json())
    if str.__contains__(response_json_str, token) == True:
        return True
    else: 
        return False

def create_qr_code(token):
    # Check if the directory 'qr_codes' exists, if not, create it
    qr_codes_dir = os.path.join(os.getcwd(), 'qr_codes')
    if not os.path.exists(qr_codes_dir):
        os.makedirs(qr_codes_dir)

    Logo_link = os.getcwd() + '/logo.png'
    logo = Image.open(Logo_link)
    basewidth = 100
    wpercent = (basewidth / float(logo.size[0]))
    hsize = int((float(logo.size[1]) * float(wpercent)))
    logo = logo.resize((basewidth, hsize))

    QRcode = qrcode.QRCode(
        error_correction=qrcode.constants.ERROR_CORRECT_H
    )
    url = token
    QRcode.add_data(url)
    QRcode.make()

    QRcolor = 'Black'
    QRimg = QRcode.make_image(
        fill_color=QRcolor, back_color="white").convert('RGB')

    pos = ((QRimg.size[0] - logo.size[0]) // 2,
           (QRimg.size[1] - logo.size[1]) // 2)
    QRimg.paste(logo, pos)

    QRimg.save(os.path.join(qr_codes_dir, token + ".png"))
    print('QR code generated!')


print("\nEnter how many trackers you want generate:")
user_input = int(input()) 
if user_input == 0:
    print("\nManual enter tracker token:")
    tracker_token = input()
    if unique_token_check(tracker_token) == True:
        print("\nTracke exists!")
        quit()
    else: 
        print("\n\n"+tracker_token+"\n")
        print(post_tracker(tracker_token))
        create_qr_code(tracker_token)
        print("\n"+str(os.getcwd()+"/qr_codes/"+tracker_token+".png"))

for i in range(user_input):
    tracker_token = "uviloc_tracker-"+generate_restricted_random_string()
    if unique_token_check(tracker_token) == True:
        i -= 1
    else: 
        print("\n\n"+tracker_token+"\n")
        print(post_tracker(tracker_token))
        create_qr_code(tracker_token)
        print("\n"+str(os.getcwd()+"/qr_codes/"+tracker_token+".png"))

print("\n\nEnjoy!\n")

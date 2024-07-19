import requests
import json
import random
import time
import os
import subprocess
import time


# def startup_update():
#     os.system("sudo apt-get update -y")
#     os.system("sudo apt-get upgrade -y")
#     os.system("pip3 install --upgrade pip")
#     os.system("python3 -m pip install requests")
#     os.system("python3 -m pip install --upgrade requests")
#     os.system("python3 -m pip install json")
#     os.system("python3 -m pip install --upgrade json")
#     os.system("python3 -m pip install random")
#     os.system("python3 -m pip install --upgrade random")
#     os.system("python3 -m pip install time")
#     os.system("python3 -m pip install --upgrade time")
#     os.system("python3 -m pip install os")
#     os.system("python3 -m pip install --upgrade os")
#     os.system("python3 -m pip install subprocess")
#     os.system("python3 -m pip install --upgrade subprocess")
#     os.system("python3 -m pip install time")
#     os.system("python3 -m pip install --upgrade time")


def get_hostname():
    return subprocess.check_output("hostname", shell=True).decode().strip().replace(".local", "")

def check_token(token):
    #url = "http://17.22.0.103/api/trackers/get-exist-status-by-tracker-token/"
    url = "http://localhost/api/trackers/get-exist-status-by-tracker-token/"
    token_obj = {"token": token}
    x = requests.get(url, json = token_obj)
    return x.text

def generate_random_coordinates():
    latitude = random.uniform(-90, 90)
    longitude = random.uniform(-180, 180)
    return f"{latitude:.6f},{longitude:.6f}"

# def get_coordinates():
#     return null

def post_coordinates(value, tracker_token):
    #url = "http://17.22.0.103/api/geolocations/create/"
    url = "http://localhost/api/geolocations/create/"
    geo_obj = {"tracker_token": tracker_token, "coordinates": value}
    x = requests.post(url, json = geo_obj)
    return x.text

def write_token(token):
    with open("token", "w") as file:
        file.write(token)
        return "Token saved!"

def write_tracker(tracker):
    with open("tracker.json", "w") as file:
        file.write(tracker)
        return "Tracker saved!"

def post_state(value, token):
    #url = "http://17.22.0.103/api/geolocations/create/"
    url = "http://localhost/api/trackers/update/"
    tracker_obj = {"token": token, "state": value}
    x = requests.put(url, json = tracker_obj)
    return x.text

def beep():
    return "AAAAAAAAA!!!"


# startup_update()
token = "uviloc_tracker-"+get_hostname()
#token = "uviloc_tracker-"+"nwjd4dbyvjqjtwffua"
token_exist = check_token(token)
if (token_exist == "0"):
    err = "Token "+token+" doesnt exsist! Bad token, firmware error- 01"
    print(err)
    print(beep())
elif (token_exist == "1"):
    print(write_token(token))

    while True:
        print("\n")
        print(post_coordinates(generate_random_coordinates(), token))
        print("\n")
        tracker_obj = post_state("OK", token)
        print(tracker_obj)
        print("\n"+write_tracker(tracker_obj))
        print("\n\n")
        time.sleep(10)


import requests
import json
import random
import time
import os
import subprocess

def get_hostname():
    return subprocess.check_output("hostname", shell=True).decode().strip().replace(".local", "")

def check_token(hostname):
    

def generate_random_coordinates():
    latitude = random.uniform(-90, 90)
    longitude = random.uniform(-180, 180)
    return f"{latitude:.6f},{longitude:.6f}"

def post_coordinates(value, tracker_token):
    url = "http://localhost/api/geolocations/create/"
    geo_obj = {"tracker_token": tracker_token, "coordinates": value}
    x = requests.post(url, json = geo_obj)
    return x.text

#while True:
#    print(post_coordinates(generate_random_coordinates(), tracker_token))
#    time.sleep(20)



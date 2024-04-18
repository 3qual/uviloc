import requests
import json
import random
import time

print("Enter tracker_token here")
tracker_token = str(input())

def generate_random_coordinates():
    latitude = random.uniform(-90, 90)
    longitude = random.uniform(-180, 180)
    return f"{latitude:.6f},{longitude:.6f}"

def post_coordinates(value, tracker_token):
    url = "http://localhost/api/geolocations/"
    geo_obj = {"tracker_token": tracker_token, "coordinates": value}
    x = requests.post(url, json = geo_obj)
    return x.text

while True:
    print(post_coordinates(generate_random_coordinates(), tracker_token))
    time.sleep(20)

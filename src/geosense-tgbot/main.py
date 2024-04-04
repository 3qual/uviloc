import telebot
import requests
import json
from telebot import types

bot = telebot.TeleBot('7126866059:AAEcfpEpKo1YoNKmc-5TLzmpIPIDj-0gHSw')

def auth(chat_id):
    response = requests.get('http://172.19.0.7/api/users/')
    response_json = response.json()
    for user in response_json:
        if(str(user["tg_chatid"])==str(chat_id)):
            return True
    return False

def chatid_to_dbid(chat_id):
    response = requests.get('http://172.19.0.7/api/users/')
    response_json = response.json()
    for user in response_json:
        if(str(user["tg_chatid"])==str(chat_id)):
            return user["id"]
    return 0        
            
def tracker_name_to_latest_location_and_time(chat_id, name):
    response = requests.get('http://172.19.0.7/api/trackers/'+str(chatid_to_dbid(chat_id)))
    response_json = response.json()
    tracker_id = ''
    for tracker in response_json:
        if (str(tracker["name"]) == name):
            tracker_id = str(tracker["id"])
            break
    if (tracker_id == ''):
        return "Incorrect tracker name"
    response_geo = requests.get('http://172.19.0.7/api/geolocations/'+tracker_id)
    response_geo_json = response_geo.json()
    geol = 'No Coordinates'
    for geo in response_geo_json:
        geol = "https://www.google.com/maps/place/"+str(geo["coordinates"]).replace(" ", "")+"\n\nat  "+str(geo["created_at"])
    return geol
    

@bot.message_handler(commands = ['start'])
def start(message):
    a = telebot.types.ReplyKeyboardRemove()
    if (auth(message.chat.id)==True):
        bot.send_message(message.from_user.id, "Welcome!", reply_markup=a)
        response = requests.get('http://172.19.0.7/api/trackers/'+str(chatid_to_dbid(message.chat.id)))
        response_json = response.json()
        if(str(response_json)!="[]"):
            markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
            for tracker in response_json:
                markup.add(types.KeyboardButton(str(tracker["name"])))
            bot.send_message(message.from_user.id, "From which tracker you want get location?", reply_markup=markup)
        else:
            bot.send_message(message.from_user.id, "You dont have any trackers yet...")
    else:
        markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
        markup.add(types.KeyboardButton("/start"))
        bot.send_message(message.from_user.id, "You're not registered your telegram yet!\n\nYour Telegram ChatID is:  "+str(message.chat.id)+"\n\nPlease put your ChatID in your profile settings over GeoSense Web or Mobile app and restart the bot!", reply_markup=markup)

@bot.message_handler(content_types=['text'])
def get_text_message(message):
    bot.send_message(message.from_user.id, tracker_name_to_latest_location_and_time(message.chat.id, message.text), disable_web_page_preview=False)

    

bot.polling(non_stop=True, interval=0)

#bot.send_message(message.from_user.id, str(response.text))
#bot.send_message(message.from_user.id, "Hi "+message.from_user.first_name+", your message is: "+message.text)
#bot.send_message(message.from_user.id, "Yout chat ID: "+str(message.chat.id))
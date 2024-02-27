import telebot
import requests

def auth(chat_id):
    response = requests.get('http://172.18.0.7/api/users/')
    if (str(response).__contains__(str(chat_id))==True):
        return True
    else:
        return False


bot = telebot.TeleBot('7126866059:AAEcfpEpKo1YoNKmc-5TLzmpIPIDj-0gHSw')

@bot.message_handler(commands = ['start'])
def start(message):
    if (auth(message.chat.id)==True):
        bot.send_message(message.from_user.id, "yes")
    else:
        bot.send_message(message.from_user.id, "no")

@bot.message_handler(content_types=['text'])
def get_text_message(message):
    

bot.polling(non_stop=True, interval=0)

#bot.send_message(message.from_user.id, str(response.text))
#bot.send_message(message.from_user.id, "Hi "+message.from_user.first_name+", your message is: "+message.text)
#bot.send_message(message.from_user.id, "Yout chat ID: "+str(message.chat.id))
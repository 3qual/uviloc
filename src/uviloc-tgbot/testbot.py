import telebot

bot = telebot.TeleBot('6578806981:AAF0fPx7JpG3elYYeJp--ahxcH9WhgUbL2A')

@bot.message_handler(content_types=['text'])
def get_text_message(message):
  bot.send_message(message.from_user.id,"Hi "+message.from_user.first_name+", your message is: "+message.text)
  bot.send_message(message.from_user.id, "Yout chat ID: "+str(message.chat.id))

bot.polling(non_stop=True, interval=0)

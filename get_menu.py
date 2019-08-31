import requests
from bs4 import BeautifulSoup
import sys
import datetime

def get_menu(api_key):

    payload={'key': api_key, 'url':
    'https://www.lawrenceville.org/campus-life/dining'}

    resp = requests.get('http://api.scraperapi.com', params=payload)
    soup=BeautifulSoup(resp.text,'html.parser')
    # print soup

    items=soup.findAll("div",{"class":"event-detail"})
    items_list = []
    final_menu = {}


    for item in items:
        items_list.append(item.get_text())

    for i in range(len(items_list)):
        items_list[i] = parse_meal(split_meal(items_list[i]))

    for meal in items_list:
        final_menu[meal["type"]]={
            "date":meal["date"],
            "type":meal["type"],
            "title":meal["type"].capitalize() + " - " + meal["date"],
            "items":meal["items"]
        }

    return final_menu

def split_meal(item):
    item = item
    underscore_indices = []

    for i in range(0, len(item)-1):
        if item[i].isalpha() and item[i+1].isalpha():
            if not(item[i].isupper()) and item[i+1].isupper():
                underscore_indices.append(i)

    for i in range(len(underscore_indices)):
        item = item[:underscore_indices[i]+i+1] + '\n' + item[underscore_indices[i]+i+1:]

    return item

def parse_meal(meal):
    date = ""
    n_indices = []
    space_indices = []
    for i in range(len(meal)):
        if meal[i] == "\n":
            n_indices.append(i)
        if meal[i] == " ":
            space_indices.append(i)

    type = meal[n_indices[0]+1:n_indices[1]]
    date = datetime.datetime.strptime(meal[n_indices[2]+1:space_indices[0]], "%m/%d/%Y").strftime('%A %B %d')
    meal = meal[space_indices[2]:].split('\n')
    del meal[0]
    del meal[-1]
    no_words = ["bar", "fruit", "yogurt", "yogurt", "muffins", "dessert"]
    i=0
    while i < len(meal):
        for no_word in no_words:
            if no_word in meal[i].lower():
                del meal[i]
                i -= 1
        i += 1

    return {"type":type.lower(), "date":date, "items":meal}


print(get_menu('c25d2485c37e9764217cc5476a73be10'))

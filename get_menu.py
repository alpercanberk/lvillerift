import requests
from bs4 import BeautifulSoup
import sys
import datetime

def parse_more(items):
    return [item.replace('w/',"with").replace("&", "and").replace(": ", "") for item in items]



def check_useless(useless_list, text):
    for useless in useless_list:
        if useless.lower() in text.lower():
            return False
    return True

def get_menu():

    payload={'key': 'c25d2485c37e9764217cc5476a73be10', 'url':
    'https://www.lawrenceville.org/campus-life/dining'}

    resp = requests.get('http://api.scraperapi.com', params=payload)
    soup=BeautifulSoup(resp.text,'html.parser')
    # print soup
    first_title = soup.findAll("div",{"class":"event-detail"})[0].get_text()
    date = soup.findAll("span", {"class":"start-date"})[0].get_text()
    all_items = soup.findAll("div",{"class":"brief-description"})

    final_item_list = []

    useless_words = ["yogurt", "muffins", "dessert", "soup"]

    if "Brunch" in first_title:
        print("Brunch!")
        brunch_items = []
        dinner_items = []
        for i in range(0,2):
            ems_brunch = all_items[i].findAll("em")
            for em in ems_brunch:
                if(str(em)[5] == "/"):
                    continue
                em_text = em.get_text()
                if(check_useless(useless_words, em_text)):
                    print(em_text)
                    brunch_items.append(em_text)

        ems_dinner = all_items[3].findAll("em")
        for em in ems_dinner:
            if(str(em)[5] == "/"):
                continue
            em_text = em.get_text()
            if(check_useless(useless_words, em_text)):
                print(em_text)
                dinner_items.append(em_text)

        return{
            "Brunch":{
                "date":date,
                "type":"Brunch",
                "title":"Brunch - " + date,
                "items":parse_more(brunch_items)
            },
            "Dinner":{
                "date":date,
                "type":"Dinner",
                "title":"Dinner - " + date,
                "items":parse_more(dinner_items)
            }
        }



    else:
        daily_items = [[],[],[]]
        for i in range(0,3):
            current_ems = all_items[i].findAll("em")
            for em in current_ems:
                if(str(em)[5] == "/"):
                    continue
                em_text = em.get_text()
                if(check_useless(useless_words, em_text)):
                    print(em_text)
                    daily_items[i].append(em_text)

        return {
            "Dinner":{
                "date":date,
                "type":"Dinner",
                "title":"Dinner - " + date,
                "items":parse_more(daily_items[2])
            },
            "Breakfast":{
                "date":date,
                "type":"Breakfast",
                "title":"Breakfast - " + date,
                "items":parse_more(daily_items[0])
            },
            "Lunch":{
                "date":date,
                "type":"Lunch",
                "title":"Lunch - " + date,
                "items":parse_more(daily_items[1])
            }
        }
print(get_menu())

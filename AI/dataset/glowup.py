import pandas as pd

#load dataset
dataset_original = pd.read_csv('./export_skincare.csv')

# make the copy of original dataset
dataset = dataset_original.copy()

# get the unique items of notable_effects column
all_effect =[]
for items in dataset['notable_effects']:
    print(items)
    effect_list =items.split(",")
    print(effect_list)
    for item in effect_list:
        clean_effect = item.strip()
        all_effect.append(clean_effect)
unique_effects= set(all_effect)
for item in unique_effects:
    print(item)

# make the each row item into a list item  of notable effects and replace the old rows with the new list items
notable_effect =[]
notable_effect_edited=[]
for index,row in dataset.iterrows():
    notable_effect.append(row['notable_effects'])
    # for item in notable_effect:
        # print(item)
# print(len(notable_effect)) #1210
# print(len(dataset)) #1210
# print(notable_effect)
item_list=[]
for item in notable_effect:
    item_list = [x.strip() for x in item.split(',')]
    # print(item_list)
    notable_effect_edited.append(item_list)
# print(notable_effect_edited)
# print(len(notable_effect_edited))
dataset['notable_effects']=notable_effect_edited
print(dataset['notable_effects'])


# # make the each row item of skintype into a list item and replace the old rows with the new list items
skin_type =[]
skin_type_edited=[]
for index,row in dataset.iterrows():
    skin_type.append(row['skintype'])
    # for item in skin_type:
        # print(item)
# print(len(skin_type)) #1210
# print(len(dataset)) #1210
# print(skin_type)
item_list=[]
for item in skin_type:
    item_list = [x.strip() for x in item.split(',')]
    # print(item_list)
    skin_type_edited.append(item_list)
# print(skin_type_edited)
# print(len(skin_type_edited))
dataset['skintype']=skin_type_edited
print(dataset['skintype'])

# Remove unnecessary columns
columns_remove =['Unnamed: 0','product_href', 'labels','Sensitive', 'Combination', 'Oily', 'Dry', 'Normal']
dataset.drop(columns_remove,axis=1,inplace=True)


# check the picture url status and make a new column which carry the url status
import requests
def check_url_status(url):
    try:
        response = requests.get(url, timeout=10)
        return response.status_code
    except(requests.exceptions.RequestException):
        return "error"
dataset['picture_src_count']= dataset['picture_src'].apply(check_url_status)
print(dataset['picture_src_count'])


# check the rows count that contain success status
count  =(dataset['picture_src_count']!= 200).sum()
print(count)

# find the row which has the picture_src_status is not 200 and remove them
error_rows= [403, 404, 'error']
row_index= dataset.index[dataset["picture_src_count"]!=200]
dataset.drop(index=row_index,inplace=True)
print(dataset["picture_src_count"]) 


# translate description from indonesian to english and put those into the new column 'description_en'
from deep_translator import GoogleTranslator

def translate_en(text):
    return GoogleTranslator(source='id', target='en').translate(text)
dataset["description_en"] = dataset["description"].apply(translate_en)
print(dataset['description_en'])


# make a column 'Rating' and enter random numbers into it between 0 to 5
import random
random_numbers =[]
for i in range(1210):
    randnum = round(random.uniform(0, 5), 2) # two numbers after decimal point
    random_numbers.append(randnum)
print(random_numbers)
print(len(random_numbers))
dataset['Rating']= random_numbers



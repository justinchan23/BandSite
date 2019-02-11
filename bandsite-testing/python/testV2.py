# readme:
# 1. This script is for testing the comment section on 'The Band Site' project
# 2. It will autofill the comment form and click the submit button
# 3. You must change the page_link, nameFieldId, commentFieldId, commentButtonId to reflect the ones used in your document.
# 4. You must have selenium installed, enter this in terminal to install:
# python -m pip install -U selenium
# 5. To run, enter this command in terminal - python test.py
# 6. Happy testing =)
# 7. V2 update has new features which can add more than 1 comment when running the program, and also has additional random text that is plaecd into the fields.

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import random
# --- DO NOT EDIT CODE ABOVE THIS LINE ---


# these values must be changed to reflect those in your html
page_link = 'http://127.0.0.1:5500/thebandsite-sprint3/' # put the link to your page here
commentButtonId = 'commentContent__addButton' #the ID of the 'commemt' button in your form
numberOfComments = 5 #the number of comments you would like to add to the page




driver = webdriver.Chrome()
driver.implicitly_wait(30)
driver.maximize_window()
driver.get(page_link)

name = ['John Doe', 'Deloise Beachum', 'Shera Ciesla', 'Harley Sturrock', 'Aleisha Pfau', 'Adolph Rather', 'Gerald Fairall', 'Nolan Burg', 'Renetta Bailey', 'Breana Gault']
comments = ['Lorem ipsum dolor sit amet, an ridens facilis fuisset duo, eum ea harum dolore. Error graece oblique at vim. Tation timeam eleifend qui et. Ex soluta scribentur est, an viderer senserit mei, viris essent quodsi sea te. Probo tincidunt in his, tota posse duo ne.', 'This is a test message', 'Hello world, you are looking incredibly great today.', 'This message has this text.', 'I hope this is my final comment.', 'Some people come into our lives and leave footprints on our hearts, while others come into our lives and make us wanna leave footprints on their face.', 'Thank you Facebook, I can now farm without going outside, cook without being in my kitchen, feed fish I don\'t have & waste an entire day without having a life.', 'Life is full of temporary situations, ultimately ending in a permanent solution.' , 'It\'s gonna take a lot to take me away from you There\'s nothing that a hundred men or more could ever do I bless the rains down in Africa Gonna take some time to do the things we never have.', 'I see trees of green........ red roses too I see em bloom..... for me and for you And I think to myself.... what a wonderful world.']
for x in range(numberOfComments):

    a = random.randint(0,9)
    b = random.randint(0,9)



    nameIn = name[a]
    driver.execute_script("""
    var nameIn = arguments[0];
    document.getElementById('name').value += nameIn;
    """, nameIn) #'name' must be changed to the ID of the 'name' field in your form

    commentIn = comments[b]
    driver.execute_script("""
    var commentIn = arguments[0];
    document.getElementById('comment').value += commentIn;
    """, commentIn) #'comment' must be changed to the ID of the 'name' field in your form

    submit_button = driver.find_element_by_id(commentButtonId)
    submit_button.click()

print('Successfully completed')

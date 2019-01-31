# readme:
# 1. This script is for testing the comment section on 'The Band Site' project
# 2. It will autofill the comment form and click the submit button
# 3. You must change the page_link, nameFieldId, commentFieldId, commentButtonId to reflect the ones used in your document.
# 4. You must have selenium installed, enter this in terminal to install:
# python -m pip install -U selenium
# 5. To run, enter this command in terminal - python test.py
# 6. Happy testing =)

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
# --- DO NOT EDIT CODE ABOVE THIS LINE ---


# these values must be changed to reflect those in your html
page_link = 'link' # put the link to your page here
nameFieldId = 'name' #the ID of the 'name' field in your form
commentFieldId = 'comment' #the ID of the 'comment' field in your form
commentButtonId = 'commentContent__addButton' #the ID of the 'commemt' button in your form




# --- DO NOT EDIT CODE BELOW THIS LINE ---
driver = webdriver.Chrome()
driver.implicitly_wait(30)
driver.maximize_window()
driver.get(page_link)

name_field = driver.find_element_by_id(nameFieldId)
name_field.send_keys('Firstname Lastname')


name_field = driver.find_element_by_id(commentFieldId)
name_field.send_keys('Lorem ipsum dolor sit amet, an ridens facilis fuisset duo, eum ea harum dolore. Error graece oblique at vim. Tation timeam eleifend qui et. Ex soluta scribentur est, an viderer senserit mei, viris essent quodsi sea te. Probo tincidunt in his, tota posse duo ne.')

submit_button = driver.find_element_by_id(commentButtonId)
submit_button.click()


print ('Success!')

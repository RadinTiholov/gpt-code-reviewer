import undetected_chromedriver as uc
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time

def initialize_driver():
    # Initialize the WebDriver
    driver = uc.Chrome()
    # Navigate to the chat page and log in
    driver.get("https://chat.openai.com/")
    input("Please log in to the chat and press Enter to continue...")
    return driver

def open_new_chat(driver):
    print("Opening new chat...")

    textarea = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CSS_SELECTOR, ".flex.p-3.items-center.gap-3.transition-colors.duration-200.text-white.cursor-pointer.text-sm.rounded-md.border")))
    textarea.click()

def ask_gpt3_question(driver, question):
    print("Waiting for response...")
    
    # Find and interact with the chat input box
    textarea = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CSS_SELECTOR, "textarea")))
    textarea.click()
    textarea.send_keys(question)
    textarea.send_keys(Keys.ENTER)
    
    # Wait for the response to load (You may need to add an explicit wait here, depending on the website)
    print("Waiting for response from GPT. 30 seconds...")
    time.sleep(30)

    # Find the response element and return its text
    response_elements = driver.find_elements(By.CLASS_NAME, "markdown")

    # Find and print the text of child
    response_children = response_elements[-1].find_elements(By.CSS_SELECTOR, "*")

    concatenated_text = ""

    # Iterate through the children elements and append their text to the concatenated_text
    for el in response_children:
        concatenated_text += el.text

    # Return the concatenated text
    return concatenated_text

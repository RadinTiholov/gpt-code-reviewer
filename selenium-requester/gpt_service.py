import undetected_chromedriver as uc
from selenium.webdriver.support.wait import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time
import json

def initialize_driver():
    # Initialize the WebDriver
    driver = uc.Chrome()
    # Navigate to the chat page and log in
    driver.get("https://chat.openai.com/")
    input("Please log in to the chat and press Enter to continue...")
    return driver

def open_new_chat(driver):
    print("Opening new chat...")

    css_selector = "a:has(a.truncate)"
        
    button = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CSS_SELECTOR, css_selector)))
    button.click()

def review_code_gpt3(driver, question, code):
    print("Reviewing code")

    formated_question = question + "Code: " + code + ". PLEASE RETURN *ONLY* the requested JSON text, *NOTHING* more! Do not provide anything additional!"

    response_json = ask_gpt3_question(driver, formated_question)

    parsed_json = json.loads(response_json)

    # Returning the parsed JSON dictionary without backslashes
    return json.dumps(parsed_json, indent=2)

def ask_gpt3_question(driver, question):
    print("Waiting for response...")
    
    # Find and interact with the chat input box
    textarea = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CSS_SELECTOR, "textarea")))
    textarea.click()
    textarea.send_keys(question)

    button_css_selector = ".absolute.p-1.rounded-md.md\:bottom-3.md\:p-2.md\:right-3.dark\:hover\:bg-gray-900.dark\:disabled\:hover\:bg-transparent.right-2.disabled\:text-gray-400.enabled\:bg-brand-purple.text-white.bottom-1\.5.transition-colors.disabled\:opacity-40"
    expected_color = "rgb(25, 195, 125)"
    wait_until_button_has_color_and_click(driver, button_css_selector, expected_color)

    # button = WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.CSS_SELECTOR, ".absolute.p-1.rounded-md.md\:bottom-3.md\:p-2.md\:right-3.dark\:hover\:bg-gray-900.dark\:disabled\:hover\:bg-transparent.right-2.disabled\:text-gray-400.enabled\:bg-brand-purple.text-white.bottom-1\.5.transition-colors.disabled\:opacity-40")))
    # textarea.send_keys(Keys.ENTER)
    # button.click()
    
    # Wait for the response to load (You may need to add an explicit wait here, depending on the website)
    print("Waiting for response from GPT. 30 seconds...")
    time.sleep(30)

    # Find the response element and return its text
    response_elements = driver.find_elements(By.CLASS_NAME, "markdown")

    # Find and print the text of child
    response_children = response_elements[-1].find_elements(By.CSS_SELECTOR, "*")

    concatenated_text = ""

    # Check if the response contains a <code> element before iterating through children
    response_contains_code = any('code' in el.tag_name for el in response_children)
    if response_contains_code:
        print("Response contains a <code> element!")
        
        # Extract text content from the <code> element and add to concatenated_text
        for el in response_children:
            if 'code' in el.tag_name:
                concatenated_text += el.text
                break
    else:
        print("Response does not contain a <code> element.")
        # Iterate through the children elements and append their text to the concatenated_text
        for el in response_children:
            concatenated_text += el.text

    # Return the concatenated text
    return concatenated_text

def wait_until_button_has_color_and_click(driver, button_css_selector, expected_color, timeout=60):
    def check_button_color(driver):
        button = driver.find_element(By.CSS_SELECTOR, button_css_selector)
        button_bg_color = driver.execute_script("return window.getComputedStyle(arguments[0]).getPropertyValue('background-color');", button)
        return button_bg_color == expected_color

    try:
        WebDriverWait(driver, timeout).until(check_button_color)
        print("Button has the expected background color!")

        # Button has the desired color, click it now
        button = driver.find_element(By.CSS_SELECTOR, button_css_selector)
        button.click()
        print("Button clicked successfully!")
    except TimeoutException:
        print("Timed out waiting for the button to have the expected background color.")
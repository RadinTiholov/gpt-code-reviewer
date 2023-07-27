from flask import Flask, request, jsonify
from gpt_service import ask_gpt3_question, initialize_driver, open_new_chat, review_code_gpt3

app = Flask(__name__)
driver = None  # Variable to hold the WebDriver instance

@app.route('/gpt/login', methods=['GET'])
def login():
    global driver
    if driver is None:
        driver = initialize_driver()
        return jsonify({"status": "Login successful"})
    else:
        return jsonify({"status": "Already logged in"})

@app.route('/gpt/ask', methods=['POST'])
def ask_question():
    if not request.is_json:
        return jsonify({"error": "Invalid request. JSON payload expected."}), 400

    question = request.json.get('question')
    
    if not question:
        return jsonify({"error": "Question parameter is missing."}), 400

    if driver is None:
        return jsonify({"error": "Please log in first."}), 401

    try:
        response = ask_gpt3_question(driver, question)

        # Open new chat
        open_new_chat(driver)
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/gpt/review', methods=['POST'])
def review_question():
    if not request.is_json:
        return jsonify({"error": "Invalid request. JSON payload expected."}), 400

    question = request.json.get('question')
    code = request.json.get('code')

    if not question or not code:
        return jsonify({"error": "Both 'question' and 'code' parameters are required."}), 400

    if driver is None:
        return jsonify({"error": "Please log in first."}), 401

    try:
        response = review_code_gpt3(driver, question, code)

        # Open new chat
        open_new_chat(driver)
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

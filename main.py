from flask import Flask, render_template, request, jsonify, send_from_directory, session, url_for
from flask import redirect
import joblib
import cv2
import numpy as np
from keras.models import model_from_json
from collections import Counter
import secrets

app = Flask(__name__)

app.secret_key = secrets.token_hex(16)

# Load the SVM model from svm_model.joblib
trained_model = joblib.load(r"C:\\Users\\HP\\Downloads\\DepressionDetection\\trained_model.joblib")


emotion_dict = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"}

# Load JSON and create the emotion detection model
json_file = open('.venv/model/emotion_model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
emotion_model = model_from_json(loaded_model_json)
emotion_model.load_weights(".venv/model/emotion_model.h5")

# Store detected emotions
detected_emotions = []

# Calculate depression score based on selected options
def calculate_depression_score(selected_options):
    option_values = {   
        "I do not feel sad": 0,
        "I feel sad": 1,
        "I am sad all the time and I can't snap out of it": 2,
        "I am so sad and unhappy that I can't stand it": 3,
        "I am not particularly discouraged about the future": 0,
        "I feel discouraged about the future": 1,
        "I feel I have nothing to look forward to": 2,
        "I feel the future is hopeless and that things cannot improve": 3,
        "I do not feel like a failure": 0,
        "I feel I have failed more than the average person": 1,
        "As I look back on my life, all I can see is a lot of failures": 2,
        "I feel I am a complete failure as a person": 3,
        "I get as much satisfaction out of things as I used to": 0,
        "I don't enjoy things the way I used to": 1,
        "I don't get real satisfaction out of anything anymore": 2,
        "I am dissatisfied or bored with everything": 3,
        "I don't feel particularly guilty": 0,
        "I feel guilty a good part of the time": 1,
        "I feel quite guilty most of the time": 2,
        "I feel guilty all of the time": 3,
        "I don't feel I am being punished": 0,
        "I feel I may be punished": 1,
        "I expect to be punished": 2,
        "I feel I am being punished": 3,
        "I don't feel disappointed in myself": 0,
        "I am disappointed in myself": 1,
        "I am disgusted with myself": 2,
        "I hate myself": 3,
        "I don't feel I am any worse than anybody else": 0,
        "I am critical of myself for my weaknesses or mistakes": 1,
        "I blame myself all the time for my faults": 2,
        "I blame myself for everything bad that happens": 3,
        "I don't have any thoughts of killing myself": 0,
        "I have thoughts of killing myself, but I would not carry them out": 1,
        "I would like to kill myself": 2,
        "I would kill myself if I had the chance": 3,
        "I don't cry any more than usual": 0,
        "I cry more now than I used to": 1,
        "I cry all the time now": 2,
        "I used to be able to cry, but now I can't cry even though I want to": 3,
        "I am no more irritated by things than I ever was": 0,
        "I am slightly more irritated now than usual": 1,
        "I am quite annoyed or irritated a good deal of the time": 2,
        "I feel irritated all the time": 3,
        "I have not lost interest in other people": 0,
        "I am less interested in other people than I used to be": 1,
        "I have lost most of my interest in other people": 2,
        "I have lost all of my interest in other people": 3,
        "I make decisions about as well as I ever could": 0,
        "I put off making decisions more than I used to": 1,
        "I have greater difficulty in making decisions more than I used to": 2,
        "I can't make decisions at all anymore": 3,
        "I don't feel that I look any worse than I used to": 0,
        "I am worried that I am looking old or unattractive": 1,
        "I feel there are permanent changes in my appearance that make me look unattractive": 2,
        "I believe that I look ugly": 3,
        "I can work about as well as before": 0,
        "It takes an extra effort to get started at doing something": 1,
        "I have to push myself very hard to do anything": 2,
        "I can't do any work at all": 3,
        "I can sleep as well as usual": 0,
        "I don't sleep as well as I used to": 1,
        "I wake up 1-2 hours earlier than usual and find it hard to get back to sleep": 2,
        "I wake up several hours earlier than I used to and cannot get back to sleep": 3,
        "I don't get more tired than usual": 0,
        "I get tired more easily than I used to": 1,
        "I get tired from doing almost anything": 2,
        "I am too tired to do anything": 3,
        "My appetite is no worse than usual": 0,
        "My appetite is not as good as it used to be": 1,
        "My appetite is much worse now": 2,
        "I have no appetite at all anymore": 3,
        "I haven't lost much weight, if any, lately": 0,
        "I have lost more than five pounds": 1,
        "I have lost more than ten pounds": 2,
        "I have lost more than fifteen pounds": 3,
        "I am no more worried about my health than usual": 0,
        "I am worried about physical problems like aches, pains, upset stomach, or constipation": 1,
        "I am very worried about physical problems and it's hard to think of much else": 2,
        "I am so worried about my physical problems that I cannot think of anything else": 3,
        "I have not noticed any recent change in my interest in sex": 0,
        "I am less interested in sex than I used to be": 1,
        "I have almost no interest in sex": 2,
        "I have lost interest in sex completely": 3
    }

    # Calculate the depression score based on the selected options
    depression_score = sum(option_values.get(options, 0) for options in selected_options)
    return depression_score

selected_options = []

# Route for depression detection
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/depressionque')
def depressionque():
    return render_template('depressionque.html')

@app.route('/signin')
def singin():
    return render_template('signin.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/faq')
def faq():
    return render_template('faq.html')

@app.route('/about_us')
def about_us():
    return render_template('about_us.html')

# Route for starting emotion detection
@app.route('/start_emotion_detection')
def start_emotion_detection_route():
    # Start emotion detection
    print("Emotion detection started")
    session['emotion_detection_active'] = True
    start_emotion_detection()
    return jsonify({'status': 'success'})

# Route for stopping emotion detection
@app.route('/stop_emotion_detection')
def stop_emotion_detection_route():
    # Stop emotion detection
    session['emotion_detection_active'] = False
    return jsonify({'status': 'success'})

@app.route('/submit_selected_options', methods=['POST'])
def submit_selected_options():
    data = request.get_json()
    selected_options = data.get('selectedOptions', [])
    print("Selected options:", selected_options)  # Add this line
    session['selected_options'] = selected_options
    depression_score = calculate_depression_score(selected_options)
    print("Depression score:", depression_score)  # Add this line
    # Redirect to the result page with the depression score
    return redirect(url_for('result', depression_score=depression_score))

# Function to start emotion detection
def start_emotion_detection():
    # Start the webcam feed
    cap = cv2.VideoCapture(0)

    while session.get('emotion_detection_active', False):
        ret, frame = cap.read()

        if not ret or frame is None:
            break

        frame = cv2.resize(frame, (1280, 720))

        face_detector = cv2.CascadeClassifier('.venv/haarcascades/haarcascade_frontalface_default.xml')
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        num_faces = face_detector.detectMultiScale(gray_frame, scaleFactor=1.3, minNeighbors=5)

        for (x, y, w, h) in num_faces:
            cv2.rectangle(frame, (x, y - 50), (x + w, y + h + 10), (0, 255, 0), 4)
            roi_gray_frame = gray_frame[y:y + h, x:x + w]
            cropped_img = np.expand_dims(np.expand_dims(cv2.resize(roi_gray_frame, (48, 48)), -1), 0)

            emotion_prediction = emotion_model.predict(cropped_img)
            max_index = int(np.argmax(emotion_prediction))

            detected_emotions.append(max_index)

            cv2.putText(frame, str(max_index), (x + 5, y - 20), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2,
                        cv2.LINE_AA)

        cv2.imshow('Emotion Detection', frame)

        key = cv2.waitKey(1)
        # Press 'q' to stop emotion detection
        if key & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    
# Route for displaying the result
@app.route('/result')
def result():
    global detected_emotions
    selected_options = session.get('selected_options', [])
    
    # Calculate depression score based on selected options using the trained model
    depression_score = trained_model.predict([selected_options])[0]
    print("Depression score:", depression_score)  # Add this line

    # Check if depression_score is None, set it to 0 if it is
    if depression_score is None:
        depression_score = 0
    
    # Stop emotion detection
    session['emotion_detection_active'] = False

    # Calculate the most common emotion
    most_common_emotion = None
    if detected_emotions:
        emotion_dict = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"}
        most_common_emotion_index = Counter(detected_emotions).most_common(1)[0][0]
        most_common_emotion = emotion_dict.get(most_common_emotion_index, "Unknown")

    return render_template('result.html', depression_score=depression_score, most_common_emotion=most_common_emotion)


# Define routes for other pages
@app.route('/symptoms')
def symptoms():
    global selected_options
    depression_score = trained_model.predict([selected_options])[0]
    return render_template('symptoms.html', depression_score=depression_score)

@app.route('/causes')
def causes():
    global selected_options
    depression_score = trained_model.predict([selected_options])[0]
    return render_template('causes.html', depression_score=depression_score)

@app.route('/lifestyle_changes')
def lifestyle_changes():
    return render_template('lifestyle_changes.html')

@app.route('/information')
def information():
    return render_template('information.html')

@app.route('/calming_video')
def calming_video():
    return render_template('calming_video.html')

@app.route('/static/videos/<path:filename>')
def download_file(filename):
    return send_from_directory('static/videos', filename)

# Route for displaying the most common emotion
@app.route('/most_common_emotion')
def most_common_emotion():
    global detected_emotions, emotion_dict
    if detected_emotions:
        emotion_dict = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"}
        most_common_emotion_index = Counter(detected_emotions).most_common(1)[0][0]
        most_common_emotion_label = emotion_dict.get(most_common_emotion_index, "Unknown")
        return f"The most common emotion detected: {most_common_emotion_label}"
    else:
        return "No emotions detected."

if __name__ == '__main__':
    app.run(debug=True, port=5001)

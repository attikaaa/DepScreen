let currentQuestion = 1;
let selectedOptions = [];

// Define the new questions and options
const newQuestions = [
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5",
    "Question 6",
    "Question 7",
    "Question 8",
    "Question 9",
    "Question 10",
    "Question 11",
    "Question 12",
    "Question 13",
    "Question 14",
    "Question 15",
    "Question 16",
    "Question 17",
    "Question 18",
    "Question 19",
    "Question 20",
    "Question 21"
];

const newOptions = {
    0: ["I do not feel sad", "I feel sad", "I am sad all the time and I can't snap out of it", "I am so sad and unhappy that I can't stand it"],
    1: ["I am not particularly discouraged about the future", "I feel discouraged about the future", "I feel I have nothing to look forward to", "I feel the future is hopeless and that things cannot improve"],
    2: ["I do not feel like a failure", "I feel I have failed more than the average person", "As I look back on my life, all I can see is a lot of failures", "I feel I am a complete failure as a person"],
    3: ["I get as much satisfaction out of things as I used to", "I don't enjoy things the way I used to", "I don't get real satisfaction out of anything anymore", "I am dissatisfied or bored with everything"],
    4: ["I don't feel particularly guilty", "I feel guilty a good part of the time", "I feel quite guilty most of the time", "I feel guilty all of the time"],
    5: ["I don't feel I am being punished", "I feel I may be punished", "I expect to be punished", "I feel I am being punished"],
    6: ["I don't feel disappointed in myself", "I am disappointed in myself", "I am disgusted with myself", "I hate myself"],
    7: ["I don't feel I am any worse than anybody else", "I am critical of myself for my weaknesses or mistakes", "I blame myself all the time for my faults", "I blame myself for everything bad that happens"],
    8: ["I don't have any thoughts of killing myself", "I have thoughts of killing myself, but I would not carry them out", "I would like to kill myself", "I would kill myself if I had the chance"],
    9: ["I don't cry any more than usual", "I cry more now than I used to", "I cry all the time now", "I used to be able to cry, but now I can't cry even though I want to"],
    10: ["I am no more irritated by things than I ever was", "I am slightly more irritated now than usual", "I am quite annoyed or irritated a good deal of the time", "I feel irritated all the time"],
    11: ["I have not lost interest in other people", "I am less interested in other people than I used to be", "I have lost most of my interest in other people", "I have lost all of my interest in other people"],
    12: ["I make decisions about as well as I ever could", "I put off making decisions more than I used to", "I have greater difficulty in making decisions more than I used to", "I can't make decisions at all anymore"],
    13: ["I don't feel that I look any worse than I used to", "I am worried that I am looking old or unattractive", "I feel there are permanent changes in my appearance that make me look unattractive", "I believe that I look ugly"],
    14: ["I can work about as well as before", "It takes an extra effort to get started at doing something", "I have to push myself very hard to do anything", "I can't do any work at all"],
    15: ["I can sleep as well as usual", "I don't sleep as well as I used to", "I wake up 1-2 hours earlier than usual and find it hard to get back to sleep", "I wake up several hours earlier than I used to and cannot get back to sleep"],
    16: ["I don't get more tired than usual", "I get tired more easily than I used to", "I get tired from doing almost anything", "I am too tired to do anything"],
    17: ["My appetite is no worse than usual", "My appetite is not as good as it used to be", "My appetite is much worse now", "I have no appetite at all anymore"],
    18: ["I haven't lost much weight, if any, lately", "I have lost more than five pounds", "I have lost more than ten pounds", "I have lost more than fifteen pounds"],
    19: ["I am no more worried about my health than usual", "I am worried about physical problems like aches, pains, upset stomach, or constipation", "I am very worried about physical problems and it's hard to think of much else", "I am so worried about my physical problems that I cannot think of anything else"],
    20: ["I have not noticed any recent change in my interest in sex", "I am less interested in sex than I used to be", "I have almost no interest in sex", "I have lost interest in sex completely"]
};

const option_values = {   
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

// Function to stop emotion detection
function stopEmotionDetection() {
    $.get("/stop_emotion_detection")
    .done(function(data) {
        console.log("Emotion Detection Stopped");
    })
    .fail(function(xhr, status, error) {
        console.error("Error stopping emotion detection:", error);
    });
}

// Function to start emotion detection
async function startEmotionDetection() {
    // Make an AJAX request to start emotion detection
    await $.get("/start_emotion_detection", function (data) {
        console.log("Emotion Detection Started");
    });
}

function displayQuestion() {
    console.log("displayQuestion() called");

    // Clear previous options
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = '';

    // Display current question
    const currentQuestionText = newQuestions[currentQuestion - 1];
    document.getElementById("questionNumber").textContent = currentQuestionText;

    // Add options for the current question
    const currentOptions = newOptions[currentQuestion - 1];
    currentOptions.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.textContent = option;
        optionElement.classList.add('option'); // Add a class for styling
        if (selectedOptions[currentQuestion - 1] === index) {
            optionElement.classList.add('selected'); // Add 'selected' class if the option is selected
        }
        optionElement.addEventListener("click", () => selectOption(index)); // Add event listener to select option
        optionsContainer.appendChild(optionElement);
    });

    // Start emotion detection when displaying the first question
    if (currentQuestion === 1) {
        startEmotionDetection();
    }

    // Show "Next" button until the 20th question, then show "Submit" button on the 21st question
    if (currentQuestion < 21) {
        document.getElementById("nextButton").style.display = 'block';
        document.getElementById("submitButton").style.display = 'none';
    } else {
        document.getElementById("nextButton").style.display = 'none';
        document.getElementById("submitButton").style.display = 'block';
    }
}


// Function to handle option selection
function selectOption(index) {
    selectedOptions[currentQuestion - 1] = index; // Save the index of the selected option
    const options = document.querySelectorAll('.option');
    options.forEach((option) => {
        option.classList.remove('selected');
    });
    const selectedOption = options[index];
    selectedOption.classList.add('selected');
}

function saveSelectedOptions() {
    // Make an AJAX request to save selected options on the server
    $.ajax({
        url: '/save_selected_options',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ selectedOptions: selectedOptions }),
        success: function (response) {
            // Get the depression score from the response
            const depressionScore = response.depressionScore;

            // Do something with the depression score, such as displaying it or using it for further actions
            console.log('Depression Score:', depressionScore);
        },
        error: function (xhr, status, error) {
            console.error('Error saving selected options:', error);
        }
    });
}

// Function to handle the next button click
function nextQuestion() {
    const selectedOption = selectedOptions[currentQuestion - 1];
    if (selectedOption !== undefined) {
        if (currentQuestion < newQuestions.length) {
            currentQuestion++;
            displayQuestion();
        } else {
            stopEmotionDetection(); // Stop emotion detection after the last question
            document.getElementById("questionCard").style.display = 'none';
            document.getElementById("resultContainer").style.display = 'block';
            calculateScore();
        }
    } else {
        alert("Please select an option before moving to the next question.");
    }
}

function calculateScore() {
    let score = 0;
    selectedOptions.forEach((optionIndex) => {
        const selectedOption = newOptions[currentQuestion - 1][optionIndex]; // Get the selected option text
        score += option_values[selectedOption]; // Access the corresponding value from option_values
    });
    return score; // Return the calculated score
}

window.addEventListener("beforeunload", function(event) {
    // Clear selectedOptions when the page is unloaded
    selectedOptions = [];
});

function submitQuestions() {
    // Calculate the depression score
    const score = calculateScore();

    // Clear selected options
    selectedOptions = [];

    // Stop emotion detection
    stopEmotionDetection();

    // Navigate to the result page with the depression score
    window.location.href = '/result.html?depression_score=' + score;
}


window.onload = function() {
    // Add event listener to the submit button
    document.getElementById("submitButton").addEventListener("click", submitQuestions);
    
    // Display the first question and start emotion detection
    displayQuestion();
    startEmotionDetection();
};



function openVideoWindow(videoName) {
    // Replace 'videos' with your actual folder name
    var videoFolder = "/static/videos/"; // Change this path as needed
    var videoUrl = videoFolder + videoName;

    // Open a new window with the selected video, centered on the screen
    var windowWidth = 800; // Width of the video window
    var windowHeight = 600; // Height of the video window
    var windowLeft = (window.screen.width - windowWidth) / 2;
    var windowTop = (window.screen.height - windowHeight) / 2;

    var newWindow = window.open(videoUrl, "_blank", "width=" + windowWidth + ", height=" + windowHeight + ", left=" + windowLeft + ", top=" + windowTop);
    
    // Make the video play in fullscreen mode
    if (newWindow.document.exitFullscreen) {
        newWindow.document.documentElement.requestFullscreen();
    } else if (newWindow.document.mozRequestFullScreen) { /* Firefox */
        newWindow.document.documentElement.mozRequestFullScreen();
    } else if (newWindow.document.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        newWindow.document.documentElement.webkitRequestFullscreen();
    } else if (newWindow.document.msRequestFullscreen) { /* IE/Edge */
        newWindow.document.documentElement.msRequestFullscreen();
    }
}

function startRandomVideo() {
    // List of video filenames
    var videoNames = [
        "Serenity Slumber_ Guided Meditation for Deep Sleep _ SolaceMindscape.mp4",
        "guided.mp4",
        "Radiate Joy_ Guided Gratitude Meditation for Daily Happiness.mp4",
        "Relax Your Body & Your Mind ~ 5 Minute Guided Meditation.mp4",
        "Digital Detox Guided Meditation _ Find Serenity in Nature's Embrace.mp4",
        "Guided Meditation for Healing_ Navigating Emptiness & Lost Moments.mp4",
        "Awaken Your Dreams_ A Guided Meditation for the Law of Attraction.mp4",
        "A 5 Minute Mindful Meditation.mp4",
        "5-Minute Meditation You Can Do Anywhere.mp4",
        "5-minute Guided Mediation with Jon Kabat-Zinn _ MasterClass.mp4",
        "5 Minute Meditation to Clear Your Mind.mp4"
    ]; // Add more video filenames as needed

    // Choose a random video from the list
    var randomIndex = Math.floor(Math.random() * videoNames.length);
    var randomVideoName = videoNames[randomIndex];

    // Start playing the randomly selected video
    openVideoWindow(randomVideoName);
}

let currentQuestion = 1;
let selectedOptions = [];
let lastQuestion = false;

// pool of questions
const allQuestions = [
    "I have least interest in other affairs.",
    "I do not have sound sleep.",
    "I am hopeless about the future.",
    "I feel tired all the time.",
    "I feel irritated all the time.",
    "I seldom attend the parties.",
    "I feel dejected all the time.",
    "I am disgusted with myself all the time.",
    "I feel, I am worse than anybody else.",
    "I think of killing myself all the time",
    "I am always worried about my health.",
    "I can never take a decision.",
    "I have lost interest in people.",
    "I don't bother about people.",
    "Once I wake up, it is hard to get back to sleep.",
    "I feel that my future is in the dark.",
    "I can't work as long as I used to do.",
    "I feel that I should take some energy tonic to continue working.",
    "I get irritated more easily than I used to.",
    "I love to spend more and more time in my own world of fantasies.",
    "Once I am dejected, it is hard to overcome.",
    "I am disappointed with my physique.",
    "I blame myself for my faults.",
    "I love to hurt myself when I find myself to be guilty.",
    "I am worried about upset stomach or constipation.",
    "I feel difficulty in taking a decision.",
    "I take others' help while taking a decision.",
    "I wake up several times at night.",
    "I have nothing to look forward.",
    "Even the minute things irritate me.",
    "I escape from relatives and friends.",
    "Whether it is at home or outside, nobody listens to me.",
    "I hate myself when I see a fair-complexioned person.",
    "I feel that I am responsible for all that happens around me.",
    "I hurt myself rather than others when I am annoyed.",
    "Headache upsets me very much.",
    "I feel trouble while breathing.",
    "It is very hard for me to decide all alone.",
    "I remain alike in joy and sorrow.",
    "I often dream while sleeping.",
    "I feel that everything is useless.",
    "It is difficult for me to work more than an hour.",
    "It is hard for me to tolerate anything.",
    "Once I get excited, it is hard to cool down.",
    "I never share my joys with others.",
    "I feel dejected when youngsters misbehave.",
    "I hate myself when I fail in my attempts.",
    "I am critical of myself for my weakness.",
    "I think of killing myself when I meet failure.",
    "For me, the nearest or the dearest doesn't have any sense.",
    "I have to wake up several times at night.",
    "I have the least interest in others' affairs.",
    "I dislike myself when I find that others are superior to me.",
    "I feel that I am the most foolish person in the world.",
    "I think of killing myself when I face shame.",
    "I feel a lump in the throat.",
    "I am least interested in making friends.",
    "I see wild dreams while sleeping.",
    "I often get up at night during sleep.",
    "I feel that living is a burden.",
    "I depend on people to get my work completed.",
    "I am becoming more and more irritated day by day.",
    "I don't comment on others' affairs.",
    "I don't like to make friends.",
    "I am disappointed with my memory.",
    "I blame myself for my failure.",
    "I hurt myself rather than accusing others.",
    "I like to kill myself rather than being blamed.",
    "I am worried about my dizzy future.",
    "It takes too long for me to take a decision.",
    "I don't have any interest in making intimacy with people.",
    "I am not interested to know the outcome of my work.",
    "I am too tired to do anything.",
    "I don't even think of my elders when I get irritated.",
    "For me, dejection is no worse than an enemy.",
    "I am disgusted with my intelligence.",
    "I am critical of myself for my behavior.",
    "I put off making decisions more than I used to.",
    "Pains in the heart or chest upsets me.",
    "I feel uneasiness among the relatives.",
    "I murmur while sleeping.",
    "I think that I am a burden for others.",
    "My working capacity is much worse now.",
    "I try to escape things that irritate me.",
    "I escape from giving suggestions to people even if I am asked to do so.",
    "I overcome dejection when people pacify me.",
    "I am dejected with my fortune.",
    "I blame myself for the unhappiness.",
    "I love to kill myself when I am surrounded by a problem.",
    "I feel weakness while walking.",
    "I escape from taking decisions."
];

// Shuffle the array to randomize the order of questions
const shuffledQuestions = shuffleArray(allQuestions);

// Select the first 25 questions from the shuffled array
const selectedQuestions = shuffledQuestions.slice(0, 25);

    // Function to start emotion detection
    async function startEmotionDetection() {
        // Make an AJAX request to start emotion detection
        await $.get("/start_emotion_detection", function (data) {
            console.log("Emotion Detection Started");
        });

        // Present the first question
        updateQuestion();
    }

    function selectOption(optionValue) {
        selectedOptions[currentQuestion - 1] = optionValue;
    
        console.log('Selected option:', optionValue);
    
        if (currentQuestion < selectedQuestions.length) {
            currentQuestion++;
            updateQuestion();
        } else {
            if (currentQuestion === selectedQuestions.length) {
                stopEmotionDetection();
                sendSelectedOptionsToServer();
                return;
            }
        }
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
    

    // Automatically start emotion detection and present the first question
    startEmotionDetection();


    // Function to send selected options to the server
    function sendSelectedOptionsToServer() {
        return new Promise((resolve, reject) => {
            fetch('/save_selected_options', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selectedOptions }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Selected options sent to server:', data);
                if (currentQuestion === selectedQuestions.length) {
                    stopEmotionDetection();
                    redirectToResultPage(); // Redirect to result page after the last question
                }
                resolve();
            })
            .catch(error => {
                console.error('Error sending selected options:', error);
                reject(error);
            });
        });
    }

    function redirectToResultPage() {
        window.location.href = "/result";
    }

    function updateQuestion() {
        const questionNumberElement = document.getElementById('questionNumber');
        const questionTextElement = document.getElementById('questionText');

        questionNumberElement.innerText = `Question ${currentQuestion}`;
        questionTextElement.innerText = getQuestionText(currentQuestion);
    }

    function getQuestionText(questionNumber) {
        return allQuestions[questionNumber - 1];
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to start emotion detection
    function startEmotionDetection() {
        fetch('/start_emotion_detection', { method: 'GET' })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error starting emotion detection:', error));
    }

    // Function to stop emotion detection
    function stopEmotionDetection() {
        fetch('/stop_emotion_detection', { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                console.log("Emotion Detection Stopped", data);
            })
            .catch(error => console.error('Error stopping emotion detection:', error));
    }


    // Initialize the first question
    updateQuestion();

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
    
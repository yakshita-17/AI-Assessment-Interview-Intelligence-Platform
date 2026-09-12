// ====================
// AI ASSESSMENT
// ====================


// ====================
// QUANTITATIVE APTITUDE
// ====================

let quantitativeQuestions = [

    {
        question: "What is 25 + 35?",
        options: ["50", "60", "70", "80"],
        answer: 1
    },

    {
        question: "What is 20% of 200?",
        options: ["20", "30", "40", "50"],
        answer: 2
    },

    {
        question: "If a pen costs ₹10, how much do 5 pens cost?",
        options: ["₹40", "₹50", "₹60", "₹70"],
        answer: 1
    },

    {
        question: "What is 12 × 5?",
        options: ["50", "60", "70", "80"],
        answer: 1
    },

    {
        question: "What is 100 ÷ 4?",
        options: ["20", "25", "30", "40"],
        answer: 1
    }
];


// ====================
// LOGICAL REASONING
// ====================

let logicalQuestions = [

    {
        question: "Find the next number: 2, 4, 6, 8, ?",
        options: ["9", "10", "11", "12"],
        answer: 1
    },

    {
        question: "Find the odd one out.",
        options: ["Apple", "Mango", "Carrot", "Banana"],
        answer: 2
    },

    {
        question: "If CAT is coded as DBU, how is DOG coded?",
        options: ["EPH", "EOG", "DPH", "FQI"],
        answer: 0
    },

    {
        question: "Find the next number: 5, 10, 15, 20, ?",
        options: ["22", "24", "25", "30"],
        answer: 2
    },

    {
        question: "Which one does not belong?",
        options: ["Circle", "Square", "Triangle", "Apple"],
        answer: 3
    }
];


// ====================
// VERBAL ABILITY
// ====================

let verbalQuestions = [

    {
        question: "Choose the synonym of 'Happy'.",
        options: ["Sad", "Joyful", "Angry", "Tired"],
        answer: 1
    },

    {
        question: "Choose the antonym of 'Hot'.",
        options: ["Warm", "Cold", "Heat", "Fire"],
        answer: 1
    },

    {
        question: "Choose the correctly spelled word.",
        options: [
            "Beautifull",
            "Beautiful",
            "Beutiful",
            "Beautifool"
        ],
        answer: 1
    },

    {
        question: "Fill in the blank: She ___ to school every day.",
        options: ["go", "goes", "going", "gone"],
        answer: 1
    },

    {
        question: "Choose the noun in this sentence: 'The boy plays football.'",
        options: ["plays", "the", "boy", "football"],
        answer: 2
    }
];


let currentAssessmentQuestion = 0;
let assessmentScore = 0;
let assessmentTimeLeft = 60;
let assessmentTimer;

function startAssessment() {
    currentAssessmentQuestion = 0;
    assessmentScore = 0;
    assessmentTimeLeft = 60;

    startAssessmentTimer();
    showAssessmentQuestion();

    document.getElementById("assessmentBox").scrollIntoView({
        behavior: "smooth"
    });
}

function startAssessmentTimer() {

    clearInterval(assessmentTimer);

    assessmentTimer = setInterval(function () {

        assessmentTimeLeft--;

        const timer = document.getElementById("assessmentTimer");

        if (timer) {
            timer.innerText =
                "Time Left: " + assessmentTimeLeft + " seconds";
        }

        if (assessmentTimeLeft <= 0) {

            clearInterval(assessmentTimer);

            showAssessmentResult();
        }

    }, 1000);
}

function showAssessmentQuestion() {
    const q = assessmentQuestions[currentAssessmentQuestion];
    const box = document.getElementById("assessmentBox");

    if (!box) {
        alert("Assessment box not found.");
        return;
    }
box.innerHTML = `
    <h3 id="assessmentTimer">
        Time Left: ${assessmentTimeLeft} seconds
    </h3>

    <h3>
        Question ${currentAssessmentQuestion + 1}
        of ${assessmentQuestions.length}
    </h3>

        <h2>${q.question}</h2>

        ${q.options.map((option, index) => `
            <button onclick="checkAssessmentAnswer(${index})">
                ${option}
            </button>
            <br><br>
        `).join("")}
    `;
}

function checkAssessmentAnswer(selectedAnswer) {

    if (
        selectedAnswer ===
        assessmentQuestions[currentAssessmentQuestion].answer
    ) {
        assessmentScore++;
    }

    currentAssessmentQuestion++;

    if (currentAssessmentQuestion < assessmentQuestions.length) {
        showAssessmentQuestion();
    } else {
        showAssessmentResult();
    }
}

function showAssessmentResult() {

    clearInterval(assessmentTimer);

    const box = document.getElementById("assessmentBox");

    const percentage =
        (assessmentScore / assessmentQuestions.length) * 100;
        localStorage.setItem("assessmentScore", percentage);
    const scoreDisplay =
    document.getElementById("assessmentScoreDisplay");

if (scoreDisplay) {
    scoreDisplay.innerText =
        percentage.toFixed(0) + "%";
}

    let performance;

    if (percentage >= 80) {
        performance = "Excellent performance! 🎉";
    } else if (percentage >= 60) {
        performance = "Good performance! 👍";
    } else {
        performance = "Keep practicing! 💪";
    }

    box.innerHTML = `
        <h2>Assessment Completed 🎉</h2>

        <h3>
            Score:
            ${assessmentScore} / ${assessmentQuestions.length}
        </h3>

        <h3>
            Percentage: ${percentage}%
        </h3>

        <p>${performance}</p>

        <button onclick="startAssessment()">
            Try Again
        </button>
        `;
        // Send assessment score to FastAPI backend
    fetch("http://127.0.0.1:8000/assessment?score=" + Math.round(percentage), {
        method: "POST"
    })
    .then(response => response.json())
    .then(data => {
        console.log("Backend response:", data);
    })
    .catch(error => {
        console.error("Backend error:", error);
    });

}

// ====================
// AI INTERVIEW
// ====================

const interviewQuestions = [
    "Tell me about yourself.",
    "Why are you interested in this role?",
    "What are your strengths and weaknesses?",
    "Tell me about a project you have worked on.",
    "Where do you see yourself in five years?"
];

let currentInterviewQuestion = 0;
let interviewAnswers = [];

function startInterview() {

    currentInterviewQuestion = 0;
    interviewAnswers = [];

    showInterviewQuestion();
}

function showInterviewQuestion() {

    const box = document.getElementById("interviewBox");

    if (!box) {
        alert("Interview box not found.");
        return;
    }

    const question =
        interviewQuestions[currentInterviewQuestion];

    box.innerHTML = `
        <h3>AI Interview</h3>

        <p>
            Question ${currentInterviewQuestion + 1}
            of ${interviewQuestions.length}
        </p>

        <h2>${question}</h2>

        <textarea
            id="interviewAnswer"
            placeholder="Type your answer here..."
            rows="6">
        </textarea>

        <br><br>

        <button onclick="submitInterviewAnswer()">
            Submit Answer
        </button>
    `;
}
function submitInterviewAnswer() {

    const answerBox = document.getElementById("interviewAnswer");

    if (!answerBox) {
        alert("Answer box not found.");
        return;
    }

    const answer = answerBox.value.trim();

    if (answer === "") {
        alert("Please enter your answer.");
        return;
    }

    currentInterviewQuestion++;

    if (currentInterviewQuestion < interviewQuestions.length) {
        showInterviewQuestion();
    } else {
        finishInterview();
    }
}
async function finishInterview() {

    const box = document.getElementById("interviewBox");

    box.innerHTML = `
        <h2>Evaluating Your Interview...</h2>
        <p>Please wait while AI analyzes your performance 🤖</p>
    `;

    try {

        const response = await fetch("http://127.0.0.1:8000/interview", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                answers: []
            })
        });

        if (!response.ok) {
            throw new Error("Interview API failed");
        }

        const data = await response.json();

        const score = data.score;

        localStorage.setItem("interviewScore", score);

        let feedback;

        if (score >= 90) {
            feedback = "Excellent interview performance! 🎉";
        } 
        else if (score >= 75) {
            feedback = "Good performance. Keep improving your answers.";
        } 
        else {
            feedback = "You can improve your interview performance with more practice.";
        }

        box.innerHTML = `
            <h2>Interview Completed 🎉</h2>

            <h3>Your Interview Score: ${score}/100</h3>

            <p>${feedback}</p>

            <h3>Performance Areas</h3>

            <p>Communication: Good</p>
            <p>Technical Knowledge: Good</p>
            <p>Confidence: Good</p>

            <button onclick="startInterview()">
                Start Again
            </button>
        `;

    } catch (error) {

        console.error("Interview Error:", error);

        box.innerHTML = `
            <h2>Interview Completed 🎉</h2>

            <p>Unable to connect to the AI Interview server.</p>

            <p>Please make sure your FastAPI backend is running.</p>

            <button onclick="startInterview()">
                Try Again
            </button>
        `;
    }
}


function startCategoryAssessment(category) {

    if (category === "Quantitative Aptitude") {
        assessmentQuestions = [...quantitativeQuestions];
    }

    else if (category === "Logical Reasoning") {
        assessmentQuestions = [...logicalQuestions];
    }

    else if (category === "Verbal Ability") {
        assessmentQuestions = [...verbalQuestions];
    }

    startAssessment();
}

async function updateDashboard() {

    try {

        const assessmentResponse = await fetch(
            "http://127.0.0.1:8000/assessment/latest"
        );

        const interviewResponse = await fetch(
            "http://127.0.0.1:8000/interview/latest"
        );

        const assessmentData = await assessmentResponse.json();
        const interviewData = await interviewResponse.json();

        const assessmentScore = assessmentData.score;
        const interviewScore = interviewData.score;

        const assessmentDisplay =
            document.getElementById("assessmentScoreDisplay");

        const interviewDisplay =
            document.getElementById("interviewScoreDisplay");

        const overallDisplay =
            document.getElementById("overallPerformance");

        if (assessmentScore !== null && assessmentDisplay) {
            assessmentDisplay.innerText =
                Number(assessmentScore).toFixed(0) + "%";
        }

        if (interviewScore !== null && interviewDisplay) {
            interviewDisplay.innerText =
                Number(interviewScore).toFixed(0) + "%";
        }

        if (
            assessmentScore !== null &&
            interviewScore !== null &&
            overallDisplay
        ) {

            const overallScore =
                (Number(assessmentScore) +
                Number(interviewScore)) / 2;

            overallDisplay.innerText =
                "Overall Score: " +
                overallScore.toFixed(0) +
                "%";
        }

    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );
    }
}
window.onload = updateDashboard;
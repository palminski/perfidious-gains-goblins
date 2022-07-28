const buttonStart = document.querySelector('.button');
const questPage = document.querySelector('.quiz-quest');
const timer = document.querySelector('.timer');
let globalIndex = 0;
// Begin of questions list
const questions = [
    { 
        "title": "Which of the following keywords is used to define a variable in Javascript?",
        "options": ["var", "let", "both var and let", "none of the above"],
        "answer": "both var and let"
    },
    { 
        "title": "Javascript is an _______ language?",
        "options": ["object-oriented", "object-based", "procedural", "none of the above"],
        "answer": "object-oriented"
    },
    { 
        "title": "Upon encountering empty statements, what does the Javascript Interpreter do?",
        "options": ["throws an error", "ignores the statements", "gives a warning", "none of the above"],
        "answer": "ignores the statements"
    },
    { 
        "title": "What keyword is used to check whether a given property is valid or not?",
        "options": ["in", "is in", "exists", "lies"],
        "answer": "in"
    },
    {
        "title": "When an operator’s value is NULL, the type of returned by the unary operator is:",
        "options": ["boolean", "unidefined", "object", "integer"],
        "answer": "object"
    },
    { 
        "title": "What does the Javascript “debugger” statement do?",
        "options": ["it will debug the errors in the program at runtime", "it will act as a breakpoint in a program", "it will debug error in the current statement if any", "all the above"],
        "answer": "it will act as a breakpoint in a program"
    },
    { 
        "title": "Which function is used to serialize an object into a JSON string in Javascript?",
        "options": ["stringify()", "parse()", "convert()", "none of the above"],
        "answer": "stringify()"
    },
    { 
        "title": "Which of the following are closures in Javascript?",
        "options": ["variables", "functions", "objects", "all the above"],
        "answer": "all the above"
    },
    { 
        "title": "Which of the following is not a Javascript framework?",
        "options": ["node", "vue", "react", "cassandra"],
        "answer": "cassandra"
    },
    { 
        "title": "Which of the following keywords is used to define a variable in Javascript?",
        "options": ["var", "let", "both var and let", "none of the above"],
        "answer": "both var and let"
    },
]

// Start of starter Function 
buttonStart.addEventListener('click', ()=>{
    const startPage = document.querySelector('.starter-page')
    // hide starter page 
    startPage.style.display = 'none';
    // display questions page
    questPage.style.display = 'block';
    // set timer
    
    displayQuest();
})

function displayQuest(){
    let titleQuest = document.createElement('h2');
    titleQuest.classList.add('title-h2')
    // adding question to h2 element //
    titleQuest.textContent = questions[globalIndex].title;  
    // adding h2 element to parent div //
    questPage.appendChild(titleQuest);
    let optionsQuest = document.createElement('div');
    optionsQuest.classList.add('options-div');
    for(let i=0; i<questions[globalIndex].options.length; i++){
        let answerButton = document.createElement('button');
        answerButton.classList.add('options-button');
        answerButton.textContent = questions[globalIndex].options[i];
        optionsQuest.appendChild(answerButton);
        answerButton.addEventListener('click', checkAnswer);
    }
    questPage.appendChild(optionsQuest);
}

function checkAnswer(){

}
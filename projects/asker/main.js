function confirmAccess() {
    document.getElementById("confirmbutton").style.backgroundColor = "white";
    document.getElementById("confirmbutton").style.color = "black";
    document.getElementById("confirmbutton").style.cursor = "default";
    $('#launchpad').fadeOut(500, function() {
    $('#main').fadeIn(500);
});
}

function ask() {
    const answers = ["Yes", "No", "Unlikely", "Very Likely", "Extremely Likely", "Yes, With Certainty", "No, Not At All"];
    const random1 = Math.floor(Math.random() * answers.length);

    var questionbox = document.getElementById("questionbox");
    var question = document.getElementById("question");
    var answer = document.getElementById("answer");
    var answerdesc = document.getElementById("answerdesc");

    questionbox.style.display = "none";

    const loadingText = "Thinking";
    let dots = 0;
    let count = 0;
    const maxCycles = Math.floor((Math.random() * 6) + 1);;
    const interval = 350;

    answer.innerHTML = loadingText;
    
    const intervalId = setInterval(() => {
        answer.innerHTML = loadingText + ".".repeat(dots)
    
        if (dots === 3) {
            count++;  
            if (count === maxCycles) {
                clearInterval(intervalId);

                answer.innerHTML = answers[random1];
                answerdesc.innerHTML = `<i>"` + question.value + `"</i>`;
                document.getElementById("retry").style.display = "inline-block";

                return;
            }
        }
    
        dots = (dots + 1) % 4;
    }, interval);
}

function retry() {
    var questionbox = document.getElementById("questionbox");
    var question = document.getElementById("question");
    var answer = document.getElementById("answer");
    var answerdesc = document.getElementById("answerdesc");
    document.getElementById("retry").style.display = "none";
    answer.innerHTML = "Ask a Question";
    answerdesc.innerHTML = "";
    questionbox.style.display = "block";
    question.value = "";
}

function askEnter(event) {
    if (event.keyCode == 13) {
        ask();
    }
}
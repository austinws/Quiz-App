
//When user clicks start button

function startQuiz(){
    $('#start').on('click', function(event){
        renderAQuestion();
    }
    );
}

// Score counter and question number

function updateQuestionAndScore(){
    const html = $(`<ul>
        <li id = "js-answered">Question Number: ${STORE.currentQuestion+1}/${STORE.questions.length}</li>
        <li id = "js-score">Score: ${STORE.score}/${STORE.questions.length}</li>
        </ul>`);
    $(".question-and-score").html(html);
}

// Displays options for current question

function updateOptions (){
    let question = STORE.questions[STORE.currentQuestion];
    for (let i=0; i < question.options.length; i++){
        $('.js-options').append(`<input type = "radio" name = "options" id = "option${i+1}" value = "${question.options[i]}" tabindex= "${i+1}">
        <label for="option${i+1}"> ${question.options[i]} </label> <br/>
        <span id="js-r${i+1}"></span>
        `);
    }
}

// Display the question

function renderAQuestion(){
    let question = STORE.questions[STORE.currentQuestion];
    updateQuestionAndScore();
    const questionHtml = $(`
    <div>
        <form id= "js-questions" class = "question-form">

            <fieldset>
                <div class = "row question">
                    <div class = "col-12">
                        <legend> ${question.question}</legend>
                    </div>
                </div>

                <div class = "row options">
                    <div class = "col-12">
                        <div class = "js-options">
                        </div>
                    </div>
                </div>

                <div class ="row">
                    <div class ="col-12">
                        <button type = "submit" id ="answer" tabindex = "5"> Submit </button>
                        <button type = "button" id = "next-question" tabindex = "6"> Next >></button>
                    </div>
                </div>
            </fieldset>
        </form>
    <div>`);

    $("main").html(questionHtml);
    updateOptions();
    $("#next-question").hide();
}

// Display results and restart quiz

function displayResults (){
    let resultHtml = $(`
    <div class = "results">
        <form id = "js-restart-quiz">
            <fieldset>
                <div class = "row">
                    <div class = "col-12">
                        <legend> Your score is: ${STORE.score}/${STORE.questions.length} </legend>
                    </div>
                </div>

                <div class = "row">
                    <div class = "col-12">
                        <button type = "button" id = "restart"> Restart Quiz </button>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
    `);
    STORE.currentQuestion = 0;
    STORE.score = 0;
    $("main").html(resultHtml);
}

// Checking if at end of questions

function handleQuestions(){
    $('body').on('click','#next-question', (event) => {
        STORE.currentQuestion === STORE.questions.length?displayResults() : renderAQuestion();

    });
}

// Checks right or wrong answer and displays appropriate message

function handleSelectOption() {
  $('body').on("submit",'#js-questions', function(event) {
    event.preventDefault();
    let currentQues = STORE.questions[STORE.currentQuestion];
    let selectedOption = $("input[name=options]:checked").val();
    if (!selectedOption) {
      alert("Choose an option");
      return;
    } 
    let id_num = currentQues.options.findIndex(i => i === selectedOption);
    let id = "#js-r" + ++id_num;
    $('span').removeClass("right-answer wrong-answer");
    if(selectedOption === currentQues.answer) {
      STORE.score++; 
      $(`${id}`).append(`You got it right<br/>`);
      $(`${id}`).addClass("right-answer");
     // $(`${id}`).addClass("correct-image");
    }
    else {
      $(`${id}`).append(`You got it wrong <br/> The answer is "${currentQues.answer}"<br/>`);
      $(`${id}`).addClass("wrong-answer");
    }

    STORE.currentQuestion++;
    $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
    $('#answer').hide();
    $("input[type=radio]").attr('disabled', true);
    $('#next-question').show();
  });
}

// Restart the quiz

function restartQuiz(){
    $('body').on('click', '#restart', (event) =>{
        renderAQuestion();
    });
}

// Overall functions

function handleQuizApp(){
    startQuiz();
    handleQuestions();
    handleSelectOption();
    restartQuiz();
}

$(handleQuizApp);

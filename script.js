const start_btn = document.querySelector(".start_btn")
const exit_btn = document.querySelector(".exit_btn")
const header = document.querySelector('.header')
const quiz_section = document.querySelector(".quiz_section")
const continue_btn = document.querySelector('.continue_btn')
const quizStart = document.querySelector('.quizStart')
const nextBtn = document.querySelector('.nextBtn')
const myOption = document.querySelector('.myOption')
const questionCountNumb = document.querySelector('.questionCountNumb')
const second = document.querySelector('.second')
const timeLine = document.querySelector('.timeLine')
const resultPage = document.querySelector('.resultPage')
const quitQuiz = document.querySelector('.quitQuiz')
const restart = document.querySelector('.restart')

start_btn.addEventListener('click', ()=>{
    quiz_section.classList.add('active');
    header.classList.add('active');
})
exit_btn.addEventListener('click', ()=>{
    quiz_section.classList.remove('active');
    header.classList.remove('active');
})

continue_btn.addEventListener('click', ()=>{
    quizStart.classList.add('active');
    quiz_section.classList.remove('active');
    showQuestion(0)
    QuestionCountNumb(0)
    timer(15)
    runLine(0)
})
let questionCount = 0;
let timeCount;
let nextBtnTimer = 15;
let lineRun;
let RunLine = 0;
let userScore = 0;
function timer(timeCount){
    secondCount = setInterval(countSecond, 1000)
    function countSecond(){
            second.innerHTML = timeCount;
            timeCount--;
            if(timeCount<9){
                second.innerHTML = "0"+ second.innerHTML
            }
            if(timeCount < 0){
               clearInterval(secondCount)
            }
    }
}
function runLine(time){
    line = setInterval(lineGo,40)
    function lineGo(){
        time++
        timeLine.style.width = time + "px";
        if(time > 350){
            clearInterval(line)
        }
    }
}
nextBtn.addEventListener('click',()=>{
    if( questionCount < questions.length -1){
        questionCount++;
        showQuestion(questionCount);
        QuestionCountNumb(questionCount);
    }else{
        showResultPage()
    }
    clearInterval(secondCount)
    timer(nextBtnTimer)
    clearInterval(line)
    runLine(RunLine)
    nextBtn.style.display = 'none'
})
function showQuestion(index){
    let quizQuestion = document.querySelector('.quizQuestion')
    quizQuestion.textContent = `${questions[index].numb}. ${questions[index].question}`;
    let optionTag = `<div class="option">${questions[index].options[0]}</div>
                     <div class="option">${questions[index].options[1]}</div>
                     <div class="option">${questions[index].options[2]}</div>
                     <div class="option">${questions[index].options[3]}</div>`;
    myOption.innerHTML = optionTag
    const option = document.querySelectorAll('.option')
    for( let i = 0; i < option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this)')
    }
}
function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = myOption.children.length
    if(userAnswer == correctAnswer){
        userScore +=1;
        answer.classList.add('correct')
    }else{
        answer.classList.add('incorrect')
        for( let i = 0; i < allOptions; i++){
            if(myOption.children[i].textContent == correctAnswer){
                myOption.children[i].setAttribute('class','option correct')
            }
        }
    }
    for( let i = 0; i < allOptions; i++){
        myOption.children[i].classList.add('disable')
    }
    clearInterval(secondCount)
    clearInterval(line)
    nextBtn.style.display = 'block'
}
function QuestionCountNumb(index){
    questionCountNumb.textContent = `${questions[index].numb} of 5 Questions`;
}
function showResultPage(){
    resultPage.classList.add('active')
    quizStart.classList.remove('active');
    const score = document.querySelector('.result')
    let scoreTag = `<div class="result"><p>You got ${userScore} out of 5</p></div>` 
    score.innerHTML = scoreTag
}
quitQuiz.onclick = ()=>{
    window.location.reload();
}
restart.onclick = ()=>{
    window.location.reload();
}

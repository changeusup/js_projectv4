const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
	{
		question: '기후 변화가 어떻게 꿀벌에게 질병을 악화시키나요?',
		choice1: '새롭고 더 강한 질병을 만든다',
		choice2: '기생충이 들어올 수 있습니다',
		choice3: '꿀벌의 출생률에 해를 끼칩니다',
		choice4: '질병이 퍼지기 쉬워집니다',
		answer: 4,
	},
	{
		question: '꿀벌이 세계 식량 생산을 담당하는 비율은 얼마입니까?',
		choice1: '22%',
		choice2: '10%',
		choice3: '35%',
		choice4: '17%',
		answer: 3,
	},
	{
		question: '현재 꿀벌을 해치고 있는 침입종은 무엇입니까?',
		choice1: '벌집꼬마밑빠진벌레',
		choice2: '장수말벌',
		choice3: '참새',
		choice4: '곰',
		answer: 1,
	},
	{
		question: '농약은 꿀벌에게 나쁜 이유는 무엇입니까?',
		choice1: '꿀벌의 번식력을 감소시킵니다.',
		choice2: '식물과 꽃가루를 포화시켜 벌이 먹으려 할 때 중독시킵니다.',
		choice3: '강제로 꿀벌이 다른 지역으로 이동하게 만듭니다.',
		choice4: '꿀벌을 이상하게 행동하게 만듭니다.',
		answer: 2,
	},
	{
		question: '꿀벌집의 감소를 설명하는 현상은 무엇입니까?',
		choice1: '벌집 악화 현상',
		choice2: '여왕벌의 죽음 현상',
		choice3: '일벌 바이러스',
		choice4: '군집 붕괴 현상',
		answer: 4,
	},
	{
		question: '온도 상승이 꿀벌의 건강에 어떤 영향을 미칩니까?',
		choice1: '꿀벌은 열에 민감하고 죽을 수 있습니다',
		choice2: '꿀벌의 크기를 작게 만들고 더 짧은 거리를 비행합니다.',
		choice3: '벌들이 더 시원한 지역으로 이동한다',
		choice4: '1, 2, 3 다',
		answer: 4,
	},
	{
		question: '꿀벌집들의 현재 문제는 무엇입니까?',
		choice1: '도시화로 인해 많은 꿀벌이 떠나고 있습니다.',
		choice2: '벌이 불타고 있습니다.',
		choice3: '꿀벌은 도시에 적응해야 합니다.',
		choice4: '꿀벌이 자신의 영역을 더 방어하도록 강요합니다.',
		answer: 1,
	},
	{
		question: '기후 변화는 꿀벌의 꽃에 어떤 영향을 미칩니까?',
		choice1: '특정 꽃을 꿀벌에게 해롭게 만듭니다.',
		choice2: '꽃이 전혀 자라지 않게 합니다.',
		choice3: '그것은 꽃을 몇 주 또는 몇 달 더 일찍 피게 하고 더 짧은 기간 동안만 피게 합니다.',
		choice4: '꽃은 이제 질병이나 기생충을 옮길 수 있습니다.',
		answer: 3,
	},
	{
		question: '꿀벌을 구하기 위해 정부는 무엇을 할 수 있습니까?',
		choice1: '2, 3, 4 다',
		choice2: '살충제 사용을 줄이거나 금지한다.',
		choice3: '꿀벌이 번성할 수 있는 안식처를 만든다.',
		choice4: '꿀벌이 번성할 수 있는 안식처를 만든다.',
		answer: 1,
	},
	{
		question: '꿀벌은 농부와 농업을 어떻게 돕습니까?',
		choice1: '꿀벌은 작물의 해충을 막을 수 있습니다.',
		choice2: '꿀벌은 농작물을 수분시켜 자라게 하고 품질을 향상시킵니다.',
		choice3: '농부는 꿀벌에게 음식을 제공합니다.',
		choice4: '동물과 벌이 어울리기 때문입니다.',
		answer: 2,
	},

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
	questionCounter = 0
	score = 0
	availableQuestions = [...questions]
	getNewQuestion()
}

getNewQuestion = () => {
	if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
		localStorage.setItem('mostRecentScore', score)

		return window.location.assign('end.html')
	}

	questionCounter++
	progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
	progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

	const questionsIndex = 0
	currentQuestion = availableQuestions[questionsIndex]
	question.innerText = currentQuestion.question

	choices.forEach(choice => {
		const number = choice.dataset['number']
		choice.innerText = currentQuestion['choice' + number]
	})

	availableQuestions.splice(questionsIndex, 1)

	acceptingAnswers = true
}

choices.forEach(choice => {
	choice.addEventListener('click', e => {
		if(!acceptingAnswers) return

			acceptingAnswers = false
		const selectedChoice = e.target
		const selectedAnswer = selectedChoice.dataset['number']

		let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'


		if(!currentQuestion.answer){
			document.getElementById("reaction").style.backgroundImage = "url('thumbsup.gif')";
			
		}else{
			document.getElementById("reaction").style.backgroundImage = "url('thumbsdown.gif')";
			
		}

		if(classToApply === 'correct') {
			incrementScore(SCORE_POINTS)
			action("correct");	
		}else{
			action("incorrect");
		}
		//selectedChoice.parentElement.classList.add(classToApply)

		// setTimeout(() => {
		// 	selectedChoice.parentElement.classList.remove(classToApply)
		// 	getNewQuestion()
		// }, 1000)

		//반응코드
		
	})
})

function action(result){
	if(result == "correct"){
		reaction.innerHTML = "맞았습니다!!";
		reaction.style.backgroundImage = "url('thumbsup.gif')";	
		document.getElementById("reaction").style.color = 'green'		
		
	}else{
		reaction.innerHTML = "틀렸습니다!!";
		document.getElementById("reaction").style.color = 'red'
		if(questionCounter == 1){
			reaction.style.backgroundImage = "url('bee1.png')";			
		}else if(questionCounter ==2){
			reaction.style.backgroundImage = "url('bee2.png')";			
		}else if(questionCounter == 3){
			reaction.style.backgroundImage = "url('bee3.png')";			
		}else if(questionCounter == 4){
			reaction.style.backgroundImage = "url('bee4.png')";			
		}else if(questionCounter == 5){
			reaction.style.backgroundImage = "url('bee5.png')";			
		}else if(questionCounter == 6){
			reaction.style.backgroundImage = "url('bee6.png')";			
		}else if(questionCounter == 7){
			reaction.style.backgroundImage = "url('bee10.png')";			
		}else if(questionCounter == 8){
			reaction.style.backgroundImage = "url('bee7.png')";			
		}else if(questionCounter == 9){
			reaction.style.backgroundImage = "url('bee8.png')";			
		}else if(questionCounter == 10){
			reaction.style.backgroundImage = "url('bee9.png')";			
		}	
	}
	reaction.style.display = "block";
}

document.getElementById("reaction").onclick = function(){
	this.style.display = "none";
	getNewQuestion();
}


incrementScore = num => {
	score +=num
	scoreText.innerText = score
}

startGame()







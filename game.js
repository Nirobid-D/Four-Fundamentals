document.getElementById('operation').addEventListener('change', function () {
    const operation = this.value;
    document.getElementById('addendsGroup').style.display = operation === 'add' ? 'block' : 'none';
    document.getElementById('subtrahendsGroup').style.display = operation === 'subtract' ? 'block' : 'none';
    document.getElementById('digitsFactorGroup').style.display = operation === 'multiply' ? 'block' : 'none';
    document.getElementById('digitsDividendGroup').style.display = operation === 'divide' ? 'block' : 'none';
});

function generateQuestions() {
    const numQuestions = parseInt(document.getElementById('numQuestions').value);
    const operation = document.getElementById('operation').value;
    const questionsContainer = document.getElementById('questions');
    questionsContainer.innerHTML = ''; // Clear previous questions

    for (let i = 1; i <= numQuestions; i++) {
        let questionText;
        switch (operation) {
            case 'add':
                questionText = `${i}. ${generateAdditionQuestion()}`;
                break;
            case 'subtract':
                questionText = `${i}. ${generateSubtractionQuestion()}`;
                break;
            case 'multiply':
                questionText = `${i}. ${generateMultiplicationQuestion()}`;
                break;
            case 'divide':
                questionText = `${i}. ${generateDivisionQuestion()}`;
                break;
        }

        const question = document.createElement('div');
        question.className = 'question';
        question.innerHTML = `<p>${questionText}</p><input type="text" class="answer" data-answer="${getAnswer(questionText)}" />`;
        questionsContainer.appendChild(question);
    }
}

function getAnswer(questionText) {
    const [left, operator, right] = questionText.split(/[\s=]/).slice(1, 4);
    const num1 = parseFloat(left);
    const num2 = parseFloat(right);

    switch (operator) {
        case '+':
            return (num1 + num2).toFixed(2);
        case '-':
            return (num1 - num2).toFixed(2);
        case 'x':
            return (num1 * num2).toFixed(2);
        case '÷':
            return (num1 / num2).toFixed(2);
        default:
            return '';
    }
}

function checkAnswers() {
    const inputs = document.querySelectorAll('.answer');
    inputs.forEach(input => {
        const correctAnswer = input.dataset.answer;
        const userAnswer = parseFloat(input.value).toFixed(2);
        if (userAnswer === correctAnswer) {
            input.className = 'answer correct';
        } else {
            input.className = 'answer incorrect';
        }
    });
}

function generateAdditionQuestion() {
    const numAddends = parseInt(document.getElementById('numAddends').value);
    const numDigits = parseInt(document.getElementById('numDigits').value);
    let addends = [];
    
    for (let i = 0; i < numAddends; i++) {
        addends.push(getRandomNumber(numDigits));
    }
    
    return addends.join(' + ') + ' = ?';
}

function generateSubtractionQuestion() {
    const numSubtrahends = parseInt(document.getElementById('numSubtrahends').value);
    const numDigits = parseInt(document.getElementById('numDigits').value);
    let minuends = [];
    
    for (let i = 0; i < numSubtrahends; i++) {
        minuends.push(getRandomNumber(numDigits));
    }
    
    return minuends.join(' - ') + ' = ?';
}

function generateMultiplicationQuestion() {
    const numDigitsFactor1 = parseInt(document.getElementById('numDigitsFactor1').value);
    const numDigitsFactor2 = parseInt(document.getElementById('numDigitsFactor2').value);
    const factor1 = getRandomNumber(numDigitsFactor1);
    const factor2 = getRandomNumber(numDigitsFactor2);
    return `${factor1} x ${factor2} = ?`;
}

function generateDivisionQuestion() {
    const numDigitsDividend = parseInt(document.getElementById('numDigitsDividend').value);
    const numDigitsDivisor = parseInt(document.getElementById('numDigitsDivisor').value);
    const dividend = getRandomNumber(numDigitsDividend);
    const divisor = getRandomNumber(numDigitsDivisor);
    return `${dividend} ÷ ${divisor} = ?`;
}

function getRandomNumber(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

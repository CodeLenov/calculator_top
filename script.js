// !!! 1. Declarate variables and Initialize the program !!!
// !!! 2. Get Input from keyboard and HTML buttons !!!
// !!! 3. Calculate !!!
// !!! 4. Output !!!

// ----------------------------------------------------------------------
// !!! 1. Declarate variables and Initialize the program !!!

const divOutput = document.querySelector("#divOutput");

const digits = document.querySelectorAll(".digits");

const add = document.querySelector('#add');
const subtract = document.querySelector('#subtract');
const multiply = document.querySelector('#multiply');
const divide = document.querySelector('#divide');

const percent = document.querySelector('#percent');
const square = document.querySelector('#square');
const radical = document.querySelector('#radical');
const exponent = document.querySelector('#exponent');
const modulo = document.querySelector('#modulo');
const pi = document.querySelector('#pi');
const tau = document.querySelector('#tau');

const undo = document.querySelector("#undo");
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");

let result = 0; // operation: '0 + ...' is equal 0 and doesn't change next calculate. But it need for normal FIRST calculate
let operator = '+'; // operation: '0 + ...' is equal 0 and doesn't change next calculate. But it need for normal FIRST calculate
let inputNumber = '';

getInput(); // initialize the program

//    do document.addEventListener('keyup') for equals and operators (because normal innerHTML for operators)
// <=16 digit input and output (round)
// add buttons M+ and Mclean

// ----------------------------------------------------------------------
// !!! 2. Get Input from keyboard and HTML buttons !!!

function getInput() {

	document.addEventListener('keydown', (b) => {
		if (b.key == '.') {inputNumber += b.key; outputInputNumber();}
		else if (b.key == '0') {inputNumber += b.key; outputInputNumber();}
		else if (b.key == '1') {inputNumber += b.key; outputInputNumber();}
		else if (b.key == '2') {inputNumber += b.key; outputInputNumber();}
		else if (b.key == '3') {inputNumber += b.key; outputInputNumber();}
		else if (b.key == '4') {inputNumber += b.key; outputInputNumber();}
		else if (b.key == '5') {inputNumber += b.key; outputInputNumber();}
		else if (b.key == '6') {inputNumber += b.key; outputInputNumber();}
		else if (b.key == '7') {inputNumber += b.key; outputInputNumber();}
		else if (b.key == '8') {inputNumber += b.key; outputInputNumber();}
		else if (b.key == '9') {inputNumber += b.key; outputInputNumber();}
		else if (b.key == '+') {calculateResult(); operator = '+';}
		else if (b.key == '-') {calculateResult(); operator = '-';}
		else if (b.key == '*') {calculateResult(); operator = '*';}
		else if (b.key == '/') {calculateResult(); operator = '/';}
		else if (b.key == '%') {calculatePercent();}
		else if (b.key == 's') {calculateSquare();}
		else if (b.key == 'r') {calculateRadical();}
		else if (b.key == '^') {calculateResult(); operator = '^';}
		else if (b.key == 'm') {calculateResult(); operator = 'm';}
		else if (b.key == 'p') {calculatePi();}
		else if (b.key == 't') {calculateTau();}		
		else if (b.key == 'Backspace') {makeUndo();}
		else if (b.key == 'Delete') {makeClear();}
		else if (b.key == 'Enter') {calculateResult(); operator = '+', inputNumber = '';}
	});

	digits.forEach(function(b) {
		b.addEventListener('click', () => {inputNumber += b.value; outputInputNumber();});
	});

	add.addEventListener('click', () => {calculateResult(); operator = '+';});
	subtract.addEventListener('click', () => {calculateResult(); operator = '-';});
	multiply.addEventListener('click', () => {calculateResult(); operator = '*';});
	divide.addEventListener('click', () => {calculateResult(); operator = '/';});

	percent.addEventListener('click', calculatePercent);
	square.addEventListener('click', calculateSquare);
	radical.addEventListener('click', calculateRadical);
	exponent.addEventListener('click', () => {calculateResult(); operator = '^';});
	modulo.addEventListener('click', () => {calculateResult(); operator = 'm';});
	pi.addEventListener('click', calculatePi);
	tau.addEventListener('click', calculateTau);

	undo.addEventListener('click', makeUndo);
	clear.addEventListener('click', makeClear);
	equals.addEventListener('click', () => {calculateResult(); operator = '+', inputNumber = '';});

}

// ----------------------------------------------------------------------
// !!! 3. Calculate !!!

function calculatePercent() {
	divOutput.innerHTML = inputNumber.slice(-16); // restrict maximal length divOutput
	inputNumber = (+result / 100) * +inputNumber; // calculate procent;
	inputNumber = Math.round((+inputNumber + Number.EPSILON) * 10000) / 10000; // round long decimals
	outputCalculateNumber();
}

function calculateSquare() {
	divOutput.innerHTML = inputNumber.slice(-16); // restrict maximal length divOutput
	inputNumber = +inputNumber * +inputNumber;
	outputCalculateNumber();
}

function calculateRadical() {
	inputNumber = Math.sqrt(+inputNumber);
	inputNumber = Math.round((+inputNumber + Number.EPSILON) * 10000) / 10000; // round long decimals
	outputCalculateNumber();
}

function calculatePi() {
	inputNumber = 3.1416;
	outputCalculateNumber();
}

function calculateTau() {
	inputNumber = 6.2832;
	outputCalculateNumber();
}

function makeUndo() {
	inputNumber = inputNumber.slice(0, -1);
	divOutput.innerHTML = inputNumber;
}

function makeClear() {
	result = 0;
	operator = '+';
	inputNumber = '';
	divOutput.innerHTML = '';
}

function calculateResult() {

	if (operator === '+') {
		result = +result + +inputNumber;
		outputResult();
	} else if (operator === '-') {
		result = +result - +inputNumber;
		outputResult();
	} else if (operator === '*') {
		result = +result * +inputNumber;
		outputResult();
	} else if (operator === '/') {
		result = +result / +inputNumber;
		outputResult();
	} else if (operator === '^') {
		inputNumber = Math.pow(+result, +inputNumber);
		outputCalculateNumber();
		result = 0;
		operator = '+';
	} else if (operator === 'm') {
		inputNumber = +result % +inputNumber;
		outputCalculateNumber();
		result = 0;
		operator = '+';
	}

}

// ----------------------------------------------------------------------
// !!! 4. Output !!!

function limitOutputNumber() {
	inputNumber = '' + inputNumber;
	if (inputNumber.length > 12) {
		inputNumber = inputNumber.toExponential(12);
	}
}

function outputInputNumber() {
	inputNumber = inputNumber.slice(0, 16); // restrict maximal length input
	divOutput.style.color = `#555`; // change color for input digits
	divOutput.innerHTML = inputNumber;
}

function outputResult() {
	result = '' + result;
	result = result.slice(0, 16); // restrict maximal length output
	divOutput.style.color = `#222`;
	divOutput.innerHTML = result;
	inputNumber = ''; // for new input
}

function outputCalculateNumber() {
	limitOutputNumber();
	divOutput.style.color = `#222`;
	divOutput.innerHTML = inputNumber;
}

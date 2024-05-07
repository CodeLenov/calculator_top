// !!! 1. Declarate variables and Initialize the program !!!
// !!! 2. Get input from keyboard and HTML buttons !!!
// !!! 3. Calculate and Output !!!

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

let result = 0; // FIRST operation: '0 + ...' is equal 0 and doesn't change next calculate
let operator = '+'; // FIRST operation: '0 + ...' is equal 0 and doesn't change next calculate
let inputNumber = '';

getInput(); // initialize the program

//    do document.addEventListener('keyup') for equals and operators (because normal innerHTML for operators)
// <=16 digit input and output (round)

// add buttons M+ and Mclean

// ----------------------------------------------------------------------
// !!! 2. Get input from keyboard and HTML buttons !!!

function getInput() {

	document.addEventListener('keydown', (b) => {
		if (b.key == '.') {b.value = '.'; getKeyInput();}
		else if (b.key == '0') {b.value = '0'; getKeyInput();}
		else if (b.key == '1') {b.value = '1'; getKeyInput();}
		else if (b.key == '2') {b.value = '2'; getKeyInput();}
		else if (b.key == '3') {b.value = '3'; getKeyInput();}
		else if (b.key == '4') {b.value = '4'; getKeyInput();}
		else if (b.key == '5') {b.value = '5'; getKeyInput();}
		else if (b.key == '6') {b.value = '6'; getKeyInput();}
		else if (b.key == '7') {b.value = '7'; getKeyInput();}
		else if (b.key == '8') {b.value = '8'; getKeyInput();}
		else if (b.key == '9') {b.value = '9'; getKeyInput();}
		else if (b.key == '+') {b.value = '+'; calculateResult(); operator = '+';}
		else if (b.key == '-') {b.value = '-'; calculateResult(); operator = '-';}
		else if (b.key == '*') {b.value = '*'; calculateResult(); operator = '*';}
		else if (b.key == '/') {b.value = '/'; calculateResult(); operator = '/';}
		else if (b.key == '%') {b.value = '%'; calculatePercent();}
		else if (b.key == 's') {b.value = 's'; calculateSquare();}
		else if (b.key == 'r') {b.value = '\u221A'; calculateRadical();}
		else if (b.key == '^') {b.value = '^'; calculateResult(); operator = '^';}
		else if (b.key == 'm') {b.value = 'm'; calculateResult(); operator = 'm';}
		else if (b.key == 'p') {b.value = '\u03C0'; calculatePi();}
		else if (b.key == 't') {b.value = '\u03C4'; calculateTau();}		
		else if (b.key == 'Backspace') {b.value = ''; makeUndo();}
		else if (b.key == 'Delete') {b.value = ''; makeClear();}
		else if (b.key == 'Enter') {b.value = '='; calculateResult();}
		else {b.value = ''}

		function getKeyInput() { // inner function in document.addEventListener
			inputNumber += b.value;
			outputInputNumber();
		}

	});

	digits.forEach(function(b) {
		b.addEventListener('click', () => { // inner function in digits./forEach/addEventListener
			inputNumber += b.value;
			outputInputNumber();
		});
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
	equals.addEventListener('click', calculateResult);	

}

// ----------------------------------------------------------------------
// !!! 3. Calculate and Output !!!

function outputInputNumber() {
	inputNumber = inputNumber.slice(0, 16); // restrict maximal length input
	divOutput.style.color = `#555`; // change color for input digits
	divOutput.innerHTML = inputNumber;
}

function calculatePercent() {
	divOutput.style.color = `#555`; // change color for input
	divOutput.innerHTML = inputNumber.slice(-16); // restrict maximal length divOutput
	inputNumber = (+result / 100) * +inputNumber; // calculate procent;
	inputNumber = Math.round((+inputNumber + Number.EPSILON) * 10000) / 10000; // round long decimals
	divOutput.innerHTML = inputNumber;
}

function calculateSquare() {
	divOutput.style.color = `#555`; // change color for input
	divOutput.innerHTML = inputNumber.slice(-16); // restrict maximal length divOutput
	inputNumber = +inputNumber * +inputNumber;
	divOutput.innerHTML = inputNumber;
}

function calculateRadical() {
	divOutput.style.color = `#555`; // change color for input
	inputNumber = Math.sqrt(+inputNumber);
	inputNumber = Math.round((+inputNumber + Number.EPSILON) * 10000) / 10000; // round long decimals
	divOutput.innerHTML = inputNumber;
}

function calculatePi() {
	inputNumber = 3.1416;
	divOutput.style.color = `#555`; // change color for 
	divOutput.innerHTML = inputNumber;
}

function calculateTau() {
	inputNumber = 6.2832;
	divOutput.style.color = `#555`; // change color for
	divOutput.innerHTML = inputNumber;	
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
	} else if (operator === 'm') {
		inputNumber = +result % +inputNumber;
		outputCalculateNumber();
	}

}

function outputResult() {
	result = '' + result;
	result = result.slice(0, 16); // restrict maximal length output
	divOutput.style.color = `#222`;
	divOutput.innerHTML = result;
	inputNumber = ''; // for new input
}

function outputCalculateNumber() {
	inputNumber = '' + inputNumber;
	inputNumber = inputNumber.slice(0, 16); // restrict maximal length input
	divOutput.style.color = `#222`;
	divOutput.innerHTML = inputNumber;
	result = 0;
	operator = '+';
}

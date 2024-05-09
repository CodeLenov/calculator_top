// !!! 1. Declarate variables and Initialize the program !!!
// !!! 2. Get Input from keyboard and HTML buttons !!!
// !!! 3. Calculate !!!
// !!! 4. Limit output !!!
// !!! 5. Output !!!

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

const memoryInput = document.querySelector('#memoryInput');
const memoryOutput = document.querySelector('#memoryOutput');
const undo = document.querySelector("#undo");
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");

let result = 0; // operation: '0 + ...' is equal 0 and doesn't change next calculate. But it need for normal FIRST calculate
let operator = '+'; // operation: '0 + ...' is equal 0 and doesn't change next calculate. But it need for normal FIRST calculate
let inputNumber = '';
let memory = '';

getInput(); // initialize the program

// add functional buttons M+ and Mclean - for keyboard and HTML buttons
//    do document.addEventListener('keyup') for equals and operators (because normal innerHTML for operators)
//maybe clear value in HTML
// maybe add functional for second press (keyboard and button) equals

// ----------------------------------------------------------------------
// !!! 2. Get Input from keyboard and HTML buttons !!!

function getInput() {

	document.addEventListener('keydown', (b) => {
		if (b.key == '.') {inputNumber += b.key; outputInput();}
		else if (b.key == '0') {inputNumber += b.key; outputInput();}
		else if (b.key == '1') {inputNumber += b.key; outputInput();}
		else if (b.key == '2') {inputNumber += b.key; outputInput();}
		else if (b.key == '3') {inputNumber += b.key; outputInput();}
		else if (b.key == '4') {inputNumber += b.key; outputInput();}
		else if (b.key == '5') {inputNumber += b.key; outputInput();}
		else if (b.key == '6') {inputNumber += b.key; outputInput();}
		else if (b.key == '7') {inputNumber += b.key; outputInput();}
		else if (b.key == '8') {inputNumber += b.key; outputInput();}
		else if (b.key == '9') {inputNumber += b.key; outputInput();}
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
		else if (b.key == 'ArrowUp') {makeMemoryInput();}
		else if (b.key == 'ArrowDown') {makeMemoryOutput();}
		else if (b.key == 'Backspace') {makeUndo();}
		else if (b.key == 'Delete') {makeClear();}
		else if (b.key == 'Enter') {calculateResult(); operator = '+', inputNumber = '';}
	});

	digits.forEach(function(b) {
		b.addEventListener('click', () => {inputNumber += b.value; outputInput();});
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

	memoryInput.addEventListener('click', makeMemoryInput);
	memoryOutput.addEventListener('click', makeMemoryOutput);
	undo.addEventListener('click', makeUndo);
	clear.addEventListener('click', makeClear);
	equals.addEventListener('click', () => {calculateResult(); operator = '+', inputNumber = '';});

}

// ----------------------------------------------------------------------
// !!! 3. Calculate !!!
// calculate is simple but it is in function format - because use both keyboard an HTML button

function calculatePercent() {
	inputNumber = (+result / 100) * +inputNumber;
	outputNumber();
}

function calculateSquare() {
	inputNumber = +inputNumber * +inputNumber;
	outputNumber();
}

function calculateRadical() {
	inputNumber = Math.sqrt(+inputNumber);
	outputNumber();
}

function calculatePi() {
	inputNumber = 3.14159265358979;
	outputNumber();
}

function calculateTau() {
	inputNumber = 6.28318530717958;
	outputNumber();
}

function makeMemoryInput() {
	memory = divOutput.innerHTML; // because we can store (input) 'inputNumber' OR 'result'
}

function makeMemoryOutput() {
	inputNumber = memory;
	outputNumber();
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
		outputNumber();
		result = 0;
		operator = '+';
	} else if (operator === 'm') {
		inputNumber = +result % +inputNumber;
		outputNumber();
		result = 0;
		operator = '+';
	}

}

// ----------------------------------------------------------------------
// !!! 4. Limit output !!!

function limitNumber() {
	// 16 digits if positive value and 15 digits if negative value - because one place for '-'
	if ( (inputNumber > 9999999999999999) || (inputNumber < -999999999999999) ) {
		inputNumber = inputNumber.toExponential(10); // compare value - so doesn't need change type
	} else {
		inputNumber = '' + inputNumber; // compare length - so need change integer (float) type to string type
		if (inputNumber.length > 15) {inputNumber = inputNumber.substring(0, 16);}
	}
}

function limitResult() {
	// 16 digits if positive value and 15 digits if negative value - because one place for '-'
	if ( (result > 9999999999999999) || (result < -999999999999999) ) {
		result = result.toExponential(10); // compare value - so doesn't need change type
	} else {
		result = '' + result; // compare length - so need change integer (float) type to string type
		if (result.length > 15) {result = result.substring(0, 16);}
	}
}

// ----------------------------------------------------------------------
// !!! 5. Output !!!

function outputInput() {
	inputNumber = inputNumber.slice(0, 16); // restrict maximal length input
	divOutput.style.color = `#555`; // change color for input digits
	divOutput.innerHTML = inputNumber;
}

function outputResult() {
	limitResult();
	divOutput.style.color = `#222`;
	divOutput.innerHTML = result;
	inputNumber = ''; // for new input
}

function outputNumber() {
	limitNumber();
	divOutput.style.color = `#222`;
	divOutput.innerHTML = inputNumber;
}

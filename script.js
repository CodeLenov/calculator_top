const divOutput = document.querySelector("#divOutput");
const buttons = document.querySelectorAll(".buttons");

const undo = document.querySelector("#undo");
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");

let result = 0; // FIRST operation: '0 + ...' is equal 0 and doesn't change next calculate
let operator = '+'; // FIRST operation: '0 + ...' is equal 0 and doesn't change next calculate
let inputNumber = '';

getInput(); // initialize the program


//do buttons, e.g. '=', 'undo', 'clear', 'point', 'percent', pi, tau, x^2, x^e, sqrt, mod
//    do document.addEventListener('keyup') for equals and operators (because normal innerHTML for operators)
// <=16 digit input and output (round)
// clean unuse let and const
// add buttons M+ and Mclean

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
		else if (b.key == '%') {b.value = '%'; getKeyInput(); calculateProcent();}
		else if (b.key == '+') {b.value = '+'; calculateResult(); operator = b.value;}
		else if (b.key == '-') {b.value = '-'; calculateResult(); operator = b.value;}
		else if (b.key == '*') {b.value = '*'; calculateResult(); operator = b.value;}
		else if (b.key == '/') {b.value = '/'; calculateResult(); operator = b.value;}
		else if (b.key == 'p') {b.value = '\u03C0'; getKeyInput(); inputNumber = inputNumber.replace(`\u03C0`, '3.1416');}
		else if (b.key == 't') {b.value = '\u03C4'; getKeyInput(); inputNumber = inputNumber.replace(`\u03C4`, `6.2832`);}
		else if (b.key == 'r') {b.value = '\u221A'; getKeyInput(); calculateRoot();}
		else if (b.key == 's') {b.value = 's'; getKeyInput(); calculateSquare();}
		else if (b.key == 'm') {b.value = 'm'; calculateResult(); operator = b.value;}
		else if (b.key == '^') {b.value = '^'; calculateResult(); operator = b.value;}
		else if (b.key == 'Backspace') {b.value = ''; inputNumber = inputNumber.slice(0, -1); getKeyInput();}
		else if (b.key == 'Delete') {b.value = ''; inputNumber = ''; operator = '+'; result = 0; getKeyInput()}
		else if (b.key == 'Enter') {b.value = '='; calculateResult();}
		else {b.value = ''}

		function getKeyInput() {
			inputNumber += b.value;
			divOutput.style.color = `#555`; // change color for input
			divOutput.innerHTML = inputNumber.slice(-16); // restrict maximal length divOutput
		}

	});

	undo.addEventListener('click', () => {
		undo.value = "";
		inputAll = inputAll.slice(0, -1);
	});

	clear.addEventListener('click', () => {
		clear.value = "";
		inputAll = "";
	});

	buttons.forEach(function(b) {

		b.addEventListener('click', () => {
			inputAll += b.value;
			divOutput.style.color = `#555`; // change color for input
			divOutput.innerHTML = inputAll.slice(-16); // restrict maximal length divOutput
		});

	});

	equals.addEventListener('click', calculateResult);	

}

function calculateProcent() {
	inputNumber = inputNumber.slice(0, -1); // remove percent sign
	inputNumber = (+result / 100) * +inputNumber; // calculate procent;
	inputNumber = Math.round((inputNumber + Number.EPSILON) * 100) / 100; // round long decimals
	divOutput.innerHTML = inputNumber;
}

function calculateSquare() {
	inputNumber = inputNumber.slice(0, -1); // remove round sign
	inputNumber = +inputNumber * +inputNumber;
	divOutput.innerHTML = inputNumber;
}

function calculateRoot() {
	inputNumber = inputNumber.slice(0, -1); // remove round sign
	inputNumber = Math.sqrt(+inputNumber);
	divOutput.innerHTML = inputNumber;
}

function calculateModulo() {
	inputNumber = inputNumber.slice(0, -1); // remove round sign
	inputNumber = +result % +inputNumber;
	divOutput.innerHTML = inputNumber;
}

function calculateResult() {

	if (operator === '+') {
		result = +result + +inputNumber;
	} else if (operator === '-') {
		result = +result - +inputNumber;
	} else if (operator === '*') {
		result = +result * +inputNumber;
	} else if (operator === '/') {
		result = +result / +inputNumber;
	} else if (operator === '^') {
		result = Math.pow(+result, +inputNumber);
	} else if (operator === 'm') {
		result = +result % +inputNumber;
		console.log(30, result);
		console.log(40, inputNumber);
		console.log(50, operator);
	}
		
	divOutput.style.color = `#222`;
	divOutput.innerHTML = result;

	inputNumber = '';

	if (operator === '^') {
		operator = '+';
	}

	if (operator === 'm') {
		operator = '+'; 
	}
}

/*
function calculateResult() {

	inputAll = inputAll.slice(0, -1); // for remove equals/operator sign from input string
console.log(700, inputAll);
	inputAll = inputAll.replace(`\u03C0`, `3.14`); // if 'pi' button
	inputAll = inputAll.replace(`\u03C4`, `3.14 * 2`); // if 'tau' button

	if (/\%/.test(inputAll) === true) {
		const percentAll = inputAll.slice(0, -1); // for remove equals sign and percent sign) from input string
		const percentArray = percentAll.split(/[^0-9.]/);	
		let percent = +percentArray[0] * (+percentArray[1] / 100);
		// need round long decimals for the next check the length of the data for divOutput
		percent = Math.round((percent + Number.EPSILON) * 100) / 100;
		// need change 'inputArray[1]' on 'percent' for next calculating, because 'replace' work only with first value			
		const lastIndexPercent = inputAll.lastIndexOf(`${percentArray[1]}`); 
		inputAll = inputAll.slice(0, lastIndexPercent) + percent;
	}

	// use regex for recognize operators
	// split array with the operators for get first input number and second input number
	// and change string type (elements of array) on integer type for calculating
	if (/\+/.test(inputAll) === true) {
		/*inputArray = inputAll.split('+');
const inputAllLastIndex = inputAll.lastIndexOf(/[^0-9.]/);
		console.log(701, inputAllLastIndex);
inputArray[0] = inputAll.slice(0, inputAllLastIndex - 1);
inputArray[1] = inputAll.slice(inputAllLastIndex);
console.log(702, inputArray[0]);
console.log(703, inputAllLastIndex[1]);
		result = +inputArray[0] + +inputArray[1];
	} else if (/\-/.test(inputAll) === true) {
		/*inputArray = inputAll.split('-');
		const inputAllLastIndex = inputAll.lastIndexOf(/[^0-9.]/);
		console.log(701, inputAllLastIndex);
inputArray[0] = inputAll.slice(0, inputAllLastIndex - 1);
inputArray[1] = inputAll.slice(inputAllLastIndex);
console.log(702, inputArray[0]);
console.log(703, inputAllLastIndex[1]);
		result = +inputArray[0] - +inputArray[1];
	} else if (/\*//*.test(inputAll) === true) {
		inputArray = inputAll.split('*');
		result = +inputArray[0] * +inputArray[1];
	} else if (/\//.test(inputAll) === true) {
		inputArray = inputAll.split('/');
		result = +inputArray[0] / +inputArray[1];
	} else if (/\u221A/.test(inputAll) === true) { // unicode for JavaScript, not HTML
		inputArray = inputAll.split('\u221A');
		result = Math.sqrt(+inputArray[1]);
	} else if (/\u2036/.test(inputAll) === true) {
		inputArray = inputAll.split('\u2036');
		result = +inputArray[0] * +inputArray[0];
	} else if (/m/.test(inputAll) === true) {
		inputArray = inputAll.split('m');
		result = +inputArray[0] % +inputArray[1];
	} else if (/\^/.test(inputAll) === true) {
		inputArray = inputAll.split('^');
		result = Math.pow(+inputArray[0], +inputArray[1]);
	}
	
	// need round long decimals for the next check the length of the data for divOutput
	result = (Math.round((result + Number.EPSILON) * 100) / 100);

	// also add '' for change 'integer' type on 'string' type- for calculate length
	result = result + '';

	divOutput.style.color = `#222`; // change color for result
	divOutput.innerHTML = result;
		inputAll = '';
	/* // check the length of the data for divOutput
	if ( (inputArray[0].length < 16) && (inputArray[1].length < 16) && (result.length < 16) ) {
		divOutput.innerHTML = result;
		inputAll = ''; // clean for new input
	} else {
		divOutput.innerHTML = 'so much long...>16'
		inputAll = ''; // clean for new input
	} 

}
*/
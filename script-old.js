const divOutput = document.querySelector("#divOutput");
const buttons = document.querySelectorAll(".buttons");

const undo = document.querySelector("#undo");
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");

let inputAll = ""; // all inputs (e.g. numbers and operators) are the string
let inputArray = []; // for 'inputAll' array
let result = '';

getInput(); // initialize the program

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
		else if (b.key == '%') {b.value = '%'; getKeyInput();}
		else if (b.key == '+') {b.value = '+'; getKeyInput();}
		else if (b.key == '-') {b.value = '-'; getKeyInput();}
		else if (b.key == '*') {b.value = '*'; getKeyInput();}
		else if (b.key == '/') {b.value = '/'; getKeyInput();}
		else if (b.key == 'p') {b.value = '\u03C0'; getKeyInput();}
		else if (b.key == 't') {b.value = '\u03C4'; getKeyInput();}
		else if (b.key == 'r') {b.value = '\u221A'; getKeyInput();}
		else if (b.key == 's') {b.value = '\u2036'; getKeyInput();}
		else if (b.key == 'm') {b.value = 'm'; getKeyInput();}
		else if (b.key == 'e') {b.value = '^'; getKeyInput();}
		else if (b.key == 'Backspace') {b.value = ''; makeUndo();}
		else if (b.key == 'Delete') {b.value = ''; inputAll = ""; getKeyInput();}
		else if (b.key == 'Enter') {b.value = '='; inputAll += b.value; calculateResult();}
		else {b.value = ''}

		function getKeyInput() { // inner function in document.addEventListener
			inputAll += b.value;
			divOutput.style.color = `#555`; // change color for input
			divOutput.innerHTML = inputAll.slice(-16); // restrict maximal length divOutput
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

function calculateResult() {

	inputAll = inputAll.slice(0, -1); // for remove equals sign from input string

	inputAll = inputAll.replace(`\u03C0`, `3.14`); // if 'pi' button
	inputAll = inputAll.replace(`\u03C4`, `3.14 * 2`); // if 'tau' button

	if (/\%/.test(inputAll) === true) {
		const percentAll = inputAll.slice(0, -1); // for remove equals sign and percent sign) from input string
		const percentArray = percentAll.split(/[^0-9.]/);	
		let percent = +percentArray[0] * (+percentArray[1] / 100);
		// need round long decimals for the next check the length of the data for divOutput
		percent = Math.round((percent + Number.EPSILON) * 100) / 100;
		// need change 'inputArray[1]' on 'percent' for next calculating, because 'replace' work only with first value			
		const lastIndex = inputAll.lastIndexOf(`${percentArray[1]}`); 
		inputAll = inputAll.slice(0, lastIndex) + percent;
	}

	// use regex for recognize operators
	// split array with the operators for get first input number and second input number
	// and change string type (elements of array) on integer type for calculating
	if (/\+/.test(inputAll) === true) {
		inputArray = inputAll.split('+');
		result = +inputArray[0] + +inputArray[1];
	} else if (/\-/.test(inputAll) === true) {
		inputArray = inputAll.split('-');
		result = +inputArray[0] - +inputArray[1];
	} else if (/\*/.test(inputAll) === true) {
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
	
	// check the length of the data for divOutput
	if ( (inputArray[0].length < 16) && (inputArray[1].length < 16) && (result.length < 16) ) {
		divOutput.innerHTML = result;
		inputAll = ''; // clean for new input
	} else {
		divOutput.innerHTML = 'so much long...>16'
		inputAll = ''; // clean for new input
	}

}

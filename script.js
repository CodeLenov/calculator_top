const divOutput = document.querySelector("#divOutput");
const buttons = document.querySelectorAll(".buttons");
const numbers = document.querySelectorAll(".numbers");

const undo = document.querySelector("#undo");
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");

let inputAll = ""; // all inputs (e.g. numbers and operators) are the string
let inputArray = []; // for 'inputAll' array
let result = "";

const INPUTLENGTH = 16;

getInput(); // program initialization

function getInput() {
undoInput();
clearInput();
	function undoInput() {
	undo.addEventListener('click', () => {
		undo.value = "";
		inputAll = inputAll.slice(0, -1);
	});
}
function clearInput() {
	clear.addEventListener('click', () => {
		clear.value = "";
		inputAll = "";
	});
}

document.addEventListener('keypress', (b) => {
	if (b.key == '0') {b.value = '0'}
	else if (b.key == '1') {b.value = '1'; inputAll += b.value;}
	else if (b.key == '2') {b.value = '2'; inputAll += b.value;}
	else if (b.key == '3') {b.value = '3'; inputAll += b.value;}
	else if (b.key == '4') {b.value = '4'; inputAll += b.value;}
	else if (b.key == '5') {b.value = '5'; inputAll += b.value;}
	else if (b.key == '6') {b.value = '6'; inputAll += b.value;}
	else if (b.key == '7') {b.value = '7'; inputAll += b.value;}
	else if (b.key == '8') {b.value = '8'; inputAll += b.value;}
	else if (b.key == '9') {buttons.value = '9'; printInput();}
	else if (b.key == '.') {b.value = '.';}
	else if (b.key == '%') {b.value = '%';}
	else if (b.key == '+') {b.value = '+'; inputAll += b.value;}
	else if (b.key == '-') {buttons.value = '-'; printInput();}
	else if (b.key == '*') {b.value = '*';}
	else if (b.key == '/') {b.value = '/';}
	else if (b.key == 'p') {b.value = '\u03C0';}
	else if (b.key == 't') {b.value = '\u03C4';}
	else if (b.key == 'r') {b.value = '\u221A';}
	else if (b.key == 's') {b.value = '\u2036';}
	else if (b.key == 'm') {b.value = 'm';}
	else if (b.key == 'e') {b.value = '^';}
	else if (b.key == 'Backspace') {b.value = ''; inputAll = inputAll.slice(0, -1);;}
	else if (b.key == 'Delete') {b.value = ''; inputAll = "";}
	else if (b.key == 'Enter') {buttons.value = '=';}
	else {b.value = ''}


			/*inputAll += b.value;*/
	
});
function printInput() {

	divOutput.style.color = `#555`; // change color for input
			divOutput.innerHTML = inputAll.slice(-16); // restrict maximal length divOutput

}

	buttons.forEach(function(b) {

		b.addEventListener('click', () => {
			inputAll += b.value;
printInput();
		console.log(33, inputAll);
		});

	});

	

calculateResult();
	equals.addEventListener('click', calculateResult);
function calculateResult() {
console.log(inputAll);
		inputAll = inputAll.replace(`\u03C0`, `${Math.PI}`); // 'pi' button
		inputAll = inputAll.replace(`\u03C4`, `${Math.PI * 2}`); // 'tau' button


		if (/\%/.test(inputAll) === true) {

			const percentAll = inputAll.slice(0, -2); // for remove equals sign and percent sign) from input string
			
			const percentArray = percentAll.split(/[^0-9]/);
			
			const percent = +percentArray[0] * (+percentArray[1] / 100);
		
			
const lastIndex = inputAll.lastIndexOf(`${percentArray[1]}`);

inputAll = inputAll.slice(0, lastIndex) + percent + inputAll.slice(lastIndex + 1);


			inputAll = inputAll.slice(0, -1); // for remove equals sign from input string

		}

	inputAll = inputAll.slice(0, -1); // for remove equals sign (or percent sign if it is last character) from input string
console.log(60, inputAll);
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
console.log(000, result);
		divOutput.style.color = `#222`; // change color for result
		divOutput.innerHTML = result;
		inputAll = ""; // clean for new input

	
}
}

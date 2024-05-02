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
		/*divOutput.innerHTML = inputAll;*/
	});
}
function clearInput() {
	clear.addEventListener('click', () => {
		clear.value = "";
		inputAll = "";
	});
}
document.addEventListener('keydown', (b) => {
	if (b.key == '0') {b.value = '0'}
	else if (b.key == '1') {b.value = '1'}
	else if (b.key == '2') {b.value = '2'}
	else if (b.key == '3') {b.value = '3'}
	else if (b.key == '4') {b.value = '4'}
	else if (b.key == '5') {b.value = '5'}
	else if (b.key == '6') {b.value = '6'}
	else if (b.key == '7') {b.value = '7'}
	else if (b.key == '8') {b.value = '8'}
	else if (b.key == '9') {b.value = '9'}
	else if (b.key == '.') {b.value = '.'}
	else if (b.key == '%') {b.value = '%'}
	else if (b.key == '+') {b.value = '+'}
	else if (b.key == '-') {b.value = '-'}
	else if (b.key == '*') {b.value = '*'}
	else if (b.key == '/') {b.value = '/'}
	else if (b.key == 'p') {b.value = '\u03C0'}
	else if (b.key == 't') {b.value = '\u03C4'}
	else if (b.key == 'r') {b.value = '\u221A'}
	else if (b.key == 's') {b.value = '\u2036'}
	else if (b.key == 'm') {b.value = 'm'}
	else if (b.key == 'e') {b.value = '^'}
	else if (b.key == 'Backspace') {b.value = ''; undoInput();}
	else if (b.key == '2') {b.value = '2'}
	else if (b.key == '2') {b.value = '2'}
	else {b.value = ''}


			inputAll += b.value;
	printInput();			

});

	buttons.forEach(function(b) {

		b.addEventListener('click', () => {
inputAll += b.value;
			printInput();
		console.log(33, inputAll);
		});

	});

	function printInput() {
	divOutput.style.color = `#555`; // change color for input
			
			divOutput.innerHTML = inputAll.slice(-16); // restrict maximal length divOutput
}


	equals.addEventListener('click', () => {
console.log(inputAll);
		inputAll = inputAll.replace(`\u03C0`, `${Math.PI}`); // 'pi' button
		inputAll = inputAll.replace(`\u03C4`, `${Math.PI * 2}`); // 'tau' button

		if (/\%/.test(inputAll) === true) {

			const percentAll = inputAll.slice(0, -2); // for remove equals sign and percent sign) from input string
			const percentArray = percentAll.split(/[^0-9]/);
			const percent = +percentArray[0] * (+percentArray[1] / 100);

			inputAll = inputAll.replace(`${percentArray[1]}`, `${percent}`);
			inputAll = inputAll.slice(0, -1); // for remove equals sign from input string

		}

	inputAll = inputAll.slice(0, -1); // for remove equals sign (or percent sign if it is last character) from input string

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

	});

}

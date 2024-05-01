const divOutput = document.querySelector("#divOutput");
const buttons = document.querySelectorAll(".buttons");

const undo = document.querySelector("#undo");
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");

let inputAllString = ""; // all inputs (e.g. numbers and operators) are the string
let inputArray = []; // for 'inputAllString' array
let result = "";






const INPUTLENGTH = 16;



getInput(); // program initialization

function getInput() {

	undo.addEventListener('click', () => {
		undo.value = "";
		inputAllString = inputAllString.slice(0, -1);
		divOutput.innerHTML = inputAllString;
	});

	clear.addEventListener('click', () => {
		clear.value = "";
		inputAllString = "";
	});

	buttons.forEach(function(b) {

		b.addEventListener('click', () => {
			divOutput.style.color = `#555`; // change color for input
			inputAllString += b.value;
			divOutput.innerHTML = inputAllString; // clean for new
		});

	});

	equals.addEventListener('click', () => {

		inputAllString = inputAllString.replace(`\u03C0`, `${Math.PI}`); // 'pi' button
		inputAllString = inputAllString.replace(`\u03C4`, `${Math.PI * 2}`); // 'tau' button

		if (/\%/.test(inputAllString) === true) {

			const percentAllString = inputAllString.slice(0, -2); // for remove percent sign (!!!really equals sign) from input string
			const percentArray = percentAllString.split(/[^0-9]/);
			const percentSecond = +percentArray[0] * (+percentArray[1] / 100);

			inputAllString = inputAllString.replace(`${percentArray[1]}`, `${percentSecond}`);
			inputAllString = inputAllString.slice(0, -1); // for remove equals sign from input string

		}

	inputAllString = inputAllString.slice(0, -1); // for remove equals sign from input string

		// use regex for recognize operators
		// split array with the operators for get first input number and second input number
		// and change string type (elements of array) on integer type for calculating
		if (/\+/.test(inputAllString) === true) {
			inputArray = inputAllString.split('+');
			result = +inputArray[0] + +inputArray[1];
		} else if (/\-/.test(inputAllString) === true) {
			inputArray = inputAllString.split('-');
			result = +inputArray[0] - +inputArray[1];
		} else if (/\*/.test(inputAllString) === true) {
			inputArray = inputAllString.split('*');
			result = +inputArray[0] * +inputArray[1];
		} else if (/\//.test(inputAllString) === true) {
			inputArray = inputAllString.split('/');
			result = +inputArray[0] / +inputArray[1];
		} else if (/\u221A/.test(inputAllString) === true) { // unicode for JavaScript, not HTML
			inputArray = inputAllString.split('\u221A');
			result = Math.sqrt(+inputArray[1]);
		} else if (/\^2/.test(inputAllString) === true) {
			inputArray = inputAllString.split('^2');
			result = +inputArray[0] * +inputArray[0];
		} else if (/m/.test(inputAllString) === true) {
			inputArray = inputAllString.split('m');
			result = +inputArray[0] % +inputArray[1];
		} else if (/\^/.test(inputAllString) === true) {
			inputArray = inputAllString.split('^');
			result = Math.pow(+inputArray[0], +inputArray[1]);
		}

		divOutput.style.color = `#222`; // change color for result
		divOutput.innerHTML = result;
		inputAllString = ""; // clean for new

	});

}

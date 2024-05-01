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

			

	undo.addEventListener('click', () => {
		undo.value = "";
		inputAll = inputAll.slice(0, -1);
		divOutput.innerHTML = inputAll;
	});

	clear.addEventListener('click', () => {
		clear.value = "";
		inputAll = "";
	});

	buttons.forEach(function(b) {

		b.addEventListener('click', () => {

			divOutput.style.color = `#555`; // change color for input
			inputAll += b.value;
divOutput.innerHTML = inputAll.slice(-16); // restrict maximal length divOutput
			
/*inputAll = "" // clean for new input*/
		

		console.log(33, inputAll);
		});

	});

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
		} else if (/\^2/.test(inputAll) === true) {
			inputArray = inputAll.split('^2');
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

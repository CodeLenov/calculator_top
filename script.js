const zero = document.querySelector("#zero");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");
const point = document.querySelector("#point");
const add = document.querySelector("#add");
const subtract = document.querySelector("#subtract");
const multiply = document.querySelector("#multiply");
const divide = document.querySelector("#divide");
const percent = document.querySelector("#percent");
const modulo = document.querySelector("#modulo");
const squareRoot = document.querySelector("#squareRoot");
const square = document.querySelector("#square");
const exponent = document.querySelector("#exponent");
const pi = document.querySelector("#pi");
const tau = document.querySelector("#tau");

const undo = document.querySelector("#undo");

let buttons = document.querySelectorAll(".buttons");
let numbers = document.querySelectorAll(".numbers");
let operators = document.querySelectorAll(".operators");
const equals = document.querySelector("#equals");
const clear = document.querySelector("#clear");

let divOutput = document.querySelector("#divOutput");

let inputAllString = ""; // all inputs (e.g. numbers and operators) are the string
let inputArray = []; // for 'inputAllString' array

const INPUTLENGTH = 16;
let inputFirst = "";
let inputSecond = "";
let inputOperator = "";
let result = "";

getInput(); // program initialization

function getInput() {

	/*clear.addEventListener('click', () => {
		divOutput.innerHTML = "";
	});*/

	buttons.forEach(function(b) {

		b.addEventListener('click', () => {

			if (/clear/.test(b.value) === true) {
				divOutput.innerHTML = "";
				b.value = "";
				inputAllString = "";
			}

			divOutput.style.color = `#555`; // change color for input
			inputAllString += b.value;
			divOutput.innerHTML = inputAllString; // clean for new
					console.log(inputAllString);

		});

	});

	equals.addEventListener('click', () => {

		inputAllString = inputAllString.replace(`\u03C0`, `${Math.PI}`); // 'pi' button
		inputAllString = inputAllString.replace(`\u03C4`, `${Math.PI * 2}`); // 'tau' button

		if (/\%/.test(inputAllString) === true) {

			let percentAllString = inputAllString.slice(0, -2); // for remove percent sign (!!!really equals sign) from input string
			let percentArray = percentAllString.split(/[^0-9]/);
			let percentSecond = +percentArray[0] * (+percentArray[1] / 100);

			inputAllString = inputAllString.replace(`${percentArray[1]}`, `${percentSecond}`);
			inputAllString = inputAllString.slice(0, -1); // for remove equals sign from input string

		}

inputAllString = inputAllString.slice(0, -1); // for remove equals sign from input string

doCalculating();


function doCalculating() {
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

}

		console.log(inputAllString);
				console.log(inputArray);
				console.log(result);	
		divOutput.style.color = `#222`; // change color for result
		divOutput.innerHTML = result;
		inputAllString = ""; // clean for new

	});

}

/* function getInput() {

	clear.addEventListener('click', () => {
		divOutput.innerHTML = "";
		inputFirst = "";
		inputSecond = "";
		inputOperator = "";
	});

	numbers.forEach(function(n) {
		n.addEventListener('click', () => {
			divOutput.innerHTML += n.innerHTML;
			inputFirst += n.value;
		});
	});

operators.forEach(function(n) {
		n.addEventListener('click', () => {
			divOutput.innerHTML = n.innerHTML;
			inputOperator = n.value;
		});
	});

	numbers.forEach(function(n) {
		n.addEventListener('click', () => {

			divOutput.innerHTML += n.innerHTML;
			inputSecond += n.value;
		});
	});	

}

function calculateResult() {
	equals.addEventListener('click', () => {
		let resultString = inputFirst + operator + inputSecond;
		result = +resultString;
		divOutput.innerHTML = result;
	});
} */
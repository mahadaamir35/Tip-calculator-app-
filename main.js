const buttons = document.querySelectorAll('[data-cell-button]');
const billInput = document.getElementById('bill');
const totalPeopleInput = document.getElementById('people');
const errorLabel = document.getElementById('label0');
const peopleLabel = document.getElementById('peopleLabel');
const tipAmount = document.getElementById('tipAmount');
const totalTipAmount = document.getElementById('totalTipAmount');
const customTipInput = document.getElementById('customTip');
const resetButton = document.getElementById('reset');
let billValue = null;
let totalPeople = null;
let userTipValue = null;

billInput.addEventListener('keyup', function() {
	billValue = parseFloat(billInput.value);
	if (!parseFloat(billInput.value)) return billInput.style.setProperty('border-color', 'red');
	billInput.style.removeProperty('border-color');
	startcalculation();
});

buttons.forEach((button) => {
	button.addEventListener('click', function(e) {
		buttons.forEach((btn) => {
			btn.classList.remove('button-clicked');
		});
		const currentButton = e.target;
		currentButton.classList.add('button-clicked');
		userTipValue = parseFloat(currentButton.innerText);
		customTipInput.style.removeProperty('border-color');
		customTipInput.value = '';
		startcalculation();
	});
});

customTipInput.addEventListener('click', function() {
	buttons.forEach((btn) => {
		btn.classList.remove('button-clicked');
	});
	customTipInput.addEventListener('keyup', function() {
		userTipValue = parseFloat(customTipInput.value);
		customTipInput.style.removeProperty('border-color');
		if (!userTipValue) {
			userTipValue = null;
			customTipInput.style.setProperty('border-color', 'red');
		}
		startcalculation();
	});
});

totalPeopleInput.addEventListener('keyup', function() {
	totalPeople = parseFloat(totalPeopleInput.value);
	totalPeopleInput.style.removeProperty('border-color');
	errorLabel.style.setProperty('display', 'none');
	if (!totalPeople) {
		errorLabel.style.setProperty('display', 'inline');
		totalPeopleInput.style.setProperty('border-color', 'red');
	}
	startcalculation();
});

resetButton.addEventListener('click', function() {
	billValue = null;
	billInput.value = '';
	billInput.style.removeProperty('border-color');
	userTipValue = null;
	buttons.forEach((btn) => {
		btn.classList.remove('button-clicked');
	});
	customTipInput.style.removeProperty('border-color');
	customTipInput.value = '';
	totalPeople = null;
	totalPeopleInput.value = '';
	totalPeopleInput.style.removeProperty('border-color');
	errorLabel.style.setProperty('display', 'none');
	tipAmount.innerText = `$0.00`;
	totalTipAmount.innerText = `$0.00`;
});

function startcalculation() {
	if (billValue && userTipValue) {
		tipAmount.innerText = `$${billValue * (userTipValue / 100).toFixed(2)}`;
		if (totalPeople)
			return (totalTipAmount.innerText = `$${(totalPeople * (billValue * (userTipValue / 100))).toFixed(2)}`);
	} else return;
}

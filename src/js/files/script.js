// Подключение функционала "Чертогов Фрилансера"
import { formValidate } from "./forms/forms.js";
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

const form = document.getElementById('form');
const thankText = document.getElementById('thank-text');

form.addEventListener('submit', formSend)


async function formSend(e) {
	e.preventDefault();
	const valueEmail = document.getElementById('formEmail')
	let error = formValidate1(form);



	let response = await fetch('https://wgyef7gexilrvcjkcermdqtisa0ponmg.lambda-url.us-east-1.on.aws/', {
		method: 'POST',
		body: JSON.stringify({ email: valueEmail.value })
	});
	if (response.ok) {
		thankTextAdd(thankText, form)
		form.reset();
	}

}

function formValidate1(form) {
	let error = 0;
	let formReq = document.querySelectorAll("._req");

	for (let index = 0; index < formReq.length; index++) {
		const input = formReq[index];
		formRemoveError(input);

		if (input.classList.contains('_email')) {
			if (emailTest(input)) {
				formAddError(input);
				error++;
			}
		} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
			formAddError(input);
			error++;
		} else {
			if (input.value === '') {
				formAddError(input);
				error++;
			}
		}
		return error
	}
}
function formAddError(input) {
	input.parentElement.classList.add('_error');
	input.classList.add('_error');
}
function formRemoveError(input) {
	input.parentElement.classList.remove('_error');
	input.classList.remove('_error');
}

function emailTest(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

function thankTextAdd(thankText, form) {
	thankText.classList.add('_add-text');
	form.classList.add('_remove-form');
}

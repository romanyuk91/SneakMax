AOS.init({
	once: true
});

// rangeSlider

const rangeSlider = document.getElementById('range-slider');

if (rangeSlider) {
	noUiSlider.create(rangeSlider, {
    start: [0, 100000],
		connect: true,
		step: 1,
    range: {
			'min': [0],
			'max': [100000]
    }
	});

	const input0 = document.getElementById('input-0');
	const input1 = document.getElementById('input-1');
	const inputs = [input0, input1];

	rangeSlider.noUiSlider.on('update', function(values, handle){
		inputs[handle].value = Math.round(values[handle]);
	});

	const setRangeSlider = (i, value) => {
		let arr = [null, null];
		arr[i] = value;

		rangeSlider.noUiSlider.set(arr);
	};

	inputs.forEach((el, index) => {
		el.addEventListener('change', (e) => {
			setRangeSlider(index, e.currentTarget.value);
		});
	});
};

// accordion

const accordions = document.querySelectorAll('.faq-accordion');

	accordions.forEach(function(item) { 
		item.addEventListener('click', function(item){
			const self = item.currentTarget;
			const content = self.querySelector('.faq-accordion-content');
			const accordionIcon = self.querySelector('.faq-accordion-icon');
			content.classList.toggle('hidden');
			if (content.classList.contains('hidden')) {
				accordionIcon.style.transform = 'rotate(0deg)';
				content.style.maxHeight = null;
			} else {
				accordionIcon.style.transform = 'rotate(45deg)';
				content.style.maxHeight = content.scrollHeight + 'px';
				content.style.opacity = "1";
			}
		});
	});

// catalog show more

const showMore = document.querySelector('.btn-more');
const productsLength = document.querySelectorAll('.catalog-item').length;
let items = 9;

showMore.addEventListener('click', function(){

	items += 3;
	const array = Array.from(document.querySelector('.catalog-list').children);
	const visItems = array.slice(0, items);
	visItems.forEach(el => el.classList.add('is-visible'));

	if (visItems.length === productsLength) {
		showMore.classList.add('hidden');
	}
});

// burger

const burger = document.querySelector('.burger');
const headerNav = document.querySelector('.header-nav');

burger.addEventListener('click', function(){
	headerNav.classList.toggle('active');
	
});


// quiz

const quizData = [{
	number: 1,
	title: "Какой тип кроссовок рассматриваете?",
	answer_alias: "type",
	answers: [{
			answer_title: "кеды",
			type: "checkbox"
		},
		{
			answer_title: "кеды",
			type: "checkbox"
		},
		{
			answer_title: "кеды",
			type: "checkbox"
		},
  {
			answer_title: "кеды",
			type: "checkbox"
		},
  {
			answer_title: "кеды",
			type: "checkbox"
		}
	]
},
{
	number: 2,
	title: "Какой размер вам подойдет?",
	answer_alias: "size",
	answers: [{
			answer_title: "Менее 36",
			type: "checkbox"
		},
		{
			answer_title: "36-38",
			type: "checkbox"
		},
  {
			answer_title: "39-41",
			type: "checkbox"
		},
  {
			answer_title: "42-44",
			type: "checkbox"
		},
  {
			answer_title: "45 и больше",
			type: "checkbox"
		}
	]
},
{
	number: 3,
	title: "Уточните какие-либо моменты",
	answer_alias: "message",
	answers: [{
		answer_title: "Введите сообщение",
		type: "textarea"
	},
	]
}
];

const quizTemplate = (data = [], dataLength = 0, options) => {
const {number, title} = data;
const {nextBtnText} = options;
const answers = data.answers.map(item => {

if (item.type === 'checkbox') {
  return `
  <li class="quiz-question-item">
   		<img src="images/quiz-image.jpg" alt="фото товара">
   		<label class="custom-checkbox quiz-question-label">
            <input class="custom-checkbox-field quiz-question-answer" type="${item.type}"" data-valid="false" name="${data.answer_alias}" ${item.type == 'text' ? 'placeholder="Введите ваш вариант"' : ''} value="${item.type !== 'text' ? item.answer_title : ''}">
            <span class="custom-checkbox-content">${item.answer_title}</span>
        </label>	  
  </li>
  `;
} else if (item.type === 'textarea') {
  return `
  <label class="quiz-question-label">
		<textarea class="quiz-question-message" placeholder="${item.answer_title}"></textarea>
  </label>
  `;
} else {
  return `
  <label class="quiz-question-label">
		<input type="${item.type}" data-valid="false" class="quiz-question-answer" name="${data.answer_alias}" ${item.type == 'text' ? 'placeholder="Введите ваш вариант"' : ''} value="${item.type !== 'text' ? item.answer_title : ''}">
  		<span>${item.answer_title}</span>
  </label>
  `;
}

});

return `
<div class="quiz-question">
 			<h3 class="quiz-question-title">${title}</h3>
 			<ul class="quiz-question-answers">
 				${answers.join('')}
			</ul>
			<div class="quiz-bottom">
				<div class="quiz-count">${number} из ${dataLength}</div>
				<button type="button" class="quiz-question-btn" data-next-btn>${nextBtnText}</button>
			</div>
 		</div>
`
};

class Quiz {
constructor(selector, data, options) {
	this.$el = document.querySelector(selector);
	this.options = options;
	this.data = data;
	this.counter = 0;
	this.dataLength = this.data.length;
	this.resultArray = [];
	this.tmp = {};
	this.init()
	this.events()
}

init() {
	this.$el.innerHTML = quizTemplate(this.data[this.counter], this.dataLength, this.options);
}

nextQuestion() {
	console.log('next question!');

	if (this.valid()) {
		if (this.counter + 1 < this.dataLength) {
			this.counter++;
			this.$el.innerHTML = quizTemplate(this.data[this.counter], this.dataLength, this.options);

			if ((this.counter + 1 == this.dataLength)) {
	  			document.querySelector('.quiz-question__answers').style.display = 'block';
			}
		} else {
			console.log('А все! конец!');
	document.querySelector('.quiz-questions').style.display = 'none';
	document.querySelector('.last-question').style.display = 'block';
	document.querySelector('.quiz-title').textContent = 'Ваша подборка готова!';
	document.querySelector('.quiz-desc').textContent = 'Оставьте свои контактные данные, чтобы бы мы могли отправить  подготовленный для вас каталог';

	document.querySelector('.quiz-form').addEventListener('submit', (e) => {
	  e.preventDefault();

	  quizFormData = new FormData();


	  for (let item of this.resultArray) {
		for (let obj in item) {
		  quizFormData.append(obj, item[obj].substring(0, item[obj].length - 1));
		}
	  }

	  quizFormData.append('textarea', textareaText);

	  let xhr = new XMLHttpRequest();

	  xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
		  if (xhr.status === 200) {
		  }
		}
	  }

	  document.querySelector('.quiz-form').querySelectorAll('input').forEach(el => {
		if (el.value) {
		  xhr.open('POST', 'mail.php', true);
		  xhr.send(quizFormData);

		  document.querySelector('.quiz-form').reset();
		}
	  });


	});

  }
	} else {
		console.log('Не валидно!')
	}
}

events() {
	console.log('events!')
	this.$el.addEventListener('click', (e) => {
		if (e.target == document.querySelector('[data-next-btn]')) {
			this.addToSend();
			this.nextQuestion();
		}
	});

	this.$el.addEventListener('change', (e) => {
		if (e.target.tagName == 'INPUT') {
			if (e.target.type !== 'checkbox' && e.target.type !== 'radio') {
				let elements = this.$el.querySelectorAll('input')

				elements.forEach(el => {
					el.checked = false;
				});
			}
			this.tmp = this.serialize(document.querySelector('.quiz-form'));
		} else {
	let textarea = this.$el.querySelector('textarea');
	textareaText = textarea.value;
  }
	});
}

valid() {
	let isValid = false;

let textarea = this.$el.querySelector('textarea');

if (textarea) {
  if (textarea.value.length > 0) {
	isValid = true;
	return isValid;
  }
}


	let elements = this.$el.querySelectorAll('input');
	elements.forEach(el => {
		switch(el.nodeName) {
			case 'INPUT':
				switch (el.type) {
					case 'text':
						if (el.value) {
							isValid = true;
						} else {
							el.classList.add('error')
						}
					case 'checkbox':
						if (el.checked) {
							isValid = true;
						} else {
							el.classList.add('error')
						}
					case 'radio':
						if (el.checked) {
							isValid = true;
						} else {
							el.classList.add('error')
						}
				}
		}
	});

	return isValid;
}

addToSend() {
	this.resultArray.push(this.tmp)
}

serialize(form) {
	let field, s = {};
	let valueString = '';
	if (typeof form == 'object' && form.nodeName == "FORM") {
		let len = form.elements.length;
		for (let i = 0; i < len; i++) {
			field = form.elements[i];

			if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
				if (field.type == 'select-multiple') {
					for (j = form.elements[i].options.length - 1; j >= 0; j--) {
						if (field.options[j].selected)
							s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
					}
				} else if ((field.type != 'checkbox' && field.type != 'radio' && field.value) || field.checked) {
					valueString += field.value + ',';

					s[field.name] = valueString;
				}
			}
		}
	}
	return s
}
}

window.quiz = new Quiz('.quiz-form .quiz-questions', quizData, {
nextBtnText: "Следующий шаг",
sendBtnText: "Отправить",
});
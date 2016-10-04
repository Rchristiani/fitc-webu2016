const fitc = {};

fitc.getData = function() {
	return fetch('data.json')
		.then(res => res.json());
};

fitc.displayData = function(data) {
	data = data.response;
	const talkTemplate = templater`
		<li class="talk">
			<h4>${'talk'}</h4>
			<p>${'speaker'}</p>
			<p>${'room'}</p>
		</li>
	`;
	const timeSlotTemplate = templater`
		<section class="timeSlot" data-time="${data => data.key.substring(0,2).replace(':','')}">
			<h3>${'key'}</h3>
			<ul>
			${data => data.talks.length > 0 ? data.talks.map(talk =>  talkTemplate(talk)) : '<h2>Break Time</h2>'}
			</ul>
		</section>
	`;
	const renderedTalksArray = [];

	for(let time in data) {
		renderedTalksArray.push(timeSlotTemplate({
			key: time,
			talks: data[time]
		}));
	}
	document.getElementById('app').innerHTML = renderedTalksArray.toString();
	fitc.setCurrent();
};

fitc.setCurrent = function() {
	let currentTime = new Date().getHours();
	currentTime = currentTime > 12 ? currentTime - 12 : currentTime;
	
	const elements = document.querySelectorAll('.timeSlot');

	for(let element of elements) {
		const time = element.dataset.time;
		if(currentTime === Number(time)) {
			element.style.setProperty('--brandColour', 'black');
		}
	}
};

fitc.init = function() {
	fitc.getData()
		.then(fitc.displayData);
};

window.onload = fitc.init;
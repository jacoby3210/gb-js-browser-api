// Пример JSON-данных о занятиях
const classes = [
		{ title: "Йога", time: "10:00 - 11:00", maxParticipants: 10, currentParticipants: 5 },
		{ title: "Пилатес", time: "11:00 - 12:00", maxParticipants: 8, currentParticipants: 8 },
		{ title: "Кардиотренировка", time: "12:00 - 13:00", maxParticipants: 15, currentParticipants: 10 }
];

// Функция для рендеринга расписания занятий
function renderSchedule() {
		const scheduleDiv = document.getElementById('schedule');
		scheduleDiv.innerHTML = ''; // Очищаем содержимое перед рендерингом

		classes.forEach((cls, index) => {
				const classDiv = document.createElement('div');
				classDiv.className = 'card mb-3';

				classDiv.innerHTML = `
						<div class="card-body">
								<h5 class="card-title">${cls.title}</h5>
								<p class="card-text">Время: ${cls.time}</p>
								<p class="card-text">Записаны: ${cls.currentParticipants} / ${cls.maxParticipants}</p>
								<button class="btn btn-primary" ${cls.currentParticipants >= cls.maxParticipants ? 'disabled' : ''} onclick="enroll(${index})">Записаться</button>
								<button class="btn btn-danger" ${cls.currentParticipants === 0 ? 'disabled' : ''} onclick="unenroll(${index})">Отменить запись</button>
						</div>
				`;

				scheduleDiv.appendChild(classDiv);
		});
}

// Функция для записи на занятие
function enroll(index) {
		if (classes[index].currentParticipants < classes[index].maxParticipants) {
				classes[index].currentParticipants++;
				renderSchedule(); // Обновляем расписание
		}
}

// Функция для отмены записи на занятие
function unenroll(index) {
		if (classes[index].currentParticipants > 0) {
				classes[index].currentParticipants--;
				renderSchedule(); // Обновляем расписание
		}
}

// Инициализация расписания при загрузке страницы
window.onload = function() {
		renderSchedule();
};
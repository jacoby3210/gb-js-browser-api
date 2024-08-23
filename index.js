const photoElement = document.getElementById('photo');
const photographerElement = document.getElementById('photographer');
const likeButton = document.getElementById('likeButton');
const likeCounter = document.getElementById('likeCounter');

const UNSPLASH_ACCESS_KEY = 'PASTE_UNSPLASH_KEY_THERE'; 

let likeCount = localStorage.getItem('likeCount') || 0;
likeCounter.textContent = `Лайков: ${likeCount}`;

let photoHistory = JSON.parse(localStorage.getItem('photoHistory')) || [];

function fetchRandomPhoto() {
		fetch(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}`)
				.then(response => response.json())
				.then(data => {
						const photoData = {
								url: data.urls.regular,
								photographer: data.user.name
						};

						photoElement.src = photoData.url;
						photographerElement.textContent = `Фото от: ${photoData.photographer}`;

						photoHistory.push(photoData);
						localStorage.setItem('photoHistory', JSON.stringify(photoHistory));
				})
				.catch(error => console.error('Ошибка при получении фото:', error));
}

function showPhotoHistory() {
		const historyContainer = document.createElement('div');
		historyContainer.style.marginTop = '20px';
		historyContainer.innerHTML = '<h2>История просмотров</h2>';
		document.body.appendChild(historyContainer);

		photoHistory.forEach(photo => {
				const photoDiv = document.createElement('div');
				photoDiv.style.marginTop = '10px';
				photoDiv.innerHTML = `
						<img src="${photo.url}" alt="Фото из истории" style="max-width: 100%; border-radius: 5px;">
						<div>Фото от: ${photo.photographer}</div>
				`;
				historyContainer.appendChild(photoDiv);
		});
}

likeButton.addEventListener('click', () => {
		likeCount++;
		localStorage.setItem('likeCount', likeCount);
		likeCounter.textContent = `Лайков: ${likeCount}`;
});

window.onload = () => {
		fetchRandomPhoto();
		showPhotoHistory();
};
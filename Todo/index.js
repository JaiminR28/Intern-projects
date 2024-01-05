const form = document.getElementById("form");
const taskList = document.querySelector(".taskList");

function addTask(task) {
	console.log(task);
}

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const myFormData = new FormData(event.target);
	const formDataObj = {};
	myFormData.forEach((value, key) => (formDataObj[key] = value));
	console.log(formDataObj);

	const localData = window.localStorage.getItem("myObject");
	console.log(localData);
	window.localStorage.setItem("myObject", JSON.stringify(formDataObj));
	addTask(formDataObj);
});

window.onload = (event) => {
	const task = JSON.parse(window.localStorage.getItem("myObject"));
	console.log(task);

	taskList.innerHTML += `<li class="task">
					<h5 class="title">${task.title}</h5>
					<h6>${task.timeDate}</h6>
				</li>`;
};

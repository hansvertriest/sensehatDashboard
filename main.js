// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const fs = firebase.firestore();

// LEDs
const COLLECTION_PIXEL = 'matrix';

const userNameElement = document.getElementById('user-name');
let userName = undefined;

let color = [0, 0, 0];
let noColor = [10,0,0];

const registerUser = () => {
	if (!userName) {
		userName = userNameElement.value;
		color = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
		fs.collection(COLLECTION_PIXEL).doc(userName).set({ dummy: true});
	}
}

const updatePixel = (event) => {
	registerUser();
	if (userName !== undefined) {
		console.log(45)
		fs.collection(COLLECTION_PIXEL).doc(userName).update({[event.target.id] : color,});
	} else {
		userNameElement.value = prompt("Please give a username");
		updatePixel();
	}
}
const clearPixels = (event) => {
	event.preventDefault();
	for(let box = 0; box < 64; box ++) {
		const row = Math.floor(box / 8);
		const column = box % 8;
		const checkbox = document.getElementById(`pixel-${row}-${column}`);
		checkbox.checked = false;
		fs.collection(COLLECTION_PIXEL).doc(userName).delete();
	}
}

// data

const updateData = (data) => {
	const tempElement = document.getElementById("temp");
	const pressureElement = document.getElementById("pressure");
	const humidityElement = document.getElementById("humidity");
	console.log(data);
	tempElement.innerHTML =  data.temp.toFixed(2);
	pressureElement.innerHTML = data.pressure.toFixed(2);
	humidityElement.innerHTML = data.humidity.toFixed(2);

}

const COLLECTION_DATA = 'data';
const DOCUMENT_DATA = 'metrics';

fs.collection(COLLECTION_DATA).doc(DOCUMENT_DATA).onSnapshot((doc) => {
	updateData(doc.data());
});
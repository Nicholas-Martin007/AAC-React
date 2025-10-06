import axios from "axios";

export function fetchData(URL) {
	return new Promise((resolve, reject) => {
		axios
			.get(URL)
			.then((result) => {
				console.log(result.data)
				resolve(result.data);
			})
			.catch((error) => {
				alert("ERROR: " + error + URL);
			});
	});
}

export function postData(URL, data) {
	return new Promise((resolve, reject) => {
		axios
			.post(URL, data)
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				console.log(error);
			});
	});
}

export function updateData(URL, id, data) {
	return new Promise((resolve, reject) => {
		axios
			.put(`${URL}/${id}`, data)
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				console.log(error);
			});
	});
}

export function deleteData(URL, id) {
	console.log(id);
	return axios.delete(`${URL}/${id}`);
}
import axios from "axios";
import { CARD_URL } from "../../Configs/DataURL";
export async function fetchData() {
	try {
		const result = await axios.get(CARD_URL);
		console.log(result);

		return result.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function uploadCard(file) {
	console.log("Uploading...");

	const reader = new FileReader();

	return new Promise((resolve, reject) => {
		reader.onload = async () => {
			const base64 = reader.result.split(",")[1];
			const payload = {
				label: file.name.split(".")[0],
				gambar: base64,
			};
			console.log(payload);

			try {
				const response = await axios.post(CARD_URL, payload);
				resolve(response.data);
			} catch (e) {
				console.error(
					"Upload error details:",
					e.response?.data || e.message
				);
				reject(e);
			}
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}

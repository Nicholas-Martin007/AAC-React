import axios from "axios";
import { API_URL } from "../Settings/DatabaseURL";

export const addImage = async ({ label, gambar }) => {
	try {
		await axios.post(`${API_URL}/kartu/`, {
			label,
			gambar,
			kategori: "custom",
		});
		console.log(`Added image: ${label}`);
		return true;
	} catch (error) {
		console.error(`Error adding ${label}:`, error.message);
		return false;
	}
};

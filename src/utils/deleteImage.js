import axios from "axios";
import { API_URL } from "../Settings/DatabaseURL";

export const deleteImage = async({ kartu_id }) => {
    console.log(`Kartu ${kartu_id}`)
    try {
        await axios.delete(`${API_URL}/kartu/${kartu_id}/`);

    } catch (error) {
		console.error(`Error deleting ${kartu_id}:`, error.message);
		return false;
    }
};
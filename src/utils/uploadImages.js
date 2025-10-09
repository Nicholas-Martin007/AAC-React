import axios from "axios";
import { API_URL } from "../Settings/DatabaseURL";

export const uploadImages = async () => {
	const context = require.context("../../public/img", false, /\.svg$/);
	const files = context.keys();

	for (const file of files) {
		const response = await fetch(context(file));
		const svgContent = await response.text();

		// Convert to Base64
		const base64Data = btoa(unescape(encodeURIComponent(svgContent)));

		const label = file.replace("./", "").replace(".svg", "");

		try {
			await axios.post(`${API_URL}/kartu/`, {
				label,
				gambar: `data:image/svg+xml;base64,${base64Data}`,
			});
			console.log(`Uploaded ${file}`);
		} catch (error) {
			console.error(`Error uploading ${file}:`, error.message);
		}
	}
};

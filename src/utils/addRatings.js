import { KISAH_URL } from "../Settings/DatabaseURL";
import { useCardStore } from "../Store/useCardStore";

export const addRatings = async ({ kisahId, ratings }) => {
	console.log(kisahId);
	if (!kisahId) {
		console.error("No kisah_id available");
		return;
	}

	try {
		console.log(`Testing: ${ratings}`);
		const response = await fetch(`${KISAH_URL}${kisahId}/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				ratings: ratings,
			}),
		});

		if (!response.ok) {
			throw new Error("Failed to update ratings");
		}

		return true;
	} catch (error) {
		console.log("Error updating ratings:", error);
		return false;
	}
};

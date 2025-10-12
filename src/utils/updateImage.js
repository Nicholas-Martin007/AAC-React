import { KARTU_URL } from "../Settings/DatabaseURL";

export const updateImage = async ({ kartu_id, label, gambar }) => {
    try {
        const response = await fetch(`${KARTU_URL}${kartu_id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                label: label,
                gambar: gambar,
                kategori: "custom"
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to update image");
        }

        return true;
    } catch (error) {
        console.error("Error updating image:", error);
        return false;
    }
};
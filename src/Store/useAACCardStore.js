import { create } from "zustand";
import { KARTU_URL } from "../Settings/DatabaseURL";
import { fetchData } from "../Actions/CRUD";

const setLoading = (set, get, value) => {
	set((state) => ({
		isLoading: value,
	}));
};
const setAACCard = (set, get, value) => {
	set((state) => ({
		aacCard: value,
	}));
};

const setSelectedAACCard = (set, get, value) => {
	set((state) => ({
		selectedAACCard: value,
	}));
};

const setSocialStories = (set, get, value) => {
	set((state) => ({
		socialStories: value,
	}));
};

const fetchCards = async (set, get, value) => {
	const data = await fetchData(KARTU_URL);
	const cards = data.map((item) => ({
		kartu_id: item.kartu_id,
		label: item.label,
		gambar: item.gambar,
		kategori: item.kategori,
	}));
	set({ aacCard: cards });
};

export const useAACCardStore = create((set, get) => ({
	isLoading: false,
	aacCard: [],
	selectedAACCard: [],
	socialStories: "",

	setAACCard: (value) => {
		setAACCard(set, get, value);
	},
	setSelectedAACCard: (value) => {
		setSelectedAACCard(set, get, value);
	},
	setLoading: (value) => {
		setLoading(set, get, value);
	},
	setSocialStories: (value) => {
		setSocialStories(set, get, value);
	},

	fetchCards: (value) => {
		fetchCards(set, get, value);
	},
}));

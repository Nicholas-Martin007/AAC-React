import { create } from "zustand";
import { KARTU_URL } from "../Settings/DatabaseURL";
import { fetchData } from "../Actions/CRUD";

const setLoading = (set, get, value) => {
	set((state) => ({
		isLoading: value,
	}));
};

const setCards = (set, get, value) => {
	set((state) => ({
		cards: value,
	}));
};

const setSelectedCard = (set, get, value) => {
	set((state) => ({
		selectedCard: value,
	}));
};

const setStory = (set, get, value) => {
	set((state) => ({
		story: value,
	}));
};

const setKisahId = (set, get, value) => {
	set((state) => ({
		kisahId: value,
	}));
};

const fetchCards = async (set, get, value) => {
	const data = await fetchData(KARTU_URL);
	const result = data.map((item) => ({
		kartu_id: item.kartu_id,
		label: item.label,
		gambar: item.gambar,
		kategori: item.kategori,
	}));

	set({ cards: result });
};

export const useCardStore = create((set, get) => ({
	isLoading: false,
	cards: [],
	selectedCard: [],
	story: "",
	kisahId: null,

	refresh: false,

	setCards: (value) => {
		setCards(set, get, value);
	},
	setSelectedCard: (value) => {
		setSelectedCard(set, get, value);
	},
	setLoading: (value) => {
		setLoading(set, get, value);
	},
	setStory: (value) => {
		setStory(set, get, value);
	},

	fetchCards: async () => {
		await fetchCards(set, get);
	},

	setKisahId: (value) => {
		setKisahId(set, get, value);
	},

	triggerRefresh: () => {
		set((state) => ({ refresh: !state.refresh }));
	},
}));

import { create } from "zustand";
const setText = (set, get, value) => {
	set((state) => ({
		text: value,
	}));
};

const setSpeaking = (set, get, value) => {
	set((state) => ({
		isSpeaking: value,
	}));
};

export const useSpeakStore = create((set, get) => ({
	text: "",
	isSpeaking: false,

	setText: (value) => {
		setText(set, get, value);
	},

	setSpeaking: (value) => {
		setSpeaking(set, get, value);
	},
}));

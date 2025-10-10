import { create } from "zustand";

const setErrors = (set, get, value) => {
	set((state) => ({
		errors: value,
	}));
};

const setFormData = (set, get, value) => {
	set((state) => ({
		formData: value,
	}));
};

const setMode = (set, get, value) => {
	set((state) => ({
		mode: value,
	}));
};

export const useCustomStore = create((set, get) => ({
	errors: {},
	formData: {
		label: "",
		image: null,
	},
	mode: "view",

	setErrors: (value) => {
		setErrors(set, get, value);
	},

	setFormData: (value) => {
		setFormData(set, get, value);
	},

	setMode: (value) => {
		setMode(set, get, value);
	},
}));

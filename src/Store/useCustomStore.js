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

export const useCustomStore = create((set, get) => ({
	errors: {},
	formData: {
		label: "",
		image: null,
		imagePreview: null,
	},

	setErrors: (value) => {
		setErrors(set, get, value);
	},

	setFormData: (value) => {
		setFormData(set, get, value);
	},
}));

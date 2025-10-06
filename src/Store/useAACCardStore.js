import {create} from "zustand";

const setLoading = (set, get, value) => {
    set((state) => ({
        isLoading: value,
    }))
}
const setAACCard = (set, get, value) => {
    set((state) => ({
        aacCard: value,
    }))
}

const setSelectedAACCard = (set, get, value) => {
    set((state) => ({
        selectedAACCard: value,
    }))
}

const setSocialStories = (set, get, value) => { 
    set((state) => ({
        socialStories: value,
    }))
}

export const useAACCardStore = create((set, get) => ({
    isLoading: false,
    aacCard: [],
    selectedAACCard: [],
    socialStories: "",
    

    setAACCard: (value) => {setAACCard(set, get, value)},
    setSelectedAACCard: (value) => {setSelectedAACCard(set, get, value)},
    setLoading: (value) => {setLoading(set, get, value)},
    setSocialStories: (value) => {setSocialStories(set, get, value)},
}))
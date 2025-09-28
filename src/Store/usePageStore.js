import {create} from 'zustand';

const setPage = (set, get, value) => {
    set((state) => ({
        page: value,
    }))
}

const setIsOpen = (set, get, value) => {
    set((state) => ({
        isOpen: value,
    }))
}

export const usePageStore = create((set, get) => ({
    page: [],
    isOpen: true,

    setPage: (value) => {setPage(set, get, value)},
    setIsOpen: (value) => {setIsOpen(set, get, value)}
}));
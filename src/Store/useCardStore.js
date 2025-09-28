import {create} from "zustand";

const setCard = (set, get, value) => {
    set((state) => ({
        card: value,
    }))
}

export const useCardStore = create((set, get) => ({
    card: [],

    setCard: (value) => {MdSecurityUpdateGood(set, get, value)},
}))
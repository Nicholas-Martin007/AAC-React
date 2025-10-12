import  {create} from "zustand";
import { KARTU_URL, KISAH_URL } from "../Settings/DatabaseURL";
import { fetchData } from "../Actions/CRUD";

const setStories = (set, get, value) => {
    set((state) => ({
        stories: value,
    }));
}

const setDetail = (set, get, value) => {
    set((state) => ({
        detail: value,
    }));
}

const fetchStories = async (set, get, value) => {
    try {
        set({ isLoading: true });
        const data = await fetchData(KISAH_URL);
        
        // Fetch all cards first
        const cardsData = await fetchData(KARTU_URL);
        const cardsMap = new Map(cardsData.map(card => [card.kartu_id, card]));

        const json = data.map((item) => ({
            kisah_id: item.kisah_id,
            input_text: item.input_text,
            output_text: item.output_text,
            created_at: item.created_at,
            kartu_list: item.kartu_ids.map(id => ({
                gambar: cardsMap.get(id)?.gambar,
                label: cardsMap.get(id)?.label
            })),
            score_human: item.score_human,
            score_perplexity: item.score_perplexity,
        }));

        console.log("Fetched stories with cards: ", json);
        set({ stories: json, isLoading: false });
    } catch (error) {
        console.error("Error fetching stories:", error);
        set({ isLoading: false });
    }
}

export const useSocialStoryStore = create((set, get) => ({
    isLoading: false,
    stories: [],
    detail: {},
    refresh: false,

    fetchStories: async () => {
        await fetchStories(set, get);
    },

    setDetail: (value) => {
        setDetail(set, get, value);
    },

    setStories: (value) => {
		setStories(set, get, value);
	},
    
}));
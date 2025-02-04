import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface City {
    city_id: number;
    title: string;
    bars: { bar_id: number; title: string; address: string }[];
}

interface AppState {
    cities: City[];
    selectedCity: City | null;
    selectedBar: { bar_id: number; title: string; address: string } | null;
}

const initialState: AppState = {
    cities: [],
    selectedCity: null,
    selectedBar: null,
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setCities: (state, action: PayloadAction<City[]>) => {
            state.cities = action.payload;
        },
        selectCity: (state, action: PayloadAction<City | null>) => {
            state.selectedCity = action.payload;
        },
        selectBar: (state, action: PayloadAction<{ bar_id: number; title: string; address: string } | null>) => {
            state.selectedBar = action.payload;
        },
    },
});

export const { setCities, selectCity, selectBar } = appSlice.actions;
export const store = configureStore({ reducer: appSlice.reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

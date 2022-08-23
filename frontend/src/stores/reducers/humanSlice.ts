import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MetadataObjectI } from "../../modules/metadataObject-interface";

const initialState: MetadataObjectI[] = [];

export const humanSlice = createSlice({
  name: "humans",
  initialState,
  reducers: {
    updateHumans: (state, action: PayloadAction<MetadataObjectI[]>) => {
      return [...action.payload];
    },
    addHuman: (state, action: PayloadAction<MetadataObjectI>) => {
      return [...state, action.payload];
    },
    removeHuman: (state, action: PayloadAction<string>) => {
      return [...state.filter((human) => human.id !== action.payload)];
    },
    updateClikedOnHuman: (state, action: PayloadAction<{ id: string }>) => {
      return [
        ...state.map((human) =>
          human.id === action.payload.id
            ? { ...human, isClicked: !human.isClicked }
            : human
        ),
      ];
    },
  },
});

export const { updateHumans, removeHuman, addHuman, updateClikedOnHuman } = humanSlice.actions;

export default humanSlice.reducer;

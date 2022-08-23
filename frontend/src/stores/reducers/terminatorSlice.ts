import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MetadataObjectI } from "../../modules/metadataObject-interface";

const initialState: MetadataObjectI[] = [];

export const terminatorSlice = createSlice({
  name: "terminators",
  initialState,
  reducers: {
    updateTerminators: (
      state,
      action: PayloadAction<MetadataObjectI[]>
    ) => {
      return [...action.payload];
    },
    addTerminator: (state, action: PayloadAction<MetadataObjectI>) => {
      return [...state, action.payload];
    },
    removeTerminator: (state, action: PayloadAction<string>) => {
      return state.filter((terminator) => terminator.id !== action.payload)
    },
    updateClikedOnTerminator: (state, action: PayloadAction<{ id: string }>) => {
      return [
        ...state.map((terminator) =>
          terminator.id === action.payload.id
            ? { ...terminator, isClicked: !terminator.isClicked }
            : terminator
        ),
      ];
    },
  },
});

export const { updateTerminators, removeTerminator, addTerminator, updateClikedOnTerminator } = terminatorSlice.actions;

export default terminatorSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

interface PlayerLivesStateI {
  lives: number;
}

const initialState: PlayerLivesStateI = {
  lives: 2,
};

export const playerLiveSlice = createSlice({
  name: "playerLive",
  initialState,
  reducers: {
    decrement: (state) => {
      state.lives -=  1;
    } 
  }
});

export const { decrement } = playerLiveSlice.actions;

export default playerLiveSlice.reducer;
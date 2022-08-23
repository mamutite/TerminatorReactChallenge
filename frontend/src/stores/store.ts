import { configureStore } from "@reduxjs/toolkit";
import humanReducer from "./reducers/humanSlice";
import terminatorReducer from "./reducers/terminatorSlice";
import playerLiveReducer from "./reducers/playerLiveSlice";

export const store = configureStore({
    reducer: {
        humans: humanReducer,
        terminators: terminatorReducer,
        playerLives: playerLiveReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

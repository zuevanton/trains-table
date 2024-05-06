import { configureStore } from "@reduxjs/toolkit"
import { trainsList } from "./TrainsListSlice.ts"

export const store = configureStore({
  reducer: {
    trainsList: trainsList,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

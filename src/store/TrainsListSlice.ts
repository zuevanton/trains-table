import { TrainInfo } from "../types/trains.types.ts"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../constants.ts"

const initialState: TrainInfo[] = []
const TrainsListSlice = createSlice({
  name: "trainsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrains.fulfilled, (_, action) => {
      return action.payload
    })
  },
})

export const fetchTrains = createAsyncThunk<TrainInfo[]>(
  "fetchTrains",
  async () => {
    try {
      const trainsList = await axios.get<TrainInfo[]>(API_URL)
      return trainsList.data
    } catch (e) {
      console.log(e)
      return []
    }
  },
)

export const trainsList = TrainsListSlice.reducer

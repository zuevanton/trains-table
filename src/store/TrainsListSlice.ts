import { Characteristic, TrainInfo } from "../types/trains.types.ts"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../constants.ts"

interface UpdateCharacteristicPayload {
  trainName: string
  index: number
  field: keyof Characteristic
  value: number | string
}

const initialState: TrainInfo[] = []
const TrainsListSlice = createSlice({
  name: "trainsList",
  initialState,
  reducers: {
    updateCharacteristic: (
      state,
      action: PayloadAction<UpdateCharacteristicPayload>,
    ) => {
      const { trainName, index, field, value } = action.payload
      const train = state.find((trainInfo) => trainInfo.name === trainName)
      if (train === undefined) return state
      if (train.characteristics[index]) {
        train.characteristics[index][field] = value
      }
    },
  },
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
export const { updateCharacteristic } = TrainsListSlice.actions

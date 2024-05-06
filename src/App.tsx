import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks.ts"
import { fetchTrains } from "./store/TrainsListSlice.ts"

function App() {
  const dispatch = useAppDispatch()
  const trains = useAppSelector((state) => state.trainsList)
  useEffect(() => {
    dispatch(fetchTrains())
  }, [])
  return (
    <div>
      {trains.map((train) => (
        <div key={train.name}>{train.name}</div>
      ))}
    </div>
  )
}

export default App

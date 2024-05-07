import { TrainsList } from "./components/TrainsList/TrainsList.tsx"
import { TrainCharacteristic } from "./components/TrainCharacteristic/TrainCharacteristic.tsx"
import { useState } from "react"
import { TrainInfo } from "./types/trains.types.ts"

function App() {
  const [activeTrain, setActiveTrain] = useState<TrainInfo["name"] | null>(null)
  return (
    <div className="container">
      <TrainsList trainHandler={setActiveTrain} />
      <TrainCharacteristic activeTrain={activeTrain} />
    </div>
  )
}

export default App

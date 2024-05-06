import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.ts"
import { useEffect } from "react"
import { fetchTrains } from "../../store/TrainsListSlice.ts"

interface Props {
  trainHandler: (train: string) => void
}

export const TrainsList = ({ trainHandler }: Props) => {
  const dispatch = useAppDispatch()
  const trains = useAppSelector((state) => state.trainsList)
  useEffect(() => {
    dispatch(fetchTrains())
  }, [])
  return (
    <table>
      <caption>Поезда</caption>
      <thead>
        <tr>
          <th>Название</th>
          <th>Описание</th>
        </tr>
      </thead>
      <tbody>
        {trains.map((train) => (
          <tr key={train.name} onClick={() => trainHandler(train.name)}>
            <td>{train.name}</td>
            <td>{train.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

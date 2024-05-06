import { useAppSelector } from "../../hooks/reduxHooks.ts"

interface Props {
  activeTrain: string | null
}

export const TrainCharacteristic = ({ activeTrain }: Props) => {
  const trainInfo = useAppSelector(
    (state) =>
      state.trainsList.filter((trainInfo) => trainInfo.name === activeTrain)[0],
  )
  if (activeTrain === null) return null
  return (
    <form>
      <table>
        <caption>Характеристики</caption>
        <caption>{trainInfo.name}</caption>
        <thead>
          <tr>
            <th>Ток двигателя</th>
            <th>Сила тяги</th>
            <th>Скорость</th>
          </tr>
        </thead>
        <tbody>
          {trainInfo.characteristics.map((char, index) => (
            <tr key={index}>
              <td>{char.engineAmperage}</td>
              <td>{char.force}</td>
              <td>{char.speed}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit">Отправить данные</button>
    </form>
  )
}

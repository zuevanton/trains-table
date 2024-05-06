import { useAppSelector } from "../../hooks/reduxHooks.ts"
import { Input } from "../Input/Input.tsx"

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
            <tr key={trainInfo.name + index}>
              <td>
                <Input
                  initialValue={`${char.engineAmperage}`}
                  validations={{ isInteger: true, isPositive: true }}
                />
              </td>
              <td>
                <Input
                  initialValue={`${char.force}`}
                  validations={{ isPositive: true }}
                />
              </td>
              <td>
                <Input
                  initialValue={`${char.speed}`}
                  validations={{ isNonNegative: true, isInteger: true }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit">Отправить данные</button>
    </form>
  )
}

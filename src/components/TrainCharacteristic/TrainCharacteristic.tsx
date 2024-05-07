import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.ts"
import { Input } from "../Input/Input.tsx"
import { FormEventHandler, useCallback, useEffect, useState } from "react"
import { updateCharacteristic } from "../../store/TrainsListSlice.ts"
import { Characteristic } from "../../types/trains.types.ts"

interface Props {
  activeTrain: string | null
}

export const TrainCharacteristic = ({ activeTrain }: Props) => {
  const dispatch = useAppDispatch()
  const [inputError, setInputError] = useState({})
  const trainInfo = useAppSelector(
    (state) =>
      state.trainsList.filter((trainInfo) => trainInfo.name === activeTrain)[0],
  )
  useEffect(() => {
    setInputError({})
  }, [activeTrain])

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const sortedSpeeds = trainInfo.characteristics
      .map((item) => +item.speed)
      .sort((a, b) => a - b)
    console.log(sortedSpeeds)
  }

  const inputErrorHandler = useCallback((error: boolean, key: string) => {
    setInputError((prevErrors) => ({
      ...prevErrors,
      [key]: error,
    }))
  }, [])

  const handleUpdateCharacteristic = useCallback(
    (index: number, field: keyof Characteristic, value: number | string) => {
      dispatch(
        updateCharacteristic({
          trainName: activeTrain || "",
          index,
          field,
          value,
        }),
      )
    },
    [dispatch, activeTrain],
  )

  if (activeTrain === null) return null
  return (
    <form onSubmit={onSubmit}>
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
          {trainInfo.characteristics.map((char, index) => {
            const key = trainInfo.name + index
            return (
              <tr key={key}>
                <td>
                  <Input
                    initialValue={`${char.engineAmperage}`}
                    validations={{ isInteger: true, isPositive: true }}
                    onErrorChange={(error) =>
                      inputErrorHandler(error, key + "engineAmperage")
                    }
                    onUpdate={(value) => {
                      handleUpdateCharacteristic(index, "engineAmperage", value)
                    }}
                  />
                </td>
                <td>
                  <Input
                    initialValue={`${char.force}`}
                    validations={{ isPositive: true }}
                    onErrorChange={(error) =>
                      inputErrorHandler(error, key + "force")
                    }
                    onUpdate={(value) => {
                      handleUpdateCharacteristic(index, "force", value)
                    }}
                  />
                </td>
                <td>
                  <Input
                    initialValue={`${char.speed}`}
                    validations={{ isNonNegative: true, isInteger: true }}
                    onErrorChange={(error) =>
                      inputErrorHandler(error, key + "speed")
                    }
                    onUpdate={(value) => {
                      handleUpdateCharacteristic(index, "speed", value)
                    }}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <button type="submit" disabled={Object.values(inputError).some(Boolean)}>
        Отправить данные
      </button>
    </form>
  )
}

import { Validations } from "../../types/validations.types.ts"
import { useValidation } from "../../hooks/useValidation.ts"
import { ChangeEventHandler, useEffect } from "react"

interface Props {
  initialValue: string
  validations: Validations
  onErrorChange: (e: boolean) => void
  onUpdate: (value: number | string) => void
}
export const Input = ({
  initialValue,
  validations,
  onErrorChange,
  onUpdate,
}: Props) => {
  const { value, error, onChange } = useValidation(initialValue, validations)
  useEffect(() => {
    onErrorChange(error)
  }, [error])
  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e)
    onUpdate(e.target.value)
  }
  return (
    <input
      className={error ? "error" : ""}
      onChange={onChangeHandler}
      value={value}
    />
  )
}

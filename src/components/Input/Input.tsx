import { Validations } from "../../types/validations.types.ts"
import { useValidation } from "../../hooks/useValidation.ts"

interface Props {
  initialValue: string
  validations: Validations
}
export const Input = ({ initialValue, validations }: Props) => {
  const { value, error, onChange } = useValidation(initialValue, validations)
  return (
    <input
      style={{ border: error ? "2px solid red" : "none", outline: "none" }}
      onChange={onChange}
      value={value}
    />
  )
}

import { Validations } from "../types/validations.types.ts"
import { ChangeEventHandler, useEffect, useState } from "react"

export const useValidation = (
  initialValue: string,
  validations: Validations,
) => {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState(false)
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    if (!/^(?!0\d)\d+(\.\d+)?$/.test(value)) {
      setError(true)
      return
    } else {
      setError(false)
    }

    for (const validation in validations) {
      switch (validation as keyof Validations) {
        case "isPositive":
          if (+value <= 0) {
            setError(true)
            return
          }
          setError(false)
          break
        case "isNonNegative":
          if (+value < 0) {
            setError(true)
            return
          }
          setError(false)
          break
        case "isInteger":
          setError(!/^\d+$/.test(value))
          break
      }
    }
  }, [value])

  return {
    value,
    onChange,
    error,
  }
}

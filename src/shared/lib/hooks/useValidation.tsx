"use client"
import { useEffect, useState } from "react"
export interface ValidationProp {
  isEmpty?: {value: boolean, message: string};
  minLength?: {value: number, message: string},
  maxLength?: {value: number, message: string}
}
export const useValidation = (value: string, validations: ValidationProp) => {
  const [isEmpty, setEmpty] = useState({value: validations?.isEmpty?.value || false, message: ''})
  const [minLengthError, setMinLengthError] = useState({value: false, message: ''})
  const [maxLengthError, setMaxLengthError] = useState({value: false, message: ''})
  const [isInputValid, setInputValid] = useState(false)
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < (validations?.minLength?.value || 0) ? setMinLengthError({value: true, message: validations?.minLength?.message || ''}) : setMinLengthError({value: false, message: ''})
          break
        case 'isEmpty':
          value ? setEmpty({value: false, message: ''}) : setEmpty({value: true, message: validations?.isEmpty?.message || ''})
          break
        case 'maxLength': 
          value.length > (validations?.maxLength?.value || 10000) ? setMaxLengthError({value:true, message: validations?.maxLength?.message || ''}) : setMaxLengthError({value: false, message: ''})
      }
    }
  }, [value])
  useEffect(() => {
    if (isEmpty.value || maxLengthError.value || minLengthError.value) {
      setInputValid(false)
    } else {
      setInputValid(true)
    }
  }, [isEmpty, maxLengthError, minLengthError])
  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    isInputValid
  }
}
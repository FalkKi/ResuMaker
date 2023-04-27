import { useState, useEffect } from 'react'

interface Validations {
  isEmpty: boolean
  isEmail?: boolean
  minLength?: number
  maxLength?: number
}

export const useInput = (initialValue: string, validations: Validations) => {
  const [value, setValue] = useState(initialValue)
  const [dirty, setDirty] = useState<boolean>(false)
  const valid = useValidation(value, validations)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const onBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDirty(true)
  }

  return {
    value,
    onChange,
    onBlur,
    dirty,
    ...valid
  }
}

export const useValidation = (value: string, validations: any) => {
  const [isEmpty, setisEmpty] = useState<boolean>(true)
  const [minLengthError, setMinLengthError] = useState<boolean>(false)
  const [maxLengthError, setMaxLengthError] = useState<boolean>(false)
  const [isEmailError, setIsEmailError] = useState<boolean>(false)
  const [inputValid, setInputValid] = useState<boolean>(false)

  useEffect(() => {
    if (validations) {
      for (const validation in validations) {
        if (validations) {
          switch (validation) {
            case 'minLength':
              value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
              break
            case 'isEmpty':
              value ? setisEmpty(false) : setisEmpty(true)
              break
            case 'maxLength':
              value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
              break
            case 'isEmail':
              const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
              re.test(String(value).toLowerCase()) ? setIsEmailError(false) : setIsEmailError(true)
              break
          };
        }
      };
    };
  }, [value])

  useEffect(() => {
    if (isEmpty || maxLengthError || minLengthError || isEmailError) {
      setInputValid(false)
    } else {
      setInputValid(true)
    };
  }, [isEmpty, maxLengthError, minLengthError, isEmailError])

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    isEmailError,
    inputValid
  }
}

import { useState, useEffect } from 'react';

export const useInput = (initialValue: string, validations: any) => {

   const [value, setValue] = useState(initialValue);
   const [dirty, setDirty] = useState<boolean>(false);
   const valid = useValidation(value, validations);

   const onChange = (e: any) => {
      setValue(e.target.value)
   };

   const onBlur = (e: any) => {
      setDirty(true)
   };

   return {
      value,
      onChange,
      onBlur,
      dirty,
      ...valid
   };
};

export const useValidation = (value: string, validations: any) => {

   const [isEmpty, setisEmpty] = useState<boolean>(true);
   const [minLengthError, setMinLengthError] = useState<boolean>(false);
   const [maxLengthError, setMaxLengthError] = useState<boolean>(false);
   const [isEmailError, setisEmailError] = useState<boolean>(false);
   const [inputValid, setInputValid] = useState<boolean>(false);
   console.log(inputValid)
   useEffect(() => {
      for (const validation in validations) {
         switch (validation) {
            case 'minLength':
               value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false);
               break;
            case 'isEmpty':
               value ? setisEmpty(false) : setisEmpty(true);
               break;
            case 'maxLength':
               value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false);
               break;
            case 'isEmail':
               const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
               re.test(String(value).toLowerCase()) ? setisEmailError(false) : setisEmailError(true)
               break;
         };
      };
   }, [value]);

   useEffect(() => {
      if (isEmpty || maxLengthError || minLengthError || isEmailError) {
         setInputValid(false);
      } else {
         setInputValid(true);
      };
   }, [isEmpty, maxLengthError, minLengthError, isEmailError])

   return {
      isEmpty,
      minLengthError,
      maxLengthError,
      isEmailError,
      inputValid
   };
};
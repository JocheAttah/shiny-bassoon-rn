import React, {useCallback, useEffect, useRef} from 'react'

export const checkInputValidation = refs => {
  let errorCounter = 0
  for (let i = 0; i < refs.length; i++) {
    const element = refs[i]
    if (element) {
      if (element.checkValidation() !== 0) {
        errorCounter++
      }
    }
  }

  return errorCounter === 0 ? true : false
}

export const checkFunction = f => (f && typeof f === 'function' ? true : false)

export const keyExtractor = (_, index) => index.toString()

export const isJsonString = str => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const useDebounce = (cb, delay) => {
  const inputsRef = useRef({cb, delay}) // mutable ref like with useThrottle
  useEffect(() => {
    inputsRef.current = {cb, delay}
  }) //also track cur. delay
  return useCallback(
    _.debounce((...args) => {
      // Debounce is an async callback. Cancel it, if in the meanwhile
      // (1) component has been unmounted (see isMounted in snippet)
      // (2) delay has changed
      if (inputsRef.current.delay === delay) inputsRef.current.cb(...args)
    }, delay),
    [delay, _.debounce],
  )
}

export const greetingFn = () => {
  const hours = new Date().getHours()
  const greetingTypes = ['Good morning', 'Good afternoon', 'Good evening']

  if (hours < 12) return greetingTypes[0]
  else if (hours < 18) return greetingTypes[1]
  else return greetingTypes[2]
}
export const getGreetingsIcon = time => {
  switch (time) {
    case 'Good morning':
      return '🌤️'
    case 'Good afternoon':
      return '🌤️'
    case 'Good evening':
      return '🌙'
    default:
      return '🌤️'
  }
}

export const formatName = value => {
  const properName =
    value?.substring?.(0, 1)?.toUpperCase?.() +
    value?.substring?.(1)?.toLowerCase?.()

  return properName ?? ''
}

export const formatNames = value => {
  const arr = value.split(' ')
  for (var i = 0; i < arr.length; i++) {
    arr[i] =
      arr[i]?.substring?.(0, 1)?.toUpperCase?.() +
      arr[i]?.substring?.(1)?.toLowerCase?.()
  }

  return (str2 = arr.join(' '))
}

export const getNameInitials = name => {
  if (name && typeof name === 'string') {
    const nameArray = name.split(' ')

    if (nameArray.length > 1) {
      const initials =
        nameArray[0].substring(0, 1).toUpperCase() +
        nameArray[1].substring(0, 1).toUpperCase()

      return initials
    }

    return name.trim().substring(0, 2).toUpperCase()
  }
}

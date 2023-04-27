export const generateId = () => {
  const id = Math.random().toString(36) + Math.random().toString(36)
  return id
}
export const isValidEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email)
}

export const isValidPassword = (password: string) => {
  if (password.length > 4) {
    return true
  } else return false
}

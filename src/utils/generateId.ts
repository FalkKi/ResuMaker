export const generateId = () => {
   let id = Math.random().toString(36) + Math.random().toString(36);
   return id;
};
export const isValidEmail = (email: string) => {
   return /\S+@\S+\.\S+/.test(email);
};

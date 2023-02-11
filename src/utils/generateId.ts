
export const generateId = () => {
   let id = Math.random().toString(36) + Math.random().toString(36);
   return id;
};

// export const getUserInfoData = (data: UserWorkHistory | LanguageInfoType | UserEducationHistory,
//    param: "educationHistory" | "workHistory" | "languages") => {
//    const index = userInfo[param].findIndex(el => el.id === data.id);

//    if (index !== -1) {
//       userInfo[param][index] = data;
//    } else{
//       setUserInfo(prevState => ({
//          ...prevState,
//          param: prevState[param].concat(data)
//       }));
//    };
// };
import React, { useCallback, useState } from "react"
import { EducationHistoryType, LanguageHistoryType, LanguageInfoType, SkillsHistoryType, User, UserEducationHistory, UserSkillType, UserWorkHistory, WorkHistoryType } from "../../types/types";
import PersonalData from "./PersonalData"
import { generateId } from './../../utils/generateId';
import instance from './../../requests/mainAxios';

const PersonalDataContainer: React.FC = () => {
   const [userInfo, setUserInfo] = useState<User>({
      imageUrl: '',
      jobTitle: '',
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      birthDate: '',
      email: '',
      profSummary: '',
      workHistory: [],
      educationHistory: [],
      languages: [],
      skills: [],
   });
   console.log(userInfo)
   const [childrenWorkHistoryArray, setChildrenWorkHistoryArray] = useState<WorkHistoryType[]>([]);
   const [childrenEducationHistoryArray, setChildrenEducationHistoryArray] = useState<EducationHistoryType[]>([]);
   const [childrenLanguageHistoryArray, setChildrenLanguageHistoryArray] = useState<LanguageHistoryType[]>([]);
   const [childrenSkillsHistoryArray, setChildrenSkillsHistoryArray] = useState<SkillsHistoryType[]>([]);


   const getUserInfoData = useCallback((data: UserWorkHistory | LanguageInfoType | UserEducationHistory | UserSkillType,
      param: "educationHistory" | "workHistory" | "languages" | "skills") => {
      const index = userInfo[param].findIndex(el => el.id === data.id);
      if (index !== -1) {
         userInfo[param][index] = data;
      } else {
         setUserInfo((prevState: User) => ({
            ...prevState,
            [param]: [...prevState[param], data]
         }));
      };
   }, [userInfo.workHistory, userInfo.educationHistory, userInfo.languages, userInfo.skills]);

   const eventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserInfo({ ...userInfo, [e.target.id]: e.target.value })
   };

   const deleteWorkHistoryElement = useCallback((id: string) => {
      setChildrenWorkHistoryArray(childrenWorkHistoryArray.filter((item: WorkHistoryType) => item.id !== id));
      setUserInfo((prevState: User) => ({
         ...prevState,
         workHistory: prevState.workHistory.filter((item: UserWorkHistory) => item.id !== id)
      }));
   }, [userInfo.workHistory]);

   const deleteEducationHistoryElement = useCallback((id: string) => {
      setChildrenEducationHistoryArray(childrenEducationHistoryArray.filter((item: EducationHistoryType) => item.id !== id));
      setUserInfo((prevState: User) => ({
         ...prevState,
         educationHistory: prevState.educationHistory.filter((item: UserEducationHistory) => item.id !== id)
      }));
   }, [userInfo.educationHistory]);

   const deleteLanguageHistoryElement = useCallback((id: string) => {
      setChildrenLanguageHistoryArray(childrenLanguageHistoryArray.filter((item: LanguageHistoryType) => item.id !== id));
      setUserInfo((prevState: User) => ({
         ...prevState,
         languages: prevState.languages.filter((item: LanguageInfoType) => item.id !== id)
      }));
   }, [userInfo.languages]);

   const deleteSkillsHistoryElement = useCallback((id: string) => {
      setChildrenSkillsHistoryArray(childrenSkillsHistoryArray.filter((item: SkillsHistoryType) => item.id !== id));
      setUserInfo((prevState: User) => ({
         ...prevState,
         skills: prevState.skills.filter((item: UserSkillType) => item.id !== id)
      }));
   }, [userInfo.skills]);

   const addEducationChildren = useCallback(() => {
      setChildrenEducationHistoryArray((prev: any) => ([
         ...prev,
         {
            id: generateId(),
            getUserInfoData: getUserInfoData,
         }
      ]));
   }, []);

   const addLanguageChildren = useCallback(() => {
      setChildrenLanguageHistoryArray((prev: any) => ([
         ...prev,
         {
            id: generateId(),
            getUserInfoData: getUserInfoData
         }
      ]));
   }, []);

   const addSkillsChildren = useCallback(() => {
      setChildrenSkillsHistoryArray((prev: any) => ([
         ...prev,
         {
            id: generateId(),
            getUserInfoData: getUserInfoData
         }
      ]));
   }, []);

   const addMoreWorkData = useCallback(() => {
      setChildrenWorkHistoryArray((prev: any) => ([
         ...prev,
         {
            id: generateId(),
            getUserInfoData: getUserInfoData,
         }
      ]));
   }, []);

   const handleChangeFile = async (event: any) => {
      event.preventDefault();
      const file = event.target.files[0];
      if (!file) return
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await instance.post('/upload', formData);
      setUserInfo({ ...userInfo, imageUrl: data.url });
   };

   const onClickRemoveImage = () => {
      setUserInfo((prev: User) => ({ ...prev, imageUrl: '' }))
   };


   return <PersonalData
      userInfo={userInfo}
      setUserInfo={setUserInfo}
      childrenWorkHistoryArray={childrenWorkHistoryArray}
      childrenEducationHistoryArray={childrenEducationHistoryArray}
      childrenLanguageHistoryArray={childrenLanguageHistoryArray}
      childrenSkillsHistoryArray={childrenSkillsHistoryArray}
      setChildrenWorkHistoryArray={setChildrenWorkHistoryArray}
      setChildrenEducationHistoryArray={setChildrenEducationHistoryArray}
      setChildrenLanguageHistoryArray={setChildrenLanguageHistoryArray}
      setChildrenSkillsHistoryArray={setChildrenSkillsHistoryArray}
      getUserInfoData={getUserInfoData}
      eventHandler={eventHandler}
      deleteWorkHistoryElement={deleteWorkHistoryElement}
      deleteEducationHistoryElement={deleteEducationHistoryElement}
      deleteLanguageHistoryElement={deleteLanguageHistoryElement}
      deleteSkillsHistoryElement={deleteSkillsHistoryElement}
      addEducationChildren={addEducationChildren}
      addLanguageChildren={addLanguageChildren}
      addSkillsChildren={addSkillsChildren}
      addMoreWorkData={addMoreWorkData}
      handleChangeFile={handleChangeFile}
      onClickRemoveImage={onClickRemoveImage}
   />
};

export default PersonalDataContainer;
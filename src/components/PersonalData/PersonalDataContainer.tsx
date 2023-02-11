import React, { useState } from "react"
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

   const [childrenWorkHistoryArray, setChildrenWorkHistoryArray] = useState<WorkHistoryType[]>([]);
   const [childrenEducationHistoryArray, setChildrenEducationHistoryArray] = useState<EducationHistoryType[]>([]);
   const [childrenLanguageHistoryArray, setChildrenLanguageHistoryArray] = useState<LanguageHistoryType[]>([]);
   const [childrenSkillsHistoryArray, setChildrenSkillsHistoryArray] = useState<SkillsHistoryType[]>([]);
   const [isCollapsed, setIsCollapsed] = useState<boolean | undefined>(true);


   const getUserInfoData = (data: UserWorkHistory | LanguageInfoType | UserEducationHistory | UserSkillType,
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
   };
   
   const eventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserInfo({ ...userInfo, [e.target.placeholder]: e.target.value })
   };

   const deleteWorkHistoryElement = (id: string) => {
      setChildrenWorkHistoryArray(childrenWorkHistoryArray.filter((item: WorkHistoryType) => item.id !== id));
      setUserInfo((prevState: User) => ({
         ...prevState,
         workHistory: prevState.workHistory.filter((item: UserWorkHistory) => item.id !== id)
      }));
   };

   const deleteEducationHistoryElement = (id: string) => {
      setChildrenEducationHistoryArray(childrenEducationHistoryArray.filter((item: EducationHistoryType) => item.id !== id));
      setUserInfo((prevState: User) => ({
         ...prevState,
         educationHistory: prevState.educationHistory.filter((item: UserEducationHistory) => item.id !== id)
      }));
   };

   const deleteLanguageHistoryElement = (id: string) => {
      setChildrenLanguageHistoryArray(childrenLanguageHistoryArray.filter((item: LanguageHistoryType) => item.id !== id));
      setUserInfo((prevState: User) => ({
         ...prevState,
         languages: prevState.languages.filter((item: LanguageInfoType) => item.id !== id)
      }));
   };

   const deleteSkillsHistoryElement = (id: string) => {
      setChildrenSkillsHistoryArray(childrenSkillsHistoryArray.filter((item: SkillsHistoryType) => item.id !== id));
      setUserInfo((prevState: User) => ({
         ...prevState,
         skills: prevState.skills.filter((item: UserSkillType) => item.id !== id)
      }));
   };

   const addEducationChildren = () => {
      setChildrenEducationHistoryArray((prev: any) => ([
         ...prev,
         {
            id: generateId(),
            getUserInfoData: getUserInfoData,
         }
      ]));
   };

   const addLanguageChildren = () => {
      setChildrenLanguageHistoryArray((prev: any) => ([
         ...prev,
         {
            id: generateId(),
            getUserInfoData: getUserInfoData
         }
      ]));
   };

   const addSkillsChildren = () => {
      setChildrenSkillsHistoryArray((prev: any) => ([
         ...prev,
         {
            id: generateId(),
            getUserInfoData: getUserInfoData
         }
      ]));
   };

   const addMoreWorkData = () => {
      setChildrenWorkHistoryArray((prev: any) => ([
         ...prev,
         {
            id: generateId(),
            getUserInfoData: getUserInfoData,
         }
      ]));
   };

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
      isCollapsed={isCollapsed}
      setIsCollapsed={setIsCollapsed}
   />
};

export default PersonalDataContainer;

export type User = {
   imageUrl: string,
   jobTitle: string,
   firstName: string,
   lastName: string,
   country: string,
   city: string,
   birthDate: string,
   email: string,
   profSummary: string,
   workHistory: Array<UserWorkHistory>,
   educationHistory: Array<UserEducationHistory>,
   languages: Array<LanguageInfoType>
   skills: Array<UserSkillType>
};

export type WorkHistoryType = {
   id: string,
};

export type EducationHistoryType = {
   id: string,
};

export type SkillsHistoryType = {
   id: string,
};

export type WorkHistoryProps = {
   id: string,
   getUserInfoData: (data: UserWorkHistory | LanguageInfoType | UserEducationHistory | UserSkillType,
      param: "educationHistory" | "workHistory" | "languages" | "skills") => void,
   deleteWorkHistoryElement: (id: string) => void,
   isCollapsed: boolean | undefined,
   setIsCollapsed: React.Dispatch<React.SetStateAction<boolean | undefined>>
};

export type LanguageHistoryProps = {
   id: string,
   deleteLanguageHistoryElement: (id: string) => void
   getUserInfoData: (data: UserWorkHistory | LanguageInfoType | UserEducationHistory | UserSkillType,
      param: "educationHistory" | "workHistory" | "languages" | "skills") => void,
};

export type SkillsHistoryProps = {
   id: string,
   deleteSkillsHistoryElement: (id: string) => void
   getUserInfoData: (data: UserWorkHistory | LanguageInfoType | UserEducationHistory | UserSkillType,
      param: "educationHistory" | "workHistory" | "languages" | "skills") => void,
};

export type EducationHistoryProps = {
   id: string,
   deleteEducationHistoryElement: (id: string) => void,
   getUserInfoData: (data: UserWorkHistory | LanguageInfoType | UserEducationHistory | UserSkillType,
      param: "educationHistory" | "workHistory" | "languages" | "skills") => void,
}

export type PersonalDataProps = {
   userInfo: User,
   setUserInfo: React.Dispatch<React.SetStateAction<any>>,
   childrenWorkHistoryArray: WorkHistoryType[],
   childrenEducationHistoryArray: EducationHistoryType[],
   childrenLanguageHistoryArray: LanguageHistoryType[],
   childrenSkillsHistoryArray: SkillsHistoryType[],
   setChildrenWorkHistoryArray: React.Dispatch<React.SetStateAction<WorkHistoryType[]>>,
   setChildrenEducationHistoryArray: React.Dispatch<React.SetStateAction<EducationHistoryType[]>>,
   setChildrenLanguageHistoryArray: React.Dispatch<React.SetStateAction<LanguageHistoryType[]>>,
   setChildrenSkillsHistoryArray: React.Dispatch<React.SetStateAction<SkillsHistoryType[]>>,
   getUserInfoData: (data: UserWorkHistory | LanguageInfoType | UserEducationHistory | UserSkillType,
      param: "educationHistory" | "workHistory" | "languages" | "skills") => void,
   eventHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
   deleteWorkHistoryElement: (id: string) => void,
   deleteEducationHistoryElement: (id: string) => void,
   deleteLanguageHistoryElement: (id: string) => void,
   deleteSkillsHistoryElement: (id: string) => void,
   addEducationChildren: () => void,
   addLanguageChildren: () => void,
   addSkillsChildren: () => void,
   addMoreWorkData: () => void,
   handleChangeFile: (event: any) => Promise<void>,
   onClickRemoveImage: () => void,
   isCollapsed: boolean | undefined,
   setIsCollapsed: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

export type UserWorkHistory = {
   id: string,
   position: string,
   company: string,
   startDate: string,
   endDate: string,
   description: string
};

export type UserEducationHistory = {
   id: string,
   studies: string,
   location: string,
   institution: string,
   startDate: string,
   endDate: string,
   description: string,
};

export type LanguageInfoType = {
   id: string,
   languageName: string,
   level: string,
};

export type UserSkillType = {
   id: string,
   skillName: string,
   skillLevel: string
}

export type LanguageHistoryType = {
   id: string,
};



export interface User {
  imageUrl: string
  jobTitle: string
  firstName: string
  lastName: string
  country: string
  city: string
  birthDate: string
  email: string
  profSummary: string
  workHistory: UserWorkHistory[]
  educationHistory: UserEducationHistory[]
  languages: LanguageInfoType[]
  skills: UserSkillType[]
  userId: string
}

export interface WorkHistoryType {
  id: string
}

export interface EducationHistoryType {
  id: string
}

export interface SkillsHistoryType {
  id: string
}
export interface LanguageHistoryType {
  id: string
}
interface IComponentProps {
  id: string
  getUserInfoData: (data: UserWorkHistory | LanguageInfoType | UserEducationHistory | UserSkillType,
    param: 'educationHistory' | 'workHistory' | 'languages' | 'skills') => void
};

export interface WorkHistoryProps extends IComponentProps {
  deleteWorkHistoryElement: (id: string) => void
  workData: UserWorkHistory[]
};

export interface LanguageHistoryProps extends IComponentProps {
  deleteLanguageHistoryElement: (id: string) => void
};

export interface SkillsHistoryProps extends IComponentProps {
  deleteSkillsHistoryElement: (id: string) => void
};

export interface EducationHistoryProps extends IComponentProps {
  deleteEducationHistoryElement: (id: string) => void
};

export interface StartUserInfoProps {
  isErrorEmail: string | null
  eventHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  userInfo: User
}

export interface ProfSummaryProps {
  setUserInfo: (value: React.SetStateAction<User>) => void
  profSummary: string
  userInfo: User
}

export interface PersonalDataProps {
  id: string | null
  userInfo: User
  setUserInfo: React.Dispatch<React.SetStateAction<any>>
  childrenWorkHistoryArray: WorkHistoryType[]
  childrenEducationHistoryArray: EducationHistoryType[]
  childrenLanguageHistoryArray: LanguageHistoryType[]
  childrenSkillsHistoryArray: SkillsHistoryType[]
  setChildrenWorkHistoryArray: React.Dispatch<React.SetStateAction<WorkHistoryType[]>>
  setChildrenEducationHistoryArray: React.Dispatch<React.SetStateAction<EducationHistoryType[]>>
  setChildrenLanguageHistoryArray: React.Dispatch<React.SetStateAction<LanguageHistoryType[]>>
  setChildrenSkillsHistoryArray: React.Dispatch<React.SetStateAction<SkillsHistoryType[]>>
  getUserInfoData: (data: UserWorkHistory | LanguageInfoType | UserEducationHistory | UserSkillType,
    param: 'educationHistory' | 'workHistory' | 'languages' | 'skills') => void
  eventHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  deleteWorkHistoryElement: (id: string) => void
  deleteEducationHistoryElement: (id: string) => void
  deleteLanguageHistoryElement: (id: string) => void
  deleteSkillsHistoryElement: (id: string) => void
  addEducationChildren: () => void
  addLanguageChildren: () => void
  addSkillsChildren: () => void
  addMoreWorkData: () => void
  handleChangeFile: (event: any) => Promise<void>
  onClickRemoveImage: () => void
}

export interface UserWorkHistory {
  id: string
  position: string
  company: string
  startDate: string
  endDate: string
  description: string
}

export interface UserEducationHistory {
  id: string
  studies: string
  location: string
  institution: string
  startDate: string
  endDate: string
  description: string
}

export interface LanguageInfoType {
  id: string
  languageName: string
  level: string
}

export interface UserSkillType {
  id: string
  skillName: string
  skillLevel: string
}

export interface Info {
  info: {
    userWorkHistory?: UserWorkHistory
    userEducationHistory?: UserEducationHistory
    languageInfoType?: LanguageInfoType
    userSkillType?: UserSkillType
  }
  setIsCollaped: React.Dispatch<React.SetStateAction<boolean | undefined>>
  isCollapsed: boolean | undefined
  id: string
  deleteElement: (id: string) => void
};

export interface userRegisterType {
  email: string
  password: string
}
export interface FormValues {
  email: string
  password: string
}

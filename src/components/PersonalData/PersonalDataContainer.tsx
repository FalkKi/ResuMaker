/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import {
  type EducationHistoryType,
  type LanguageHistoryType,
  type LanguageInfoType,
  type SkillsHistoryType,
  type User,
  type UserEducationHistory,
  type UserSkillType,
  type UserWorkHistory,
  type WorkHistoryType,
} from "../../types/types";
import PersonalData from "./PersonalData";
import { generateId } from "../../utils/helpers";
import instance from "./../../requests/mainAxios";
import { useAppDispatch, useAppSelector } from "./../../redux/store";
import { fetchLastCvCurrentUser } from "./../../requests/cvRequests";
import Preloader from "../Preloader/Preloader";

const PersonalDataContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [id] = useState<string | null>(null);
  const userId = useAppSelector((state) => {
    if (state.auth.data != null) {
      return state.auth.data._id;
    }
  });
  const userCV = useAppSelector((state) => {
    if (state.setCVs.cvInfo) {
      return state.setCVs.cvInfo;
    }
  });
  useEffect(() => {
    if (userId) {
      dispatch(fetchLastCvCurrentUser(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (userCV) {
      setUserInfo((prev: User) => ({
        ...prev,
        imageUrl: userCV.imageUrl,
        jobTitle: userCV.jobTitle,
        firstName: userCV.firstName,
        lastName: userCV.lastName,
        profSummary: userCV.profSummary,
        city: userCV.city,
        country: userCV.country,
        birthDate: userCV.birthDate,
        email: userCV.email,
        workHistory: userCV.workHistory,
        educationHistory: userCV.educationHistory,
        skills: userCV.skills,
        languages: userCV.languages,
      }));
    };
  }, [userCV]);

  const [userInfo, setUserInfo] = useState<User>({
    imageUrl: "",
    jobTitle: "",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    birthDate: "",
    email: "",
    profSummary: "",
    workHistory: [],
    educationHistory: [],
    languages: [],
    skills: [],
    userId: "",
  });

  const [childrenWorkHistoryArray, setChildrenWorkHistoryArray] = useState<
    WorkHistoryType[]
  >([]);
  const [childrenEducationHistoryArray, setChildrenEducationHistoryArray] =
    useState<EducationHistoryType[]>([]);
  const [childrenLanguageHistoryArray, setChildrenLanguageHistoryArray] =
    useState<LanguageHistoryType[]>([]);
  const [childrenSkillsHistoryArray, setChildrenSkillsHistoryArray] = useState<
    SkillsHistoryType[]
  >([]);

  const getUserInfoData = useCallback(
    (
      data:
        | UserWorkHistory
        | LanguageInfoType
        | UserEducationHistory
        | UserSkillType,
      param: "educationHistory" | "workHistory" | "languages" | "skills"
    ) => {
      const index = userInfo[param].findIndex((el) => el.id === data.id);
      if (index !== -1) {
        userInfo[param][index] = data;
      } else {
        setUserInfo((prevState: User) => ({
          ...prevState,
          [param]: [...prevState[param], data],
        }));
      }
    },
    [
      userInfo.workHistory,
      userInfo.educationHistory,
      userInfo.languages,
      userInfo.skills,
    ]
  );

  const eventHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
    },
    [
      userInfo.birthDate,
      userInfo.city,
      userInfo.country,
      userInfo.firstName,
      userInfo.lastName,
      userInfo.email,
      userInfo.imageUrl,
      userInfo.jobTitle,
    ]
  );

  const deleteWorkHistoryElement = useCallback(
    (id: string) => {
      setChildrenWorkHistoryArray(
        childrenWorkHistoryArray.filter(
          (item: WorkHistoryType) => item.id !== id
        )
      );
      setUserInfo((prevState: User) => ({
        ...prevState,
        workHistory: prevState.workHistory.filter(
          (item: UserWorkHistory) => item.id !== id
        ),
      }));
    },
    [userInfo.workHistory]
  );

  const deleteEducationHistoryElement = useCallback(
    (id: string) => {
      setChildrenEducationHistoryArray(
        childrenEducationHistoryArray.filter(
          (item: EducationHistoryType) => item.id !== id
        )
      );
      setUserInfo((prevState: User) => ({
        ...prevState,
        educationHistory: prevState.educationHistory.filter(
          (item: UserEducationHistory) => item.id !== id
        ),
      }));
    },
    [userInfo.educationHistory]
  );

  const deleteLanguageHistoryElement = useCallback(
    (id: string) => {
      setChildrenLanguageHistoryArray(
        childrenLanguageHistoryArray.filter(
          (item: LanguageHistoryType) => item.id !== id
        )
      );
      setUserInfo((prevState: User) => ({
        ...prevState,
        languages: prevState.languages.filter(
          (item: LanguageInfoType) => item.id !== id
        ),
      }));
    },
    [userInfo.languages]
  );

  const deleteSkillsHistoryElement = useCallback(
    (id: string) => {
      setChildrenSkillsHistoryArray(
        childrenSkillsHistoryArray.filter(
          (item: SkillsHistoryType) => item.id !== id
        )
      );
      setUserInfo((prevState: User) => ({
        ...prevState,
        skills: prevState.skills.filter(
          (item: UserSkillType) => item.id !== id
        ),
      }));
    },
    [userInfo.skills]
  );

  const addEducationChildren = useCallback(() => {
    setChildrenEducationHistoryArray((prev: EducationHistoryType[]) => [
      ...prev,
      {
        id: generateId(),
        getUserInfoData,
      },
    ]);
  }, []);

  const addLanguageChildren = useCallback(() => {
    setChildrenLanguageHistoryArray((prev: LanguageHistoryType[]) => [
      ...prev,
      {
        id: generateId(),
        getUserInfoData,
      },
    ]);
  }, []);

  const addSkillsChildren = useCallback(() => {
    setChildrenSkillsHistoryArray((prev: SkillsHistoryType[]) => [
      ...prev,
      {
        id: generateId(),
        getUserInfoData,
      },
    ]);
  }, []);

  const addMoreWorkData = useCallback(() => {
    setChildrenWorkHistoryArray((prev: WorkHistoryType[]) => [
      ...prev,
      {
        id: generateId(),
        getUserInfoData,
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  }, []);

  const handleChangeFile = async (event: any) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const { data } = await instance.post("/upload", formData);
      setUserInfo({ ...userInfo, imageUrl: data.url });
    } catch (err) {
      console.log(err);
      alert("Please check your intenet connection");
    }
  };

  const onClickRemoveImage = () => {
    setUserInfo((prev: User) => ({ ...prev, imageUrl: "" }));
  };

  if (userInfo.jobTitle === "") {
    return <Preloader />;
  }
  return (
    <>
      <PersonalData
        userInfo={userInfo}
        id={id}
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
    </>
  );
};

export default PersonalDataContainer;

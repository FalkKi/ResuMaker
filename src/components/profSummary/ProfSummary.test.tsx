import ProfSummary from "./ProfSummary";
import React from "react";
import { getByRole, render, screen } from "@testing-library/react";

describe(ProfSummary, () => {
   it('Render component', () => {
      render(<ProfSummary
         setUserInfo={() => { }}
         profSummary={'test'}
         userInfo={{
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
         }}
      />);
      const textArea = screen.getByRole("textbox")
      expect(textArea).toBeInTheDocument();
   })
})
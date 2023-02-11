import React from "react";
import TextareaAutosize from '@mui/base/TextareaAutosize';

type Props = {
   setUserInfo: Function,
   profSummary: string,
   userInfo: object
}

const ProfSummary: React.FC<Props> = ({ setUserInfo, userInfo, profSummary }) => {

   return (
      <div>
         <h3>Profile</h3>
         <div>Write some information about you</div>
         <TextareaAutosize
            value={profSummary}
            onChange={(e) => setUserInfo({ ...userInfo, profSummary: e.target.value })}
            aria-label="minimum height"
         />
      </div>
   );
};

export default ProfSummary;
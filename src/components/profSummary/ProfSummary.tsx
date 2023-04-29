import React from "react";
import { type ProfSummaryProps } from "../../types/types";
import styles from "./profSummary.module.css";
import Box from "@mui/material/Box";
import "easymde/dist/easymde.min.css";

const ProfSummary: React.FC<ProfSummaryProps> = ({
  setUserInfo,
  userInfo,
  profSummary,
}) => {
  return (
    <Box>
      <h3 className={styles.profSummaryTitle}>
        Information about you and your professional experience
      </h3>
      <textarea
        maxLength={800}
        className={styles.textarea}
        value={profSummary}
        onChange={(e) => {
          setUserInfo({ ...userInfo, profSummary: e.target.value });
        }}
      />
    </Box>
  );
};

export default ProfSummary;

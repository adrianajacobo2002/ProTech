"use client";

import Button from "@mui/material/Button";
import style from "./styles.module.scss";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

export default function btnShowTickets({ onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      className={style["btn-showTickets"]}
      variant="contained"
      endIcon={<KeyboardArrowRightRoundedIcon />}
      sx={{
        backgroundColor: "#BAF266",
        "&:hover": {
          backgroundColor: "#BAF266",
        },
      }}
    >
      <b>Ver Tickets</b>
    </Button>
  );
}

type Props = {
  onClick?: () => void;
};

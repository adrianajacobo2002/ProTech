'use client';
import Button from "@mui/material/Button";
import style from "./styles.module.scss"
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { Poppins } from "next/font/google";

export default function btnShowTickets(){
    return(
      <Button className={style["btn-showTickets"]}  variant="contained" endIcon={<KeyboardArrowRightRoundedIcon />}>
      <b>Ver Tickets</b>
    </Button>
    );
}
"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import style from "./styles.module.scss";
import CreateTicketModal from "@/components/create-ticket";

export default function CreateTicketButton() {
  const [modalShow, setModalShow] = React.useState(false);

  const handleShowModal = () => setModalShow(true);
  const handleHideModal = () => setModalShow(false);

  return (
    <div>
      <Button
        className={style["btn-createTicket"]}
        variant="contained"
        endIcon={<AddRoundedIcon />}
        onClick={handleShowModal}
        sx={{
          backgroundColor: '#BAF266',
          '&:hover': {
            backgroundColor: '#BAF266',
          },
        }}
      >
        Crear nuevo ticket
      </Button>

      <CreateTicketModal show={modalShow} onHide={handleHideModal} />
    </div>
  );
}

"use client";
import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import Image from "next/image";
import logout from "@/assets/images/logout-icon.svg"
import style from "./styles.module.scss";

interface TaskResumeProps {
  show: boolean;
  onHide: () => void;
}

function TaskResume(props: TaskResumeProps) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="p-5">
        
        <Image
        src={logout}
        width={75}
        height={75}
        alt="logout icon"
        />
        <p>¿Está seguro que desea cerrar sesión?</p>

        
          <div className="pt-5 text-center">
            <Button
              fullWidth
              className={style["btn-sendInfo"]}
              variant="contained"
              sx={{
                backgroundColor: '#BAF266',
                '&:hover': {
                  backgroundColor: '#BAF266',
                },
              }}
            >
              Enviar
            </Button>
          </div>
        
      </Modal.Body>
    </Modal>
  );
}

interface TasksResumeModalProps {
  show: boolean;
  onHide: () => void;
}

export default function TasksResumeModal(props: TasksResumeModalProps) {
  return <TaskResume show={props.show} onHide={props.onHide} />;
}

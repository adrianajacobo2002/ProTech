"use client";
import * as React from "react";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import Button from "@mui/material/Button";
import style from "./styles.module.scss";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";

interface ClientSignUpProps {
  show: boolean;
  onHide: () => void;
}

function ClientSignUp(props: ClientSignUpProps) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Body className="p-5 text-center">
        <Image src={logo} width={200} height={100} alt="prueba de imagen" />
        <h4 className="py-2 text-center">Registrar Cliente</h4>
        <div>
          <div>
            <Row className="py-3">
              <Col md={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  type="name"
                  label="Nombre"
                  variant="outlined"
                  size="small"
                />
              </Col>
              <Col md={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  type="name"
                  label="Apellidos"
                  variant="outlined"
                  size="small"
                />
              </Col>
            </Row>
          </div>
          <div>
            <Row className="py-3">
              <Col>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  type="email"
                  label="Correo Electrónico"
                  variant="outlined"
                  size="small"
                />
              </Col>
            </Row>
          </div>
          <div>
            <Row className="py-3">
              <Col>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Número Telefónico"
                  variant="outlined"
                  size="small"
                />
              </Col>
            </Row>
          </div>
          <div>
            <Row className="py-3">
              <Col>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  type="text"
                  label="Nombre de la Empresa"
                  variant="outlined"
                  size="small"
                />
              </Col>
            </Row>
          </div>
          <div>
            <Row className="py-3">
              <Col>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  type="password"
                  label="Contraseña"
                  variant="outlined"
                  size="small"
                />
              </Col>
            </Row>
          </div>

          <Button
            fullWidth
            className={style["btn-sendInfo"]}
            variant="contained"
          >
            Registrar Cliente
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

interface ClientSignUpModalProps {
  show: boolean;
  onHide: () => void;
}

export default function ClientSignUpModal(props: ClientSignUpModalProps) {
  return <ClientSignUp show={props.show} onHide={props.onHide} />;
}

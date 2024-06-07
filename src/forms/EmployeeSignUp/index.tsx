"use client";
import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import style from "./styles.module.scss";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface EmployeeSignUpProps {
  show: boolean;
  onHide: () => void;
}

function EmployeeSignUp(props: EmployeeSignUpProps) {
  const [role, setRole] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };
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
        <h4 className="py-2 text-center">Registrar Empleado</h4>
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
              <Col md={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  type="text"
                  label="Cargo en la Empresa"
                  variant="outlined"
                  size="small"
                />
              </Col>
              <Col md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Prioridad
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Rol"
                    size="small"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Administrador</MenuItem>
                    <MenuItem value={2}>Soporte Técnico</MenuItem>
                  </Select>
                </FormControl>
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
            Registrar Empleado
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

interface EmployeeSignUpModalProps {
  show: boolean;
  onHide: () => void;
}

export default function EmployeeSignUpModal(props: EmployeeSignUpModalProps) {
  return <EmployeeSignUp show={props.show} onHide={props.onHide} />;
}

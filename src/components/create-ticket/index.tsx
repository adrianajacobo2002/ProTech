"use client";
import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import style from "./styles.module.scss";
import Image from "next/image";
import logoLetra from "@/assets/images/logoLetras.svg";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface CreateTicketProps {
  show: boolean;
  onHide: () => void;
}

function CreateTicket(props: CreateTicketProps) {
  const [prioridad, setPrioridad] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setPrioridad(event.target.value as string);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Body className="text-center px-5">
        <Image src={logoLetra} alt="Logo ProTech" width={300} height={150} />

        <div className="pb-4">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Nombre de aplicación o servicio"
            variant="outlined"
          />
        </div>

        <div className="pb-4">
          <TextField
            fullWidth
            id="outlined-multiline-flexible"
            label="Descripción"
            multiline
            rows={4}
          />
        </div>

        <div>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" multiple />
              </Form.Group>
            </Col>
            <Col md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Prioridad</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={prioridad}
                  label="Prioridad"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Baja</MenuItem>
                  <MenuItem value={2}>Media</MenuItem>
                  <MenuItem value={3}>Alta</MenuItem>
                </Select>
              </FormControl>
            </Col>
          </Row>
        </div>

        <h5 className="text-start py-3">Detalles de Contacto</h5>
        <div>
          <Row className="pb-4">
            <Col md={6}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Nombres"
                variant="outlined"
              />
            </Col>
            <Col md={6} >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Apellidos"
                variant="outlined"
              />
            </Col>
          </Row>
          <Row className="pb-4">
            <Col>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Correo Electrónico"
                variant="outlined"
              />
            </Col>
          </Row>
          <Row className="pb-4">
            <Col>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Número Telefónicoo"
                variant="outlined"
              />
            </Col>
          </Row>
        </div>

        <Button fullWidth className={style["btn-sendInfo"]} variant="contained">
          Enviar
        </Button>
      </Modal.Body>
    </Modal>
  );
}

interface CreateTicketModalProps {
  show: boolean;
  onHide: () => void;
}

export default function CreateTicketModal(props: CreateTicketModalProps) {
  return <CreateTicket show={props.show} onHide={props.onHide} />;
}

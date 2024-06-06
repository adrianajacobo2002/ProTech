"use client";
import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import style from "./styles.module.scss"

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
        <h4 className="py-2">Ticket #12345</h4>
        <div>
          <Row className="py-2">
            <Col md={4}><b>Tarea Número</b></Col>
            <Col md={4}><b>Encargado</b></Col>
            <Col md={4}><b>Estado</b></Col>
          </Row>
          <Row>
            <Col md={4}>Tarea 1</Col>
            <Col md={4}>José P</Col>
            <Col md={4}>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-status">
                  Status de la Tarea
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">En progreso</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    En espera de información del cliente
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Resuelto</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          <div className="py-4">
            <Form>
              <Form.Group className="mb-3" controlId="InputComentario">
                <Form.Label>
                    <b>Comentario</b>
                </Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </div>

          <Button
          fullWidth
            className={style["btn-sendInfo"]}
            variant="contained"
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
    return (
      <TaskResume
        show={props.show}
        onHide={props.onHide}
      />
    );
}

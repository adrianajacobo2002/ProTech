"use client";
import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import style from "./styles.module.scss";
import TextField from "@mui/material/TextField";

interface TaskReportProps {
  show: boolean;
  onHide: () => void;
}

function TaskReport(props: TaskReportProps) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Body className="p-5">
        <h4 className="py-2">Ticket #12345</h4>
        <div>
          <Row className="py-2">
            <Col md={4}>
              <b>Tarea Número</b>
              <Col md={4}>Tarea 1</Col>
            </Col>
            <Col md={4}>
              <b>Encargado</b>
              <Col md={4}>José P</Col>
            </Col>
            <Col md={4}>
              <b>Estado</b>
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
        </div>
      </Modal.Body>
    </Modal>
  );
}

interface TasksReportModalProps {
  show: boolean;
  onHide: () => void;
}

export default function TasksResumeModal(props: TasksReportModalProps) {
  return <TaskReport show={props.show} onHide={props.onHide} />;
}

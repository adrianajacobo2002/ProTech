"use client";
import * as React from "react";
import WelcomeCard from "@/components/welcome-card";
import { Col, Row, Card } from "react-bootstrap";
import ButtonCrear from "@/components/button-create";
import Image from "next/image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import imgpc from "@/assets/images/modern desktop computer-bro.png";
import img from "@/assets/images/danger.svg";
import Avatar from "@mui/material/Avatar";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import AutoModeRoundedIcon from "@mui/icons-material/AutoModeRounded";
import HistoryToggleOffRoundedIcon from "@mui/icons-material/HistoryToggleOffRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import IconButton from "@mui/material/IconButton";
import TasksResumeModal from "@/components/task-resume";
import CreateTicketModal from "@/components/create-ticket";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import style from "./style.module.scss";

export default function Dashboard() {
  const [modalShow, setModalShow] = React.useState(false);
  const [ChangePShow, setChangePShow] = React.useState(false);

  const handleShowModal = () => setModalShow(true);
  const handleHideModal = () => setModalShow(false);

  return (
    <div>
      <div className="d-flex justify-content-end pb-4">
        <ButtonCrear />

        <Button variant="contained" onClick={() => setChangePShow(true)}>
          Pa activar la modal
        </Button>
        <ChangePasswordModal
          show={ChangePShow}
          onHide={() => setChangePShow(false)}
        />
      </div>

      <div>
        <Row>
          <Col md={4}>
            <WelcomeCard />
            <br />
            <Card body>
              <small className="py-2">
                Te han sido asignadas <b>4</b> tareas
              </small>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 200 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <b>ID</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Ver Tarea</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align="center">
                        12345678
                      </TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="ver" onClick={handleShowModal}>
                          <AddCircleOutlineRoundedIcon />
                        </IconButton>
                        <TasksResumeModal
                          show={modalShow}
                          onHide={handleHideModal}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Col>

          <Col md={8}>
            <Card className="px-4 pt-4">
              <h4 style={{ fontSize: "25px" }}>
                <b>Estado de Tickets</b>
              </h4>

              <Row className="align-items-center">
                <Col md={4} className="align-content-center">
                  <ul>
                    <li className="mb-2 d-flex align-items-center pb-4">
                      <Avatar style={{backgroundColor:'var(--green)', color:"black"}}>
                        <ChecklistRoundedIcon />
                      </Avatar>
                      <div className="">
                        <div className="ms-4">
                          <Row>
                            <Col>
                              <p
                                style={{ fontSize: "25px", fontWeight: "bold" }}
                              >
                                10
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>Total</Col>
                          </Row>
                        </div>
                      </div>
                    </li>
                    <li className="mb-2 d-flex align-items-center pb-4">
                      <Avatar style={{backgroundColor:'var(--green)', color:"black"}}>
                        <CheckCircleOutlineRoundedIcon />
                      </Avatar>
                      <div className="">
                        <div className="ms-4">
                          <Row>
                            <Col>
                              <p
                                style={{ fontSize: "25px", fontWeight: "bold" }}
                              >
                                2
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>Resueltos</Col>
                          </Row>
                        </div>
                      </div>
                    </li>
                    <li className="mb-2 d-flex align-items-center pb-4">
                      <Avatar style={{backgroundColor:'var(--green)', color:"black"}}>
                        <AutoModeRoundedIcon />
                      </Avatar>{" "}
                      <div className="">
                        <div className="ms-4">
                          <Row>
                            <Col>
                              <p
                                style={{ fontSize: "25px", fontWeight: "bold" }}
                              >
                                6
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>En Progreso</Col>
                          </Row>
                        </div>
                      </div>
                    </li>
                    <li className="mb-2 d-flex align-items-center">
                      <Avatar style={{backgroundColor:'var(--green)', color:"black"}}>
                        <HistoryToggleOffRoundedIcon />{" "}
                      </Avatar>
                      <div className="">
                        <div className="ms-4">
                          <Row>
                            <Col>
                              <p
                                style={{ fontSize: "25px", fontWeight: "bold" }}
                              >
                                2
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>En Espera</Col>
                          </Row>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Col>
                <Col md={8}>
                  <Image
                    src={imgpc}
                    width={500}
                    height={500}
                    alt="Ticket Status"
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

interface ChangePProps {
  show: boolean;
  onHide: () => void;
}

function ChangePasswordModal(props: ChangePProps) {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Body className="p-5">
        <div className="text-center">
          <div className="pb-5">
            <Image src={img} alt="Logo de Protech" width={75} height={75} />
          </div>
          <div>
            <h5>¡Actualización de Contraseña Requerida!</h5>
            <p>
              Para garantizar la seguridad de tu cuenta, te solicitamos que
              actualices tu contraseña por defecto al iniciar sesión por primera
              vez.
            </p>
          </div>
          <div>
            <Row className="py-3">
              <Col>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  type="password"
                  label="Actualizar Contraseña"
                  variant="outlined"
                />
              </Col>
            </Row>
          </div>

          <div>
            <Button
              fullWidth
              variant="contained"
              className={style["btn-updatePassword"]}
            >
              Actualizar Contraseña
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

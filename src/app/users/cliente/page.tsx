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
import Avatar from "@mui/material/Avatar";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import AutoModeRoundedIcon from "@mui/icons-material/AutoModeRounded";
import HistoryToggleOffRoundedIcon from "@mui/icons-material/HistoryToggleOffRounded";
import IconButton from "@mui/material/IconButton";
import CreateTicketModal from "@/components/ticket-report";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";


export default function DashboardCliente() {
    const [modalShow, setModalShow] = React.useState(false);

    const handleShowModal = () => setModalShow(true);
    const handleHideModal = () => setModalShow(false);
  return (
    <div>
      <Row>
        {/* Contiene botón de crear nuevo ticket  */}
        <Col md={12} className="pb-2 d-flex justify-content-end">
          <ButtonCrear />
        </Col>
      </Row>

      <div>
        <Row className="pb-2">
          {/* Card saludo a Cliente  */}
          <Col md={4}>
            <WelcomeCard></WelcomeCard>
          </Col>

          {/* Card estadísticas de cliente  */}
          <Col md={8}>
            <Card className="px-4 pt-4" style={{height:"300px"}}>
              <h4 style={{ fontSize: "25px" }}>
                <b>Mis Tickets</b>
              </h4>

              <Row className="pt-4 px-5">
                <Col md={8}>
                  {/*ESTADÍSTICAS PRIMERA FILA  */}
                  <Row>
                    {/*ELEMENTO TOTAL ESTADÍSTICA  */}
                    <Col md={6}>
                      <div className="d-flex align-items-center">
                        <div className="pe-4">
                          <Avatar
                            style={{
                              backgroundColor: "var(--green)",
                              color: "black",
                            }}
                          >
                            <ChecklistRoundedIcon />
                          </Avatar>
                        </div>
                        <div>
                          <h2>10</h2>
                          <p>Total</p>
                        </div>
                      </div>
                    </Col>

                    {/*ELEMENTOS RESUELTOS ESTADÍSTICA  */}
                    <Col md={6}>
                      <div className="d-flex align-items-center">
                        <div className="pe-4">
                          <Avatar
                            style={{
                              backgroundColor: "var(--green)",
                              color: "black",
                            }}
                          >
                            <CheckCircleOutlineRoundedIcon />
                          </Avatar>
                        </div>
                        <div>
                          <h2>2</h2>
                          <p>Resueltos</p>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  {/*ESTADÍSTICAS PRIMERA FILA  */}
                  <Row>
                    {/*ELEMENTO PROGRESO ESTADÍSTICA  */}
                    <Col md={6}>
                      <div className="d-flex align-items-center">
                        <div className="pe-4">
                          <Avatar
                            style={{
                              backgroundColor: "var(--green)",
                              color: "black",
                            }}
                          >
                            <AutoModeRoundedIcon />
                          </Avatar>
                        </div>
                        <div>
                          <h2>6</h2>
                          <p>En Progreso</p>
                        </div>
                      </div>
                    </Col>

                    {/*ELEMENTOS EN ESPERA ESTADÍSTICA  */}
                    <Col md={6}>
                      <div className="d-flex align-items-center ">
                        <div className="pe-4">
                          <Avatar
                            style={{
                              backgroundColor: "var(--green)",
                              color: "black",
                            }}
                          >
                            <HistoryToggleOffRoundedIcon />
                          </Avatar>
                        </div>
                        <div>
                          <h2>2</h2>
                          <p>En Espera</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>

                {/*IMAGEN ESTADÍSTICA  */}
                <Col md={4}>
                  <Image
                    src={imgpc}
                    width={200}
                    height={200}
                    alt="Ticket Status"
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Card resumen de Tickets recién añadidos  */}
      <Row className="py-4">
        <Col md={12}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              sx={{ minWidth: 200 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID Ticket</TableCell>
                  <TableCell align="center">Solicitante</TableCell>
                  <TableCell align="center">Fecha</TableCell>
                  <TableCell align="center">Agente</TableCell>
                  <TableCell align="center">Área</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Detalle</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row" align="center">
                    12345678
                  </TableCell>
                  <TableCell align="center">Jose P.</TableCell>
                  <TableCell align="center">Ahora</TableCell>
                  <TableCell align="center">Agente 1</TableCell>
                  <TableCell align="center">Base de datos</TableCell>
                  <TableCell align="center">
                    Abierto
                  </TableCell>
                  <TableCell
                    align="center"
                    className="justify-content-center align-items-center align-content-center"
                  >
                    <IconButton aria-label="View Detail" size="large"   onClick={handleShowModal}>
                    <KeyboardArrowRightRoundedIcon fontSize="inherit" />
                    </IconButton>
                    <CreateTicketModal show={modalShow} onHide={handleHideModal} />
                    
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        </Col>
      </Row>
    </div>
  );
}

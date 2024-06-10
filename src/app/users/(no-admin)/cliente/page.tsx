"use client";

import { useState } from "react";
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
import useUser from "@/hooks/useUser";
import useStats from "@/hooks/useStats";
import useTickets from "@/hooks/useTickets";
import { TTicketValue } from "@/utils/types";

export default function DashboardCliente() {
  const { user } = useUser();
  const { stats, statsLoading } = useStats(user?.idUser ?? 0);
  const { tickets } = useTickets(user?.idUser ?? 0);
  const [selectedTicket, setSelectedTicket] = useState<TTicketValue>();

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
            <Card className="px-4 pt-4" style={{ height: "300px" }}>
              <h4 style={{ fontSize: "25px" }}>
                <b>Mis Tickets</b>
              </h4>

              <Row className="pt-4 px-5">
                <Col md={8}>
                  {statsLoading || (
                    <>
                      <Row>
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
                              <h2>{stats?.total}</h2>
                              <p>Total</p>
                            </div>
                          </div>
                        </Col>

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
                              <h2>{stats?.resueltos}</h2>
                              <p>Resueltos</p>
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <Row>
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
                              <h2>{stats?.progreso}</h2>
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
                              <h2>{stats?.espera}</h2>
                              <p>En Espera</p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </>
                  )}
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
                    <TableCell align="center">Prioridad</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tickets
                    ?.filter((t) => t.State == "EN PROGRESO")
                    .map((t) => (
                      <TableRow>
                        <TableCell component="th" scope="row" align="center">
                          {t?.IdTicket}
                        </TableCell>
                        <TableCell align="center">{t.Name}</TableCell>
                        <TableCell align="center">
                          {new Date(t?.CreationDate).getDate()}
                        </TableCell>
                        <TableCell align="center">
                          {t?.IdEmployee ?? "Sin asignar"}
                        </TableCell>
                        <TableCell align="center">{t?.State}</TableCell>
                        <TableCell align="center">{t?.Priority}</TableCell>
                        <TableCell
                          align="center"
                          className="justify-content-center align-items-center align-content-center"
                        >
                          <IconButton
                            aria-label="View Detail"
                            size="large"
                            onClick={() => setSelectedTicket(t)}
                          >
                            <KeyboardArrowRightRoundedIcon fontSize="inherit" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Col>
      </Row>
      {selectedTicket != undefined && (
        <CreateTicketModal
          show={true}
          onHide={() => setSelectedTicket(undefined)}
          ticket={selectedTicket}
        />
      )}
    </div>
  );
}

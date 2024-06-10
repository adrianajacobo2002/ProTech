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
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import IconButton from "@mui/material/IconButton";
import TasksResumeModal from "@/components/task-resume";
import useTasks from "@/hooks/useTasks";
import useUser from "@/hooks/useUser";
import type { TTicketAdditionalTask } from "@/utils/types";
import useStats from "@/hooks/useStats";

export default function SoporteDashboard() {
  const { user } = useUser();
  const { tasks } = useTasks(user?.idUser ?? 0);
  const { stats, statsLoading } = useStats(user?.idUser ?? 0);
  const [selectedTask, setSelectedTask] = useState<TTicketAdditionalTask>();
  const unfinishedTasks = tasks?.filter((t) => !t?.Finished);

  return (
    <div>
      <div className="d-flex justify-content-end pb-4">
        <ButtonCrear />
      </div>
      <div>
        <Row>
          <Col md={4}>
            <WelcomeCard />
            <br />
            <Card body>
              <small className="py-2">
                Tienes <b>{unfinishedTasks?.length}</b> tareas asignadas
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
                    {unfinishedTasks?.map((t) => (
                      <TableRow>
                        <TableCell component="th" scope="row" align="center">
                          {t?.IdTicketAdditionalTask}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="ver"
                            onClick={() => setSelectedTask(t)}
                          >
                            <AddCircleOutlineRoundedIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
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
                      <Avatar
                        style={{
                          backgroundColor: "var(--green)",
                          color: "black",
                        }}
                      >
                        <ChecklistRoundedIcon />
                      </Avatar>
                      <div className="">
                        <div className="ms-4">
                          <Row>
                            <Col>
                              <p
                                style={{ fontSize: "25px", fontWeight: "bold" }}
                              >
                                {stats?.total}
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
                      <Avatar
                        style={{
                          backgroundColor: "var(--green)",
                          color: "black",
                        }}
                      >
                        <CheckCircleOutlineRoundedIcon />
                      </Avatar>
                      <div className="">
                        <div className="ms-4">
                          <Row>
                            <Col>
                              <p
                                style={{ fontSize: "25px", fontWeight: "bold" }}
                              >
                                {stats?.resueltos}
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
                      <Avatar
                        style={{
                          backgroundColor: "var(--green)",
                          color: "black",
                        }}
                      >
                        <AutoModeRoundedIcon />
                      </Avatar>{" "}
                      <div className="">
                        <div className="ms-4">
                          <Row>
                            <Col>
                              <p
                                style={{ fontSize: "25px", fontWeight: "bold" }}
                              >
                                {stats?.progreso}
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
                      <Avatar
                        style={{
                          backgroundColor: "var(--green)",
                          color: "black",
                        }}
                      >
                        <HistoryToggleOffRoundedIcon />{" "}
                      </Avatar>
                      <div className="">
                        <div className="ms-4">
                          <Row>
                            <Col>
                              <p
                                style={{ fontSize: "25px", fontWeight: "bold" }}
                              >
                                {stats?.espera}
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
      {selectedTask && (
        <TasksResumeModal
          show={true}
          onHide={() => setSelectedTask(undefined)}
          task={selectedTask}
        />
      )}
    </div>
  );
}

interface ChangePProps {
  show: boolean;
  onHide: () => void;
}

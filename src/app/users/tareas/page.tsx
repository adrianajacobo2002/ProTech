"use client";

import Table from "@mui/material/Table";
import { useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import style from "./style.module.scss";
import TasksResumeModal from "@/components/task-resume";
import useTasks from "@/hooks/useTasks";
import useUser from "@/hooks/useUser";
import { TTicketAdditionalTask } from "@/utils/types";

export default function TasksResume() {
  const { user } = useUser();
  const { tasks } = useTasks(user?.idUser ?? 0);
  const [selectedTask, setSelectedTask] = useState<TTicketAdditionalTask>();

  return (
    <>
      <div>
        <h1>Tareas</h1>
        <hr />

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
                  <TableCell align="center">Descripción</TableCell>
                  <TableCell align="center">Agente</TableCell>
                  <TableCell align="center">Finalizado</TableCell>
                  <TableCell align="center">Ver Detalle</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tasks?.map((t, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row" align="center">
                      {t?.IdTicketAdditionalTask}
                    </TableCell>
                    <TableCell align="center">{t?.Description}</TableCell>
                    <TableCell align="center">
                      {t?.IdEmployeeNavigation.Name}
                    </TableCell>
                    <TableCell align="center">
                      <p className={style["word"]}>
                        {t?.Finished ? "Sí" : "No"}
                      </p>
                    </TableCell>
                    <TableCell
                      align="center"
                      className="justify-content-center align-items-center align-content-center"
                    >
                      <IconButton
                        aria-label="View Detail"
                        size="large"
                        style={{ color: "var(--green)" }}
                        onClick={() => setSelectedTask(t)}
                      >
                        <InfoRoundedIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        {selectedTask && (
          <TasksResumeModal
            show={true}
            onHide={() => setSelectedTask(undefined)}
            task={selectedTask}
          />
        )}
      </div>
    </>
  );
}

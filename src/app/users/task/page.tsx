"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import Button from "@mui/material/Button";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import style from "./style.module.scss";

export default function TasksResume() {
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
                  <TableCell align="center">Fecha</TableCell>
                  <TableCell align="center">Agente</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Ver Detalle</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row" align="center">
                    12345678
                  </TableCell>
                  <TableCell align="center">
                    Problemas de credenciales
                  </TableCell>
                  <TableCell align="center">Ahora</TableCell>
                  <TableCell align="center">Agente 1</TableCell>
                  <TableCell align="center">
                    <p className={style["word"]}>Abierto</p>
                  </TableCell>
                  <TableCell
                    align="center"
                    className="justify-content-center align-items-center align-content-center"
                  >
                    <IconButton
                      aria-label="View Detail"
                      size="large"
                      style={{ color: "var(--green)" }}
                    >
                      <InfoRoundedIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
}

"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import style from "./style.module.scss";

export default function UsersTable() {
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID Usuario</TableCell>
                <TableCell align="center">Nombres</TableCell>
                <TableCell align="center">Apellidos</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Rol</TableCell>
                <TableCell align="center">Ver Información</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" align="center">
                  12345678
                </TableCell>
                <TableCell align="center">Jose P.</TableCell>
                <TableCell align="center">Apellido1</TableCell>
                <TableCell align="center">jose@gmail.com</TableCell>
                <TableCell align="center"><p className={style["employee-role"]}>Administrador</p></TableCell>
                <TableCell
                  align="center"
                  className="justify-content-center align-items-center align-content-center"
                >
                  <IconButton aria-label="View Detail" size="large">
                    <InfoRoundedIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

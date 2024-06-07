"use client";
import * as React from "react";
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
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import { Col, Row } from "react-bootstrap";

export default function UsersTable() {
  const [modalShow, setModalShow] = React.useState(false);
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
                <TableCell align="center">
                  <p className={style["employee-role"]}>Administrador</p>
                </TableCell>
                <TableCell
                  align="center"
                  className="justify-content-center align-items-center align-content-center"
                >
                  <IconButton
                    aria-label="View Detail"
                    size="large"
                    onClick={() => setModalShow(true)}
                  >
                    <InfoRoundedIcon fontSize="inherit" />
                  </IconButton>
                  <UserInformationModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

interface UserInfoProps {
  show: boolean;
  onHide: () => void;
}

function UserInformationModal(props: UserInfoProps) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Body className="p-5">
        <small className={style["word"]}>Cliente Externo</small>

        <div className="text-center">
          <div>
            <Row className="py-3">
              <Col md={6}>
                <TextField
                  fullWidth
                  disabled
                  id="outlined-basic"
                  type="name"
                  label="Nombres"
                  variant="outlined"
                  size="small"
                />
              </Col>
              <Col md={6}>
                <TextField
                  disabled
                  fullWidth
                  id="outlined-basic"
                  type="name"
                  label="Apellidos"
                  variant="outlined"
                  size="small"
                />
              </Col>
            </Row>
          </div>
          <div>
            <Row className="py-3">
              <Col>
                <TextField
                  fullWidth
                  disabled
                  id="outlined-basic"
                  type="email"
                  label="Correo Electrónico"
                  variant="outlined"
                  size="small"
                />
              </Col>
            </Row>
          </div>
          <div>
            <Row className="py-3">
              <Col>
                <TextField
                  fullWidth
                  disabled
                  id="outlined-basic"
                  label="Número Telefónico"
                  variant="outlined"
                  size="small"
                />
              </Col>
            </Row>
          </div>
          <div>
            <Row className="py-3">
              <Col>
                <TextField
                  fullWidth
                  disabled
                  id="outlined-basic"
                  type="text"
                  label="Nombre de la Empresa"
                  variant="outlined"
                  size="small"
                />
              </Col>
            </Row>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

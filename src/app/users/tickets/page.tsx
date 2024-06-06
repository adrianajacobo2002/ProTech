"use client";
import * as React from "react";
import { useState } from "react";
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
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import style from "./style.module.scss";
import TicketsFilter from "@/components/tickets-filter";
import CreateTicketModal from "@/components/ticket-report";


export default function TicketsResume() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  const [modalShow, setModalShow] = React.useState(false);

  const handleShowModal = () => setModalShow(true);
  const handleHideModal = () => setModalShow(false);
  return (
    <>
      <div>
        <div className="d-flex justify-content-between">
          <h1>Tickets</h1>
          <IconButton
            aria-label="delete"
            size="large"
            style={{ color: "var(--green)" }}
            onClick={handleShowOffcanvas}
          >
            <FilterAltRoundedIcon fontSize="inherit" />
          </IconButton>

          <TicketsFilter
            show={showOffcanvas}
            handleClose={handleCloseOffcanvas}
            placement="end"
          />
        </div>
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
                  <TableCell align="center">Solicitante</TableCell>
                  <TableCell align="center">Fecha</TableCell>
                  <TableCell align="center">Agente</TableCell>
                  <TableCell align="center">Área</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Estado</TableCell>
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
                    <p className={style["word"]}>Abierto</p>
                  </TableCell>
                  <TableCell
                    align="center"
                    className="justify-content-center align-items-center align-content-center"
                  >
                    <IconButton aria-label="View Detail" size="large"  onClick={handleShowModal}>
                      <KeyboardArrowRightRoundedIcon fontSize="inherit" />
                    </IconButton>
                    <CreateTicketModal show={modalShow} onHide={handleHideModal} />
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

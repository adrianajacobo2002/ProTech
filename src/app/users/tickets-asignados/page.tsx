"use client";

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
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import style from "./style.module.scss";
import TicketsFilter from "@/components/tickets-filter";
import CreateTicketModal from "@/components/ticket-report";
import useUser from "@/hooks/useUser";
import { TTicketValue } from "@/utils/types";
import useAssignedTickets from "@/hooks/useAssignedTickets";

export default function TicketsAsignados() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { user } = useUser();
  const { assignedTickets, assignedTicketsLoading } = useAssignedTickets(
    user?.idUser ?? 0
  );
  const [selectedTicket, setSelectedTicket] = useState<
    TTicketValue | undefined
  >();

  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  const [modalShow, setModalShow] = useState(false);

  const handleShowModal = () => setModalShow(true);
  const handleHideModal = () => setModalShow(false);

  if (assignedTicketsLoading) return;
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
                  <TableCell align="center">Área</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>

              {assignedTickets.map((t, i) => (
                <TableBody key={i}>
                  <TableRow>
                    <TableCell component="th" scope="row" align="center">
                      {t.IdTicket}
                    </TableCell>
                    <TableCell align="center">{t.Name}</TableCell>
                    <TableCell align="center">
                      {new Date(t.CreationDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">Base de datos</TableCell>
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
                        onClick={() => {
                          setSelectedTicket(t);
                          handleShowModal();
                        }}
                      >
                        <KeyboardArrowRightRoundedIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
        </Paper>
        {selectedTicket && (
          <CreateTicketModal
            show={modalShow}
            onHide={handleHideModal}
            ticket={selectedTicket}
          />
        )}
      </div>
    </>
  );
}

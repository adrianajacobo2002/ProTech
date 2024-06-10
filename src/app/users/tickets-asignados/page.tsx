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
import { TFilter, TTicketValue } from "@/utils/types";
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
  const [filter, setFilter] = useState<TFilter>();

  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  const [modalShow, setModalShow] = useState(false);

  const handleShowModal = () => setModalShow(true);
  const handleHideModal = () => setModalShow(false);

  const withFilter = () => {
    if (filter == undefined || assignedTickets == undefined)
      return assignedTickets;

    const { agenteId, from, state, to, category } = filter;
    return assignedTickets
      .filter((at) => (state ? at.State == state : true))
      .filter((at) => (agenteId ? at.IdEmployee == agenteId : true))
      .filter((at) => (category ? at.Category?.includes(category) : true))
      .filter((at) => {
        const creationDate = new Date(at.CreationDate);
        const isAfter = from != null ? creationDate >= from : true;
        const isBefore = to != null ? creationDate <= to : true;
        return isAfter && isBefore;
      });
  };

  if (assignedTicketsLoading) return;
  return (
    <>
      <div>
        <div className="d-flex justify-content-between">
          <h1>Tickets asignados</h1>
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
            onFilter={setFilter}
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

              {withFilter().map((t, i) => (
                <TableBody key={i}>
                  <TableRow>
                    <TableCell component="th" scope="row" align="center">
                      {t.IdTicket}
                    </TableCell>
                    <TableCell align="center">{t.Name}</TableCell>
                    <TableCell align="center">
                      {new Date(t.CreationDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">{t.Category || "-"}</TableCell>
                    <TableCell align="center">
                      <p className={style["word"]}>{t.State}</p>
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

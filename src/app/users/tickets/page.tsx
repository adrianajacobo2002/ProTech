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
import { TFilter, TTicketValue } from "@/utils/types";
import useTickets from "@/hooks/useTickets";

export default function TicketsResume() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<
    TTicketValue | undefined
  >();
  const { tickets } = useTickets();
  const [filter, setFilter] = useState<TFilter>();

  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  const withFilter = () => {
    if (filter == undefined || tickets == undefined) return tickets;

    const { agenteId, from, state, to, category } = filter;
    return tickets
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
                  <TableCell align="center">Agente</TableCell>
                  <TableCell align="center">Área</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Estado</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {withFilter()?.map((t) => (
                  <TableRow>
                    <TableCell component="th" scope="row" align="center">
                      {t.IdTicket}
                    </TableCell>
                    <TableCell align="center">
                      {t.IdUserNavigation?.Name}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(t.CreationDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      {t.IdEmployeeNavigation?.Name ?? "No asignado"}
                    </TableCell>
                    <TableCell align="center">
                      {t.Category ?? "Sin área"}
                    </TableCell>
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
        <CreateTicketModal
          show={selectedTicket != undefined}
          onHide={() => setSelectedTicket(undefined)}
          ticket={selectedTicket!}
        />
      </div>
    </>
  );
}

"use client";
import * as React from "react";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import { Col, Row } from "react-bootstrap";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import style from "./styles.module.scss";

interface TicketsFilterProps {
  show: boolean;
  handleClose: () => void;
  placement?: "end";
}

const TicketsFilter: React.FC<TicketsFilterProps> = ({ show, handleClose }) => {
  const [estado, setEstado] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setEstado(event.target.value as string);
  };
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Body>
        <div className="p-4">
          <p className="py-3"><b>Filtrar Por:</b></p>

          <div className="pb-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Estado</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={estado}
                label="Estadp"
                onChange={handleChange}
              >
                <MenuItem value={1}>En Progreso</MenuItem>
                <MenuItem value={2}>
                  En espera de información del cliente
                </MenuItem>
                <MenuItem value={3}>Resuelto</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="pb-3">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={people}
              renderInput={(params) => <TextField {...params} label="Agente" />}
            />
          </div>

          <div className="pb-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Fecha Inicio" />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="pb-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer  components={["DatePicker"]}>
                <DatePicker  label="Fecha Final" />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div>
            <Button
              fullWidth
              className={style["btn-sendInfo"]}
              variant="contained"
            >
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default TicketsFilter;

const people = [
  { label: "John Doe" },
  { label: "Jane Smith" },
  { label: "Alice Johnson" },
  { label: "Bob Brown" },
  { label: "Carol White" },
  { label: "David Black" },
  { label: "Eva Green" },
  { label: "Frank Clark" },
  { label: "Grace Lewis" },
];

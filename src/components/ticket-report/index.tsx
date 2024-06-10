"use client";
import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import style from "./styles.module.scss";
import Image from "next/image";
import logoLetra from "@/assets/images/logoLetras.svg";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import Card from "react-bootstrap/Card";
import Autocomplete from "@mui/material/Autocomplete";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import IconButton from "@mui/material/IconButton";

interface TicketReportProps {
  show: boolean;
  onHide: () => void;
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function TicketReport(props: TicketReportProps) {
  {
    /* Dropdown */
  }
  const [estado, setEstado] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setEstado(event.target.value as string);
  };

  {
    /* Listado de Archivo*/
  }
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Body className="px-5">
        <div className="text-center">
          <Image src={logoLetra} alt="Logo ProTech" width={300} height={150} />
        </div>
        <h5 className="pb-4">
          <b>Información General</b>
        </h5>
        <div className="pb-3">
          <p>
            <b>Nombre de Aplicación o Servicio</b>
          </p>
          <p>ByteSavvy</p>
        </div>

        <div className="pb-3">
          <p>
            <b>Descripción</b>
          </p>
          <p>
            La semana pasada nos enteramos de que hubo una brecha de seguridad
            en la aplicación y algunos de nuestros datos confidenciales fueron
            comprometidos.
          </p>
        </div>

        <div className="pb-3">
          <p>
            <b>Prioridad</b>
          </p>
          <p>Crítico</p>
        </div>

        <div className="pb-3">
          <h5>
            <b>Detalles de Contacto</b>
          </h5>
        </div>

        <div className="pb-3">
          <Row>
            <Col md={6}>
              <p>
                <b>Nombres</b>
              </p>
              <p>José</p>
            </Col>
            <Col md={6}>
              <p>
                <b>Apellidos</b>
              </p>
              <p>Perez</p>
            </Col>
          </Row>
        </div>

        <div className="pb-4">
          <Row>
            <Col md={6}>
              <p>
                <b>Correo Electrónico</b>
              </p>
              <p>joseperez@gmail.com</p>
            </Col>
            <Col md={6}>
              <p>
                <b>Número Teléfonico</b>
              </p>
              <p>0000-0000</p>
            </Col>
          </Row>
        </div>

        <div className="pb-3">
          <Grid item xs={12} md={6}>
            <p>
              <b>Archivos de Respaldo</b>
            </p>
            <Demo>
              <List dense={dense}>
                <ListItem>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Pruebas.pdf" />
                </ListItem>
                <hr />
              </List>
            </Demo>
          </Grid>
        </div>

        {/* Se agregó botón para asignar el ticket  */}
        <div className="pb-5">
          <h5>Asignar Ticket</h5>
          <Card body className="text-center">
            <div className="py-2">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={people}
                renderInput={(params) => (
                  <TextField {...params} label="Agente" />
                )}
              />
            </div>
            <div>
              <Button className={style["btn-sendInfo"]} variant="contained">
                Asignar Ticket
              </Button>
            </div>
          </Card>
        </div>

        <div className="pb-3">
          <h5>Actualizar Ticket</h5>
          <Card body className="px-3">
            <Row>
              <Col md={6}>
                <p>
                  <b>Número de Ticket</b>
                </p>
                <p>T-12345678</p>
              </Col>
              <Col md={6}>
                <div>
                  <div className="pb-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Estado
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={estado}
                        label="Estado"
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
                </div>
              </Col>
            </Row>
            <div>
              <TextField
                fullWidth
                id="outlined-multiline-flexible"
                label="Comentario"
                multiline
                rows={2}
              />
            </div>
            <div className="pt-4">
              <Button
                fullWidth
                className={style["btn-sendInfo"]}
                variant="contained"
              >
                Actualizar
              </Button>
            </div>
          </Card>
        </div>

        <div className="py-4">
          <h5>Historial</h5>
          <Card body className="text-center">
            <Row>
              <Col md={4}>
                <p>T-12345678</p>
                <small className={style["word"]}>En Progreso</small>
              </Col>
              <Col md={8}>
                <TextField
                  fullWidth
                  disabled
                  id="outlined-multiline-flexible"
                  label="Comentario"
                  multiline
                  rows={2}
                />
              </Col>
            </Row>
          </Card>
        </div>

        <div>
          <h5>Tareas</h5>
          <Card body className="text-center">
            <div className="py-2">
              <TextField
                fullWidth
                id="outlined-multiline-flexible"
                label="Descripción de la tarea"
                multiline
                rows={2}
              />
            </div>
            <div className="py-2">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={people}
                renderInput={(params) => (
                  <TextField {...params} label="Agente" />
                )}
              />
            </div>
            <div>
              <Button className={style["btn-sendInfo"]} variant="contained">
                Asignar Tarea
              </Button>
            </div>
          </Card>
        </div>

        <div className="py-5">
          <h5>Historial Tareas</h5>
          <Card body>
            <div className="py-2 text-center">
              <Row>
                <Col md={3}>
                  <small>
                    <s>Reiniciar el modem</s>
                  </small>
                </Col>
                <Col md={3}>
                  <small>
                    <s>Jose P.</s>
                  </small>
                </Col>
                <Col md={3}>
                  <small className={style["word"]}>Abierto</small>
                </Col>
                <Col md={3}>
                  <IconButton aria-label="finish" color="error">
                    <EventAvailableRoundedIcon />
                  </IconButton>
                </Col>
              </Row>
            </div>
          </Card>
        </div>
      </Modal.Body>
    </Modal>
  );
}

interface TicketReportModalProps {
  show: boolean;
  onHide: () => void;
}

export default function CreateTicketModal(props: TicketReportModalProps) {
  return <TicketReport show={props.show} onHide={props.onHide} />;
}

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

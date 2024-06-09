"use client";

import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import logoLetra from "@/assets/images/logoLetras.svg";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import FolderIcon from "@mui/icons-material/Folder";
import Card from "react-bootstrap/Card";
import Autocomplete from "@mui/material/Autocomplete";
import useUser from "@/hooks/useUser";
import { TTicketValue } from "@/utils/types";
import { Button, CircularProgress } from "@mui/material";
import { API_URL } from "@/utils/consts";
import { toast } from "react-toastify";
import useSupports from "@/hooks/useSupports";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { asignTicket } from "@/services/tickets.service";

import styles from "./styles.module.scss";
import useTickets from "@/hooks/useTickets";

interface TicketReportProps {
  ticket: TTicketValue;
  show: boolean;
  onHide: () => void;
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function TicketReport(props: TicketReportProps) {
  const { ticket: t } = props;
  const [comentario, setComentario] = useState("");
  const { user } = useUser();
  const { supports } = useSupports();
  const { refetchTickets } = useTickets(user?.idUser ?? 0);

  const {
    control: assignTicketControl,
    handleSubmit: handleAssignTicketSubmit,
    formState: { isSubmitting: assigningTicket },
  } = useForm<TAssignTicketFormFields>({
    defaultValues: {
      employeeId: t?.IdEmployee ?? 0,
    },
  });

  const handleAssignTicketFormSubmit: SubmitHandler<
    TAssignTicketFormFields
  > = async (data) => {
    const { employeeId } = data;
    if (employeeId == 0) {
      toast("Selecciona un agente para asignar el ticket", {
        type: "warning",
      });
      return;
    }

    const assigned = await asignTicket(t.IdTicket, employeeId);
    if (!assigned) {
      toast("Algo falló al asignar el ticket", {
        type: "error",
      });
      return;
    }

    refetchTickets();
    toast("Ticket asignado con éxito", {
      type: "success",
    });
  };

  if (!t) return;
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
          <p>{t.Name}</p>
        </div>

        <div className="pb-3">
          <p>
            <b>Descripción</b>
          </p>
          <p>{t.Description}</p>
        </div>

        <div className="pb-3">
          <p>
            <b>Prioridad</b>
          </p>
          <p>{t.Priority}</p>
        </div>

        <div className="pb-3">
          <h5>
            <b>Detalles de Contacto</b>
          </h5>
        </div>

        <div className="pb-3">
          <Row>
            <Col>
              <p>
                <b>Nombres</b>
              </p>
              <p>{user?.name}</p>
            </Col>
          </Row>
        </div>

        <div className="pb-4">
          <Row>
            <Col md={6}>
              <p>
                <b>Correo Electrónico</b>
              </p>
              <p>{user?.email}</p>
            </Col>
            <Col md={6}>
              <p>
                <b>Número Teléfonico</b>
              </p>
              <p>{user?.cellphone}</p>
            </Col>
          </Row>
        </div>

        <div className="pb-3">
          <Grid item xs={12} md={6}>
            <p>
              <b>Archivos de Respaldo</b>
            </p>
            <Demo>
              <List dense={false}>
                {t.BackupFiles.$values.map((bf, i) => (
                  <ListItem key={i}>
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary={bf.Name} />
                  </ListItem>
                ))}
                <hr />
              </List>
            </Demo>
          </Grid>
        </div>

        <div className="pb-5">
          {user?.userCategoryName == "Administrator" ? (
            <>
              <h5>Asignar Ticket</h5>
              <Card body className="text-center">
                <form
                  onSubmit={handleAssignTicketSubmit(
                    handleAssignTicketFormSubmit
                  )}
                >
                  <div className="py-2">
                    <Controller
                      control={assignTicketControl}
                      name="employeeId"
                      render={({ field: { value, onChange, ...field } }) => (
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={supports.map((s) => ({
                            label: s.name,
                            value: s.idUser,
                          }))}
                          defaultValue={
                            t.IdEmployee
                              ? {
                                  label: t.IdEmployeeNavigation?.Name || "",
                                  value: t.IdEmployee,
                                }
                              : undefined
                          }
                          onChange={(_, value) => onChange(value?.value ?? 0)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              {...field}
                              required
                              label="Agente"
                            />
                          )}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Button
                      className={styles["btn-sendInfo"]}
                      variant="contained"
                      type="submit"
                      disabled={assigningTicket}
                    >
                      {assigningTicket ? (
                        <CircularProgress />
                      ) : (
                        "Asignar Ticket"
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            </>
          ) : (
            <>
              <h5>Agente asignado</h5>
              <p>{t.IdEmployeeNavigation?.Name ?? "Sin asingar"}</p>
            </>
          )}
        </div>
        {/* Se agregó botón para asignar el ticket  */}

        <div className="pb-3">
          <h5>Estado del ticket</h5>
          <p>{t.State}</p>
        </div>

        <div className="py-4">
          <h5>Historial</h5>
          {t.TicketComments.$values.map((c, i) => (
            <div key={i}>
              <p>{c.Comment}</p>
              <h6 style={{ fontSize: 12 }}>
                {new Date(c.Date).toLocaleDateString()}
              </h6>
              <hr />
            </div>
          ))}
          <Card body className="text-center">
            <Row>
              <Col>
                <TextField
                  fullWidth
                  id="outlined-multiline-flexible"
                  label="Comentario"
                  multiline
                  rows={2}
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="contained"
                  onClick={async () => {
                    await fetch(
                      `${API_URL}/Comment/AddComment?ticketId=${t.IdTicket}`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ comment: comentario }),
                      }
                    );

                    setComentario("");
                    toast("Comentario agregado exitosamente", {
                      type: "success",
                    });
                  }}
                >
                  Agregar comentario
                </Button>
              </Col>
            </Row>
          </Card>
        </div>
      </Modal.Body>
    </Modal>
  );
}

interface TicketReportModalProps {
  ticket: TTicketValue;
  show: boolean;
  onHide: () => void;
}

export default function CreateTicketModal(props: TicketReportModalProps) {
  return (
    <TicketReport
      show={props.show}
      onHide={props.onHide}
      ticket={props.ticket}
    />
  );
}

type TAssignTicketFormFields = {
  employeeId: number;
};

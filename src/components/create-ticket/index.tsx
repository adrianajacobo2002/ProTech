"use client";

import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import style from "./styles.module.scss";
import Image from "next/image";
import logoLetra from "@/assets/images/logoLetras.svg";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useUser from "@/hooks/useUser";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import { createTicket } from "@/services/tickets.service";
import { toast } from "react-toastify";

interface CreateTicketProps {
  show: boolean;
  onHide: () => void;
}

function CreateTicket(props: CreateTicketProps) {
  const { user } = useUser();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TFormFields>({
    defaultValues: {
      Name: "",
      Description: "",
      Priority: "BAJA",
      Files: undefined,
    },
  });

  const handleFormSubmit: SubmitHandler<TFormFields> = async (data) => {
    const fd = new FormData();
    fd.append("IdUser", user!.idUser.toString());
    fd.append("Name", data.Name);
    fd.append("Description", data.Description);
    fd.append("Priority", data.Priority);
    if (data.Files != null)
      for (const f of Object.values(data.Files)) fd.append("Files", f);

    const created = await createTicket(fd);
    if (!created) {
      toast("Hubo un error al intentar crear el ticket", {
        type: "error",
      });
      return;
    }

    props.onHide();
    toast("Ticket creado con éxito", {
      type: "success",
    });
    // TODO: Actualizar ticket
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Body className="text-center px-5">
        <Image src={logoLetra} alt="Logo ProTech" width={300} height={150} />

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="pb-4">
            <Controller
              name="Name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  id="outlined-basic"
                  label="Nombre de aplicación o servicio"
                  variant="outlined"
                />
              )}
            />
          </div>

          <div className="pb-4">
            <Controller
              name="Description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  id="outlined-multiline-flexible"
                  label="Descripción"
                  multiline
                  rows={4}
                />
              )}
            />
          </div>

          <div>
            <Row>
              <Col md={6}>
                <Controller
                  name="Files"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Control
                        {...field}
                        type="file"
                        multiple
                        onChange={(e) => {
                          const input = e.target as HTMLInputElement;
                          onChange(input.files);
                        }}
                      />
                    </Form.Group>
                  )}
                />
              </Col>
              <Col md={6}>
                <Controller
                  name="Priority"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Prioridad
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label="Prioridad"
                        onChange={(e) => onChange(e.target.value)}
                      >
                        <MenuItem value="BAJA">Baja</MenuItem>
                        <MenuItem value="IMPORTANTE">Importante</MenuItem>
                        <MenuItem value="CRITICO">Crítico</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Col>
            </Row>
          </div>

          <h5 className="text-start py-3">Detalles de Contacto</h5>
          <div>
            <Row className="pb-4">
              <Col>
                <TextField
                  fullWidth
                  disabled
                  id="outlined-basic"
                  label="Nombres"
                  variant="outlined"
                  value={user?.name}
                />
              </Col>
              <Col>
                <TextField
                  fullWidth
                  disabled
                  id="outlined-basic"
                  label="Correo Electrónico"
                  variant="outlined"
                  value={user?.email}
                />
              </Col>
            </Row>
            <Row className="pb-4">
              <Col>
                <TextField
                  fullWidth
                  disabled
                  id="outlined-basic"
                  label="Número Telefónico"
                  variant="outlined"
                  value={user?.cellphone}
                />
              </Col>
            </Row>
          </div>

          <Button
            fullWidth
            className={style["btn-sendInfo"]}
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress /> : "Enviar"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

interface CreateTicketModalProps {
  show: boolean;
  onHide: () => void;
}

export default function CreateTicketModal(props: CreateTicketModalProps) {
  return <CreateTicket show={props.show} onHide={props.onHide} />;
}

type TFormFields = {
  Name: string;
  Description: string;
  Priority: PRIORITIES;
  Files: FileList;
};

type PRIORITIES = "BAJA" | "IMPORTANTE" | "CRITICO";

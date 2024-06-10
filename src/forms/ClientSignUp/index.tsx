"use client";
import * as React from "react";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import Button from "@mui/material/Button";
import style from "./styles.module.scss";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { API_URL } from "@/utils/consts";
import { toast } from "react-toastify";
import useUsers from "@/hooks/useUsers";
import { CircularProgress } from "@mui/material";

interface ClientSignUpProps {
  show: boolean;
  onHide: () => void;
}

type TFormFields = {
  name: string;
  email: string;
  cellphone: string;
  password: string;
  companyName: string;
  jobPosition: string;
  idUserCategory: number;
};

function ClientSignUp(props: ClientSignUpProps) {
  const { refetchUsers } = useUsers();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TFormFields>({
    defaultValues: {
      name: "",
      email: "",
      cellphone: "",
      password: "",
      companyName: "",
      jobPosition: "External",
      idUserCategory: 2,
    },
  });

  const handleFormSubmit: SubmitHandler<TFormFields> = async (data) => {
    try {
      await fetch(`${API_URL}/User/CreateClient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      props.onHide();
      refetchUsers();
      toast("Cliente creado con éxito", {
        type: "success",
      });
    } catch (error: any) {
      toast("Error al crear el cliente", {
        type: "error",
      });
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Body className="p-5 text-center">
        <Image src={logo} width={200} height={100} alt="prueba de imagen" />
        <h4 className="py-2 text-center">Registrar Cliente</h4>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <Row className="py-3">
              <Col>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      required
                      id="outlined-basic"
                      type="name"
                      label="Nombre"
                      variant="outlined"
                      size="small"
                    />
                  )}
                />
              </Col>
              <Col>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      required
                      id="outlined-basic"
                      type="email"
                      label="Correo Electrónico"
                      variant="outlined"
                      size="small"
                    />
                  )}
                />
              </Col>
            </Row>
          </div>
          <div>
            <Row className="py-3">
              <Col>
                <Controller
                  name="cellphone"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      required
                      id="outlined-basic"
                      label="Número Telefónico"
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        const val = e.target.value;
                        if (isNaN(+val) || val.length > 8) return;

                        onChange(val);
                      }}
                    />
                  )}
                />
              </Col>
            </Row>
          </div>
          <div>
            <Row className="py-3">
              <Col>
                <Controller
                  name="companyName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      required
                      id="outlined-basic"
                      type="text"
                      label="Nombre de la Empresa"
                      variant="outlined"
                      size="small"
                    />
                  )}
                />
              </Col>
            </Row>
          </div>
          <div>
            <Row className="py-3">
              <Col>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      required
                      id="outlined-basic"
                      type="password"
                      label="Contraseña"
                      variant="outlined"
                      size="small"
                    />
                  )}
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
            {isSubmitting ? <CircularProgress /> : "Registrar Cliente"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

interface ClientSignUpModalProps {
  show: boolean;
  onHide: () => void;
}

export default function ClientSignUpModal(props: ClientSignUpModalProps) {
  return <ClientSignUp show={props.show} onHide={props.onHide} />;
}

"use client";

import { Container, Form, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Image from "next/image";
import logo from "@/assets/images/logoLetras.svg";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { login } from "@/services/user.service";
import useUser from "@/hooks/useUser";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next-nprogress-bar";

export default function Login() {
  const router = useRouter();
  const { setUser } = useUser();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TFormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit: SubmitHandler<TFormFields> = async (data) => {
    const user = await login(data.email, data.password);
    if (user == null) {
      toast("Credenciales incorrectas", {
        type: "error",
      });
      return;
    }

    setUser(user);
    const { jobPosition } = user;
    const userRolesUrl = {
      Administrator: "administrador",
      User: "cliente",
      Support: "soporte",
    };

    router.push(
      `/users/${userRolesUrl[jobPosition as keyof typeof userRolesUrl]}`
    );
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-light">
      <Container
        fluid
        className="vh-100 d-flex align-items-center justify-content-center bg-light"
      >
        <div>
          <Card
            body
            className="align-items-center justify-content-center px-5 py-4"
            style={{ borderRadius: "18px", width: "600px", height: "450px" }}
          >
            <Image src={logo} width={300} height={150} alt="prueba de imagen" />
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
              <Row className="pb-3">
                <Col>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        required
                        label="Correo Electrónico"
                        type="email"
                        variant="outlined"
                      />
                    )}
                  />
                </Col>
              </Row>
              <Row className="pb-4">
                <Col>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        required
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                      />
                    )}
                  />
                </Col>
              </Row>

              <Button
                fullWidth
                id="login"
                variant="contained"
                style={{ backgroundColor: "#BAF266" }}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress /> : "Iniciar Sesión"}
              </Button>
            </Form>
          </Card>
        </div>
      </Container>
    </div>
  );
}

type TFormFields = {
  email: string;
  password: string;
};

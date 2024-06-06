import { Container, Form, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Image from "next/image";
import logo from "@/assets/images/logoLetras.svg";
import { blueGrey } from "@mui/material/colors";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NavBar from "@/layouts/SupportNavbar"
import { useRouter } from "next/router";


export default function Login() {

  
  return (
    <div className="d-flex align-items-center justify-content-center bg-light">
      <Container
        fluid
        className="vh-100 d-flex align-items-center justify-content-center bg-light"
      >
        <NavBar/>
        <div>
          <Card
            body
            className="align-items-center justify-content-center px-5 py-4"
            style={{ borderRadius: "18px", width: "600px", height: "450px" }}
          >
            <Image src={logo} width={300} height={150} alt="prueba de imagen" />
            <Form>
              <Row className="pb-3">
                <Col>
                  <TextField
                    fullWidth
                    id="txtEmail"
                    label="Correo Electrónico"
                    type="email"
                    variant="outlined"
                  />
                </Col>
              </Row>
              <Row className="pb-4">
                <Col>
                  <TextField
                    fullWidth
                    id="txtEmail"
                    label="Contraseña"
                    type="password"
                    variant="outlined"
                  />
                </Col>
              </Row>

              <Button
                fullWidth
                id="login"
                variant="contained"
                style={{ backgroundColor: "#BAF266" }}
              >
                Iniciar Sesión
              </Button>
            </Form>
          </Card>
        </div>
      </Container>
    </div>
  );
}

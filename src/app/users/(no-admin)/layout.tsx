"use client";

import { Button, TextField } from "@mui/material";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import CircularProgress from "@mui/material/CircularProgress";

import useUser from "@/hooks/useUser";

import img from "@/assets/images/danger.svg";
import { changePassword } from "@/services/user.service";
import { toast } from "react-toastify";

export default function NoAdminLayout({ children }: PropsWithChildren) {
  const { user, setUser } = useUser();
  const [password, setPassword] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handlePasswordChange = async () => {
    setBtnDisabled(true);
    const updated = await changePassword(user!.idUser, password);
    setBtnDisabled(false);
    if (!updated) {
      toast("Algo falló al intentar actualizar la contraseña", {
        type: "error",
      });
      return;
    }

    setUser({ ...user!, changePassword: false });
  };

  return (
    <>
      {children}
      {user?.changePassword && (
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          scrollable
          show={true}
        >
          <Modal.Body className="p-5">
            <div className="text-center">
              <div className="pb-5">
                <Image src={img} alt="Logo de Protech" width={75} height={75} />
              </div>
              <div>
                <h5>¡Actualización de Contraseña Requerida!</h5>
                <p>
                  Para garantizar la seguridad de tu cuenta, te solicitamos que
                  actualices tu contraseña por defecto al iniciar sesión por
                  primera vez.
                </p>
              </div>
              <div>
                <Row className="py-3">
                  <Col>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      type="password"
                      label="Actualizar Contraseña"
                      variant="outlined"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </Row>
              </div>

              <div>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handlePasswordChange}
                  disabled={btnDisabled}
                >
                  {btnDisabled ? <CircularProgress /> : "Actualizar Contraseña"}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

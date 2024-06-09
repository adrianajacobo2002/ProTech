"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import style from "./style.module.scss";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import { Col, Row } from "react-bootstrap";
import useUsers from "@/hooks/useUsers";
import { TUser } from "@/utils/types";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "@/utils/consts";

type Props = {
  users: TUser[];
};

export default function UsersTable({ users }: Props) {
  const { refetchUsers } = useUsers();
  const [selectedUser, setSelectedUser] = useState<TUser>();

  const handleGivePermissions = async () => {
    try {
      await fetch(`${API_URL}/User/ToSupport?userId=${selectedUser?.idUser}`, {
        method: "PUT",
      });

      await refetchUsers();
      toast("Permisos otorgados exitosamente", {
        type: "success",
      });
      setSelectedUser(undefined);
    } catch (error: any) {
      toast("Problemas otorgando permisos", {
        type: "error",
      });
    }
  };

  const handleRemovePermissions = async () => {
    try {
      await fetch(`${API_URL}/User/ToClient?userId=${selectedUser?.idUser}`, {
        method: "PUT",
      });

      await refetchUsers();
      toast("Permisos removidos exitosamente", {
        type: "success",
      });
      setSelectedUser(undefined);
    } catch (error: any) {
      toast("Problemas quitando permisos", {
        type: "error",
      });
    }
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID Usuario</TableCell>
                <TableCell align="center">Nombres</TableCell>
                <TableCell align="center">Número de teléfono</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Rol</TableCell>
                <TableCell align="center">Ver Información</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users?.map((u) => (
                <TableRow>
                  <TableCell component="th" scope="row" align="center">
                    {u.idUser}
                  </TableCell>
                  <TableCell align="center">{u.name}</TableCell>
                  <TableCell align="center">{u.cellphone}</TableCell>
                  <TableCell align="center">{u.email}</TableCell>
                  <TableCell align="center">
                    <p className={style["employee-role"]}>
                      {u.userCategoryName}
                    </p>
                  </TableCell>
                  <TableCell
                    align="center"
                    className="justify-content-center align-items-center align-content-center"
                  >
                    <IconButton
                      aria-label="View Detail"
                      size="large"
                      onClick={() => {
                        setSelectedUser(u);
                      }}
                    >
                      <InfoRoundedIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {selectedUser && (
                <Modal
                  show={true}
                  onHide={() => setSelectedUser(undefined)}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  scrollable
                >
                  <Modal.Body className="p-5">
                    <small className={style["word"]}>
                      Cliente{" "}
                      {selectedUser!.userCategoryName == "User"
                        ? "Externo"
                        : "Interno"}
                    </small>

                    <div className="text-center">
                      <div>
                        <Row className="py-3">
                          <Col>
                            <TextField
                              fullWidth
                              disabled
                              id="outlined-basic"
                              type="name"
                              label="Nombres"
                              variant="outlined"
                              size="small"
                              value={selectedUser!.name}
                            />
                          </Col>
                          <Col>
                            <TextField
                              fullWidth
                              disabled
                              id="outlined-basic"
                              type="email"
                              label="Correo Electrónico"
                              variant="outlined"
                              size="small"
                              value={selectedUser!.email}
                            />
                          </Col>
                        </Row>
                      </div>
                      <div>
                        <Row className="py-3">
                          <Col>
                            <TextField
                              fullWidth
                              disabled
                              id="outlined-basic"
                              label="Número Telefónico"
                              variant="outlined"
                              size="small"
                              value={selectedUser!.cellphone}
                            />
                          </Col>
                        </Row>
                      </div>
                      <div>
                        <Row className="py-3">
                          <Col>
                            <TextField
                              fullWidth
                              disabled
                              id="outlined-basic"
                              type="text"
                              label="Nombre de la Empresa"
                              variant="outlined"
                              size="small"
                              value={selectedUser!.companyName}
                            />
                          </Col>
                        </Row>
                      </div>
                      <div className="pt-4">
                        <Row>
                          <Col>
                            {selectedUser!.userCategoryName == "User" && (
                              <Button
                                fullWidth
                                variant="contained"
                                className={style["btn-createEmployee"]}
                                startIcon={<AdminPanelSettingsRoundedIcon />}
                                onClick={handleGivePermissions}
                              >
                                Otorgar Permisos
                              </Button>
                            )}
                            {selectedUser!.userCategoryName == "Support" && (
                              <Button
                                fullWidth
                                variant="contained"
                                className={style["btn-createClient"]}
                                startIcon={<RemoveCircleOutlineRoundedIcon />}
                                onClick={handleRemovePermissions}
                              >
                                Remover Permisos
                              </Button>
                            )}
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

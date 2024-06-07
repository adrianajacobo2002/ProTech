"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Button from "@mui/material/Button";
import UsersTable from "@/components/users-table";
import style from "./style.module.scss";
import ClientSignUpModal from "@/forms/ClientSignUp";
import EmployeeSignUpModal from "@/forms/EmployeeSignUp";



interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UsersReport() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [modalShow, setModalShow] = React.useState(false);
  const [EmployeemodalShow, EmployeesetModalShow] = React.useState(false);
  

  const handleShowModal = () => setModalShow(true);
  const handleHideModal = () => setModalShow(false);

  const handleEmployeeModalShow = () => EmployeesetModalShow(true);
  const handleEmployeeModalClose = () => EmployeesetModalShow(false);




  return (
    <>
      <div>
        <h1>Usuarios</h1>
        <div className="">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <div className="d-flex justify-content-between">
                <div>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Empleados" {...a11yProps(0)} />
                    <Tab label="Clientes" {...a11yProps(1)} />
                  </Tabs>
                </div>

                <div >
                  <Button
                    variant="contained"
                    className={style["btn-createClient"]}
                    startIcon={<PersonRoundedIcon />}
                    onClick={handleShowModal}
                  >
                    Crear Cliente
                  </Button>
                  <ClientSignUpModal show={modalShow} onHide={handleHideModal} />
                  <Button
                    variant="contained"
                    className={style["btn-createEmployee"]}
                    startIcon={<PersonRoundedIcon />}
                    onClick={handleEmployeeModalShow}
                  >
                    Crear Empleado
                  </Button>
                  <EmployeeSignUpModal show={EmployeemodalShow} onHide={handleEmployeeModalClose} />

                </div>
              </div>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <UsersTable />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <UsersTable />
            </CustomTabPanel>
          </Box>
        </div>
      </div>
    </>
  );
}


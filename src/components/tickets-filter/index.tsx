"use client";

import { FC } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import style from "./styles.module.scss";
import { TFilter } from "@/utils/types";
import useSupports from "@/hooks/useSupports";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import dayjs from "dayjs";

interface TicketsFilterProps {
  show: boolean;
  handleClose: () => void;
  placement?: "end";
  onFilter?: (filter: TFilter) => void;
}

const TicketsFilter: FC<TicketsFilterProps> = ({
  show,
  handleClose,
  onFilter,
}) => {
  const { supports } = useSupports();

  const { control, handleSubmit, watch, setValue, reset } = useForm<TFilter>({
    defaultValues: {
      agenteId: 0,
      state: "",
      from: null,
      to: null,
    },
  });

  const from = watch("from");
  const to = watch("to");

  const handleFromChange = (newValue: Date) => {
    if (to != null && to < newValue) {
      setValue("to", newValue);
    }

    setValue("from", newValue);
  };

  const handleFormSubmit: SubmitHandler<TFilter> = (data) => {
    handleClose();
    onFilter && onFilter(data);
    reset();
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Body>
        <div className="p-4">
          <p className="py-3">
            <b>Filtrar Por:</b>
          </p>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="pb-3">
              <Controller
                control={control}
                name="state"
                render={({ field: { onChange, value } }) => (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Estado
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={value}
                      label="Estadp"
                      onChange={(e) => onChange(e.target.value)}
                    >
                      <MenuItem value="EN ESPERA">En Espera</MenuItem>
                      <MenuItem value="EN PROGRESO">En Progreso</MenuItem>
                      <MenuItem value="RESUELTO">Resuelto</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </div>

            <div className="pb-3">
              <Controller
                control={control}
                name="agenteId"
                render={({ field: { value, onChange, ...field } }) => (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={supports.map((s) => ({
                      label: s.name,
                      value: s.idUser,
                    }))}
                    onChange={(_, v) => onChange(v?.value)}
                    renderInput={(params) => (
                      <TextField {...params} {...field} label="Agente" />
                    )}
                  />
                )}
              />
            </div>

            <div className="pb-3">
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    autoComplete="off"
                    label="Área"
                  />
                )}
              />
            </div>

            <Controller
              control={control}
              name="from"
              render={({}) => (
                <div className="pb-3">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Fecha Inicio"
                        onChange={(newVal) =>
                          handleFromChange(newVal?.toDate() ?? new Date())
                        }
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              )}
            />

            <Controller
              control={control}
              name="to"
              render={({ field: { onChange, value } }) => (
                <div className="pb-3">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Fecha Final"
                        minDate={dayjs(from)}
                        defaultValue={dayjs(new Date())}
                        value={dayjs(value)}
                        onChange={(newVal) => onChange(newVal?.toDate())}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              )}
            />

            <div>
              <Button
                fullWidth
                className={style["btn-sendInfo"]}
                variant="contained"
                type="submit"
              >
                Aplicar Filtros
              </Button>
            </div>
          </form>
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

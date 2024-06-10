"use client";

import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { Col, Row } from "react-bootstrap";
import { TTicketAdditionalTask } from "@/utils/types";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { finishTask } from "@/services/tasks.service";
import useTasks from "@/hooks/useTasks";
import useUser from "@/hooks/useUser";
import { toast } from "react-toastify";

interface TaskResumeProps {
  show: boolean;
  onHide: () => void;
  task: TTicketAdditionalTask;
}

function TaskResume(props: TaskResumeProps) {
  const [finishingTask, setFinishingTask] = useState(false);
  const { user } = useUser();
  const { reloadTasks } = useTasks(user?.idUser ?? 0);

  const handleCompleteTask = async () => {
    setFinishingTask(true);
    await finishTask(props.task!.IdTicketAdditionalTask);
    setFinishingTask(false);
    toast("Tarea terminada con éxito", {
      type: "success",
    });
    props.onHide();
    reloadTasks();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="p-5">
        <h5>
          <b>Ticket #{props.task?.IdTicket}</b>
        </h5>
        <p>- {props.task?.Description} -</p>

        <div>
          <Row className="py-2">
            <Col md={4}>
              <b>Tarea Número</b>
            </Col>
            <Col md={4}>
              <b>Encargado</b>
            </Col>
            <Col md={4}>
              <b>Completar tarea</b>
            </Col>
          </Row>
          <Row>
            <Col md={4}>Tarea {props.task?.IdTicketAdditionalTask}</Col>
            <Col md={4}>{props.task?.IdEmployeeNavigation.Name}</Col>
            <Col md={4}>
              {!props.task?.Finished && (
                <IconButton
                  onClick={handleCompleteTask}
                  disabled={finishingTask}
                >
                  <CheckCircleOutlineRoundedIcon color="success" />
                </IconButton>
              )}
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
}

interface TasksResumeModalProps {
  show: boolean;
  onHide: () => void;
  task: TTicketAdditionalTask;
}

export default function TasksResumeModal(props: TasksResumeModalProps) {
  return (
    <TaskResume show={props.show} onHide={props.onHide} task={props.task} />
  );
}

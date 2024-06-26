"use client";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import imgDev from "@/assets/images/Programming-bro.png";
import Button from "@/components/button-showtickets";
import useUser from "@/hooks/useUser";
import { useRouter } from "next-nprogress-bar";
import useAssignedTickets from "@/hooks/useAssignedTickets";

export default function WelcomeCard() {
  const { user } = useUser();
  const router = useRouter();
  const { assignedTickets } = useAssignedTickets(user?.idUser ?? 0);

  const handleVerTicketsClick = () => {
    const url =
      user?.userCategoryName == "User" ? "mis-tickets" : "tickets-asignados";
    router.push(url);
  };

  const welcomeMessage =
    user?.userCategoryName == "User"
      ? "Hecha un vistazo a tus tickets"
      : `Te han asignado ${assignedTickets.length} tickets`;

  return (
    <div>
      <Card body className="px-2" style={{ height: "300px" }}>
        <Row>
          <Col>
            <h1 style={{ fontSize: "25px" }}>
              <b>Hola, {user?.name}</b>
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <small>{welcomeMessage}</small>
          </Col>
        </Row>
        <div className="align-items-center justify-content-center px-5">
          <Row className="align-items-center justify-content-center px-5">
            <Col>
              <Image
                src={imgDev}
                width={150}
                height={150}
                alt="Hombre programando"
              />
            </Col>
          </Row>
          <Row>
            <Button onClick={handleVerTicketsClick} />
          </Row>
        </div>
      </Card>
    </div>
  );
}

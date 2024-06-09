"use client";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import imgDev from "@/assets/images/Programming-bro.png";
import Button from "@/components/button-showtickets";
import useUser from "@/hooks/useUser";
import useTickets from "@/hooks/useTickets";
import { useRouter } from "next-nprogress-bar";

export default function WelcomeCard() {
  const { user } = useUser();
  const { tickets } = useTickets(user!.idUser);
  const router = useRouter();

  const handleVerTicketsClick = () => {
    const url = user?.userCategoryName == "User" ? "mis-tickets" : "tickets";
    router.push(`/users/${url}`);
  };

  const welcomeMessage =
    user?.userCategoryName == "User"
      ? "Hecha un vistazo a tus tickets"
      : "Te han asignado {} tickets";
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

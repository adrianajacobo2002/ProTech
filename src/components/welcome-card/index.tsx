"use client";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import imgDev from "@/assets/images/Programming-bro.png";
import Button from "@/components/button-showtickets";
import style from "./styles.module.scss";

export default function WelcomeCard() {
  return (
    <div   >
      <Card body className="px-2" style={{height:"300px"}}>
        <Row>
          <Col>
            <h1 style={{ fontSize: "25px" }}>
              <b>Hola, Jose P.</b>
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <small>Te han asignado {} tickets</small>
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
            <Button></Button>
          </Row>
        </div>
      </Card>
    </div>
  );
}

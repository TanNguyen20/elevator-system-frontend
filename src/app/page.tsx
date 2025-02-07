import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { Row, Col, Button, Input } from "antd";

const ELEVATORS = 3;
const FLOORS = 10;

export default function ElevatorSystem() {
  const [elevators, setElevators] = useState(
    Array(ELEVATORS).fill({ currentFloor: 1, doorsOpen: false })
  );

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/elevator/status", (message) => {
        setElevators(JSON.parse(message.body));
      });
    });

    return () => {
      stompClient.disconnect();
    };
  }, []);

  const requestMove = (direction) => {
    console.log(`Requesting to move ${direction}`);
    // Send WebSocket request to move elevator
  };

  const controlElevator = (floor, action) => {
    console.log(`Floor ${floor}: ${action}`);
    // Send WebSocket request to control elevator at floor
  };

  return (
    <div style={{ padding: "16px", width: "55vw" }}>
      {/* Control Panel for Moving Up and Down */}
      <Row
        gutter={[8, 8]}
        justify="center"
        style={{ marginBottom: "16px" }}
      >
        <Button onClick={() => requestMove("UP")}>Move Up</Button>
        <Button onClick={() => requestMove("DOWN")} style={{ marginLeft: "8px" }}>Move Down</Button>
      </Row>
      
      {Array.from({ length: FLOORS }, (_, floor) => (
        <Row
          key={floor}
          gutter={[8, 8]}
          align="middle"
          justify="center"
          style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
        >
          {elevators.map((elevator, index) => (
            <Col key={index} span={4} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {elevator.currentFloor === FLOORS - floor && (
                <div style={{ backgroundColor: "#1E3A8A", width: "32px", height: "32px", borderRadius: "50%" }} />
              )}
              <span style={{ fontSize: "12px" }}>Floor {FLOORS - floor}</span>
            </Col>
          ))}
          {/* Control Panel for Each Floor */}
          <Col span={12} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
            <Row
                gutter={[8, 8]}
                align="middle"
                justify="center"
                >
                <Col span={12} style={{ display: "flex"}}>
                    <Button onClick={() => controlElevator(FLOORS - floor, "DOOR_OPEN")}>Open Door</Button>
                    <Button onClick={() => controlElevator(FLOORS - floor, "DOOR_CLOSE")}>Close Door</Button>
                </Col>
                <Col span={12} style={{ display: "flex" }}>
                    <Input type="number" max={10} min={1} placeholder="Floor" />
                    <Button onClick={() => controlElevator(FLOORS - floor, "CHOOSE_FLOOR")} >Choose Floor</Button>
                </Col>
            </Row>
          </Col>
        </Row>
      ))}
    </div>
  );
}

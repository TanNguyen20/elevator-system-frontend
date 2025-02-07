"use client";

import { useEffect, useState } from "react";
import { Row, Col, Button, Input } from "antd";
import { useWebSocket } from "./hooks/useWebSocket";
import {getElevators} from "@/app/apis/elevator";
import {Elevator} from "@/app/types/elevator";

const FLOORS = 10;

export default function ElevatorSystem() {
  const [elevators, setElevators] = useState<Array<Elevator>>([]);
  const [floorInputs, setFloorInputs] = useState<string[]>([]);
  const { messages, sendMessage } = useWebSocket();

  useEffect(() => {
    getElevators().then(res => {
      console.log(res)
      setElevators(res)
    })
    sendMessage("hello");
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  // const requestMove = (direction: string) => {
  //   console.log(`Requesting to move ${direction}`);
  //   // Send WebSocket request to move elevator
  // };

  const controlElevator = (id: number, action: string) => {
    const floor = parseInt(floorInputs[id], 10);
    if (!isNaN(floor) && floor >= 1 && floor <= FLOORS) {
      console.log(`Elevator ${id} -> Floor ${floor}: ${action}`);
      // Send WebSocket or API request to control the elevator
    } else {
      console.warn("Invalid floor input");
    }
  };

  const handleFloorInputChange = (index: number, value: string) => {
    const newFloorInputs = [...floorInputs];
    newFloorInputs[index] = value;
    setFloorInputs(newFloorInputs);
  };

  return (
      <div style={{ padding: "16px", width: "auto" }}>
        <Row gutter={[8, 8]} justify="center" style={{ marginBottom: "16px" }}>
          <Button onClick={() => sendMessage("hello")}>Move Up</Button>
          <Button onClick={() => sendMessage("hello")} style={{ marginLeft: "8px" }}>
            Move Down
          </Button>
        </Row>

        <Row gutter={[8, 8]} justify="center" style={{ marginBottom: "16px" }}>
          {elevators.map((elevator, index) => (
              <Col key={elevator.id} span={5} style={{ display: "flex" }}>
                <Input
                    style={{ marginRight: 8 }}
                    type="number"
                    max={10}
                    min={1}
                    placeholder="Floor"
                    value={floorInputs[index]}
                    onChange={(e) => handleFloorInputChange(index, e.target.value)}
                />
                <Button onClick={() => controlElevator(elevator.id, "CHOOSE_FLOOR")}>
                  Choose Floor
                </Button>
              </Col>
          ))}
        </Row>

        {Array.from({ length: FLOORS }, (_, floor) => (
            <Row
                key={floor}
                gutter={[8, 8]}
                align="middle"
                justify="center"
                style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
            >
              {elevators.map((elevator) => (
                  <Col key={elevator.id} span={5} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {elevator.currentFloor === FLOORS - floor && (
                        <div style={{ backgroundColor: "#1E3A8A", width: "32px", height: "32px", borderRadius: "50%" }} />
                    )}
                    <span style={{ fontSize: "12px" }}>Floor {FLOORS - floor}</span>
                  </Col>
              ))}
              <Col span={9} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button style={{ marginRight: 8 }}>Open Door</Button>
                <Button>Close Door</Button>
              </Col>
            </Row>
        ))}
      </div>
  );
}

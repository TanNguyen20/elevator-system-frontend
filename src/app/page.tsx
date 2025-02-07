import { useState } from "react";
import { Row, Col, Button, Input } from "antd";
import { useWebSocket } from "./hooks/useWebSocket";

const ELEVATORS = 3;
const FLOORS = 10;

export default function ElevatorSystem() {
  const [elevators, ] = useState(
    Array(ELEVATORS).fill({ currentFloor: 1, doorsOpen: false })
  );
  const [floorInputs, setFloorInputs] = useState(Array(ELEVATORS).fill(""));
  const { messages, sendMessage } = useWebSocket();

  const requestMove = (direction: string) => {
    console.log(`Requesting to move ${direction}`);
    // Send WebSocket request to move elevator
  };

  const controlElevator = (index: number, action: string) => {
    const floor = parseInt(floorInputs[index], 10);
    if (!isNaN(floor) && floor >= 1 && floor <= FLOORS) {
      console.log(`Floor ${floor}: ${action}`);
      // Send WebSocket request to control elevator at floor
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
    <div style={{ padding: "16px", width: "55vw" }}>
      <Row gutter={[8, 8]} justify="center" style={{ marginBottom: "16px" }}>
        <Button onClick={() => requestMove("UP")}>Move Up</Button>
        <Button onClick={() => requestMove("DOWN")} style={{ marginLeft: "8px" }}>
          Move Down
        </Button>
      </Row>

      <Row gutter={[8, 8]} justify="center" style={{ marginBottom: "16px" }}>
        {Array.from({ length: ELEVATORS }).map((_, index) => (
          <Col key={index} span={5} style={{ display: "flex" }}>
            <Input
              style={{ marginRight: 8 }}
              type="number"
              max={10}
              min={1}
              placeholder="Floor"
              value={floorInputs[index]}
              onChange={(e) => handleFloorInputChange(index, e.target.value)}
            />
            <Button onClick={() => controlElevator(index, "CHOOSE_FLOOR")}>
              Choose Floor
            </Button>
          </Col>
        ))}
        <Col span={9} style={{ display: "flex" }}>
          <div></div>
        </Col>
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
            <Col key={index} span={5} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {elevator.currentFloor === FLOORS - floor && (
                <div style={{ backgroundColor: "#1E3A8A", width: "32px", height: "32px", borderRadius: "50%" }} />
              )}
              <span style={{ fontSize: "12px" }}>Floor {FLOORS - floor}</span>
            </Col>
          ))}
          <Col span={9} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Button style={{ marginRight: 8 }} onClick={() => controlElevator(FLOORS - floor, "DOOR_OPEN")}>
              Open Door
            </Button>
            <Button onClick={() => controlElevator(FLOORS - floor, "DOOR_CLOSE")}>Close Door</Button>
          </Col>
        </Row>
      ))}
    </div>
  );
}

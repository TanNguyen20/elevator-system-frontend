"use client";

import {useEffect, useState} from "react";
import {Row, Col, Button, Input} from "antd";
import {useWebSocket} from "./hooks/useWebSocket";
import {closeDoor, getElevators, openDoor} from "@/app/apis/elevator";
import {Elevator} from "@/app/types/elevator";

const FLOORS = 10;

export default function ElevatorSystem() {
    const [elevators, setElevators] = useState<Array<Elevator>>([]);
    const [floorInputs, setFloorInputs] = useState<string[]>([]);
    const {messages, sendMessage} = useWebSocket();

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
        <div className="p-4 w-auto">
            <Row gutter={[8, 8]} justify="center" className="mb-4">
                <Button
                    onClick={() => sendMessage("hello")}
                >
                    Move Up
                </Button>
                <Button
                    onClick={() => sendMessage("hello")}
                    className="ml-2"
                >
                    Move Down
                </Button>
            </Row>

            <Row
                gutter={[8, 8]}
                align="middle"
                justify="center"
            >
                {elevators.map((elevator, index) => (
                    <Col key={elevator.id} span={5} className="flex">
                        <Input
                            className="mr-2"
                            type="number"
                            max={10}
                            min={1}
                            placeholder="Floor"
                            value={floorInputs[index]}
                            onChange={(e) => handleFloorInputChange(index, e.target.value)}
                        />
                        <Button
                            className="mr-3"
                            onClick={() => controlElevator(elevator.id, "CHOOSE_FLOOR")}
                        >
                            Choose Floor
                        </Button>
                    </Col>
                ))}
                <Col span={9}>
                    <div></div>
                </Col>
            </Row>

            {Array.from({length: FLOORS}, (_, floor) => (
                <Row
                    key={floor}
                    gutter={[8, 8]}
                    align="middle"
                    justify="center"
                    className="p-2"
                    style={{borderBottom: "1px solid #ddd"}}
                >
                    {elevators.map((elevator) => (
                        <Col key={elevator.id} span={5}
                             className="flex flex-col items-center">
                            {elevator.currentFloor === FLOORS - floor && (
                                <div className="bg-[#1E3A8A] w-8 h-8 rounded-[50%]"/>
                            )}
                            <span className="text-[12px]">Floor {FLOORS - floor}</span>
                        </Col>
                    ))}
                    <Col span={9} className="flex justify-center items-center">
                        <Button
                            className="mr-2"
                            onClick={() => openDoor(1)}
                        >
                            Open Door
                        </Button>
                        <Button
                            onClick={() => closeDoor(1)}
                        >
                            Close Door
                        </Button>
                    </Col>
                </Row>
            ))}
        </div>
    );
}

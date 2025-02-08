"use client";

import {useEffect, useState} from "react";
import {Button, Col, Input, Row, Typography} from "antd";
import {useWebSocket} from "./hooks/useWebSocket";
import {closeDoor, getElevators, goToFloor, openDoor, requestElevator} from "@/app/apis/elevator";
import {Elevator, ElevatorDirection, ElevatorDoor} from "@/app/types/elevator";

const FLOORS = 10;

export default function ElevatorSystem() {
    const [elevators, setElevators] = useState<Array<Elevator>>([]);
    const [floorInputs, setFloorInputs] = useState<number[]>([]);
    const {messages, sendMessage} = useWebSocket();

    useEffect(() => {
        getElevators().then(res => {
            setElevators(res)
        })
        sendMessage("hello");
    }, []);

    useEffect(() => {
        if(messages.length > 0) {
            const elevatorUpdate: Elevator = JSON.parse(messages[messages.length - 1])
            const currentElevators = [...elevators]
            const newElevators = currentElevators.map((elevator) => {
                if(elevator.id === elevatorUpdate.id) {
                    return elevatorUpdate;
                }
                return elevator;
            })
            setElevators((newElevators))
        }
    }, [JSON.stringify(messages)]);

    const handleFloorInputChange = (index: number, value: string) => {
        const newFloorInputs = [...floorInputs];
        newFloorInputs[index] = parseInt(value);
        setFloorInputs(newFloorInputs);
    };

    return (
        <div className="p-4 w-auto">
            <Typography.Title className="text-center" level={1}>
                Elevator System UI
            </Typography.Title>

            <Row
                gutter={[8, 8]}
                align="middle"
                justify="center"
            >
                {elevators.map((elevator, index) => (
                    <Col key={elevator.id} span={6} className="flex-row">
                        <div className="flex mb-2">
                            <Input
                                className="mr-2 "
                                type="number"
                                max={10}
                                min={1}
                                placeholder="Floor"
                                value={floorInputs[index]}
                                onChange={(e) => handleFloorInputChange(index, e.target.value)}
                            />
                            <Button
                                className="mr-3"
                                onClick={() => goToFloor(elevator.id, floorInputs[index])}
                            >
                                Go to
                            </Button>
                        </div>
                        <div className="flex">
                            <Button
                                className="mr-2"
                                onClick={() => openDoor(elevator.id)}
                            >
                                Open Door
                            </Button>
                            <Button
                                onClick={() => closeDoor(elevator.id)}
                            >
                                Close Door
                            </Button>
                        </div>
                    </Col>
                ))}
                <Col span={6}>
                    <div></div>
                </Col>
            </Row>

            {Array.from({length: FLOORS}, (_, floor) => {
                return (
                    <Row
                        key={floor}
                        gutter={[8, 8]}
                        align="middle"
                        justify="center"
                        className="p-2"
                        style={{borderBottom: "1px solid #ddd"}}
                    >
                        {elevators.map((elevator) => (
                            <Col key={elevator.id} span={6}
                                 className="flex flex-col items-center">
                                {elevator.currentFloor === FLOORS - floor && (
                                    <div className={`${elevator.doorState === ElevatorDoor.CLOSED ? "bg-[#1E3A8A]" : "bg-red-600"} w-8 h-8 rounded-[50%]`}/>
                                )}
                                <span className="text-[12px]">Floor {FLOORS - floor}</span>
                            </Col>
                        ))}
                        <Col span={6}>
                            <Button
                                onClick={() => requestElevator(FLOORS - floor, ElevatorDirection.UP)}
                            >
                                Move Up
                            </Button>
                            <Button
                                onClick={() => requestElevator(FLOORS - floor, ElevatorDirection.DOWN)}
                                className="ml-2"
                            >
                                Move Down
                            </Button>
                        </Col>
                    </Row>
                )
            })}
        </div>
    );
}

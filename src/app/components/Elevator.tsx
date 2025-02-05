"use client";

import { useState, useEffect } from "react";
import {closeDoors, getElevators, openDoors} from "@/app/apis/elevator";
import {Elevator} from "@/app/types/elevator";

export default function ElevatorComponent() {
    const [elevators, setElevators] = useState<Elevator[]>([]);

    useEffect(() => {
        const fetchElevators = async () => {
            const data = await getElevators();
            setElevators(data);
        };
        fetchElevators();
    }, []);

    return (
        <div className="flex space-x-4 p-6">
            {elevators.map((elevator) => (
                <div key={elevator.id} className="p-4 border rounded-md text-center">
                    <p className="font-bold">Elevator {elevator.id}</p>
                    <p>Floor: {elevator.currentFloor}</p>
                    <p>Status: {elevator.status}</p>
                    <p>Direction: {elevator.direction}</p>
                    <button className="mt-2 p-2 bg-green-500 text-white rounded" onClick={() => openDoors(elevator.id)}>⬅️➡️ Open</button>
                    <button className="mt-2 p-2 bg-red-500 text-white rounded" onClick={() => closeDoors(elevator.id)}>➡️⬅️ Close</button>
                </div>
            ))}
        </div>
    );
}

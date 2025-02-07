"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Elevator from "@/components/Elevator";

type ElevatorType = {
  id: number;
  currentFloor: number;
  state: "IDLE" | "MOVING";
  direction: "UP" | "DOWN" | "NONE";
  doorState: "OPEN" | "CLOSED";
};

export default function Home() {
  const [elevators, setElevators] = useState<ElevatorType[]>([]);

  useEffect(() => {
    fetchElevators();
  }, []);

  const fetchElevators = async () => {
    try {
      const response = await axios.get("http://localhost:8080/elevators");
      setElevators(response.data);
    } catch (error) {
      console.error("Error fetching elevators:", error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Elevator System</h1>
      <div className="flex gap-6">
        {elevators.map((elevator) => (
          <Elevator key={elevator.id} elevator={elevator} refresh={fetchElevators} />
        ))}
      </div>
    </main>
  );
}

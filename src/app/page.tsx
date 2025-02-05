"use client"

import Floor from "./components/Floor";
import ElevatorComponent from "@/app/components/Elevator";

export default function Home() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Elevator System</h1>
            <div className="grid grid-cols-1 gap-4 mt-4">
                {[...Array(10)].map((_, i) => (
                    <Floor key={i} floor={10 - i} />
                ))}
            </div>
            <ElevatorComponent />
        </main>
    );
}

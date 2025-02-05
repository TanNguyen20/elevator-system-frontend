"use client";

import {sendElevator} from "@/app/apis/elevator";

export default function Floor({floor}: { floor: number }) {
    return (
        <div className="flex items-center space-x-2">
            <p>Floor {floor}</p>
            <button className="p-2 bg-blue-500 text-white rounded" onClick={() => sendElevator(1, floor)}>⬆️</button>
            <button className="p-2 bg-blue-500 text-white rounded" onClick={() => sendElevator(1, floor)}>⬇️</button>
        </div>
    );
}

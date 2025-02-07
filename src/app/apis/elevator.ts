import {Elevator} from "@/app/types/elevator";

const BASE_URL = "http://localhost:8080/api/elevators";

export const getElevators = async (): Promise<Array<Elevator>> => {
    const res = await fetch(BASE_URL);
    return res.json();
};

export const sendElevator = async (elevatorId: number, floor: number) => {
    await fetch(`${BASE_URL}/${elevatorId}/send?floor=${floor}`, { method: "POST" });
};

export const openDoor = async (elevatorId: number) => {
    await fetch(`${BASE_URL}/${elevatorId}/open`, { method: "POST" });
};

export const closeDoor = async (elevatorId: number) => {
    await fetch(`${BASE_URL}/${elevatorId}/close`, { method: "POST" });
};

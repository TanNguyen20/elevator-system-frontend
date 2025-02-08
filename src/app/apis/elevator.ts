import {Elevator, ElevatorDirection} from "@/app/types/elevator";

const BASE_URL = "http://localhost:8080/api/elevators";

export const getElevators = async (): Promise<Array<Elevator>> => {
    const res = await fetch(BASE_URL);
    return res.json();
};

export const requestElevator = async (floor: number, direction: ElevatorDirection) => {
    await fetch(`${BASE_URL}/request?direction=${direction}&floor=${floor}`, { method: "POST" });
};

export const goToFloor = async (elevatorId: number, floor: number) => {
    await fetch(`${BASE_URL}/${elevatorId}/goto/${floor}`, { method: "POST" });
};

export const openDoor = async (elevatorId: number) => {
    await fetch(`${BASE_URL}/${elevatorId}/door/open`, { method: "POST" });
};

export const closeDoor = async (elevatorId: number) => {
    await fetch(`${BASE_URL}/${elevatorId}/door/close`, { method: "POST" });
};

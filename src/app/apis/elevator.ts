import {Elevator} from "@/app/types/elevator";

const BASE_URL = "http://localhost:8080/api/elevators";

export const getElevators = async (): Promise<Elevator[]> => {
    const res = await fetch(BASE_URL);
    return res.json();
};

export const sendElevator = async (id: number, floor: number) => {
    await fetch(`${BASE_URL}/${id}/send?floor=${floor}`, { method: "POST" });
};

export const openDoors = async (id: number) => {
    await fetch(`${BASE_URL}/${id}/open`, { method: "POST" });
};

export const closeDoors = async (id: number) => {
    await fetch(`${BASE_URL}/${id}/close`, { method: "POST" });
};

export enum ElevatorStatus {
    IDLE = "IDLE",
    MOVING = "MOVING",
    STOPPED = "STOPPED",
}

export enum ElevatorDirection {
    UP = "UP",
    DOWN = "DOWN",
    NONE = "NONE",
}

export enum ElevatorDoor {
    OPEN = "OPEN",
    CLOSED = "CLOSED",
}

export interface Elevator {
    id: number;
    currentFloor: number;
    state: ElevatorStatus;
    direction: ElevatorDirection;
    doorState: ElevatorDoor;
}

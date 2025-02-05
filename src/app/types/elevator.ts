export enum ElevatorStatus {
    MOVING_UP = "MOVING_UP",
    MOVING_DOWN = "MOVING_DOWN",
    IDLE = "IDLE",
}

export enum ElevatorDirection {
    UP = "UP",
    DOWN = "DOWN",
    NONE = "NONE",
}

export interface Elevator {
    id: number;
    currentFloor: number;
    status: ElevatorStatus;
    direction: ElevatorDirection;
    doorsOpen: boolean;
}

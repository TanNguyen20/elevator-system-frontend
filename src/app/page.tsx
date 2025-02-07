import axios from "axios";

type ElevatorProps = {
  elevator: {
    id: number;
    currentFloor: number;
    state: "IDLE" | "MOVING";
    direction: "UP" | "DOWN" | "NONE";
    doorState: "OPEN" | "CLOSED";
  };
  refresh: () => void;
};

export default function Elevator({ elevator, refresh }: ElevatorProps) {
  const floors = Array.from({ length: 10 }, (_, i) => 10 - i);

  const moveElevator = async () => {
    try {
      await axios.post(`http://localhost:8080/api/elevators/${elevator.id}/move`);
      refresh();
    } catch (error) {
      console.error("Error moving elevator:", error);
    }
  };

  const openDoor = async () => {
    try {
      await axios.post(`http://localhost:8080/api/elevators/${elevator.id}/door/open`);
      refresh();
    } catch (error) {
      console.error("Error opening door:", error);
    }
  };

  const closeDoor = async () => {
    try {
      await axios.post(`http://localhost:8080/api/elevators/${elevator.id}/door/close`);
      refresh();
    } catch (error) {
      console.error("Error closing door:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4 border border-gray-400 rounded-md bg-white">
      <h2 className="font-bold text-lg">Elevator {elevator.id}</h2>
      <div className="relative w-20 h-[300px] border border-gray-700 bg-gray-200 flex flex-col-reverse">
        {floors.map((floor) => (
          <div
            key={floor}
            className={`h-[10%] flex items-center justify-center border-t text-sm ${
              elevator.currentFloor === floor ? "bg-blue-500 text-white font-bold" : ""
            }`}
          >
            {floor}
          </div>
        ))}
      </div>
      <p>Status: {elevator.state}</p>
      <p>Direction: {elevator.direction}</p>
      <p>Doors: {elevator.doorState}</p>
      <div className="flex gap-2">
        <button onClick={openDoor} className="px-3 py-1 bg-green-500 text-white rounded-md">Open</button>
        <button onClick={closeDoor} className="px-3 py-1 bg-red-500 text-white rounded-md">Close</button>
      </div>
      <button onClick={moveElevator} className="px-3 py-1 bg-gray-300 rounded-md">
        Move
      </button>
    </div>
  );
}

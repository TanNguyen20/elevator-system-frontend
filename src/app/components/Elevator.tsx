import axios from "axios";

type Props = {
  floor: number;
  refresh: () => void;
};

export default function FloorRequestPanel({ floor, refresh }: Props) {
  const requestElevator = async (direction: "UP" | "DOWN") => {
    try {
      await axios.post(`http://localhost:8080/api/elevators/request`, null, {
        params: { floor, direction },
      });
      refresh();
    } catch (error) {
      console.error("Error requesting elevator:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-bold">{floor}</span>
      <button
        onClick={() => requestElevator("UP")}
        className="px-3 py-1 bg-blue-500 text-white rounded-md"
      >
        Move Up
      </button>
      <button
        onClick={() => requestElevator("DOWN")}
        className="px-3 py-1 bg-red-500 text-white rounded-md"
      >
        Move Down
      </button>
    </div>
  );
}

import { useEffect, useState, useRef } from "react";

const WEBSOCKET_URL = "ws://localhost:8080/ws";

export const useWebSocket = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        socketRef.current = new WebSocket(WEBSOCKET_URL);

        socketRef.current.onopen = () => {
            console.log("✅ WebSocket connected");
        };

        socketRef.current.onmessage = (event) => {
            console.log("📥 Received from backend:", event.data);
            setMessages((prev) => [...prev, event.data]);
        };

        socketRef.current.onerror = (error) => {
            console.error("❌ WebSocket error:", error);
        };

        socketRef.current.onclose = () => {
            console.log("❌ WebSocket closed");
        };

        return () => {
            socketRef.current?.close();
        };
    }, []);

    const sendMessage = (msg: string) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            console.log("📤 Sending message:", msg);
            socketRef.current.send(msg);
        } else {
            console.warn("⚠️ WebSocket not connected. Message not sent.");
        }
    };

    return { messages, sendMessage };
};

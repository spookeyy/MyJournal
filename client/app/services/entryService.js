import { server_url } from "../../config.json";
import { initWebSocket, closeWebSocket } from "../services/websocket";

const socket = initWebSocket();

export const fetchEntries = async (accessToken) => {
    try {
        const response = await fetch(`${server_url}/entries`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${socket.accessToken}`,
            },
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        console.error("Error fetching entries:", error);
        throw error;
    }
};

export const fetchEntry = async (accessToken, entryId) => {
    try {
        const response = await fetch(`${server_url}/entries/${entryId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        console.error("Error fetching entry:", error);
        throw error;
    }
};

export const createEntry = async (accessToken, entry) => {
    try {
        const response = await fetch(`${server_url}/entries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(entry),
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        console.error("Error creating entry:", error);
        throw error;
    }
};

export const updateEntry = async (accessToken, entryId, entry) => {
    try {
        const response = await fetch(`${server_url}/entries/${entryId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(entry),
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        console.error("Error updating entry:", error);
        throw error;
    }
};

export const deleteEntry = async (accessToken, entryId) => {
    try {
        const response = await fetch(`${server_url}/entries/${entryId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        console.error("Error deleting entry:", error);
        throw error;
    }
};
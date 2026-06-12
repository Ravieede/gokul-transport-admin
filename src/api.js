// src/api.js

const API_BASE_URL = 'http://localhost:9001/api';

// ===================== USER APIs =====================
export const registerUser = async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/user1/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });

    const text = await response.text();
    let data;
    try {
        data = JSON.parse(text);
    } catch {
        data = text;
    }

    if (!response.ok) {
        throw new Error(typeof data === 'string' ? data : (data.message || 'Failed to register.'));
    }
    return data;
};

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/user1/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const text = await response.text();
    let data;
    try {
        data = JSON.parse(text);
    } catch {
        data = text;
    }

    if (!response.ok) {
        throw new Error(typeof data === 'string' ? data : (data.message || 'Invalid email or password.'));
    }
    return { success: true, user: data };
};

// ===================== DRIVER APIs =====================

// Get all drivers
export const getDrivers = async () => {
    const response = await fetch(`${API_BASE_URL}/drivers/getAllDrivers`);
    if (!response.ok) throw new Error('Failed to fetch drivers');
    return response.json();
};

// Get a single driver by ID
export const getDriverById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/drivers/getDriver/${id}`);
    if (!response.ok) throw new Error('Failed to fetch driver');
    return response.json();
};

// Add a new driver
export const addDriver = async (driver) => {
    const response = await fetch(`${API_BASE_URL}/drivers/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(driver),
    });
    if (!response.ok) throw new Error('Failed to add driver');
    return response.json(); // Assuming backend returns saved driver
};

// Update an existing driver
export const updateDriver = async (id, driver) => {
    const response = await fetch(`${API_BASE_URL}/drivers/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(driver),
    });
    if (!response.ok) throw new Error('Failed to update driver');
    return response.json(); // Assuming backend returns updated driver
};

// Delete a driver by ID
export const deleteDriver = async (id) => {
    const response = await fetch(`${API_BASE_URL}/drivers/delete/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete driver');
    return response.text(); // Assuming backend returns a message
};
// Vehicles API Calling
// ===================== VEHICLE APIs =====================

// Get all vehicles
export const getVehicles = async () => {
    const response = await fetch(`${API_BASE_URL}/vehicles/getAllVehicles`);
    if (!response.ok) throw new Error('Failed to fetch vehicles');
    return response.json();
};

// Get a single vehicle by ID
export const getVehicleById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}`);
    if (!response.ok) throw new Error('Failed to fetch vehicle');
    return response.json();
};

// Add a new vehicle
export const addVehicle = async (vehicle) => {
    const response = await fetch(`${API_BASE_URL}/vehicles/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle),
    });
    if (!response.ok) throw new Error('Failed to add vehicle');
    return response.json(); // Assuming backend returns saved vehicle
};

// Update an existing vehicle
export const updateVehicle = async (id, vehicle) => {
    const response = await fetch(`${API_BASE_URL}/vehicles/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle),
    });
    if (!response.ok) throw new Error('Failed to update vehicle');
    return response.json(); // Assuming backend returns updated vehicle
};

// Delete a vehicle by ID
export const deleteVehicle = async (id) => {
    const response = await fetch(`${API_BASE_URL}/vehicles/delete/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete vehicle');
    return response.text(); // Assuming backend returns a message
};

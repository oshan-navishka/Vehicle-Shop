import { vehicle_db } from "../db/db.js";

const STORAGE_KEY = "pos_vehicles";

// ---------- SAVE ----------
const saveVehicles = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicle_db));
};

// ---------- CLASS ----------
class Vehicle {
    constructor(id, make, model, year, color, qty, price, desc) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.year = year;
        this.color = color;
        this.qty = Number(qty);
        this.price = Number(price);
        this.desc = desc;
    }
}

// ---------- LOAD ON START ----------
const loadVehicles = () => {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        saveVehicles(); // first time seed save
        return;
    }

    const parsed = JSON.parse(data);

    vehicle_db.length = 0;
    vehicle_db.push(...parsed.map(v =>
        new Vehicle(v.id, v.make, v.model, v.year, v.color, v.qty, v.price, v.desc)
    ));
};

// run once
loadVehicles();

// ---------- ADD ----------
export const addVehicleData = (id, make, model, year, color, qty, price, desc) => {
    const v = new Vehicle(id, make, model, year, color, qty, price, desc);
    vehicle_db.push(v);
    saveVehicles();
    return v;
};

// ---------- UPDATE ----------
export const updateVehicleData = (index, id, make, model, year, color, qty, price, desc) => {
    const v = vehicle_db[index];

    v.id = id;
    v.make = make;
    v.model = model;
    v.year = year;
    v.color = color;
    v.qty = Number(qty);
    v.price = Number(price);
    v.desc = desc;

    saveVehicles();
    return v;
};

// ---------- DELETE ----------
export const deleteVehicleData = (index) => {
    vehicle_db.splice(index, 1);
    saveVehicles();
};

// ---------- GET ----------
export const getAllVehicleData = () => vehicle_db;
export const getVehicleDataByIndex = (i) => vehicle_db[i];
export const getVehicleDataById = (id) => vehicle_db.find(v => v.id === id);
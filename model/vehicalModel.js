import { vehicle_db } from "../db/db.js";

class Vehicle {
    #id;
    #make;
    #model;
    #year;
    #color;
    #qty;
    #price;
    #desc;

    constructor(id, make, model, year, color, qty, price, desc) {
        this.#id    = id;
        this.#make  = make;
        this.#model = model;
        this.#year  = year;
        this.#color = color;
        this.#qty   = qty;
        this.#price = price;
        this.#desc  = desc;
    }

    get id()    { return this.#id; }
    get make()  { return this.#make; }
    get model() { return this.#model; }
    get year()  { return this.#year; }
    get color() { return this.#color; }
    get qty()   { return this.#qty; }
    get price() { return this.#price; }
    get desc()  { return this.#desc; }

    set id(v)    { this.#id = v; }
    set make(v)  { this.#make = v; }
    set model(v) { this.#model = v; }
    set year(v)  { this.#year = v; }
    set color(v) { this.#color = v; }
    set qty(v)   { this.#qty = v; }
    set price(v) { this.#price = v; }
    set desc(v)  { this.#desc = v; }
}

// ---- Convert seed plain objects to Vehicle instances ----
for (let i = 0; i < vehicle_db.length; i++) {
    const d = vehicle_db[i];
    if (!(d instanceof Vehicle)) {
        vehicle_db[i] = new Vehicle(
            d.id, d.make, d.model, d.year,
            d.color, d.qty, d.price, d.desc
        );
    }
}

// ---- Add ----
const addVehicleData = (vehicleId, make, model, year, color, qty, price, desc) => {
    const v = new Vehicle(vehicleId, make, model, year, color, qty, price, desc);
    vehicle_db.push(v);
    return v;
};

// ---- Update ----
const updateVehicleData = (index, vehicleId, make, model, year, color, qty, price, desc) => {
    const v = vehicle_db[index];
    v.id    = vehicleId;
    v.make  = make;
    v.model = model;
    v.year  = year;
    v.color = color;
    v.qty   = qty;
    v.price = price;
    v.desc  = desc;
    return v;
};

// ---- Delete ----
const deleteVehicleData = (index) => {
    vehicle_db.splice(index, 1);
    return true;
};

// ---- Get All ----
const getAllVehicleData = () => vehicle_db;

// ---- Get By Index ----
const getVehicleDataByIndex = (index) => vehicle_db[index];

// ---- Get By Id ----
const getVehicleDataById = (vehicleId) => vehicle_db.find(v => v.id === vehicleId);

export {
    addVehicleData,
    updateVehicleData,
    deleteVehicleData,
    getAllVehicleData,
    getVehicleDataByIndex,
    getVehicleDataById
};
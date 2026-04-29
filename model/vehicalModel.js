import { vehicle_db } from "../db/db.js";

/* =========================
   VEHICLE CLASS
========================= */
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
        this.#id = id;
        this.#make = make;
        this.#model = model;
        this.#year = year;
        this.#color = color;
        this.#qty = Number(qty);
        this.#price = Number(price);
        this.#desc = desc;
    }

    get id() { return this.#id; }
    get make() { return this.#make; }
    get model() { return this.#model; }
    get year() { return this.#year; }
    get color() { return this.#color; }
    get qty() { return this.#qty; }
    get price() { return this.#price; }
    get desc() { return this.#desc; }

    set id(v) { this.#id = v; }
    set make(v) { this.#make = v; }
    set model(v) { this.#model = v; }
    set year(v) { this.#year = v; }
    set color(v) { this.#color = v; }
    set qty(v) { this.#qty = Number(v); }
    set price(v) { this.#price = Number(v); }
    set desc(v) { this.#desc = v; }
}

/* =========================
   LOCAL STORAGE SYNC
========================= */
const syncVehicles = () => {
    localStorage.setItem("pos_vehicles", JSON.stringify(vehicle_db));
};

/* =========================
   ADD
========================= */
const addVehicleData = (id, make, model, year, color, qty, price, desc) => {
    const v = new Vehicle(id, make, model, year, color, qty, price, desc);
    vehicle_db.push(v);
    syncVehicles();
    return v;
};

/* =========================
   UPDATE
========================= */
const updateVehicleData = (index, id, make, model, year, color, qty, price, desc) => {
    const v = vehicle_db[index];
    if (!v) return null;

    v.id = id;
    v.make = make;
    v.model = model;
    v.year = year;
    v.color = color;
    v.qty = qty;
    v.price = price;
    v.desc = desc;

    syncVehicles();
    return v;
};

/* =========================
   DELETE
========================= */
const deleteVehicleData = (index) => {
    vehicle_db.splice(index, 1);
    syncVehicles();
};

/* =========================
   GETTERS
========================= */
const getAllVehicleData = () => vehicle_db;
const getVehicleDataByIndex = (i) => vehicle_db[i];
const getVehicleDataById = (id) => vehicle_db.find(v => v.id === id);

/* =========================
   EXPORT
========================= */
export {
    addVehicleData,
    updateVehicleData,
    deleteVehicleData,
    getAllVehicleData,
    getVehicleDataByIndex,
    getVehicleDataById
};
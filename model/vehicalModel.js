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
		this.#id = id;
		this.#make = make;
		this.#model = model;
		this.#year = year;
		this.#color = color;
		this.#qty = qty;
		this.#price = price;
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

	set id(newId) { this.#id = newId; }
	set make(newMake) { this.#make = newMake; }
	set model(newModel) { this.#model = newModel; }
	set year(newYear) { this.#year = newYear; }
	set color(newColor) { this.#color = newColor; }
	set qty(newQty) { this.#qty = newQty; }
	set price(newPrice) { this.#price = newPrice; }
	set desc(newDesc) { this.#desc = newDesc; }
}

// ------------------------------ Add Vehicle -------------------------------
const addVehicleData = (vehicleId, make, model, year, color, qty, price, desc) => {
	let new_vehicle = new Vehicle(vehicleId, make, model, year, color, qty, price, desc);

	vehicle_db.push(new_vehicle);
	return new_vehicle;
};

//------------------------- Update Vehicle -------------------------
const updateVehicleData = (index, vehicleId, make, model, year, color, qty, price, desc) => {
	const vehicle_obj = vehicle_db[index];

	vehicle_obj.id = vehicleId;
	vehicle_obj.make = make;
	vehicle_obj.model = model;
	vehicle_obj.year = year;
	vehicle_obj.color = color;
	vehicle_obj.qty = qty;
	vehicle_obj.price = price;
	vehicle_obj.desc = desc;
	return vehicle_obj;
};

//------------------------- Delete Vehicle -------------------------
const deleteVehicleData = (index) => {
	vehicle_db.splice(index, 1);
	return true;
};

//------------------------- Get Vehicle -------------------------
const getVehicleData = (index) => {
	return vehicle_db[index];
};

//------------------------- Get All Vehicles -------------------------
const getAllVehicleData = () => {
	return vehicle_db;
};

//------------------------- Get Vehicle data by index -------------------------
const getVehicleDataByIndex = (index) => {
	return vehicle_db[index];
};

// ------------------------ Get Vehicle data by Id -------------------------
const getVehicleDataById = (vehicleId) => {
	return vehicle_db.find(item => item.id === vehicleId);
};

export { addVehicleData, updateVehicleData, deleteVehicleData, getVehicleData, getAllVehicleData, getVehicleDataByIndex, getVehicleDataById };

class Order {
	#orderId;
	#date;
	#custId;
	#custName;
	#items;
	#total;
	#discount;
	#cash;
	#balance;

	constructor(orderId, date, custId, custName, items, total, discount, cash, balance) {
		this.#orderId = orderId;
		this.#date = date;
		this.#custId = custId;
		this.#custName = custName;
		this.#items = items;
		this.#total = total;
		this.#discount = discount;
		this.#cash = cash;
		this.#balance = balance;
	}

	get orderId() { return this.#orderId; }
	get date() { return this.#date; }
	get custId() { return this.#custId; }
	get custName() { return this.#custName; }
	get items() { return this.#items; }
	get total() { return this.#total; }
	get discount() { return this.#discount; }
	get cash() { return this.#cash; }
	get balance() { return this.#balance; }

	set orderId(newOrderId) { this.#orderId = newOrderId; }
	set date(newDate) { this.#date = newDate; }
	set custId(newCustId) { this.#custId = newCustId; }
	set custName(newCustName) { this.#custName = newCustName; }
	set items(newItems) { this.#items = newItems; }
	set total(newTotal) { this.#total = newTotal; }
	set discount(newDiscount) { this.#discount = newDiscount; }
	set cash(newCash) { this.#cash = newCash; }
	set balance(newBalance) { this.#balance = newBalance; }
}

const order_db = [
	new Order(
		'ORD3001',
		'2026-04-25',
		'C1001',
		'Kasun Perera',
		[{ id: 'V2002', name: 'Honda Civic 2021', price: 27450, qty: 1, total: 27450 }],
		26901,
		2,
		28000,
		1099
	),
	new Order(
		'ORD3002',
		'2026-04-27',
		'C1003',
		'Ravindu Fernando',
		[{ id: 'V2004', name: 'Suzuki Swift 2023', price: 21400, qty: 1, total: 21400 }],
		21400,
		0,
		22000,
		600
	),
	new Order(
		'ORD3003',
		'2026-04-28',
		'C1002',
		'Nimali Silva',
		[{ id: 'V2001', name: 'Toyota Corolla 2022', price: 28900, qty: 1, total: 28900 }],
		28322,
		2,
		29000,
		678
	)
];

const addOrderData = (orderId, date, custId, custName, items, total, discount, cash, balance) => {
	let new_order = new Order(orderId, date, custId, custName, items, total, discount, cash, balance);

	order_db.push(new_order);
	return new_order;
};

const updateOrderData = (index, orderId, date, custId, custName, items, total, discount, cash, balance) => {
	const order_obj = order_db[index];

	order_obj.orderId = orderId;
	order_obj.date = date;
	order_obj.custId = custId;
	order_obj.custName = custName;
	order_obj.items = items;
	order_obj.total = total;
	order_obj.discount = discount;
	order_obj.cash = cash;
	order_obj.balance = balance;
	return order_obj;
};

const deleteOrderData = (index) => {
	order_db.splice(index, 1);
	return true;
};

const getOrderData = (index) => {
	return order_db[index];
};

const getAllOrderData = () => {
	return order_db;
};

const getOrderDataByIndex = (index) => {
	return order_db[index];
};

const getOrderDataById = (orderId) => {
	return order_db.find(item => item.orderId === orderId);
};


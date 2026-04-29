// Default seed data - 3 customers, 3 vehicles, 3 orders
const customer_db = [
	{
		id: 'C1001',
		firstName: 'Kasun',
		lastName: 'Perera',
		email: 'kasun.perera@example.com',
		phone: '+94 77 123 4567',
		address: 'No. 12, Galle Road, Colombo'
	},
	{
		id: 'C1002',
		firstName: 'Nimali',
		lastName: 'Silva',
		email: 'nimali.silva@example.com',
		phone: '+94 71 998 7744',
		address: 'No. 45, Kandy Road, Kurunegala'
	},
	{
		id: 'C1003',
		firstName: 'Ravindu',
		lastName: 'Fernando',
		email: 'ravindu.fernando@example.com',
		phone: '+94 76 245 3344',
		address: 'No. 8, Temple Street, Gampaha'
	}
];

const vehicle_db = [
	{
		id: 'V2001',
		make: 'Toyota',
		model: 'Corolla',
		year: '2022',
		color: 'Pearl White',
		qty: 3,
		price: 28900,
		desc: 'Hybrid, low mileage, automatic transmission'
	},
	{
		id: 'V2002',
		make: 'Honda',
		model: 'Civic',
		year: '2021',
		color: 'Midnight Black',
		qty: 2,
		price: 27450,
		desc: 'Turbo engine, full service record'
	},
	{
		id: 'V2003',
		make: 'Nissan',
		model: 'X-Trail',
		year: '2020',
		color: 'Gunmetal Gray',
		qty: 1,
		price: 35600,
		desc: 'SUV, AWD, leather seats'
	}
];

const order_db = [
	{
		orderId: 'ORD3001',
		date: '2026-04-25',
		custId: 'C1001',
		custName: 'Kasun Perera',
		items: [
			{ id: 'V2002', name: 'Honda Civic 2021', price: 27450, qty: 1, total: 27450 }
		],
		total: 26901,
		discount: 2,
		cash: 28000,
		balance: 1099
	},
	{
		orderId: 'ORD3002',
		date: '2026-04-27',
		custId: 'C1003',
		custName: 'Ravindu Fernando',
		items: [
			{ id: 'V2003', name: 'Nissan X-Trail 2020', price: 35600, qty: 1, total: 35600 }
		],
		total: 35600,
		discount: 0,
		cash: 36000,
		balance: 400
	},
	{
		orderId: 'ORD3003',
		date: '2026-04-28',
		custId: 'C1002',
		custName: 'Nimali Silva',
		items: [
			{ id: 'V2001', name: 'Toyota Corolla 2022', price: 28900, qty: 1, total: 28900 }
		],
		total: 28322,
		discount: 2,
		cash: 29000,
		balance: 678
	}
];

let users = [];
let currentOrderItems = [];

// Legacy `state` object for controllers still using it
var state = {
	customers: customer_db,
	vehicles: vehicle_db,
	orders: order_db
};

// Expose globals on window for plain script loading (no ES modules)
window.state = state;
window.customer_db = customer_db;
window.vehicle_db = vehicle_db;
window.order_db = order_db;
window.users = users;
window.currentOrderItems = currentOrderItems;

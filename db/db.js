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
	},
	{
		id: 'V2004',
		make: 'Suzuki',
		model: 'Swift',
		year: '2023',
		color: 'Red',
		qty: 4,
		price: 21400,
		desc: 'Compact hatchback, fuel efficient'
	}
];

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
	},
	{
		id: 'C1004',
		firstName: 'Tharushi',
		lastName: 'Jayasena',
		email: 'tharushi.jayasena@example.com',
		phone: '+94 75 886 1122',
		address: 'No. 22, Main Street, Matara'
	}
];

export { vehicle_db, customer_db };

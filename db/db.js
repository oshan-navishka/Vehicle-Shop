export const customer_db = [
    { id: 'C1001', firstName: 'Kasun', lastName: 'Perera', email: 'kasun.perera@example.com', phone: '+94771234567', address: 'No. 12, Galle Road, Colombo' },
    { id: 'C1002', firstName: 'Nimali', lastName: 'Silva', email: 'nimali.silva@example.com', phone: '+94719987744', address: 'No. 45, Kandy Road, Kurunegala' },
    { id: 'C1003', firstName: 'Ravindu', lastName: 'Fernando', email: 'ravindu.fernando@example.com', phone: '+94762453344', address: 'No. 8, Temple Street, Gampaha' },
    { id: 'C1004', firstName: 'Tharushi', lastName: 'Jayasena', email: 'tharushi.jayasena@example.com', phone: '+94758861122', address: 'No. 22, Main Street, Matara' }
];

export const vehicle_db = [
    { id: 'V2001', make: 'Toyota', model: 'Corolla', year: '2022', color: 'Pearl White', qty: 3, price: 28900, desc: 'Hybrid, low mileage, automatic transmission' },
    { id: 'V2002', make: 'Honda', model: 'Civic', year: '2021', color: 'Midnight Black', qty: 2, price: 27450, desc: 'Turbo engine, full service record' },
    { id: 'V2003', make: 'Nissan', model: 'X-Trail', year: '2020', color: 'Gunmetal Gray', qty: 1, price: 35600, desc: 'SUV, AWD, leather seats' },
    { id: 'V2004', make: 'Suzuki', model: 'Swift', year: '2023', color: 'Red', qty: 4, price: 21400, desc: 'Compact hatchback, fuel efficient' }
];

export const order_db = [
    { orderId: 'ORD3001', date: '2026-04-25', custId: 'C1001', custName: 'Kasun Perera', items: [{ id: 'V2002', name: 'Honda Civic 2021', price: 27450, qty: 1, total: 27450 }], total: 26901, discount: 2, cash: 28000, balance: 1099 },
    { orderId: 'ORD3002', date: '2026-04-27', custId: 'C1003', custName: 'Ravindu Fernando', items: [{ id: 'V2004', name: 'Suzuki Swift 2023', price: 21400, qty: 1, total: 21400 }], total: 21400, discount: 0, cash: 22000, balance: 600 },
    { orderId: 'ORD3003', date: '2026-04-28', custId: 'C1002', custName: 'Nimali Silva', items: [{ id: 'V2001', name: 'Toyota Corolla 2022', price: 28900, qty: 1, total: 28900 }], total: 28322, discount: 2, cash: 29000, balance: 678 }
];

export const users_db = [
    { id: 'U001', name: 'Oshan Navishka', email: 'oshan@gmail.com', password: '1234' }
];
export const currentOrderItems = [];
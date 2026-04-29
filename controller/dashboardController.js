import { customer_db, vehicle_db, order_db } from '../db/db.js';

function updateDash() {
    document.getElementById('dc_cust').textContent = customer_db.length;
    document.getElementById('dc_veh').textContent  = vehicle_db.length;
    document.getElementById('dc_ord').textContent  = order_db.length;

    const rev = order_db.reduce((s, o) => s + (Number(o.total) || 0), 0);
    document.getElementById('dc_rev').textContent = 'Rs. ' + rev.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const tb     = document.getElementById('recentOrdTbl');
    const recent = order_db.slice(-8).reverse();

    if (!recent.length) {
        tb.innerHTML = '<tr class="empty-row"><td colspan="5">No orders yet — create your first sale!</td></tr>';
        return;
    }

    tb.innerHTML = recent.map(o => `
        <tr>
            <td><span class="badge badge-gold">${o.orderId}</span></td>
            <td style="font-weight:600">${o.custName || o.custId}</td>
            <td>${o.items.map(i => i.name).join(', ')}</td>
            <td style="font-weight:700;color:#06d6a0">Rs. ${Number(o.total).toFixed(2)}</td>
            <td style="color:#888;font-size:12px">${o.date}</td>
        </tr>`).join('');
}

window.updateDash = updateDash;
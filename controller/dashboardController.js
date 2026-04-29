import { customer_db, vehicle_db, order_db } from '../db/db.js';

function updateDash() {

    /* ---------------- COUNTERS ---------------- */
    document.getElementById('dc_cust').textContent = customer_db.length;
    document.getElementById('dc_veh').textContent  = vehicle_db.length;
    document.getElementById('dc_ord').textContent  = order_db.length;

    /* ---------------- REVENUE ---------------- */
    const rev = order_db.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

    document.getElementById('dc_rev').textContent =
        'Rs. ' + rev.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    /* ---------------- RECENT ORDERS ---------------- */
    const tb = document.getElementById('recentOrdTbl');
    const recent = [...order_db].slice(-8).reverse();

    if (recent.length === 0) {
        tb.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted py-3">
                    No orders yet — create your first sale!
                </td>
            </tr>`;
        return;
    }

    tb.innerHTML = recent.map(o => {

        const itemsText = (o.items || [])
            .map(i => i.name || 'Unknown')
            .join(', ');

        return `
            <tr>
                <td><span class="badge bg-warning text-dark">${o.orderId || '-'}</span></td>
                <td class="fw-semibold">${o.custName || o.custId || '-'}</td>
                <td>${itemsText}</td>
                <td class="fw-bold text-success">
                    Rs. ${(Number(o.total) || 0).toFixed(2)}
                </td>
                <td class="text-muted small">${o.date || '-'}</td>
            </tr>
        `;
    }).join('');
}

window.updateDash = updateDash;
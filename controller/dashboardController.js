// ============================================================
// DASHBOARD
// ============================================================
function updateDash() {
    // db arrays directly use කරනවා - state sync ගැටළු නැහැ
    const customers = typeof window.customer_db !== 'undefined' ? window.customer_db : (state.customers || []);
    const vehicles  = typeof window.vehicle_db  !== 'undefined' ? window.vehicle_db  : (state.vehicles  || []);
    const orders    = typeof window.order_db    !== 'undefined' ? window.order_db    : (state.orders    || []);

    document.getElementById('dc_cust').textContent = customers.length;
    document.getElementById('dc_veh').textContent  = vehicles.length;
    document.getElementById('dc_ord').textContent  = orders.length;

    const rev = orders.reduce((s, o) => s + (o.total || 0), 0);
    document.getElementById('dc_rev').textContent = 'Rs. ' + rev.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const tb = document.getElementById('recentOrdTbl');
    const recent = orders.slice(-8).reverse();

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
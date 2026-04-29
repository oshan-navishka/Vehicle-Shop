
// ============================================================
// ORDER HISTORY
// ============================================================
function renderHist(data) {
  data = data || state.orders;
  const tb = $('histTbl');
  if (!data.length) {
    tb.innerHTML = '<tr class="empty-row"><td colspan="9">No orders yet. Place your first order!</td></tr>';
    return;
  }
  tb.innerHTML = data.slice().reverse().map(o => `
    <tr>
      <td><span class="badge badge-gold">${o.orderId}</span></td>
      <td style="color:#888;font-size:12px">${o.date}</td>
      <td style="font-weight:600">${o.custName || o.custId}</td>
      <td>${o.items.map(i => i.name).join('<br>')}</td>
      <td style="text-align:center"><span class="badge badge-blue">${o.items.reduce((s,i)=>s+i.qty,0)}</span></td>
      <td style="font-weight:700;color:#06d6a0">Rs. ${o.total.toFixed(2)}</td>
      <td><span class="badge badge-gold">${o.discount || 0}%</span></td>
      <td>Rs. ${o.cash.toFixed(2)}</td>
      <td style="font-weight:700;color:${o.balance >= 0 ? '#06d6a0' : '#e94560'}">Rs. ${o.balance.toFixed(2)}</td>
    </tr>`).join('');
}

function filterHist() {
  const q = $('hSearch').value.toLowerCase();
  renderHist(state.orders.filter(o =>
    o.orderId.toLowerCase().includes(q) ||
    o.custId.toLowerCase().includes(q) ||
    (o.custName || '').toLowerCase().includes(q)
  ));
}
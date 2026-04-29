// ============================================================
// VEHICLES
// ============================================================
function renderVeh(data) {
  data = data || state.vehicles;
  const tb = $('vehTbl');
  if (!data.length) {
    tb.innerHTML = '<tr class="empty-row"><td colspan="7">No vehicles in stock. Add your first vehicle!</td></tr>';
    return;
  }
  tb.innerHTML = data.map(v => `
    <tr onclick="selectVeh('${v.id}')">
      <td><span class="badge badge-blue">${v.id}</span></td>
      <td style="font-weight:700">${v.make}</td>
      <td>${v.model}</td>
      <td>${v.year || '-'}</td>
      <td>${v.color || '-'}</td>
      <td><span class="badge ${v.qty > 0 ? 'badge-green' : 'badge-red'}">${v.qty}</span></td>
      <td style="font-weight:700;color:#06d6a0">Rs. ${Number(v.price).toLocaleString('en-US',{minimumFractionDigits:2})}</td>
    </tr>`).join('');
}

function saveVeh() {
  const mk = $('vMake').value.trim(), mo = $('vModel').value.trim();
  if (!mk || !mo) { showMsg('Please enter make and model.', 'error'); return; }
  state.vehicles.push({
    id: uid('V'), make: mk, model: mo,
    year: $('vYear').value || '',
    color: $('vColor').value.trim(),
    qty: parseInt($('vQty').value) || 1,
    price: parseFloat($('vPrice').value) || 0,
    desc: $('vDesc').value.trim()
  });
  saveState(); renderVeh(); showMsg('Vehicle added to inventory!'); clearVeh();
}

function selectVeh(id) {
  const v = state.vehicles.find(x => x.id === id);
  if (!v) return;
  $('vId').value = v.id; $('vMake').value = v.make; $('vModel').value = v.model;
  $('vYear').value = v.year || ''; $('vColor').value = v.color || '';
  $('vQty').value = v.qty; $('vPrice').value = v.price; $('vDesc').value = v.desc || '';
}

function updateVeh() {
  const id = $('vId').value;
  if (!id) { showMsg('Please select a vehicle to update.', 'error'); return; }
  const i = state.vehicles.findIndex(x => x.id === id);
  if (i < 0) return;
  state.vehicles[i] = { ...state.vehicles[i],
    make: $('vMake').value.trim(), model: $('vModel').value.trim(),
    year: $('vYear').value, color: $('vColor').value.trim(),
    qty: parseInt($('vQty').value) || 0,
    price: parseFloat($('vPrice').value) || 0,
    desc: $('vDesc').value.trim()
  };
  saveState(); renderVeh(); showMsg('Vehicle updated!', 'info'); clearVeh();
}

function deleteVeh() {
  const id = $('vId').value;
  if (!id) { showMsg('Please select a vehicle to delete.', 'error'); return; }
  if (!confirm('Remove this vehicle from inventory?')) return;
  state.vehicles = state.vehicles.filter(x => x.id !== id);
  saveState(); renderVeh(); showMsg('Vehicle removed.', 'error'); clearVeh();
}

function clearVeh() {
  ['vId','vMake','vModel','vYear','vColor','vQty','vPrice','vDesc'].forEach(f => $(f).value = '');
}

function filterVeh() {
  const q = $('vSearch').value.toLowerCase();
  renderVeh(state.vehicles.filter(v => (v.make+' '+v.model).toLowerCase().includes(q)));
}

renderVeh();
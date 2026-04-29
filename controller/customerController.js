function renderCust(data) {
	data = data || state.customers;
	const tb = $('custTbl');
	if (!data.length) {
		tb.innerHTML = '<tr class="empty-row"><td colspan="4">No customers found. Add your first customer!</td></tr>';
		return;
	}
	tb.innerHTML = data.map(c => `
		<tr onclick="selectCust('${c.id}')">
			<td><span class="badge badge-gold">${c.id}</span></td>
			<td style="font-weight:600">${c.firstName} ${c.lastName}</td>
			<td style="color:var(--teal)">${c.email || '-'}</td>
			<td>${c.phone || '-'}</td>
		</tr>`).join('');
}

function saveCust() {
	const fn = $('cFn').value.trim(), ln = $('cLn').value.trim();
	if (!fn || !ln) { showMsg('Please enter first and last name.', 'error'); return; }
	state.customers.push({
		id: uid('C'),
		firstName: fn, lastName: ln,
		email: $('cEm').value.trim(),
		phone: $('cPh').value.trim(),
		address: $('cAd').value.trim()
	});
	saveState(); renderCust(); showMsg('Customer saved successfully!'); clearCust();
}

function selectCust(id) {
	const c = state.customers.find(x => x.id === id);
	if (!c) return;
	$('cId').value = c.id; $('cFn').value = c.firstName; $('cLn').value = c.lastName;
	$('cEm').value = c.email || ''; $('cPh').value = c.phone || ''; $('cAd').value = c.address || '';
}

function updateCust() {
	const id = $('cId').value;
	if (!id) { showMsg('Please select a customer to update.', 'error'); return; }
	const i = state.customers.findIndex(x => x.id === id);
	if (i < 0) return;
	state.customers[i] = { ...state.customers[i],
		firstName: $('cFn').value.trim(), lastName: $('cLn').value.trim(),
		email: $('cEm').value.trim(), phone: $('cPh').value.trim(), address: $('cAd').value.trim()
	};
	saveState(); renderCust(); showMsg('Customer updated!', 'info'); clearCust();
}

function deleteCust() {
	const id = $('cId').value;
	if (!id) { showMsg('Please select a customer to delete.', 'error'); return; }
	if (!confirm('Delete this customer?')) return;
	state.customers = state.customers.filter(x => x.id !== id);
	saveState(); renderCust(); showMsg('Customer deleted.', 'error'); clearCust();
}

function clearCust() {
	['cId','cFn','cLn','cEm','cPh','cAd'].forEach(f => $(f).value = '');
}

function filterCust() {
	const q = $('cSearch').value.toLowerCase();
	renderCust(state.customers.filter(c => (c.firstName+' '+c.lastName).toLowerCase().includes(q)));
}

renderCust();

// ============================================================
// NAVIGATION
// ============================================================
function nav(page) {
  ['dash','cust','veh','ord','hist'].forEach(p => {
    $('s_' + p).className = 'section-wrap' + (p !== page ? ' hidden' : '');
    $('n_' + p).className = 'nav-link' + (p === page ? ' active' : '');
  });
  if (page === 'ord')  initOrder();
  if (page === 'hist') renderHist();
  if (page === 'dash') updateDash();
  if (page === 'cust') renderCust();
  if (page === 'veh')  renderVeh();
}
// ============================================================
// NAVIGATION
// ============================================================
const navPages = ['dash', 'cust', 'veh', 'ord', 'hist'];

function nav(page) {
    navPages.forEach(p => {
        document.getElementById('s_' + p).className = 'section-wrap' + (p !== page ? ' hidden' : '');
        document.getElementById('n_' + p).className = 'nav-link' + (p === page ? ' active' : '');
    });

    if (page === 'ord'  && typeof window.initOrder   === 'function') window.initOrder();
    if (page === 'hist' && typeof window.renderHist  === 'function') window.renderHist();
    if (page === 'dash' && typeof window.updateDash  === 'function') window.updateDash();
    if (page === 'cust' && typeof window.renderCust  === 'function') window.renderCust();
    if (page === 'veh'  && typeof window.renderVeh   === 'function') window.renderVeh();
}

window.nav = nav;
const navPages = ['dash', 'cust', 'veh', 'ord', 'hist'];

function nav(page) {

    navPages.forEach(p => {

        const section = document.getElementById('s_' + p);
        const link    = document.getElementById('n_' + p);

        if (!section || !link) return;

        /* ---------------- SECTION SHOW/HIDE ---------------- */
        if (p === page) {
            section.classList.remove('d-none');
        } else {
            section.classList.add('d-none');
        }

        /* ---------------- NAV ACTIVE STATE ---------------- */
        link.classList.remove('active', 'text-white');
        link.classList.add(p === page ? 'active' : 'text-white-50');
    });

    /* ---------------- PAGE INIT ---------------- */
    setTimeout(() => {
        if (page === 'dash' && typeof window.updateDash === 'function') {
            window.updateDash();
        }

        if (page === 'cust' && typeof window.renderCust === 'function') {
            window.renderCust();
        }

        if (page === 'veh' && typeof window.renderVeh === 'function') {
            window.renderVeh();
        }

        if (page === 'ord' && typeof window.initOrder === 'function') {
            window.initOrder();
        }

        if (page === 'hist' && typeof window.renderHist === 'function') {
            window.renderHist();
        }
    }, 50);
}

window.nav = nav;
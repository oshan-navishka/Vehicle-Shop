const navPages = ['dash', 'cust', 'veh', 'ord', 'hist'];

function nav(page) {

    navPages.forEach(p => {

        const section = document.getElementById('s_' + p);
        const link    = document.getElementById('n_' + p);

        if (!section || !link) return;

        /* ---------------- SECTION SHOW/HIDE ---------------- */
        section.classList.toggle('d-none', p !== page);

        /* ---------------- NAV ACTIVE STATE ---------------- */
        if (p === page) {
            link.classList.add('active', 'text-white', 'fw-bold');
            link.classList.remove('text-white-50');
        } else {
            link.classList.remove('active', 'fw-bold');
            link.classList.add('text-white-50');
        }
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
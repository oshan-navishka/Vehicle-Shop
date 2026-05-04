// controller/loginController.js

import { users_db } from '../db/db.js';

/* ------------------ UTIL ------------------ */
function uid(prefix) {
    return prefix + Date.now().toString(36).toUpperCase().slice(-6);
}

/* ------------------ DB OPS ------------------ */
function addLoginData(id, name, email, password) {
    users_db.push({ id, name, email, password });
}

function getLoginDataByEmail(email) {
    return users_db.find(u => u.email === email);
}

/* ------------------ UI HELPERS ------------------ */
function showAuthErr(id, msg) {
    const el = document.getElementById(id);
    el.textContent = msg;
    el.classList.remove('d-none');

    setTimeout(() => {
        el.classList.add('d-none');
    }, 3000);
}

function showApp() {
    document.getElementById('authSection').classList.add('d-none');
    document.getElementById('mainApp').classList.remove('d-none');

    nav('dash'); // from navigationController.js
}

function showAuth() {
    document.getElementById('mainApp').classList.add('d-none');
    document.getElementById('authSection').classList.remove('d-none');
}

/* ------------------ TAB SWITCH ------------------ */
function switchTab(t) {
    document.getElementById('tabLoginBtn').classList.toggle('active', t === 'login');
    document.getElementById('tabRegBtn').classList.toggle('active', t === 'reg');

    document.getElementById('loginPane').classList.toggle('show', t === 'login');
    document.getElementById('loginPane').classList.toggle('active', t === 'login');

    document.getElementById('regPane').classList.toggle('show', t === 'reg');
    document.getElementById('regPane').classList.toggle('active', t === 'reg');

    document.getElementById('lErr').classList.add('d-none');
    document.getElementById('rErr').classList.add('d-none');
}

/* ------------------ LOGIN ------------------ */
function doLogin() {
    const email = document.getElementById('lEmail').value.trim();
    const pass  = document.getElementById('lPass').value;

    if (!email || !pass) {
        showAuthErr('lErr', 'Please fill in all fields');
        return;
    }

    const user = getLoginDataByEmail(email);

    if (user && user.password === pass) {
        showApp();
    } else {
        showAuthErr('lErr', 'Invalid email or password');
    }
}

/* ------------------ REGISTER ------------------ */
function doRegister() {
    const name  = document.getElementById('rUser').value.trim();
    const email = document.getElementById('rEmail').value.trim();
    const pass  = document.getElementById('rPass').value;
    const pass2 = document.getElementById('rPass2').value;

    if (!name || !email || !pass || !pass2) {
        showAuthErr('rErr', 'Please fill in all fields');
        return;
    }

    if (pass !== pass2) {
        showAuthErr('rErr', 'Passwords do not match');
        return;
    }

    if (getLoginDataByEmail(email)) {
        showAuthErr('rErr', 'Email already registered');
        return;
    }

    addLoginData(uid('U'), name, email, pass);

    showMsg('Registration successful! Please login.', 'success');

    // clear fields
    document.getElementById('rUser').value = '';
    document.getElementById('rEmail').value = '';
    document.getElementById('rPass').value = '';
    document.getElementById('rPass2').value = '';

    switchTab('login');
}

/* ------------------ LOGOUT ------------------ */
function doLogout() {
    showAuth();

    document.getElementById('lEmail').value = '';
    document.getElementById('lPass').value = '';

    switchTab('login');
}

/* ------------------ EXPORT GLOBAL ------------------ */
window.switchTab  = switchTab;
window.doLogin    = doLogin;
window.doRegister = doRegister;
window.doLogout   = doLogout;
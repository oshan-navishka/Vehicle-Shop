const users_db = [];

function uid(prefix) {
    return prefix + Date.now().toString(36).toUpperCase().slice(-6);
}

function addLoginData(id, name, email, password) {
    users_db.push({ id, name, email, password });
}

function getLoginDataByEmail(email) {
    return users_db.find(u => u.email === email);
}

function switchTab(t) {
    document.getElementById('tabLogin').className = 'auth-tab' + (t === 'login' ? ' active' : '');
    document.getElementById('tabReg').className   = 'auth-tab' + (t === 'reg'   ? ' active' : '');
    document.getElementById('loginPane').className = t === 'login' ? '' : 'hidden';
    document.getElementById('regPane').className   = t === 'reg'   ? '' : 'hidden';
    document.getElementById('lErr').classList.add('hidden');
    document.getElementById('rErr').classList.add('hidden');
}

function doLogin() {
    const email = document.getElementById('lEmail').value.trim();
    const pass  = document.getElementById('lPass').value;
    if (!email || !pass) { showAuthErr('lErr', 'Please fill in all fields'); return; }
    const user = getLoginDataByEmail(email);
    if (user && user.password === pass) {
        showApp();
        return;
    }
    showAuthErr('lErr', 'Invalid email or password');
}

function doRegister() {
    const name  = document.getElementById('rUser').value.trim();
    const email = document.getElementById('rEmail').value.trim();
    const pass  = document.getElementById('rPass').value;
    const pass2 = document.getElementById('rPass2').value;
    if (!name || !email || !pass || !pass2) { showAuthErr('rErr', 'Please fill in all fields'); return; }
    if (pass !== pass2) { showAuthErr('rErr', 'Passwords do not match'); return; }
    if (getLoginDataByEmail(email)) { showAuthErr('rErr', 'Email already registered'); return; }
    addLoginData(uid('U'), name, email, pass);
    showMsg('Registration successful! Please login.', 'success');
    switchTab('login');
    document.getElementById('rUser').value = '';
    document.getElementById('rEmail').value = '';
    document.getElementById('rPass').value = '';
    document.getElementById('rPass2').value = '';
}

function doLogout() {
    document.getElementById('mainApp').className = 'hidden';
    document.getElementById('authSection').className = '';
    document.getElementById('lEmail').value = '';
    document.getElementById('lPass').value = '';
    document.getElementById('lErr').classList.add('hidden');
    document.getElementById('rErr').classList.add('hidden');
    switchTab('login');
}

function showAuthErr(id, msg) {
    const el = document.getElementById(id);
    el.textContent = msg;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 3500);
}

function showApp() {
    document.getElementById('authSection').className = 'hidden';
    document.getElementById('mainApp').className = '';
    nav('dash');
}
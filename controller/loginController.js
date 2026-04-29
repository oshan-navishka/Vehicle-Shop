// ============================================================
// LOGIN
// ============================================================
let selected_index = -1;

function switchTab(t) {
	$('tabLogin').className = 'auth-tab' + (t==='login' ? ' active' : '');
	$('tabReg').className   = 'auth-tab' + (t==='reg'   ? ' active' : '');
	$('loginPane').className = t==='login' ? '' : 'hidden';
	$('regPane').className   = t==='reg'   ? '' : 'hidden';
	$('lErr').classList.add('hidden');
	$('rErr').classList.add('hidden');
}

function doLogin() {
	const email = $('lEmail').value.trim();
	const pass  = $('lPass').value;
	if (!email || !pass) { showAuthErr('lErr', 'Please fill in all fields'); return; }
	if (getLoginDataByEmail(email) && getLoginDataByEmail(email).password === pass) {
		showApp();
		return;
	}
	showAuthErr('lErr', 'Invalid email or password');
}

function doRegister() {
	const name  = $('rUser').value.trim();
	const email = $('rEmail').value.trim();
	const pass  = $('rPass').value;
	const pass2 = $('rPass2').value;
	if (!name || !email || !pass || !pass2) { showAuthErr('rErr','Please fill in all fields'); return; }
	if (pass !== pass2) { showAuthErr('rErr','Passwords do not match'); return; }
	if (getLoginDataByEmail(email)) { showAuthErr('rErr','Email already registered'); return; }
	addLoginData(uid('U'), name, email, pass);
	showMsg('Registration successful! Please login.', 'success');
	switchTab('login');
	$('rUser').value = $('rEmail').value = $('rPass').value = $('rPass2').value = '';
}

function doLogout() {
	$('mainApp').className = 'hidden';
	$('authSection').className = '';
	$('lEmail').value = ''; $('lPass').value = '';
	$('rUser').value = ''; $('rEmail').value = ''; $('rPass').value = ''; $('rPass2').value = '';
	$('lErr').classList.add('hidden');
	$('rErr').classList.add('hidden');
	switchTab('login');
}

function showAuthErr(id, msg) {
	const el = $(id);
	el.textContent = msg;
	el.classList.remove('hidden');
	setTimeout(() => el.classList.add('hidden'), 3500);
}

function showApp() {
	$('authSection').className = 'hidden';
	$('mainApp').className = '';
	nav('dash');
}

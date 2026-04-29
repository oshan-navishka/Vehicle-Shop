let users = [];

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
	if (email === 'oshan@gmail.com' && pass === '1234') {
		showApp();
		return;
	}
	const user = users.find(u => u.email === email && u.password === pass);
	if (!user) { showAuthErr('lErr', 'Invalid email or password'); return; }
	showApp();
}

function doRegister() {
	const name  = $('rUser').value.trim();
	const email = $('rEmail').value.trim();
	const pass  = $('rPass').value;
	const pass2 = $('rPass2').value;
	if (!name || !email || !pass || !pass2) { showAuthErr('rErr','Please fill in all fields'); return; }
	if (pass !== pass2) { showAuthErr('rErr','Passwords do not match'); return; }
	if (users.find(u => u.email === email)) { showAuthErr('rErr','Email already registered'); return; }
	users.push({ id: uid('U'), username: name, email, password: pass });
	showMsg('Registration successful! Please login.', 'success');
	switchTab('login');
	$('rUser').value = $('rEmail').value = $('rPass').value = $('rPass2').value = '';
}

function doLogout() {
	users = [];
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

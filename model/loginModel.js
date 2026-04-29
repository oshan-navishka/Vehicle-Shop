class LoginUser {
	#id;
	#username;
	#email;
	#password;

	constructor(id, username, email, password) {
		this.#id = id;
		this.#username = username;
		this.#email = email;
		this.#password = password;
	}

	get id() {
		return this.#id;
	}

	get username() {
		return this.#username;
	}

	get email() {
		return this.#email;
	}

	get password() {
		return this.#password;
	}

	set id(newId) {
		this.#id = newId;
	}

	set username(newUsername) {
		this.#username = newUsername;
	}

	set email(newEmail) {
		this.#email = newEmail;
	}

	set password(newPassword) {
		this.#password = newPassword;
	}
}

const login_db = [
	new LoginUser('U1001', 'Oshan', 'oshan@gmail.com', '1234')
];

const addLoginData = (loginId, username, email, password) => {
	let new_login = new LoginUser(loginId, username, email, password);

	login_db.push(new_login);
	return new_login;
};

const updateLoginData = (index, loginId, username, email, password) => {
	const login_obj = login_db[index];

	login_obj.id = loginId;
	login_obj.username = username;
	login_obj.email = email;
	login_obj.password = password;
	return login_obj;
};

const deleteLoginData = (index) => {
	login_db.splice(index, 1);
	return true;
};

const getLoginData = (index) => {
	return login_db[index];
};

const getAllLoginData = () => {
	return login_db;
};

const getLoginDataByIndex = (index) => {
	return login_db[index];
};

const getLoginDataByEmail = (email) => {
	return login_db.find(item => item.email === email);
};

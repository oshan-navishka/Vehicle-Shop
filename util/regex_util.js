const check_email = (email) => {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(email);
};

const check_phone_number = (phone) => {
	const phonePattern = /^(\+94|0)?[0-9]{9,10}$/;
	return phonePattern.test(phone.replace(/\s+/g, ''));
};

export { check_email, check_phone_number };
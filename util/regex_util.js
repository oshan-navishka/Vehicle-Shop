const check_email = (email) => {
    if (!email) return false;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailPattern.test(String(email).toLowerCase());
};

const check_phone_number = (phone) => {
    if (!phone) return false;

    const cleaned = phone.replace(/[\s()-]/g, '');

    const phonePattern = /^(?:\+94|0)?7[0-9]{8}$/;

    return phonePattern.test(cleaned);
};

export { check_email, check_phone_number };
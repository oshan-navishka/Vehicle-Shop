import { check_email, check_phone_number } from "../util/regex_util.js";
import {
    addCustomerData,
    updateCustomerData,
    deleteCustomerData,
    getAllCustomerData,
    getCustomerDataByIndex,
    getCustomerDataById
} from "../model/customerModel.js";

import { customer_db } from "../db/db.js";

let selected_index = -1;

/* ---------------- CLEAR FORM ---------------- */
const clearForm = () => {
    $('#cId').val('');
    $('#cFn').val('');
    $('#cLn').val('');
    $('#cEm').val('');
    $('#cPh').val('');
    $('#cAd').val('');
    selected_index = -1;

    $('#custTbl tr').removeClass('table-active'); // highlight remove
};

/* ---------------- LOAD TABLE ---------------- */
const loadCustomerTbl = () => {
    const tbl = $('#custTbl');
    tbl.empty();

    getAllCustomerData().forEach((item, index) => {
        let row = `
            <tr data-index="${index}">
                <td>${item.id}</td>
                <td>${item.firstName} ${item.lastName}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
            </tr>
        `;
        tbl.append(row);
    });
};

/* ---------------- SELECT ROW (FIXED) ---------------- */
$('#custTbl').on('click', 'tr', function () {
    const index = $(this).data('index');
    selected_index = index;

    $('#custTbl tr').removeClass('table-active');
    $(this).addClass('table-active');

    const customer = getCustomerDataByIndex(index);
    if (!customer) return;

    $('#cId').val(customer.id);
    $('#cFn').val(customer.firstName);
    $('#cLn').val(customer.lastName);
    $('#cEm').val(customer.email);
    $('#cPh').val(customer.phone);
    $('#cAd').val(customer.address);
});

/* ---------------- SAVE ---------------- */
window.saveCust = function () {

    let customerId = $('#cId').val().trim();

    if (!customerId) {
        const ids = getAllCustomerData()
            .map(c => parseInt(c.id.replace(/\D/g, '')) || 0);

        const maxId = ids.length ? Math.max(...ids) : 1000;
        customerId = 'C' + (maxId + 1);
        $('#cId').val(customerId);
    }

    const firstName = $('#cFn').val().trim();
    const lastName  = $('#cLn').val().trim();
    const email     = $('#cEm').val().trim();
    const phone     = $('#cPh').val().trim();
    const address   = $('#cAd').val().trim();

    if (getCustomerDataById(customerId)) {
        Swal.fire('Error', 'ID already exists!', 'error');
        return;
    }

    if (!firstName || !lastName || !email || !phone || !address) {
        Swal.fire('Error', 'All fields are required!', 'error');
        return;
    }

    if (!check_email(email)) {
        Swal.fire('Error', 'Invalid email!', 'error');
        return;
    }

    if (!check_phone_number(phone)) {
        Swal.fire('Error', 'Invalid phone number!', 'error');
        return;
    }

    addCustomerData(customerId, firstName, lastName, email, phone, address);

    loadCustomerTbl();
    clearForm();

    Swal.fire({
        icon: 'success',
        title: 'Customer Added!',
        timer: 1200,
        showConfirmButton: false
    });
};

/* ---------------- UPDATE ---------------- */
window.updateCust = function () {

    if (selected_index === -1) {
        Swal.fire('Error', 'Select a customer first!', 'error');
        return;
    }

    const current = getCustomerDataByIndex(selected_index);

    const customerId = $('#cId').val().trim();
    const firstName  = $('#cFn').val().trim();
    const lastName   = $('#cLn').val().trim();
    const email      = $('#cEm').val().trim();
    const phone      = $('#cPh').val().trim();
    const address    = $('#cAd').val().trim();

    if (customerId !== current.id && getCustomerDataById(customerId)) {
        Swal.fire('Error', 'ID already exists!', 'error');
        return;
    }

    if (!firstName || !lastName || !email || !phone || !address) {
        Swal.fire('Error', 'All fields are required!', 'error');
        return;
    }

    updateCustomerData(
        selected_index,
        customerId,
        firstName,
        lastName,
        email,
        phone,
        address
    );

    loadCustomerTbl();
    clearForm();

    Swal.fire({
        icon: 'success',
        title: 'Customer Updated!',
        timer: 1200,
        showConfirmButton: false
    });
};

/* ---------------- DELETE ---------------- */
window.deleteCust = function () {

    if (selected_index === -1) {
        Swal.fire('Error', 'Select a customer first!', 'error');
        return;
    }

    deleteCustomerData(selected_index);

    loadCustomerTbl();
    clearForm();

    Swal.fire({
        icon: 'success',
        title: 'Customer Deleted!',
        timer: 1200,
        showConfirmButton: false
    });
};

/* ---------------- SEARCH ---------------- */
window.filterCust = function () {

    const query = $('#cSearch').val().toLowerCase();

    $('#custTbl tr').each(function () {
        const text = $(this).text().toLowerCase();
        $(this).toggle(text.includes(query));
    });
};

/* ---------------- EXPORT ---------------- */
window.clearCust  = clearForm;
window.renderCust = loadCustomerTbl;

/* ---------------- STATE SYNC ---------------- */
window.customer_db = customer_db;
if (window.state) {
    state.customers = customer_db;
}

/* ---------------- INIT ---------------- */
loadCustomerTbl();
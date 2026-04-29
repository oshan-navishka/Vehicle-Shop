import { check_email, check_phone_number } from "../util/regex_util.js";
import { addCustomerData, updateCustomerData, deleteCustomerData, getAllCustomerData, getCustomerDataByIndex, getCustomerDataById } from "../model/customerModel.js";

let selected_index = -1;

const clearForm = () => {
    $('#cId').val('');
    $('#cFn').val('');
    $('#cLn').val('');
    $('#cEm').val('');
    $('#cPh').val('');
    $('#cAd').val('');
    selected_index = -1;
};

const loadCustomerTbl = () => {
    $('#custTbl').empty();
    getAllCustomerData().forEach(item => {
        let new_row = `<tr>
            <td>${item.id}</td>
            <td>${item.firstName} ${item.lastName}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
        </tr>`;
        $('#custTbl').append(new_row);
    });
};

$('#custTbl').on('click', 'tr', function() {
    const index = $(this).index();
    selected_index = index;
    const customer_obj = getCustomerDataByIndex(index);
    if (!customer_obj) return;
    $('#cId').val(customer_obj.id);
    $('#cFn').val(customer_obj.firstName);
    $('#cLn').val(customer_obj.lastName);
    $('#cEm').val(customer_obj.email);
    $('#cPh').val(customer_obj.phone);
    $('#cAd').val(customer_obj.address);
});

window.saveCust = function() {
    const customerId    = $('#cId').val().trim();
    const customerFirstName = $('#cFn').val().trim();
    const customerLastName  = $('#cLn').val().trim();
    const customerEmail = $('#cEm').val().trim();
    const customerPhone = $('#cPh').val().trim();
    const customerAddress = $('#cAd').val().trim();

    if (!customerId)       { Swal.fire({ icon:'error', title:'Oops...', text:'ID is required!' }); return; }
    if (getCustomerDataById(customerId)) { Swal.fire({ icon:'error', title:'Oops...', text:'ID already exists!' }); return; }
    if (!customerFirstName) { Swal.fire({ icon:'error', title:'Oops...', text:'First name is required!' }); return; }
    if (!customerLastName)  { Swal.fire({ icon:'error', title:'Oops...', text:'Last name is required!' }); return; }
    if (!customerEmail)     { Swal.fire({ icon:'error', title:'Oops...', text:'Email is required!' }); return; }
    if (!check_email(customerEmail)) { Swal.fire({ icon:'error', title:'Oops...', text:'Invalid email!' }); return; }
    if (!customerPhone)     { Swal.fire({ icon:'error', title:'Oops...', text:'Phone is required!' }); return; }
    if (!check_phone_number(customerPhone)) { Swal.fire({ icon:'error', title:'Oops...', text:'Invalid phone number!' }); return; }
    if (!customerAddress)   { Swal.fire({ icon:'error', title:'Oops...', text:'Address is required!' }); return; }

    addCustomerData(customerId, customerFirstName, customerLastName, customerEmail, customerPhone, customerAddress);
    loadCustomerTbl();
    Swal.fire({ icon:'success', title:'Customer Added!', showConfirmButton:false, timer:1500 });
    clearForm();
};

window.updateCust = function() {
    if (selected_index === -1) { Swal.fire({ icon:'error', title:'Oops...', text:'Please select a customer first!' }); return; }

    const customerId    = $('#cId').val().trim();
    const customerFirstName = $('#cFn').val().trim();
    const customerLastName  = $('#cLn').val().trim();
    const customerEmail = $('#cEm').val().trim();
    const customerPhone = $('#cPh').val().trim();
    const customerAddress = $('#cAd').val().trim();
    const currentCustomer = getCustomerDataByIndex(selected_index);

    if (!customerId) { Swal.fire({ icon:'error', title:'Oops...', text:'ID is required!' }); return; }
    if (customerId !== currentCustomer.id && getCustomerDataById(customerId)) { Swal.fire({ icon:'error', title:'Oops...', text:'ID already exists!' }); return; }
    if (!customerFirstName) { Swal.fire({ icon:'error', title:'Oops...', text:'First name is required!' }); return; }
    if (!customerLastName)  { Swal.fire({ icon:'error', title:'Oops...', text:'Last name is required!' }); return; }
    if (!customerEmail)     { Swal.fire({ icon:'error', title:'Oops...', text:'Email is required!' }); return; }
    if (!check_email(customerEmail)) { Swal.fire({ icon:'error', title:'Oops...', text:'Invalid email!' }); return; }
    if (!customerPhone)     { Swal.fire({ icon:'error', title:'Oops...', text:'Phone is required!' }); return; }
    if (!check_phone_number(customerPhone)) { Swal.fire({ icon:'error', title:'Oops...', text:'Invalid phone number!' }); return; }
    if (!customerAddress)   { Swal.fire({ icon:'error', title:'Oops...', text:'Address is required!' }); return; }

    updateCustomerData(selected_index, customerId, customerFirstName, customerLastName, customerEmail, customerPhone, customerAddress);
    loadCustomerTbl();
    Swal.fire({ icon:'success', title:'Customer Updated!', showConfirmButton:false, timer:1500 });
    clearForm();
};

window.deleteCust = function() {
    if (selected_index === -1) { Swal.fire({ icon:'error', title:'Oops...', text:'Please select a customer first!' }); return; }
    deleteCustomerData(selected_index);
    loadCustomerTbl();
    Swal.fire({ icon:'success', title:'Customer Deleted!', showConfirmButton:false, timer:1500 });
    clearForm();
};

window.clearCust = clearForm;
window.renderCust = loadCustomerTbl;

loadCustomerTbl();
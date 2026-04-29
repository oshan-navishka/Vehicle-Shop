import {
  check_email,
  check_phone_number
} from "../util/regex_util.js";
import {
  addCustomerData,
  updateCustomerData,
  deleteCustomerData,
  getAllCustomerData,
  getCustomerDataByIndex,
  getCustomerDataById
} from "../model/customerModel.js";

const customerScope = $('#customerSection').length ? '#customerSection ' : '';
const customerResetButton = $('#customerSection').length ? '#customer_btnReset' : '#btnReset';

let selected_index = -1;

const clearForm = () => {
	$(customerResetButton).click();
	selected_index = -1;
}

const loadCustomerTbl = () => {

	$('#custTbl').empty();

	getAllCustomerData().map(item => {
		let data = `${item.id},${item.firstName},${item.lastName},${item.email},${item.phone},${item.address}`;
		let new_row = `<tr data-index="${data}"> <td>${item.id}</td> <td>${item.firstName} ${item.lastName}</td> <td>${item.email}</td> <td>${item.phone}</td> <td>${item.address}</td> </tr>`;
		$('#custTbl').append(new_row);
	});

}

$('#custTbl').on('click', 'tr', function() {

	const index = $(this).index();
	selected_index = index;
	const customer_obj = getCustomerDataByIndex(index);

	if (!customer_obj) {
		return;
	}

	$('#cId').val(customer_obj.id);
	$('#cFn').val(customer_obj.firstName);
	$('#cLn').val(customer_obj.lastName);
	$('#cEm').val(customer_obj.email);
	$('#cPh').val(customer_obj.phone);
	$('#cAd').val(customer_obj.address);
});

$(`${customerScope}.btn-save`).on('click', function () {

	const customerId = $('#cId').val();
	const customerFirstName = $('#cFn').val();
	const customerLastName = $('#cLn').val();
	const customerEmail = $('#cEm').val();
	const customerPhone = $('#cPh').val();
	const customerAddress = $('#cAd').val();

	if (customerId == "") {
		Swal.fire({ icon: "error", title: "Oops...", text: "ID is required!" });
		return;
	}
	if (getCustomerDataById(customerId)) {
		Swal.fire({ icon: "error", title: "Oops...", text: "ID already exists!" });
		return;
	}
	if (customerFirstName == "") {
		Swal.fire({ icon: "error", title: "Oops...", text: "First name is required!" });
		return;
	}
	if (customerLastName == "") {
		Swal.fire({ icon: "error", title: "Oops...", text: "Last name is required!" });
		return;
	}
	if (customerEmail == "") {
		Swal.fire({ icon: "error", title: "Oops...", text: "Email is required!" });
		return;
	}
	if (customerPhone == "") {
		Swal.fire({ icon: "error", title: "Oops...", text: "Phone number is required!" });
		return;
	}
	if (!check_email(customerEmail)) {
		Swal.fire({ icon: "error", title: "Oops...", text: "Invalid email address!" });
		return;
	}
	if (!check_phone_number(customerPhone)) {
		Swal.fire({ icon: "error", title: "Oops...", text: "Invalid phone number!" });
		return;
	}
	if (customerAddress == "") {
		Swal.fire({ icon: "error", title: "Oops...", text: "Address is required!" });
		return;
	}

	addCustomerData(customerId, customerFirstName, customerLastName, customerEmail, customerPhone, customerAddress);
	loadCustomerTbl();
	Swal.fire({ position: "justify-center", icon: "success", title: "Customer Added Successfully!", showConfirmButton: false, timer: 1500 });
	clearForm();
});

$(`${customerScope}.btn-update`).on('click', function () {

	if (selected_index === -1) {
		Swal.fire({ icon: "error", title: "Oops...", text: "Please select a customer first!" });
		return;
	}

	const customerId = $('#cId').val();
	const customerFirstName = $('#cFn').val();
	const customerLastName = $('#cLn').val();
	const customerEmail = $('#cEm').val();
	const customerPhone = $('#cPh').val();
	const customerAddress = $('#cAd').val();

	const currentCustomer = getCustomerDataByIndex(selected_index);

	if (customerId == "") {
		Swal.fire({ icon: "error", title: "Oops...", text: "ID is required!" });
		return;
	}
	if (customerId !== currentCustomer.id) {
		if (getCustomerDataById(customerId)) {
			Swal.fire({ icon: "error", title: "Oops...", text: "ID already exists!" });
			return;
		}
	}
	if (customerFirstName == "") {
		Swal.fire({ icon: "error", title: "Oops...", text: "First name is required!" });
		return;
	}
	if (customerLastName == "") {
		Swal.fire({ icon: "error", title: "Oops...", text: "Last name is required!" });
		return;
	}
	if (customerEmail == "") {
		Swal.fire({ icon: "error", title: "Oops...", text: "Email is required!" });
		return;
	}
	if (customerPhone == "") {
		Swal.fire({ icon: "error", title: "Oops...", text: "Phone number is required!" });
		return;
	}
	if (!check_email(customerEmail)) {
		Swal.fire({ icon: "error", title: "Oops...", text: "Invalid email address!" });
		return;
	}
	if (!check_phone_number(customerPhone)) {
		Swal.fire({ icon: "error", title: "Oops...", text: "Invalid phone number!" });
		return;
	}
	if (customerAddress == "") {
		Swal.fire({ icon: "error", title: "Oops...", text: "Address is required!" });
		return;
	}

	updateCustomerData(selected_index, customerId, customerFirstName, customerLastName, customerEmail, customerPhone, customerAddress);
	loadCustomerTbl();
	Swal.fire({ position: "justify-center", icon: "success", title: "Customer updated successfully!", showConfirmButton: false, timer: 1500 });
	clearForm();
});

$(`${customerScope}.btn-delete`).on('click', function () {

	if (selected_index === -1) {
		Swal.fire({ icon: "error", title: "Oops...", text: "Please select a customer first!" });
		return;
	}

	deleteCustomerData(selected_index);
	loadCustomerTbl();
	Swal.fire({ position: "justify-center", icon: "success", title: "Customer Deleted Successfully!", showConfirmButton: false, timer: 1500 });
	clearForm();
});

loadCustomerTbl();

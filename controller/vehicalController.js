import {
  addVehicleData,
  updateVehicleData,
  deleteVehicleData,
  getAllVehicleData,
  getVehicleDataByIndex,
  getVehicleDataById
} from "../model/vehicalModel.js";

const vehicleScope = $('#vehicleSection').length ? '#vehicleSection ' : '';
const vehicleResetButton = $('#vehicleSection').length ? '#vehicle_btnReset' : '#btnReset';

let selected_index = -1;

const clearForm = () => {
  $('#vId').val('');
  $('#vMake').val('');
  $('#vModel').val('');
  $('#vYear').val('');
  $('#vColor').val('');
  $('#vQty').val('');
  $('#vPrice').val('');
  $('#vDesc').val('');
  $(vehicleResetButton).click();
  selected_index = -1;
};

const loadVehicleTbl = () => {
  $('#vehTbl').empty();

  getAllVehicleData().map(item => {
    let data = `${item.id},${item.make},${item.model},${item.year},${item.color},${item.qty},${item.price},${item.desc}`;
    let new_row = `<tr data-index="${data}"> <td>${item.id}</td> <td>${item.make}</td> <td>${item.model}</td> <td>${item.year}</td> <td>${item.color}</td> <td>${item.qty}</td> <td>${item.price}</td> </tr>`;
    $('#vehTbl').append(new_row);
  });
};

$('#vehTbl').on('click', 'tr', function() {
  const index = $(this).index();
  selected_index = index;
  const vehicle_obj = getVehicleDataByIndex(index);

  if (!vehicle_obj) {
    return;
  }

  $('#vId').val(vehicle_obj.id);
  $('#vMake').val(vehicle_obj.make);
  $('#vModel').val(vehicle_obj.model);
  $('#vYear').val(vehicle_obj.year);
  $('#vColor').val(vehicle_obj.color);
  $('#vQty').val(vehicle_obj.qty);
  $('#vPrice').val(vehicle_obj.price);
  $('#vDesc').val(vehicle_obj.desc);
});

$(`${vehicleScope}.btn-save`).on('click', function () {
  const vehicleId = $('#vId').val();
  const vehicleMake = $('#vMake').val();
  const vehicleModel = $('#vModel').val();
  const vehicleYear = $('#vYear').val();
  const vehicleColor = $('#vColor').val();
  const vehicleQty = $('#vQty').val();
  const vehiclePrice = $('#vPrice').val();
  const vehicleDesc = $('#vDesc').val();

  if (vehicleId == '') {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'ID is required!' });
    return;
  }
  if (getVehicleDataById(vehicleId)) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'ID already exists!' });
    return;
  }
  if (vehicleMake == '') {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Make is required!' });
    return;
  }
  if (vehicleModel == '') {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Model is required!' });
    return;
  }
  if (vehicleYear == '') {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Year is required!' });
    return;
  }
  if (vehicleColor == '') {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Color is required!' });
    return;
  }
  if (vehicleQty == '') {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Quantity is required!' });
    return;
  }
  if (vehiclePrice == '') {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Price is required!' });
    return;
  }
  if (vehicleDesc == '') {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Description is required!' });
    return;
  }

  addVehicleData(vehicleId, vehicleMake, vehicleModel, vehicleYear, vehicleColor, vehicleQty, vehiclePrice, vehicleDesc);
  loadVehicleTbl();
  Swal.fire({ position: 'justify-center', icon: 'success', title: 'Vehicle Added Successfully!', showConfirmButton: false, timer: 1500 });
  clearForm();
});

$(`${vehicleScope}.btn-update`).on('click', function () {
  if (selected_index === -1) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please select a vehicle first!' });
    return;
  }

  const vehicleId = $('#vId').val();
  const vehicleMake = $('#vMake').val();
  const vehicleModel = $('#vModel').val();
  const vehicleYear = $('#vYear').val();
  const vehicleColor = $('#vColor').val();
  const vehicleQty = $('#vQty').val();
  const vehiclePrice = $('#vPrice').val();
  const vehicleDesc = $('#vDesc').val();

  const currentVehicle = getVehicleDataByIndex(selected_index);

  if (vehicleId == '') {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'ID is required!' });
    return;
  }
  if (vehicleId !== currentVehicle.id) {
    if (getVehicleDataById(vehicleId)) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'ID already exists!' });
      return;
    }
  }
  if (vehicleMake == '') {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Make is required!' });
    return;
  }
  if (vehicleModel == '') {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Model is required!' });
    return;
  }
  if (vehicleYear == '') {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Year is required!' });
    return;
  }
  if (vehicleColor == '') {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Color is required!' });
    return;
  }
  if (vehicleQty == '') {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Quantity is required!' });
    return;
  }
  if (vehiclePrice == '') {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Price is required!' });
    return;
  }
  if (vehicleDesc == '') {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Description is required!' });
    return;
  }

  updateVehicleData(selected_index, vehicleId, vehicleMake, vehicleModel, vehicleYear, vehicleColor, vehicleQty, vehiclePrice, vehicleDesc);
  loadVehicleTbl();
  Swal.fire({ position: 'justify-center', icon: 'success', title: 'Vehicle updated successfully!', showConfirmButton: false, timer: 1500 });
  clearForm();
});

$(`${vehicleScope}.btn-delete`).on('click', function () {
  if (selected_index === -1) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please select a vehicle first!' });
    return;
  }

  deleteVehicleData(selected_index);
  loadVehicleTbl();
  Swal.fire({ position: 'justify-center', icon: 'success', title: 'Vehicle Deleted Successfully!', showConfirmButton: false, timer: 1500 });
  clearForm();
});

loadVehicleTbl();
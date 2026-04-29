import { addVehicleData, updateVehicleData, deleteVehicleData, getAllVehicleData, getVehicleDataByIndex, getVehicleDataById } from "../model/vehicalModel.js";

let selected_index = -1;

const clearForm = () => {
    $('#vId').val(''); $('#vMake').val(''); $('#vModel').val('');
    $('#vYear').val(''); $('#vColor').val(''); $('#vQty').val('');
    $('#vPrice').val(''); $('#vDesc').val('');
    selected_index = -1;
};

const loadVehicleTbl = () => {
    $('#vehTbl').empty();
    getAllVehicleData().forEach(item => {
        let new_row = `<tr>
            <td>${item.id}</td><td>${item.make}</td><td>${item.model}</td>
            <td>${item.year}</td><td>${item.color}</td><td>${item.qty}</td>
            <td>Rs. ${Number(item.price).toLocaleString()}</td>
        </tr>`;
        $('#vehTbl').append(new_row);
    });
};

$('#vehTbl').on('click', 'tr', function() {
    const index = $(this).index();
    selected_index = index;
    const v = getVehicleDataByIndex(index);
    if (!v) return;
    $('#vId').val(v.id); $('#vMake').val(v.make); $('#vModel').val(v.model);
    $('#vYear').val(v.year); $('#vColor').val(v.color); $('#vQty').val(v.qty);
    $('#vPrice').val(v.price); $('#vDesc').val(v.desc);
});

window.saveVeh = function() {
    // Auto-generate Vehicle ID if empty or readonly
    let id = $('#vId').val().trim();
    if (!id) {
        const ids = getAllVehicleData().map(v => parseInt(v.id.replace(/\D/g, '')) || 0);
        const maxId = ids.length > 0 ? Math.max(...ids) : 2000;
        id = 'V' + (maxId + 1);
        $('#vId').val(id);
    }

    const make = $('#vMake').val().trim(), model = $('#vModel').val().trim();
    const year = $('#vYear').val().trim(), color = $('#vColor').val().trim();
    const qty = $('#vQty').val().trim(), price = $('#vPrice').val().trim(), desc = $('#vDesc').val().trim();

    if (getVehicleDataById(id)) { Swal.fire({ icon:'error', title:'Oops...', text:'ID already exists!' }); return; }
    if (!make)  { Swal.fire({ icon:'error', title:'Oops...', text:'Make is required!' }); return; }
    if (!model) { Swal.fire({ icon:'error', title:'Oops...', text:'Model is required!' }); return; }
    if (!year)  { Swal.fire({ icon:'error', title:'Oops...', text:'Year is required!' }); return; }
    if (!color) { Swal.fire({ icon:'error', title:'Oops...', text:'Color is required!' }); return; }
    if (!qty)   { Swal.fire({ icon:'error', title:'Oops...', text:'Quantity is required!' }); return; }
    if (!price) { Swal.fire({ icon:'error', title:'Oops...', text:'Price is required!' }); return; }
    if (!desc)  { Swal.fire({ icon:'error', title:'Oops...', text:'Description is required!' }); return; }

    addVehicleData(id, make, model, year, color, qty, price, desc);
    loadVehicleTbl();
    Swal.fire({ icon:'success', title:'Vehicle Added!', showConfirmButton:false, timer:1500 });
    clearForm();
};

window.updateVeh = function() {
    if (selected_index === -1) { Swal.fire({ icon:'error', title:'Oops...', text:'Please select a vehicle first!' }); return; }
    const id = $('#vId').val().trim(), make = $('#vMake').val().trim(), model = $('#vModel').val().trim();
    const year = $('#vYear').val().trim(), color = $('#vColor').val().trim();
    const qty = $('#vQty').val().trim(), price = $('#vPrice').val().trim(), desc = $('#vDesc').val().trim();
    const current = getVehicleDataByIndex(selected_index);

    if (!id)    { Swal.fire({ icon:'error', title:'Oops...', text:'ID is required!' }); return; }
    if (id !== current.id && getVehicleDataById(id)) { Swal.fire({ icon:'error', title:'Oops...', text:'ID already exists!' }); return; }
    if (!make)  { Swal.fire({ icon:'error', title:'Oops...', text:'Make is required!' }); return; }
    if (!model) { Swal.fire({ icon:'error', title:'Oops...', text:'Model is required!' }); return; }
    if (!year)  { Swal.fire({ icon:'error', title:'Oops...', text:'Year is required!' }); return; }
    if (!color) { Swal.fire({ icon:'error', title:'Oops...', text:'Color is required!' }); return; }
    if (!qty)   { Swal.fire({ icon:'error', title:'Oops...', text:'Quantity is required!' }); return; }
    if (!price) { Swal.fire({ icon:'error', title:'Oops...', text:'Price is required!' }); return; }
    if (!desc)  { Swal.fire({ icon:'error', title:'Oops...', text:'Description is required!' }); return; }

    updateVehicleData(selected_index, id, make, model, year, color, qty, price, desc);
    loadVehicleTbl();
    Swal.fire({ icon:'success', title:'Vehicle Updated!', showConfirmButton:false, timer:1500 });
    clearForm();
};

window.deleteVeh = function() {
    if (selected_index === -1) { Swal.fire({ icon:'error', title:'Oops...', text:'Please select a vehicle first!' }); return; }
    deleteVehicleData(selected_index);
    loadVehicleTbl();
    Swal.fire({ icon:'success', title:'Vehicle Deleted!', showConfirmButton:false, timer:1500 });
    clearForm();
};

window.filterVeh = function() {
    const query = $('#vSearch').val().toLowerCase();
    $('#vehTbl tr').each(function() {
        const make  = $(this).find('td:eq(1)').text().toLowerCase();
        const model = $(this).find('td:eq(2)').text().toLowerCase();
        const id    = $(this).find('td:eq(0)').text().toLowerCase();
        $(this).toggle(make.includes(query) || model.includes(query) || id.includes(query));
    });
};

window.clearVeh = clearForm;
window.renderVeh = loadVehicleTbl;

loadVehicleTbl();
import {
    addVehicleData,
    updateVehicleData,
    deleteVehicleData,
    getAllVehicleData,
    getVehicleDataByIndex,
    getVehicleDataById
} from "../model/vehicalModel.js";

let selected_index = -1;

// ---------------- CLEAR ----------------
const clearForm = () => {
    $('#vId').val('');
    $('#vMake').val('');
    $('#vModel').val('');
    $('#vYear').val('');
    $('#vColor').val('');
    $('#vQty').val('');
    $('#vPrice').val('');
    $('#vDesc').val('');
    selected_index = -1;
};

// ---------------- LOAD TABLE ----------------
const loadVehicleTbl = () => {
    $('#vehTbl').empty();

    getAllVehicleData().forEach((item, index) => {
        let row = `
        <tr data-index="${index}">
            <td>${item.id}</td>
            <td>${item.make}</td>
            <td>${item.model}</td>
            <td>${item.year}</td>
            <td>${item.color}</td>
            <td>${item.qty}</td>
            <td>Rs. ${Number(item.price).toLocaleString()}</td>
        </tr>`;
        $('#vehTbl').append(row);
    });
};

// ---------------- SELECT ROW (FIXED) ----------------
$('#vehTbl').on('click', 'tr', function () {
    const index = $(this).attr("data-index");
    selected_index = index;

    const v = getVehicleDataByIndex(index);
    if (!v) return;

    $('#vId').val(v.id);
    $('#vMake').val(v.make);
    $('#vModel').val(v.model);
    $('#vYear').val(v.year);
    $('#vColor').val(v.color);
    $('#vQty').val(v.qty);
    $('#vPrice').val(v.price);
    $('#vDesc').val(v.desc);
});

// ---------------- SAVE ----------------
window.saveVeh = function () {

    let id = $('#vId').val().trim();

    if (!id) {
        const ids = getAllVehicleData().map(v => parseInt(v.id.replace(/\D/g, '')) || 0);
        const maxId = ids.length ? Math.max(...ids) : 2000;
        id = 'V' + (maxId + 1);
        $('#vId').val(id);
    }

    const make  = $('#vMake').val().trim();
    const model = $('#vModel').val().trim();
    const year  = $('#vYear').val().trim();
    const color = $('#vColor').val().trim();
    const qty   = Number($('#vQty').val());
    const price = Number($('#vPrice').val());
    const desc  = $('#vDesc').val().trim();

    if (getVehicleDataById(id)) {
        Swal.fire({ icon: 'error', title: 'ID already exists!' });
        return;
    }

    if (!make || !model || !year || !color || !qty || !price || !desc) {
        Swal.fire({ icon: 'error', title: 'Fill all fields!' });
        return;
    }

    addVehicleData(id, make, model, year, color, qty, price, desc);

    loadVehicleTbl();
    Swal.fire({ icon: 'success', title: 'Vehicle Added!' });
    clearForm();
};

// ---------------- UPDATE ----------------
window.updateVeh = function () {

    if (selected_index === -1) {
        Swal.fire({ icon: 'error', title: 'Select vehicle first!' });
        return;
    }

    const current = getVehicleDataByIndex(selected_index);

    const id = $('#vId').val().trim();
    const make  = $('#vMake').val().trim();
    const model = $('#vModel').val().trim();
    const year  = $('#vYear').val().trim();
    const color = $('#vColor').val().trim();
    const qty   = Number($('#vQty').val());
    const price = Number($('#vPrice').val());
    const desc  = $('#vDesc').val().trim();

    if (id !== current.id && getVehicleDataById(id)) {
        Swal.fire({ icon: 'error', title: 'ID exists!' });
        return;
    }

    updateVehicleData(selected_index, id, make, model, year, color, qty, price, desc);

    loadVehicleTbl();
    Swal.fire({ icon: 'success', title: 'Vehicle Updated!' });
    clearForm();
};

// ---------------- DELETE ----------------
window.deleteVeh = function () {

    if (selected_index === -1) {
        Swal.fire({ icon: 'error', title: 'Select vehicle first!' });
        return;
    }

    deleteVehicleData(selected_index);

    loadVehicleTbl();
    Swal.fire({ icon: 'success', title: 'Vehicle Deleted!' });
    clearForm();
};

// ---------------- FILTER ----------------
window.filterVeh = function () {

    const query = $('#vSearch').val().toLowerCase();

    $('#vehTbl tr').each(function () {
        const id    = $(this).find('td:eq(0)').text().toLowerCase();
        const make  = $(this).find('td:eq(1)').text().toLowerCase();
        const model = $(this).find('td:eq(2)').text().toLowerCase();

        $(this).toggle(
            id.includes(query) ||
            make.includes(query) ||
            model.includes(query)
        );
    });
};

// ---------------- EXPORT ----------------
window.clearVeh = clearForm;
window.renderVeh = loadVehicleTbl;

// INIT
loadVehicleTbl();
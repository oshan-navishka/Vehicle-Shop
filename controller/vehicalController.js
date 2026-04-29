import {
    addVehicleData,
    updateVehicleData,
    deleteVehicleData,
    getAllVehicleData,
    getVehicleDataByIndex,
    getVehicleDataById
} from "../model/vehicalModel.js";

let selected_index = -1;

/* =========================
   CLEAR FORM
========================= */
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

/* =========================
   RENDER TABLE
========================= */
window.renderVehicles = function () {

    const tbl = $('#vehTbl');
    tbl.empty();

    const data = getAllVehicleData();

    if (data.length === 0) {
        tbl.html(`
            <tr>
                <td colspan="7" class="text-center text-muted py-3">
                    🚗 No vehicles found
                </td>
            </tr>
        `);
        return;
    }

    data.forEach((v, index) => {
        tbl.append(`
            <tr data-index="${index}">
                <td>${v.id}</td>
                <td>${v.make}</td>
                <td>${v.model}</td>
                <td>${v.year}</td>
                <td>${v.color}</td>
                <td>${v.qty}</td>
                <td>Rs. ${Number(v.price).toLocaleString()}</td>
            </tr>
        `);
    });
};

/* =========================
   ROW SELECT
========================= */
$('#vehTbl').on('click', 'tr', function () {

    const index = $(this).data('index');
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

    $('#vehTbl tr').removeClass('table-active');
    $(this).addClass('table-active');
});

/* =========================
   SAVE
========================= */
window.saveVeh = function () {

    let id = $('#vId').val().trim();

    if (!id) {
        const ids = getAllVehicleData().map(v => parseInt(v.id.replace(/\D/g, '')) || 0);
        const max = ids.length ? Math.max(...ids) : 2000;
        id = 'V' + (max + 1);
        $('#vId').val(id);
    }

    const make = $('#vMake').val().trim();
    const model = $('#vModel').val().trim();
    const year = $('#vYear').val().trim();
    const color = $('#vColor').val().trim();
    const qty = $('#vQty').val().trim();
    const price = $('#vPrice').val().trim();
    const desc = $('#vDesc').val().trim();

    if (!make || !model || !year || !color || !qty || !price || !desc) {
        Swal.fire('Error', 'Fill all fields!', 'error');
        return;
    }

    if (getVehicleDataById(id)) {
        Swal.fire('Error', 'ID already exists!', 'error');
        return;
    }

    addVehicleData(id, make, model, year, color, qty, price, desc);

    renderVehicles();
    clearForm();

    Swal.fire('Success', 'Vehicle Saved!', 'success');
};

/* =========================
   UPDATE
========================= */
window.updateVeh = function () {

    if (selected_index === -1) {
        Swal.fire('Error', 'Select vehicle first!', 'error');
        return;
    }

    const current = getVehicleDataByIndex(selected_index);
    const id = $('#vId').val().trim();

    if (id !== current.id && getVehicleDataById(id)) {
        Swal.fire('Error', 'ID already exists!', 'error');
        return;
    }

    updateVehicleData(
        selected_index,
        id,
        $('#vMake').val(),
        $('#vModel').val(),
        $('#vYear').val(),
        $('#vColor').val(),
        $('#vQty').val(),
        $('#vPrice').val(),
        $('#vDesc').val()
    );

    renderVehicles();
    clearForm();

    Swal.fire('Success', 'Vehicle Updated!', 'success');
};

/* =========================
   DELETE
========================= */
window.deleteVeh = function () {

    if (selected_index === -1) {
        Swal.fire('Error', 'Select vehicle first!', 'error');
        return;
    }

    deleteVehicleData(selected_index);

    renderVehicles();
    clearForm();

    Swal.fire('Success', 'Vehicle Deleted!', 'success');
};

/* =========================
   EXPORT CLEAR
========================= */
window.clearVeh = clearForm;

/* =========================
   INIT
========================= */
renderVehicles();
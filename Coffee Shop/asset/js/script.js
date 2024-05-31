let navMain = $('.navbar-collapse');
navMain.on('click', '.nav-item:not([data-toggle])', null, function () {
	navMain.collapse('hide');
});


const produk = [
    { kode: "#001", nama: "KOPI TUBRUK", harga: 5000 },
    { kode: "#002", nama: "KOPI EXPRESO", harga: 15000 },
    { kode: "#003", nama: "KOPI ARABICA", harga: 14000 },
    { kode: "#004", nama: "KOPI ROBUSTTA", harga: 20000 },
    { kode: "#005", nama: "KOPI LATTE", harga: 15000 },
    { kode: "#006", nama: "KOPI CAPPUCCINO", harga: 18000 },
    { kode: "#007", nama: "KOPI MOCHA", harga: 20000 },
    { kode: "#008", nama: "KOPI AMERICANO", harga: 12000 },
    { kode: "#009", nama: "KOPI MACCHIATO", harga: 17000 },
    { kode: "#010", nama: "KOPI CARAMEL LATTE", harga: 22000 },
    { kode: "#011", nama: "KOPI VANILLA LATTE", harga: 22000 },
    { kode: "#012", nama: "KOPI FLAT WHITE", harga: 16000 },
    { kode: "#013", nama: "KOPI AFFOGATO", harga: 19000 },
    { kode: "#014", nama: "KOPI FRAPPUCCINO", harga: 25000 },
    { kode: "#015", nama: "KOPI DECAF", harga: 13000 }
];

const select = document.getElementById("namaBarang");
const hargaBarangInput = document.getElementById("hargaBarang");

select.addEventListener("change", function() {
    const selectedKode = this.value;
    const selectedProduk = produk.find(item => item.nama === selectedKode);
    if (selectedProduk) {
        hargaBarangInput.value = selectedProduk.harga;
    } else {
        hargaBarangInput.value = "";
    }
});

produk.forEach(item => {
    const option = document.createElement("option");
    option.setAttribute("value", item.nama);
    option.textContent = item.nama;
    select.appendChild(option);
});

document.getElementById('tambahButton').addEventListener('click', function(event) {
    event.preventDefault();
    addMenu();
    updateSubtotal();
});

function addMenu() {

    const namaBarang = document.getElementById('namaBarang').value;
    const hargaBarang = document.getElementById('hargaBarang').value * document.getElementById('jumlah').value;
    const jumlah = document.getElementById('jumlah').value;

    if (jumlah.trim() === '') {
        alert('Masukan Jumlah');
        return;
    }  else if (jumlah < 1) {
        alert('Masukan Jumlah');
        return;
    }

    const tableBody = document.getElementById('resultTableBody');

    const newRow = document.createElement('tr');

    const rowCount = tableBody.rows.length + 1;

    newRow.innerHTML = `
        <th scope="row">${rowCount}</th>
        <td>${namaBarang}</td>
        <td>${jumlah}</td>
        <td>${hargaBarang}</td>
        <td><button type="button" class="btn btn-sm btn-danger" onclick="removeRow(this)">Delete</button></td>
    `;

    tableBody.appendChild(newRow);

    hideStruc();
}


function removeRow(button) {
    const row = button.closest('tr');
    row.remove();

    const rows = document.querySelectorAll('#resultTableBody tr');
    rows.forEach((row, index) => {
        row.querySelector('th').innerText = index + 1;
    });

    updateSubtotal();
    
    const receiptRows = document.querySelectorAll('#receiptTableBody tr');
    const rowIndexToRemove = 0; 
    if (rowIndexToRemove >= 0 && rowIndexToRemove < receiptRows.length) {
        receiptRows[rowIndexToRemove].remove();
    }

    hideStruc();
    
}

function updateSubtotal() {
    let subtotal = 0;
    const rows = document.querySelectorAll('#resultTableBody tr');
    rows.forEach(row => {
        const totalHarga = parseFloat(row.cells[3].innerText);
        subtotal += totalHarga;
    });
    document.getElementById('subtotal').value = subtotal;
    updateTotal();
}

document.getElementById('discount').addEventListener('input', updateTotal);
document.getElementById('uangDiterima').addEventListener('input', updateChange);

function updateTotal() {
    const subtotalInput = document.getElementById('subtotal');
    let subtotal = parseFloat(subtotalInput.value) || 0; 

    const discountInput = document.getElementById('discount');
    let discountPercentage = parseFloat(discountInput.value) || 0; 

    const nilaiDiscount = subtotal * (discountPercentage / 100);
    const totalBayar = subtotal - nilaiDiscount;

    document.getElementById('nilaiDiscount').value = nilaiDiscount;
    document.getElementById('totalBayar').value = totalBayar;
    updateChange();
}


function updateChange() {
    const totalBayar = parseInt(document.getElementById('totalBayar').value, 10);
    const uangDiterima = parseInt(document.getElementById('uangDiterima').value, 10) || 0;
    const uangKembali = uangDiterima - totalBayar;

    document.getElementById('uangKembali').value = uangKembali.toFixed(0);
}

document.getElementById('jumlah').addEventListener('input', validateNumericInput);
document.getElementById('discount').addEventListener('input', validateNumericInput);
document.getElementById('uangDiterima').addEventListener('input', validateNumericInput);

function validateNumericInput(event) {
    const input = event.target;
    const value = input.value;

    if (isNaN(value) || value < 0) {
        input.value = 1;
    }
}

function updateReceiptTable() {
    const resultTableBodyRows = document.querySelectorAll('#resultTableBody tr');

    const receiptTableBody = document.getElementById('receiptTableBody');
    receiptTableBody.innerHTML = ''; 

    let rowCount = 1; 

    resultTableBodyRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const nama = cells[0].textContent.trim();
        const jumlah = cells[1].textContent.trim();
        const harga = "Rp" + cells[2].textContent.trim();

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${rowCount}</td>
            <td>${nama}</td>
            <td>${jumlah}</td>
            <td>${harga}</td>
        `;
        receiptTableBody.appendChild(newRow);

        rowCount++;
    });
}

const resultTableObserver = new MutationObserver(updateReceiptTable);
resultTableObserver.observe(document.getElementById('resultTableBody'), {
    childList: true,
    subtree: true 
});

window.onload = hideStruc();

function showStruc() {
    $('.struk').css({
        'display' : 'block'
    });
}

function hideStruc() {
    $('.struk').css({
        'display' : 'none'
    });
}

document.getElementById('bayarButton').addEventListener('click', function() {
    const uangDiterima = document.getElementById('uangDiterima').value;
    const uangKembali = document.getElementById('uangKembali').value;

     if (uangKembali < 0) {
        alert('Masukan Tunai');
        return;
    } else if (uangDiterima.trim() === '') {
        alert('Masukan Tunai');
        return;
    } else {
        showStruc();
        strucProcess();
    }
});

function strucProcess() {
    const strukHargaBarang = parseFloat(document.getElementById('subtotal').value);
    document.getElementById('strukSubTotal').innerHTML = "Rp" + strukHargaBarang.toFixed(0);
    
    const strukNominalDiscount = parseFloat(document.getElementById('nilaiDiscount').value);
    document.getElementById('strukNominalDiscount').textContent = "Rp" + strukNominalDiscount.toFixed(0);
    
    const discountInput = document.getElementById('discount');
    let discountValue = parseFloat(discountInput.value);

    
    if (!discountValue && discountValue !== 0) {
        discountValue = 0; 
    }

    document.getElementById('strucDiscount').textContent = ' [' + discountValue.toFixed(0) + '%]';
    
    
    const strucTotal = parseFloat(document.getElementById('totalBayar').value);

    const strucTunai = document.getElementById('uangDiterima');
    let strucTunaiValue = parseFloat(strucTunai.value);

    if (!strucTunaiValue && strucTunaiValue !== 0) {
        strucTunaiValue = 0; 
    }


    if (strucTotal == 0) {
        document.getElementById('strukNominalTotal').textContent = "Rp" + 0;
        document.getElementById('strukNominalTunai').textContent = "Rp" + 0;
        document.getElementById('strukNominalKembali').textContent = "Rp" + 0;
    } else {
        document.getElementById('strukNominalTotal').textContent = "Rp" + strucTotal.toFixed(0);
        const strucTunai = parseFloat(document.getElementById('uangDiterima').value);
        document.getElementById('strukNominalTunai').textContent = "Rp" + strucTunai.toFixed(0);
        const strucKembali = parseFloat(document.getElementById('uangKembali').value);
        document.getElementById('strukNominalKembali').textContent = "Rp" + strucKembali.toFixed(0);
    }

}

function resetData() {
    
    document.getElementById('resultTableBody').innerHTML = '';
    document.getElementById('receiptTableBody').innerHTML = '';

    document.getElementById('subtotal').value = '';
    document.getElementById('nilaiDiscount').value = '';
    document.getElementById('totalBayar').value = '';
    document.getElementById('uangDiterima').value = '';
    document.getElementById('uangKembali').value = '';

    document.getElementById('strukSubTotal').innerText = '';
    document.getElementById('strukNominalDiscount').innerText = '';
    document.getElementById('strucDiscount').innerText = '';
    document.getElementById('strukNominalTotal').innerText = '';
    document.getElementById('strukNominalTunai').innerText = '';
    document.getElementById('strukNominalKembali').innerText = '';
}

document.getElementById('reset').addEventListener('click', function() {
    resetData();
    hideStruc();
});


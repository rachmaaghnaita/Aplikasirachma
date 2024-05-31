let navMain = $('.navbar-collapse');
navMain.on('click', '.nav-item:not([data-toggle])', null, function () {
	navMain.collapse('hide');
});

function updateDropdownText1(text) {
	dropdown1.innerText = text;
	updateConverter();
}

function updateDropdownText2(text) {
	dropdown2.innerText = text;
	updateConverter();
}

$(document).ready(function () {
	$('#swap').on('click', function () {
		var text1 = $('#dropdownMenuButton1').text();
		var text2 = $('#dropdownMenuButton2').text();
		$('#dropdownMenuButton1').text(text2);
		$('#dropdownMenuButton2').text(text1);
		updateConverter();
	});
});

const dropdown1 = document.getElementById('dropdownMenuButton1');
const dropdown2 = document.getElementById('dropdownMenuButton2');

dropdown1.addEventListener('click', updateConverter);
dropdown2.addEventListener('click', updateConverter);

function updateConverter() {
	const value1 = dropdown1.innerText.trim();
	const value2 = dropdown2.innerText.trim();

	if (value1 === 'Desimal' && value2 === 'Biner') {
		$('.converter .card-container').css({
			'transform': 'translateX(0%)',
			'opacity': '1'
		})
	} else if (value1 === 'Desimal' && value2 === 'Oktal') {
		$('.converter .card-container').css({
			'transform': 'translateX(-100%)',
			'opacity': '1'
		})
	} else if (value1 === 'Desimal' && value2 === 'Hexadesimal') {
		$('.converter .card-container').css({
			'transform': 'translateX(-200%)',
			'opacity': '1'
		})
	} else if (value1 === 'Biner' && value2 === 'Desimal') {
		$('.converter .card-container').css({
			'transform': 'translateX(-300%)',
			'opacity': '1'
		})
	} else if (value1 === 'Biner' && value2 === 'Oktal') {
		$('.converter .card-container').css({
			'transform': 'translateX(-400%)',
			'opacity': '1'
		})
	} else if (value1 === 'Biner' && value2 === 'Hexadesimal') {
		$('.converter .card-container').css({
			'transform': 'translateX(-500%)',
			'opacity': '1'
		})
	} else if (value1 === 'Oktal' && value2 === 'Desimal') {
		$('.converter .card-container').css({
			'transform': 'translateX(-600%)',
			'opacity': '1'
		})
	} else if (value1 === 'Oktal' && value2 === 'Biner') {
		$('.converter .card-container').css({
			'transform': 'translateX(-700%)',
			'opacity': '1'
		})
	} else if (value1 === 'Oktal' && value2 === 'Hexadesimal') {
		$('.converter .card-container').css({
			'transform': 'translateX(-800%)',
			'opacity': '1'
		})
	} else if (value1 === 'Hexadesimal' && value2 === 'Desimal') {
		$('.converter .card-container').css({
			'transform': 'translateX(-900%)',
			'opacity': '1'
		})
	} else if (value1 === 'Hexadesimal' && value2 === 'Biner') {
		$('.converter .card-container').css({
			'transform': 'translateX(-1000%)',
			'opacity': '1'
		})
	} else if (value1 === 'Hexadesimal' && value2 === 'Oktal') {
		$('.converter .card-container').css({
			'transform': 'translateX(-1100%)',
			'opacity': '1'
		})
	} else {
		$('.converter .card-container').css({
			'opacity': '0'
		})
	}
}


function convertDesimalToBiner(event) {
	event.preventDefault();
	var inputNumber = document.getElementById('inputDesimalToBiner').value;
	var convertedNumber = parseInt(inputNumber).toString(2);
	document.getElementById('hasilDesimalToBiner').value = convertedNumber;
}

function convertDesimalToOktal(event) {
	event.preventDefault();
	var inputNumber = document.getElementById('inputDesimalToOktal').value;
	var convertedNumber = parseInt(inputNumber).toString(8);
	document.getElementById('hasilDesimalToOktal').value = convertedNumber;
}

function convertDesimalToHexaDecimal(event) {
	event.preventDefault();
	var inputNumber = document.getElementById('inputDesimalToHexaDecimal').value;
	var convertedNumber = parseInt(inputNumber, 10).toString(16).toUpperCase();
	document.getElementById('hasilDesimalToHexaDecimal').value = convertedNumber;
}


function convertBinerToDesimal(event) {
	event.preventDefault();
	var inputNumber = document.getElementById('inputBinerToDesimal').value;
	var convertedNumber = parseInt(inputNumber, 2).toString(10);
	document.getElementById('hasilBinerToDesimal').value = convertedNumber;
}

document.getElementById('inputBinerToDesimal').addEventListener('input', function (e) {
	this.value = this.value.replace(/[^01]/g, '');
});

function convertBinerToHexadecimal(event) {
	event.preventDefault();
	var inputNumber = document.getElementById('inputBinerToHexadecimal').value;
	var convertedNumber = parseInt(inputNumber, 2).toString(16).toUpperCase();
	document.getElementById('hasilBinerToHexadecimal').value = convertedNumber;
}

document.getElementById('inputBinerToHexadecimal').addEventListener('input', function (e) {
	this.value = this.value.replace(/[^01]/g, '');
});

function convertBinerToOctal(event) {
	event.preventDefault();
	var inputNumber = document.getElementById('inputBinerToOktal').value;
	var convertedNumber = parseInt(inputNumber, 2).toString(8);
	document.getElementById('hasilBinerToOktal').value = convertedNumber;
}

document.getElementById('inputBinerToOktal').addEventListener('input', function (e) {
	this.value = this.value.replace(/[^01]/g, '');
})


function convertOktalToDesimal(event) {
	event.preventDefault();
	var inputNumber = document.getElementById('inputOktalToDesimal').value;
	var convertedNumber = parseInt(inputNumber, 8).toString(10);
	document.getElementById('hasilOktalToDesimal').value = convertedNumber;
}

document.getElementById('inputOktalToDesimal').addEventListener('input', function (e) {
	this.value = this.value.replace(/[89]/g, '');
});

function convertOktalToBiner(event) {
	event.preventDefault();
	var inputNumber = document.getElementById('inputOktalToBiner').value;
	var convertedNumber = parseInt(inputNumber, 8).toString(2);
	document.getElementById('hasilOktalToBiner').value = convertedNumber;
}

document.getElementById('inputOktalToBiner').addEventListener('input', function (e) {
	this.value = this.value.replace(/[89]/g, '');
});

function convertOktalToHexadecimal(event) {
	event.preventDefault();
	var inputNumber = document.getElementById('inputOktalToHexadecimal').value;
	var convertedNumber = parseInt(inputNumber, 8).toString(16).toUpperCase();
	document.getElementById('hasilOktalToHexadecimal').value = convertedNumber;
}

document.getElementById('inputOktalToHexadecimal').addEventListener('input', function (e) {
	this.value = this.value.replace(/[89]/g, '');
});


function convertHexadecimalToDecimal(event) {
	event.preventDefault();
	var inputNumber = document.getElementById('inputHexadecimalToDecimal').value;
	var convertedNumber = parseInt(inputNumber, 16);
	document.getElementById('hasilHexadecimalToDecimal').value = convertedNumber;
}

document.getElementById('inputHexadecimalToDecimal').addEventListener('input', function (e) {
	this.value = this.value.replace(/[G-Zg-z]/g, '');
});

function convertHexadecimalToBiner(event) {
	event.preventDefault();
	var inputNumber = document.getElementById('inputHexadecimalToBiner').value;
	var convertedNumber = parseInt(inputNumber, 16).toString(2);
	document.getElementById('hasilHexadecimalToBiner').value = convertedNumber;
}

document.getElementById('inputHexadecimalToBiner').addEventListener('input', function (e) {
	this.value = this.value.replace(/[G-Zg-z]/g, '');
});

function convertHexadecimalToOctal(event) {
	event.preventDefault();
	var inputNumber = document.getElementById('inputHexadecimalToOctal').value;
	var convertedNumber = parseInt(inputNumber, 16).toString(8);
	document.getElementById('hasilHexadecimalToOctal').value = convertedNumber;
}

document.getElementById('inputHexadecimalToOctal').addEventListener('input', function (e) {
	this.value = this.value.replace(/[G-Zg-z]/g, '');
});
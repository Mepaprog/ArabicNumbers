const main = document.querySelector('main');
const input = document.getElementById('input');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentStart = 0;
const pageSize = 100;

function getPronunciation(num) {
    const units = ['', 'Wahid', 'ithnan', 'thalatha', "Arba'a", 'khamsa', 'sitta', "sab'a", 'thamāniya', "Tis'a", "ashara"];
    const teens = ['', 'ahad ashar', 'ithna ashar', 'thalatha ashar', "arba'a ashar", 'khamsa ashar', 'sitta ashar', "sab'a ashar", 'thamāniya ashar', "tis'a ashar"];
    const tens = ['', '', 'ishroon', 'thalaton', 'arba\'oon', 'khamsun', 'sittun', 'sab\'un', 'thamanun', 'tis\'un'];
    const hundreds = ['', 'mia', 'miatan', 'thalatha mia', 'arba\'a mia', 'khamsa mia', 'sitta mia', 'sab\'a mia', 'thamāniya mia', 'tis\'a mia'];
  
    if (num === 0) return 'sifr';
  
    // Billion
    if (num >= 1_000_000_000) {
        let billions = Math.floor(num / 1_000_000_000);
        let rest = num % 1_000_000_000;
        let billionWord = billions === 1 ? 'milyar' : billions === 2 ? 'milyaran' : getPronunciation(billions) + ' milyar';
        return rest ? billionWord + ' wa ' + getPronunciation(rest) : billionWord;
    }
  
    // Million
    if (num >= 1_000_000) {
        let millions = Math.floor(num / 1_000_000);
        let rest = num % 1_000_000;
        let millionWord = millions === 1 ? 'milyon' : millions === 2 ? 'milyan' : getPronunciation(millions) + ' milyun';
        return rest ? millionWord + ' wa ' + getPronunciation(rest) : millionWord;
    }
  
    // Thousand
    if (num >= 1000) {
        let thousands = Math.floor(num / 1000);
        let rest = num % 1000;
        let thousandWord = thousands === 1 ? 'alf' : thousands === 2 ? 'alfain' : getPronunciation(thousands) + ' alaf';
        return rest ? thousandWord + ' wa ' + getPronunciation(rest) : thousandWord;
    }
  
    // Hundreds
    if (num >= 100) {
        let h = Math.floor(num / 100);
        let rest = num % 100;
        let hWord = hundreds[h];
        return rest ? hWord + ' wa ' + getPronunciation(rest) : hWord;
    }
  
    // Tens
    if (num >= 20) {
        let t = Math.floor(num / 10);
        let u = num % 10;
        return u ? units[u] + ' wa ' + tens[t] : tens[t];
    }
  
    // Teens
    if (num >= 11 && num <= 19) {
        return teens[num - 10];
    }
  
    // Units
    return units[num];
}



function toArabicNumber(num) {
    const arabicNumbers = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    return num.toString().split('').map(digit => arabicNumbers[digit]).join('');
}

function createRow(number, pronouce){
    const rowE = document.createElement('tr');

    const numberE = document.createElement('td');
    numberE.innerText = number;

    const symbolE = document.createElement('td');
    symbolE.innerText = toArabicNumber(number);

    const pronouceE = document.createElement('td');
    pronouceE.innerText = pronouce;

    rowE.append(numberE, symbolE, pronouceE);
    main.querySelector('table').append(rowE);
}

function renderPage(start){
    main.querySelector('table').innerHTML = '';
    for(let i=start; i<start + pageSize; i++){
        createRow(i, getPronunciation(i));
    }
}

document.querySelector('.search button').addEventListener('click', () => {
    let num = parseInt(input.value);
    currentStart = num;
    if(isNaN(num) || num < 0) currentStart = 0;
    renderPage(currentStart);
});

prevBtn.addEventListener('click', () => {
    if(currentStart - pageSize >= 0){
        currentStart -= pageSize;
        renderPage(currentStart);
    }
});

nextBtn.addEventListener('click', () => {
    currentStart += pageSize;
    renderPage(currentStart);
});

renderPage(currentStart);

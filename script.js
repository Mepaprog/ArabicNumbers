const main = document.querySelector('main');
const input = document.getElementById('input');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentStart = 0;
const pageSize = 100;

function getPronunciation(num) {
    const units = ['sifr','wahid','ithnan','thalatha','arba\'a','khamsa','sitta','sab\'a','thamāniya','tis\'a'];
    const teens = ['ihda ashar','ithna ashar','thalatha ashar','arba\'a ashar','khamsa ashar','sitta ashar','sab\'a ashar','thamāniya ashar','tis\'a ashar'];
    const tens = ['','ishroon','thalatoon','arba\'oon','khamsun','sittun','sab\'un','thamanun','tis\'un'];
    const hundreds = ['','mia','miatan','thalatha mia','arba\'a mia','khamsa mia','sitta mia','sab\'a mia','thamāniya mia','tis\'a mia'];

    if (num < 10) return units[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) {
        let t = Math.floor(num / 10);
        let u = num % 10;
        return u === 0 ? tens[t] : units[u] + ' wa ' + tens[t];
    }
    if (num < 1000) {
        let h = Math.floor(num / 100);
        let r = num % 100;
        return r === 0 ? hundreds[h] : hundreds[h] + ' wa ' + getPronunciation(r);
    }
    if (num < 1000000) { // Thousands
        let t = Math.floor(num / 1000);
        let r = num % 1000;
        let thousandsPron =
            t === 1 ? 'alf' :
            t === 2 ? 'alfain' :
            t <= 10 ? getPronunciation(t) + ' alaf' :
            getPronunciation(t) + ' alf';
        return r === 0 ? thousandsPron : thousandsPron + ' wa ' + getPronunciation(r);
    }
    if (num < 1000000000) { // Millions
        let m = Math.floor(num / 1000000);
        let r = num % 1000000;
        let millionPron =
            m === 1 ? 'milyon' :
            m === 2 ? 'milyonan' :
            m <= 10 ? getPronunciation(m) + ' milyun' :
            getPronunciation(m) + ' milyun';
        return r === 0 ? millionPron : millionPron + ' wa ' + getPronunciation(r);
    }
    if (num < 1000000000000) { // Billions
        let b = Math.floor(num / 1000000000);
        let r = num % 1000000000;
        let billionPron =
            b === 1 ? 'milyar' :
            b === 2 ? 'milyaran' :
            b <= 10 ? getPronunciation(b) + ' milyar' :
            getPronunciation(b) + ' milyar';
        return r === 0 ? billionPron : billionPron + ' wa ' + getPronunciation(r);
    }
    
    return num.toString(); // fallback
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

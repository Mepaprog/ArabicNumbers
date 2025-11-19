const main = document.querySelector('main');
const input = document.getElementById('input');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentStart = 0;
const pageSize = 100;

const units = ['sifr','wahid','ithnan','thalatha','arba\'a','khamsa','sitta','sab\'a','thamāniya','tis\'a'];
const tens = ['','ashra','ishrun','thalathun','arba\'un','khamsun','sittun','sab\'un','thamaniyun','tis\'un'];
const teens = ['ashra','ahada ashar','ithna ashar','thalatha ashar','arba\'a ashar','khamsa ashar','sitta ashar','sab\'a ashar','thamāniya ashar','tis\'a ashar'];
const hundreds = ['','mi’a','mi’atain','thalatha mi’a','arba\'a mi’a','khamsa mi’a','sitta mi’a','sab\'a mi’a','thamaniya mi’a','tis\'a mi’a'];

function getPronunciation(num){
    if(num < 10) return units[num];
    if(num >= 10 && num < 20) return teens[num-10];
    if(num < 100){
        let u = num % 10;
        let t = Math.floor(num / 10);
        return u === 0 ? tens[t] : units[u] + ' wa ' + tens[t];
    }
    if(num < 1000){
        let h = Math.floor(num / 100);
        let remainder = num % 100;
        return remainder === 0 ? hundreds[h] : hundreds[h] + ' wa ' + getPronunciation(remainder);
    }
    if(num < 1000000){ // thousands
        let thousandsPart = Math.floor(num / 1000);
        let remainder = num % 1000;
        let thousandsPron = thousandsPart === 1 ? 'alf' : getPronunciation(thousandsPart) + ' alf';
        return remainder === 0 ? thousandsPron : thousandsPron + ' wa ' + getPronunciation(remainder);
    }
    if(num < 1000000000){ // millions
        let millionsPart = Math.floor(num / 1000000);
        let remainder = num % 1000000;
        let millionsPron = millionsPart === 1 ? 'milyun' : getPronunciation(millionsPart) + ' milyun';
        return remainder === 0 ? millionsPron : millionsPron + ' wa ' + getPronunciation(remainder);
    }
    if(num < 1000000000000){ // billions
        let billionsPart = Math.floor(num / 1000000000);
        let remainder = num % 1000000000;
        let billionsPron = billionsPart === 1 ? 'bilyun' : getPronunciation(billionsPart) + ' bilyun';
        return remainder === 0 ? billionsPron : billionsPron + ' wa ' + getPronunciation(remainder);
    }
    if(num === 1000000000000) return 'trilyun'; // 1 trillion
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
    if(isNaN(num) || num < 1) return;
    currentStart = num;
    renderPage(currentStart);
});

prevBtn.addEventListener('click', () => {
    if(currentStart - pageSize >= 1){
        currentStart -= pageSize;
        renderPage(currentStart);
    }
});

nextBtn.addEventListener('click', () => {
    currentStart += pageSize;
    renderPage(currentStart);
});

renderPage(currentStart);

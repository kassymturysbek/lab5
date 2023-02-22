const XLSX = require('xlsx'); // I am using SheetsJS library here, so this is its import

const workbook = XLSX.readFile('Dataset.xlsx'); // excel file into a workbook object

const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const range = XLSX.utils.decode_range(worksheet['!ref']); // // sssigning interval of cells to each column
const lastColumn = range.e.c + 1;

const columns = []; // columns into arrays
const sums = []; // finding the sums of arrays

for (let c = 0; c < lastColumn; c++) {
const columnData = [];

for (let r = 1; r <= range.e.r; r++) {
const cell = worksheet[XLSX.utils.encode_cell({ c, r })];
const cellValue = cell?.w || 0;
columnData.push(parseFloat(cellValue));
}

const sum = columnData.reduce((total, num) => total + num, 0);
columns.push(columnData);
sums.push(sum);
}


const totalSum = sums.reduce((total, sum) => total + sum, 0); // total sum of all columns


for (let i = 0; i < columns.length; i++) { 
console.log('Column_${i + 1}', columns[i]); // printing results to the console
}

console.log("Sums", sums);
console.log("Total sum of all columns:", totalSum);
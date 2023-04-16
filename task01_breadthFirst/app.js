const fs = require('fs').promises;
const readline = require('readline');
const { program } = require('commander');
require('colors');

const {outputPath, inputPath} = require('./helpers/filePath');

program
  .option('-f, --file [type]',
    'file for saving game results',
    outputPath)
  .parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const logFile = program.opts().file;
let test = 0;
let outResults = [];
let jsonInNumbers = [];

const isValid = value => {
  if (isNaN(value)) {
    console.log('Enter a number!'.red);
    return false;
  }
  return true;
};

const log = async data => {
  try {
    outResults.push(data)
    const jsonData = JSON.stringify(outResults, null, 2);
    await fs.writeFile(logFile, jsonData);
  } catch (err) {
    console.log(`Not able to save file ${outResults}`.red);
  }
};

const canTransform = (a, b) => {
  while (b > a) {
    if (b % 2 === 0) {
      b = b / 2;
    } else if (b % 10 === 1) {
      b = (b - 1) / 10;
    } else {
      return false;
    }
  }
  return a === b;
};

const game = () => {
  rl.question('Enter two numbers separated by a space:'.yellow, async (values) => {
    const [a, b] = values.split(' ').map(Number);
    if (!isValid(a) || !isValid(b)) {
      game();
      return;
    }
   const CommandinNumbers = {
      test: test+1,
      firstNumber: a,
      secondNumber: b,
    };
    jsonInNumbers.push(CommandinNumbers);

    await fs.writeFile(inputPath, JSON.stringify(jsonInNumbers, null, 2));
    const data = await fs.readFile(inputPath, 'utf8');
    const newNumbers = JSON.parse(data);

    const { firstNumber, secondNumber } = newNumbers[test];
    if (canTransform(firstNumber, secondNumber)) {
      console.log(`The number ${firstNumber} can be converted to ${secondNumber}`.green);
      log({test: test + 1, date: `${new Date().toLocaleDateString()}`, firstNumber, secondNumber, isItPosible: true})
    } else {
      console.log(`${firstNumber} cannot convert to ${secondNumber} using the specified operations.`.red);
      log({test: test + 1, date: `${new Date().toLocaleDateString()}`, firstNumber, secondNumber, isItPosible: false});
    } 
    game()
    test += 1;
  });
};

game();
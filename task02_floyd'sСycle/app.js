const fs = require('fs').promises;

const {inputPath, outputPath} = require('./helpers/filePath');

let outResults = [];

const log = async data => {
  try {
    outResults.push(data)
    const jsonData = JSON.stringify(outResults, null, 2);
    await fs.writeFile(outputPath, jsonData);
    console.log(`Result has been successfully saved to the file ${outputPath}`);
  } catch (err) {
    console.log(`Not able to save file ${outputPath}`);
  }
};

const readInput = async () => {
  try {
    const data = await fs.readFile(inputPath, 'utf-8');
    const arrays = JSON.parse(data);
    console.log(`Arrays obtained from the input file: ${JSON.stringify(arrays)}`);
    arrays.forEach(arr => {
      console.log(`Processing array: ${arr}`);
      findDuplicate(arr);
    });
  } catch (err) {
    console.log(`Failed to read the file ${inputPath}`);
    console.log(err);
  }
};

const findDuplicate = (arr) => {
  let ptr1 = arr[0];
  let ptr2 = arr[0];

  do {
    ptr1 = arr[ptr1];
    ptr2 = arr[arr[ptr2]];
  } while (ptr1 !== ptr2);

  ptr1 = arr[0];

  while (ptr1 !== ptr2) {
    if (arr[ptr1] === undefined || arr[ptr2] === undefined) {
      console.log('Duplicate element not found');
      return;
    }
    ptr1 = arr[ptr1];
    ptr2 = arr[ptr2];
  }

  console.log(`Found a repeating element: ${ptr1}`);
  log({ arr, repeating: ptr1 });
};


const main = async () => {
  await readInput();
};

main();

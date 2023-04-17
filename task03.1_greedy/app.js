const fs = require('fs').promises;
const { inputPath, outputPath } = require('./helpers/filePath');

const DISK_WEIGHTS = [0.5, 1, 2.5, 5, 10, 15, 20, 25];
const DISK_WEIGHTS_LBS = [10, 25, 35, 45];
const GRIP_WEIGHT = 20;

const log = async (data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(outputPath, jsonData);
    console.log(`Result has been successfully saved to the file ${outputPath}`);
  } catch (err) {
    console.error(`Not able to save file ${outputPath}`);
  }
};

function lbstokg(lbsArr) {
  const kgArr = lbsArr.map(lbs => Number((lbs / 2.2046).toFixed(2)))
  return kgArr;
}

const readInput = async () => {
  try {
    const data = await fs.readFile(inputPath, 'utf-8');
    const { weight } = JSON.parse(data);
    console.log(`Current record: ${weight}`);
    const result = findCombinationDisks(weight);
    
    if (typeof result === 'string') {
      console.log(result);
      await log(result);

    } else {
      const newRecord = result.reduce((acc, curr) => acc + curr, 0) * 2 + GRIP_WEIGHT;
      console.log(`Optimal disk combination one side: ${result}`);
      await log({newRecord,singleDiskx2: result, barbellWeight: GRIP_WEIGHT, prevRecord: weight });
    }
  } catch (err) {
    console.error(`Failed to read the file ${inputPath}`);
    console.error(err);
  }
};

const findCombinationDisks = (recordWeight) => {
  if (recordWeight < GRIP_WEIGHT) {
    console.log(`Weight limit should be greater than grip weight.`);
    return ` No need for additional disks. The weight of the barbell alone (${GRIP_WEIGHT} kg) is enough to beat the previous record of ${recordWeight} kg.`;
  }

  const weightLbsToKg = lbstokg(DISK_WEIGHTS_LBS);
  const sortedDisks = DISK_WEIGHTS
    .concat(weightLbsToKg)
    .sort((a, b) => b - a);
  const maxWeight = sortedDisks
    .reduce((acc, curr) => acc + curr, 0) * 2 + GRIP_WEIGHT;
  if (recordWeight >= maxWeight) {
    console.log(`Weight limit: ${Math.floor(maxWeight)} kg. Insufficient disks.`);
    return `Weight limit: ${Math.floor(maxWeight)} kg. Insufficient disks.`;
  }

  const optimalDisks = [];
  const freeDisks = [];
  const limitWeightOneSide = (recordWeight - GRIP_WEIGHT) / 2;
  let currentWeight = 0;

  for (let i = 0; i < sortedDisks.length; i++) {
  const disk = sortedDisks[i];
    if (disk < recordWeight && currentWeight + disk <= limitWeightOneSide) {
      optimalDisks.push(disk);
      currentWeight += disk;
    }
    else freeDisks.push(disk);
  }
  optimalDisks.push(freeDisks[freeDisks.length-1])
  return optimalDisks;
};

const main = async () => {
  await readInput();
};

main();

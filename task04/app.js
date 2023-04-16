const fs = require('fs').promises;
const { inputPath, outputPath } = require('./helpers/filePath');

const log = async (data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(outputPath, jsonData);
    console.log(`Result has been successfully saved to the file ${outputPath}`);
  } catch (err) {
    console.error(`Not able to save file ${outputPath}`);
  }
};

const readInput = async () => {
  try {
    const data = await fs.readFile(inputPath, 'utf-8');
    const scene = JSON.parse(data);
    const result = getAvailablePositions(scene);
    await log({ result });
  } catch (err) {
    console.error(`Failed to read the file ${inputPath}`);
    console.error(err);
  }
};

const getAvailablePositions = (scene) => {
  let count = 0;
  const n = scene.length;
  const m = scene[0].length;

  // Check all cells of the stage
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      // Check only cells without actors
      if (scene[i][j] === 0) {
        // Check the left direction
        if (j > 0 && scene[i][j - 1] === 1) {
          count++;
        }
        // Check the up direction
        if (i > 0 && scene[i - 1][j] === 1) {
          count++;
        }
        // Check the right direction
        if (j < m - 1 && scene[i][j + 1] === 1) {
          count++;
        }
        // Check the down direction
        if (i < n - 1 && scene[i + 1][j] === 1) {
          count++;
        }
      }
    }
  }

  return `Managed to find ${count} good positions for the spotlight`;
};

const main = async () => {
  await readInput();
};

main();

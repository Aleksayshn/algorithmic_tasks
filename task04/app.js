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
const result = getAvailableSize(scene)
    await log({ result });
  } catch (err) {
    console.error(`Failed to read the file ${inputPath}`);
    console.error(err);
  }
};

let places = 0;

const getAvailableSize = (scene) => {
 for (let i = 0; i < scene.length; i++) {
        const level = scene[i];
        for (let j = 0; j < level.length; j++) {
            const actor = scene[i][j];
            if (!actor) {
                for (k = 0; k < level.length; k++) {

                    const prevOrNextActor = scene[i][k]

                    if (prevOrNextActor && k <= j + 1 && k >= j - 1) {
                        places++;
                    }
                }
                if (i - 1 > -1) {
                    const prevLevel = scene[i - 1][j]
                    if (prevLevel) { places++; }
                }
                if (i + 1 < scene.length) {
                    const nextLevel = scene[i + 1][j]
                    if (nextLevel) { places++; }
                }
            }
        }
    }
    return `Managed to find ${places} good places for the spotlight`;
}

const main = async () => {
  await readInput();
};

main();

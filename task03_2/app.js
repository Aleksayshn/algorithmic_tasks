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
const [tShirts, players] = JSON.parse(data);
const result = getAvailableSize(tShirts, players)
    await log({ result });
  } catch (err) {
    console.error(`Failed to read the file ${inputPath}`);
    console.error(err);
  }
};

const getAvailableSize = (tShirts, players) => {
 
    players.forEach(player => {
        if (player.sizes.length === 1) {
            const size = player.sizes;
            tShirts[size] -= 1;
            player.receivedTShirt = size;
        }
        else {
            const size1 = player.sizes[0];
            const size2 = player.sizes[1];
            if (tShirts[size1] >= tShirts[size2]) {
                player.receivedTShirt = size1;
                tShirts[size1] -= 1;
            }
            else {
                player.receivedTShirt = size2;
                tShirts[size2] -= 1;
            };
        };
    });

    for (const size in tShirts) {
        if (tShirts[size] < 0) {
            return 'Not enough T-shirts for all players';
        }
    };

    return players;
};

const main = async () => {
  await readInput();
};

main();

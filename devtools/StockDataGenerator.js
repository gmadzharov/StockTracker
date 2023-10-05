import * as fs from 'fs/promises';

function generateStockData(startTime, endTime, outputPath) {
  const data = [];
  const priceValues = [100, 200, 300, 400, 125, 225, 325, 150, 250, 350, 175, 275, 375];

  let currentTime = startTime;

  for (let i = currentTime; i <= endTime; i++) {
    const randomIndex = Math.floor(Math.random() * priceValues.length);
    const price = priceValues[randomIndex];

    data.push({ sec: currentTime, price });
    currentTime++;
  }

  const jsonData = JSON.stringify(data, null, 2);

  fs.writeFile(outputPath, jsonData);

  console.log(`Generated data saved to ${outputPath}`);
}

generateStockData(1696194000, 1696237200, './stock_data.json');
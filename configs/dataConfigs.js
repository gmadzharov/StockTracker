import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataLocation = path.join(__dirname, "../data/stock_price.json");;

export { dataLocation }
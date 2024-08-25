const app = require('./app');
require('dotenv').config();
// Carrega as variaveis de ambiente presentes em .env

const PORT = process.env.PORT || 3333

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
const express = require("express");
const productRouter = require('./routes/product.route');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('We are Live');
});

app.use('/api/products', productRouter);

app.listen(PORT, () => {
    console.log(`Server started on  http://localhost:${PORT}`);
});
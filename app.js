const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./Routes/productRoute');
const cartRoutes = require('./Routes/cartRoute');

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

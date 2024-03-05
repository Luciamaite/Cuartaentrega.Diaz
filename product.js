const fs = require('fs');

const readProductsFromFile = () => {
    const data = fs.readFileSync('./data/productos.json', 'utf8');
    return JSON.parse(data);
};

const writeProductsToFile = (productos) => {
    fs.writeFileSync('./data/productos.json', JSON.stringify(productos, null, 2), 'utf8');
};

const productsController = {
    getAllProducts: (req, res) => {
        const productos = readProductsFromFile();
        res.json(productos);
    },

    getProductById: (req, res) => {
        const { pid } = req.params;
        const productos = readProductsFromFile();
        const producto = productos.find((p) => p.id == pid);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    },

    addProduct: (req, res) => {
        const { title, description, code, price, stock, category, thumbnails } = req.body;
        const newProduct = {
            id: Date.now().toString(),
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails,
        };

        const productos = readProductsFromFile();
        productos.push(newProduct);
        writeProductsToFile(productos);
        res.json(newProduct);
    },

    updateProduct: (req, res) => {
        const { pid } = req.params;
        const updateFields = req.body;

        const productos = readProductsFromFile();
        const index = productos.findIndex((p) => p.id == pid);

        if (index !== -1) {
            productos[index] = { ...productos[index], ...updateFields };
            writeProductsToFile(productos);
            res.json(productos[index]);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    },

    deleteProduct: (req, res) => {
        const { pid } = req.params;

        const productos = readProductsFromFile();
        const index = productos.findIndex((p) => p.id == pid);

        if (index !== -1) {
            const deletedProduct = productos.splice(index, 1)[0];
            writeProductsToFile(productos);
            res.json(deletedProduct);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    },
};

module.exports = productsController;

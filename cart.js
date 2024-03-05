const fs = require('fs');

const readCartFromFile = () => {
    const data = fs.readFileSync('./data/carrito.json', 'utf8');
    return JSON.parse(data);
};

const writeCartToFile = (cart) => {
    fs.writeFileSync('./data/carrito.json', JSON.stringify(cart, null, 2), 'utf8');
};

const cartsController = {
    getCartById: (req, res) => {
        const { cid } = req.params;
        const cart = readCartFromFile();

        if (cart[cid]) {
            res.json(cart[cid]);
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    },

    addProductToCart: (req, res) => {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const cart = readCartFromFile();

        if (!cart[cid]) {
            cart[cid] = { id: cid, products: [] };
        }

        const existingProduct = cart[cid].products.find((p) => p.id === pid);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart[cid].products.push({ id: pid, quantity });
        }

        writeCartToFile(cart);
        res.json(cart[cid]);
    },
};

module.exports = cartsController;

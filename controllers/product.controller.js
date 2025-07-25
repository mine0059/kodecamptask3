const products = [
    {
            id: 1,
            productName: 'Nike',
            cost: '#2500',
            stockStatus: 'in-stock',
            createdAt: new Date()
        },
        {
            id: 2,
            productName: 'Stock jean',
            cost: '#1500',
            stockStatus: 'out-of-stock',
            createdAt: new Date()
        },
        {
            id: 3,
            productName: 'Iphone 3',
            cost: '#1800',
            stockStatus: 'low-stock',
            createdAt: new Date()
        },
]


const getProducts = (req, res) => {
    res.status(200).send(products);
}

const getProductById = (req, res) => {
    const id = Number(req.params.id);

    let product = products.find(product => product.id === id);

    if (!product) {
        res.status(404).send("product not found");
        return;
    }

    res.status(200).send(product);
}

const addProduct = (req, res) => {
    const { productName, cost, stockStatus } = req.body;
    const allowedStatuses = ['in-stock', 'low-stock', 'out-of-stock'];

    if (!allowedStatuses.includes(stockStatus)) {
        res.status(400).send("Invalid status provided, please use any of these 'in-stock', 'low-stock', 'out-of-stock'");
        return;
    }

    const id = Math.floor(Math.random() * 10000);
    // const lastProduct = products[products.length -1];
    // const newId = products.length > 0 ? lastProduct.id + 1 : 1;

    const newProduct = {
        id: id,
        productName: productName,
        cost: cost,
        stockStatus: stockStatus,
        createdAt: new Date() 
    }

    products.push(newProduct);
    res.status(201).send(newProduct);
}

const editProduct = (req, res) => {
    const id = Number(req.params.id);
    const { productName, cost } = req.body;
    let product = products.find(product => product.id === id);

    if (!product) {
        res.status(404).send("No product Found");
        return;
    }

    if (productName && productName !== product.productName) {
        product.productName = productName;
    }

    if (cost && cost !== product.cost) {
        product.cost = cost;
    }

    res.status(200).send({
        message: "Product updated successfully",
        product
    });
}

const editProductStatus = (req, res) => {
    const id = Number(req.params.id);
    const stockStatus = req.params.stockStatus;
    const allowedStatuses = ['in-stock', 'low-stock', 'out-of-stock'];

    if (!allowedStatuses.includes(stockStatus)) {
        res.status(400).send("Invalid status provided, please use any of these 'in-stock', 'low-stock', 'out-of-stock'");
        return;
    }

    const product = products.find(product => product.id === id);
    if (!product) {
        return res.status(404).send("No product Found");
    }

    product.stockStatus = stockStatus;

    res.status(200).send({
        message: "Product status updated successfully",
        product
    });
}

const deleteProduct = (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex(product => product.id === id);

    if (index === -1) {
        return res.status(404).send("Product not found");
    }

    products.splice(index, 1);
    
    res.status(200).send({
        message: "Product deleted successfully",
        products
    });
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    editProduct,
    editProductStatus,
    deleteProduct
}
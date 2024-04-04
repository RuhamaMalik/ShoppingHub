const db = require('../models/config');
const Product = db.products;
const Category = db.categories;
const User = db.users;
const path = require('path');
const fs = require('fs');
const url = require('url');
const { log } = require('util');


const baseUrl = 'http://localhost:5000';
const uploadUrl = url.resolve(baseUrl, '/uploads');

const uploadFolder = path.join(__dirname, '../uploads');

const addProduct = async (req, res) => {
    // console.log(req.file);
    fs.readdir(uploadFolder, async (err, files) => {
        if (err) {
            console.error('Error reading upload folder:', err);
            return;
        }

        let pimage = req.file.filename;

        try {
            const { pname, pprice, pdescription, categoryId, userId } = req.body;
            if (!pname || !pprice || !categoryId || !userId, !pdescription) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            // check user
            const user = await User.findOne({
                where: {
                    id: userId
                }
            });
            // console.log('userOId', user);
            const products = await Product.findAll({
                where: {
                    userId: user.id
                }
            });
            // Create product
            if (user.id) {
                const product = await Product.create({
                    pname,
                    pprice,
                    pdescription,
                    pimage,
                    categoryId,
                    // products,

                    userId: user.id
                })
                return res.status(200).json({ product, success: true, });
            }


        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    })
};

// get All Products

const getAllProducts = async (req, res) => {
    try {

        const getproducts = await Product.findAll();

        const products = await Promise.all(getproducts.map(async product => {
            const category = await Category.findOne({
                where: {
                    id: product.categoryId
                }
            });
            const user = await User.findOne({
                where: {
                    id: product.userId
                }
            })
            return {
                ...product.toJSON(),
                imagePath: uploadUrl + '/' + product.pimage,
                category: category.toJSON(),
                user

            };
        }));

        res.status(200).json({ products, success: true });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// search Product 

const searchProducts = async (req, res) => {
    try {
        const searchKey = req.body.searchKey;
        const searchTerm = req.body.searchValue;
        // console.log(searchKey, searchTerm);
        if (!searchKey || !searchTerm) {
            return res.status(400).json({ message: 'Search key and search value are required' });
        }

        let getProducts;
        if (searchKey === 'categoryId') {
            const category = await Category.findOne({
                where: {
                    cname: searchTerm
                }
            });
            getProducts = await Product.findAll({ where: { [searchKey]: category.id } });
        } else if (searchKey === 'userId') {
            const user = await User.findOne({
                where: {
                    firstName: searchTerm
                }
            })
            getProducts = await Product.findAll({ where: { [searchKey]: user.id } });


        } else if (searchKey === 'cid') {
            const category = await Category.findOne({
                where: {
                    id: searchTerm
                }
            });
            getProducts = await Product.findAll({ where: { 'categoryId': category.id } });
        } else {
            getProducts = await Product.findAll({ where: { [searchKey]: searchTerm } });
        }

        let products = await Promise.all(getProducts.map(async product => {
            const category = await Category.findOne({
                where: { id: product.categoryId }
            });
            const user = await User.findOne({ where: { id: product.userId } })

            return {
                ...product.toJSON(),
                imagePath: uploadUrl + '/' + product.pimage,
                category: category.toJSON(),
                user

            };
        }));




        res.status(200).json({ success: true, products, message: 'Filtered Successfully' });
    } catch (error) {
        console.error('Error fetching search categories:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// get product by id

const getProductById = async (req, res) => {
    try {
        const pid = req.params.pid;
        const getproduct = await Product.findByPk(pid);

        if (!getproduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const product = {
            ...getproduct.toJSON(),
            imagePath: uploadFolder + '/' + getproduct.image
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// get product by category 

const getProductsByCategory = async (req, res) => {
    try {
        const cid = req.params.cid;
        const category = await Category.findByPk(cid);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const getProducts = await Product.findAll({
            where: { categoryId: cid }
        });

        const products = getProducts.map(product => ({
            ...product.toJSON(),
            imagePath: uploadFolder + '/' + product.pimage,
        }));


        res.status(200).send({ success: true, products });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// delete product by id

const deleteProductById = async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await Product.findByPk(pid);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // delete image 
        const imagePath = path.join(__dirname, `../uploads/${product.pimage}`);
        fs.unlinkSync(imagePath);


        await product.destroy();

        res.status(200).json({ message: 'Product deleted successfully', success: true, });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


/// update product

const updateProductById = async (req, res) => {
  
    try {
        const pid = req.params.pid;
        let { pname, pprice, pdescription,categoryId, userId } = req.body;

        let product = await Product.findByPk(pid);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if a file is uploaded
        if (req.file) {
            const newImageName = req.file.filename;

            // Update product's image
            if (product.image) {
                const imagePath = path.join(__dirname, `../uploads/${product.image}`);
                fs.unlinkSync(imagePath);
            }

            await Product.update({ pimage: newImageName }, { where: { id: pid } });
        }

        if (pname) product.pname = pname;
        if (pprice) product.pprice = pprice;
        if (pdescription) product.pdescription = pdescription;
        if (categoryId) product.categoryId = categoryId;

        await product.save();

        res.status(200).json({ message: 'Product updated successfully', success: true });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// get products by user

const getProductsByUser = async (req, res) => {
    try {
        // const hostname = req.headers.host;
        // console.log(hostname);
        const userId = req.params.uid;

        const getproducts = await Product.findAll({
            where: { userId: userId }
        });

        if (getproducts.length === 0) {
            return res.status(404).json({ message: 'No products found for this user' });
        }

        const user = await User.findOne({ where: { id: userId } })
        const products = await Promise.all(getproducts.map(async product => {
            const category = await Category.findOne({ where: { id: product.categoryId } });
            return {
                ...product.toJSON(),
                imagePath: uploadUrl + '/' + product.pimage,
                user,
                category
            };
           
        }))

        res.status(200).send({ products, success: true });
    } catch (error) {
        console.error('Error fetching products by user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    addProduct,
    getAllProducts,
    searchProducts,
    getProductById,
    getProductsByCategory,
    deleteProductById,
    updateProductById,
    getProductsByUser
};


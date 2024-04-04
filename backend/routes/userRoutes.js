const express = require('express');
const userController = require('../controller/userController');
const productController = require('../controller/productController');
const categoryController = require('../controller/categoryController');
const router = express.Router();
const { authmiddleware } = require('../middlewares/authmiddleware')
const upload = require('../middlewares/multerConfig')


router.post('/signup',upload.single('image'), userController.signUp)
router.post('/login', userController.login);
router.get('/getUserById/:id', userController.getUserById);
router.put('/updateUserById/:id', authmiddleware, userController.updateUserById);
router.delete('/deleteUserById/:id', authmiddleware, userController.deleteUserById);

router.get('/getAllCategories', categoryController.getAllCategories);
router.get('/getCategoryById/:id', categoryController.getCategoryById);

router.post('/addProduct', authmiddleware, upload.single('pimage'), productController.addProduct);
router.get('/getAllProducts', productController.getAllProducts);
router.post('/searchProducts', authmiddleware, productController.searchProducts);
router.get('/getProductById/:pid', productController.getProductById);
router.delete('/deleteProductById/:pid', authmiddleware, productController.deleteProductById);
router.put('/updateProductById/:pid', authmiddleware, upload.single('pimage'), productController.updateProductById);
router.get('/getProductsByCategory/:cid', productController.getProductsByCategory);
router.get('/getProductsByUser/:uid', productController.getProductsByUser);


// router.post('/resetPass', userController.passwordReset)
// app.delete('/delete/:id', userControllers.deleteById)
// app.get('/getUsers', userControllers.getUsers)
// app.get('/getUserById/:id', userControllers.getUsersById)
// app.patch('/updateUser/:id', userControllers.updateUser)


module.exports = router;
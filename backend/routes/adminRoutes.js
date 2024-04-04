const express = require('express');
const categoryController = require('../controller/categoryController');
const userController = require('../controller/userController');
const {authmiddleware, adminmiddleware} = require('../middlewares/authmiddleware')
const router = express.Router();
const upload = require('../middlewares/multerConfig')

 

router.post('/getAllUsers', authmiddleware,adminmiddleware, userController.getAllUsers);
router.post('/searchUsers', authmiddleware,adminmiddleware, userController.searchUsers);

router.post('/addCategory', upload.single('image'), authmiddleware,adminmiddleware, categoryController.addCategory);
router.post('/searchCategory', authmiddleware,adminmiddleware, categoryController.searchCategory);
router.put('/updateCategoryById/:id',upload.single('image'), authmiddleware,adminmiddleware, categoryController.updateCategoryById);
router.delete('/deleteCategoryById/:id', authmiddleware,adminmiddleware, categoryController.deleteCategoryById);




module.exports = router;
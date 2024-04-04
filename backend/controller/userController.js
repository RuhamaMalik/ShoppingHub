const db = require('../models/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JSON_SECRET = 'nbd=wh+jm#rgmsfwj%-fkjk90(e][je$bdjwe';
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = db.users;
const Product = db.products;
const path = require('path');
const fs = require('fs');
const url = require('url');

const baseUrl = 'http://localhost:5000';
const uploadUrl = url.resolve(baseUrl, '/uploads');

// console.log('----------------' + uploadUrl);

const uploadFolder = path.join(__dirname, '../uploads');
// console.log('----------------'+path.join(__dirname));
console.log(uploadUrl);
// signup

const signUp = async (req, res) => {

    try {
        // console.log(req.file);
        // console.log(req.body);
        const { firstName, lastName, email, password, contactNumber } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send('Email already exists');
        }

        // hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // create  new user 
        const newUser = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            contactNumber,
            image: req.file?.filename
        };
        const createdUser = await User.create(newUser);

        res.status(200).send({ message: "User SignUp Successfully", success: true, user: createdUser });
    } catch (error) {
        console.error('Error in Creating user:', error);
        res.status(500).send('Error Creating user');
    }
};


// Sign in controller
const login = async (req, res) => {
    try {
        //check user
        const getuser = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!getuser) {
            return res.status(400).send({ message: "User not found", success: false });
        }

        // compare password
        const isMatch = await bcrypt.compare(req.body.password, getuser.password);
        if (!isMatch) {
            return res.status(200).send({ message: "Invalid email or password", success: false });
        }

        // create token
        const token = jwt.sign({ id: getuser.id }, JSON_SECRET, {
            expiresIn: "1d",
        });

        const user = {
            ...getuser.toJSON(),
            imagePath: uploadUrl + '/' + getuser.image,
        }

        // Send response with token
        res.status(200).send({
            message: "Login Successfully",
            success: true,
            token,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error in Signin controller ${error.message}`,
        });
    }
};



//// get all users

const getAllUsers = async (req, res) => {
    try {

        const allUsers = await User.findAll();

        // add image path
        const users = allUsers.map(user => ({
            ...user.toJSON(),
            // imagePath: uploadFolder + '/' + user.image,
            imagePath: uploadUrl + '/' + user.image,
        }

        ));
        res.status(200).send({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// search user

const searchUsers = async (req, res) => {
    try {
        const searchKey = req.body.searchKey;
        const searchTerm = req.body.searchValue;
        
        if (!searchKey || !searchTerm) {
            return res.status(400).json({ message: 'Search key and search value are required' });
        }
 
        const getUsers = await User.findAll({
            where: {
               [searchKey]: searchTerm
            }
        });

        if (getUsers.length === 0) {
            return res.status(404).json({ success:false, message: 'Not found' });
        }

        const users = getUsers.map(user => ({
            ...user.toJSON(),
            imagePath: uploadUrl + '/' + user.image,
        }));

        res.status(200).json({ success: true, users,  message: 'Filter Successfully' });
    } catch (error) {
        console.error('Error fetching search users ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// get user by id


const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const getUser = await User.findByPk(userId);
        if (!getUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = {
            ...user.toJSON(),
            imagePath: uploadFolder + '/' + user.image,
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// update user by id 

const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password, contactNumber, isAdmin } = req.body;
    let image = req.file ? req.file.filename : null;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (image && user.image) {
            const oldImagePath = path.join(__dirname, `../uploads/${user.image}`);
            fs.unlinkSync(oldImagePath);
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (image) {
            user.image = image;
        }
        if (password) {
            // Hash password 
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            user.password = hashedPassword
        }
        if (contactNumber) user.contactNumber = contactNumber;
        if (isAdmin !== undefined) user.isAdmin = isAdmin;

        await user.save();

        res.status(200).send({ success: true, user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// delete user by id

const deleteUserById = async (req, res) => {
    const { id } = req.params;

    try {

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const products = await Product.findAll({
            where: { userId: id }
        });

        // delete related products and  images
        for (const product of products) {
            const imagePath = path.join(__dirname, `../uploads/${product.pimage}`);
            fs.unlinkSync(imagePath);
            await product.destroy();
        }


        //  delete related products
        // await Product.destroy({
        //     where: { userId: id }
        // });

        // delete image 
        const imagePath = path.join(__dirname, `../uploads/${user.image}`);
        fs.unlinkSync(imagePath);

        await user.destroy();

        res.status(200).send({ success: true, message: 'User deleted Successfully' });
    } catch (error) {

        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    signUp,
    login,
    getAllUsers,
    searchUsers,
    getUserById,
    updateUserById,
    deleteUserById

}





// reset Password

// // Function to generate a unique token
// function generateToken() {
//     return crypto.randomBytes(20).toString('hex');
// }

// const passwordReset = async (req, res) => {
//     const { email } = req.body;

//     try {
//         // find user
//         const user = await User.findOne({ where: { email } });

//         if (!user) {
//             return res.status(404).send('User not found');
//         }

//         // create reset token and expiry time
//         const resetToken = generateToken();
//         const resetTokenExpiry = Date.now() + 3600000;

//         // save  token and expiry in user record
//         user.resetToken = resetToken;
//         user.resetTokenExpiry = resetTokenExpiry;
//         await user.save();

//         // send reset link email
//         const transporter = nodemailer.createTransport({
//             host: "smtp.ethereal.email",
//             port: 587,
//             secure: false,
//             service: 'gmail',
//             auth: {
//                 user: 'joe.west@ethereal.email',
//                 pass: 'jycXajbQm2pQdTbn7H'
//             }
//         });

//         const mailOptions = {
//             from: '<malikruhama7@gmail.com>',
//             to: `${email}`,
//             subject: 'Password Reset Request',
//             text: `Click on this link to reset your password: ${resetToken}`,
//             html: "<b>Hello world?</b>",
//         };

//         await transporter.sendMail(mailOptions);

//         res.status(200).send('Password reset link sent successfully');
//     } catch (error) {
//         console.error('Error sending password reset email:', error);
//         res.status(500).send('Internal server error');
//     }
// }


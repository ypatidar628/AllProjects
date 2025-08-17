const express = require('express');
const router = express.Router();
const User = require('../db/user');
const { addUser, updateUser, deleteUser } = require('../handlers/user-handler');


router.post('/', async (req, res, next) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        else if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        else if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        let ifDuplicate = await User.findOne({ email: email });
        if (ifDuplicate) {
            return res.status(400).json({ message: 'Email already exists' });
        }


        let result = await addUser(name, email, password, isAdmin);

        res.status(201).json({ status: 201, message: "User added successfully", result });

        // console.log(user);

    }
    catch (err) {
        next(err);
    }
})
router.put('/update/:id', async (req, res, next) => {
    try {
        const { id, name, email, password } = req.body;

        if (!id || !name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

let result = updateUser(id, name, email, password);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ status: 200, message: "User updated successfully", result });
    } catch (err) {
        next(err);
    }
});

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Id is required' });
        }
       
        let result = await deleteUser(id);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ status: 200, message: 'User deleted successfully', result });
    }
    catch (err) {
        next(err);
    }
})



module.exports = router;
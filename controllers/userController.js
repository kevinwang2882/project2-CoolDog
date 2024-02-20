const { User } = require('../models')

const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate()
        res.json(users)
    } catch (error) {
        return res.status(500).send("An error has occured")
    }
}

const getUserById = async (req,res) => {
    try {
        const user = await User.findById(req.params.id).populate()
        if (user) {
            res.json(user)
        }
    } catch (error) {
        return res.status(500).send('Collection with the specified ID does not exists');
    }
}

const createUser = async (req,res) => {
    try {
        const user = await new User(req.body)
        await user.save()
        return res.status(201).json({
            user,
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await User.findByIdAndUpdate(id, req.body, { new: true })
        if (user) {
            return res.status(200).json(user)
        }
        throw new Error("User not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("User deleted");
        }
        throw new Error("User not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const userSignUp= async (req, res) => {
    try {
        const { username,  password } = req.body;
        // Validate input
        // Check if user already exists
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create new user
        const newUser = new User({ username,  password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
//for login
const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find user by name
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Verify password
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Login successful
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};




module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    userLogin ,
    userSignUp
}
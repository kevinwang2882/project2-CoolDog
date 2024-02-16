const db = require('../db')
const User = require('../models/user');

const main = async () => {
    try {
        const users = [
            {
                user_name: 'john_doe',
                email: 'john@example.com',
                password: 'password123',
                address: '123 Main St, City',
                phone: '123-456-7890',
            },
        ]
        // Save the user to the database
        await User.insertMany(users);
        console.log('Users added successfully!');
    } catch (err) {
        console.error('Error inserting user:', err);
    }
};

const run = async () => {
    await main()
    db.close()
}

run()
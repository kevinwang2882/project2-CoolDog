const db = require('../db');
const { User } = require('../models');

const main = async () => {
    try {
        const users = [
            {
                username: 'john_doe',
                password: 'password123',
            },
        ];
        // Save the user to the database
        await User.create(users);
        console.log('Users added successfully!');
    } catch (err) {
        console.error('Error inserting user:', err);
    } finally {
        db.close(); // Close the database connection after inserting users
    }
};

main(); // Call the main function to start the insertion process

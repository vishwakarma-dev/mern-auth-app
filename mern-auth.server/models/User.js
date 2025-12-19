/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - mobile_number
 *         - email_id
 *         - password
 *       properties:
 *         first_name:
 *           type: string
 *           description: User's first name
 *         last_name:
 *           type: string
 *           description: User's last name
 *         mobile_number:
 *           type: string
 *           description: User's mobile number (unique)
 *         email_id:
 *           type: string
 *           format: email
 *           description: User's email address (unique)
 *         password:
 *           type: string
 *           description: Hashed password
 *       example:
 *         first_name: John
 *         last_name: Doe
 *         mobile_number: "+1234567890"
 *         email_id: john.doe@example.com
 *         password: hashedpassword
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    // match: [/^\+\d{1,3}\d{10}$/, 'Please enter a valid mobile number!']
  },
  email_id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('User', UserSchema);

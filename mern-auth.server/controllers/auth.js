const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email_id
 *               - password
 *               - mobile_number
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email_id:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               mobile_number:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       400:
 *         description: User already exist! OR Mobile number already in use!
 *       500:
 *         description: Server error
 */
// Register new user
exports.SignUp = async (req, res) => {
  const { first_name, last_name, email_id, password } = req.body;


  try {
    // Check email
    let user = await User.findOne({ email_id });
    if (user) {
      return res.status(400).json({ msg: 'User already exists!' });
    }

    // Create user
    user = new User({
      first_name,
      last_name,
      email_id,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();

    // ✅ No JWT here
    res.status(201).json({
      msg: 'User registered successfully.',
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

  
  /**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     summary: Sign in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               email_id:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User signed in successfully, returns user data and JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     first_name:
 *                       type: string
 *                     last_name:
 *                       type: string
 *                     email_id:
 *                       type: string
 *                     mobile_number:
 *                       type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
exports.SignIn = async (req, res) => {
    const { email_id, mobile_number, password } = req.body;
  
    try {
      // Find by email or mobile number
      const user = await User.findOne({ $or: [{ email_id }, { mobile_number }] });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      
      const payload = {
        user: {
          id: user.id,
        },
      };
      
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        // Remove password before sending response
        const { password, ...safeUser } = user._doc;
        res.json({ user: safeUser, token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };

const { db, auth } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

// Hash Password (use bcrypt in production)
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// ============ REGISTER USER ============
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'Username, email, and password are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters'
      });
    }

    // Check if email already exists
    const usersRef = db.ref('users');
    const snapshot = await usersRef
      .orderByChild('email')
      .equalTo(email)
      .once('value');

    if (snapshot.exists()) {
      return res.status(409).json({
        error: 'User with this email already exists'
      });
    }

    // Create new user
    const userId = uuidv4();
    const newUser = {
      userId,
      username,
      email,
      password: hashPassword(password),
      profileImage: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      diseaseHistory: {},
      isActive: true
    };

    // Save to Firebase
    await usersRef.child(userId).set(newUser);

    // Remove password from response
    const userResponse = { ...newUser };
    delete userResponse.password;

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      token: userId // Simple token (use JWT in production)
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      error: 'Registration failed',
      details: error.message
    });
  }
};

// ============ LOGIN USER ============
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      });
    }

    // Find user by email
    const usersRef = db.ref('users');
    const snapshot = await usersRef
      .orderByChild('email')
      .equalTo(email)
      .once('value');

    if (!snapshot.exists()) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    let user;
    let userId;
    snapshot.forEach((child) => {
      user = child.val();
      userId = child.key;
    });

    // Verify password
    const hashedPassword = hashPassword(password);
    if (user.password !== hashedPassword) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    // Remove password from response
    const userResponse = { ...user };
    delete userResponse.password;

    res.json({
      message: 'Login successful',
      user: userResponse,
      token: userId
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      details: error.message
    });
  }
};

// ============ GET USER BY ID ============
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const userRef = db.ref(`users/${userId}`);
    const snapshot = await userRef.once('value');

    if (!snapshot.exists()) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const user = snapshot.val();
    delete user.password;

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: 'Failed to fetch user',
      details: error.message
    });
  }
};

// ============ GET USER BY EMAIL ============
exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const usersRef = db.ref('users');
    const snapshot = await usersRef
      .orderByChild('email')
      .equalTo(email)
      .once('value');

    if (!snapshot.exists()) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    let user;
    snapshot.forEach((child) => {
      user = child.val();
    });

    delete user.password;
    res.json(user);
  } catch (error) {
    console.error('Get user by email error:', error);
    res.status(500).json({
      error: 'Failed to fetch user',
      details: error.message
    });
  }
};

// ============ UPDATE USER ============
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, profileImage } = req.body;

    const userRef = db.ref(`users/${userId}`);
    const snapshot = await userRef.once('value');

    if (!snapshot.exists()) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const updatedData = {
      ...snapshot.val(),
      username: username || snapshot.val().username,
      profileImage: profileImage || snapshot.val().profileImage,
      updatedAt: new Date().toISOString()
    };

    await userRef.set(updatedData);

    delete updatedData.password;

    res.json({
      message: 'User updated successfully',
      user: updatedData
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      error: 'Failed to update user',
      details: error.message
    });
  }
};

// ============ DELETE USER ============
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const userRef = db.ref(`users/${userId}`);
    const snapshot = await userRef.once('value');

    if (!snapshot.exists()) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    await userRef.remove();

    res.json({
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      error: 'Failed to delete user',
      details: error.message
    });
  }
};

// ============ GET ALL USERS ============
exports.getAllUsers = async (req, res) => {
  try {
    const usersRef = db.ref('users');
    const snapshot = await usersRef.once('value');

    if (!snapshot.exists()) {
      return res.json([]);
    }

    const users = [];
    snapshot.forEach((child) => {
      const user = child.val();
      delete user.password;
      users.push(user);
    });

    res.json({
      totalUsers: users.length,
      users
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      error: 'Failed to fetch users',
      details: error.message
    });
  }
};

// ============ CHANGE PASSWORD ============
exports.changePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        error: 'Old password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: 'New password must be at least 6 characters'
      });
    }

    const userRef = db.ref(`users/${userId}`);
    const snapshot = await userRef.once('value');

    if (!snapshot.exists()) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const user = snapshot.val();

    // Verify old password
    if (user.password !== hashPassword(oldPassword)) {
      return res.status(401).json({
        error: 'Old password is incorrect'
      });
    }

    // Update with new password
    await userRef.update({
      password: hashPassword(newPassword),
      updatedAt: new Date().toISOString()
    });

    res.json({
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      error: 'Failed to change password',
      details: error.message
    });
  }
};

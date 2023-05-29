require('dotenv').config();


const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

   const response = await axios.get(`http://localhost:${process.env.PORT}/api/auth/verify`, { headers: { Authorization: `Bearer ${token}` } });

    // Check if verification failed
    if (response.status !== 200 || !response.data.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Attach user information to the request object
    req.user = response.data.user;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Checking if user is TEACHER
const isTeacher = (req, res, next) => {
  if (req.user.userType === 'TEACHER') {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
};


// Checking if user is ADMIN
const isAdmin = (req, res, next) => {
  if (req.user.userType === 'ADMIN') {
    next();
  } else {
    return res.status(403).json({
      message: 'Only Admins can Delete Questions'
    });
  }
};

// Checking if user is STUDENT
const isNotStudent = (req, res, next) => {
  if (req.user.userType !== 'STUDENT') {
    next();
  } else {
    return res.status(403).json({
      message: "Students aren't allowed to view this content"
    });
  }
};

module.exports = { authMiddleware, isTeacher, isAdmin, isNotStudent };

const jwt = require('jsonwebtoken');
const jwtsecret = process.env.JWT_SECRET

interface User {
  _id: any,
    fullname: string;
    email: string;
  }

  const generateToken = (user: User): string => {
      const token = jwt.sign(
          {
            _id: user._id,
            email: user.email,
            fullname: user.fullname
          },
          jwtsecret,
          { expiresIn: '5m' }
        );
      
        return token;
      };

export default generateToken
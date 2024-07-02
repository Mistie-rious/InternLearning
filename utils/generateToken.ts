import jwt from 'jsonwebtoken'
const jwtsecret = process.env.JWT_SECRET

interface User {
    fullname: string;
    name: string;
    email: string;
  }

  const generateToken = (user: User): string => {
    const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          fullname: user.fullname
        },
        jwtsecret,
        { expiresIn: '5m' }
      );
    
      return token;
    };

export default generateToken
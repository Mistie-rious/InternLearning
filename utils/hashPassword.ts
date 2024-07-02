const bcrypt = require('bcryptjs');

const hashPassword =  async (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(12, (err: Error | null, salt: string) => {
        if (err) {
          return reject(err);
        }
        bcrypt.hash(password, salt, (err: Error | null, hash: string) => {
          if (err) {
            return reject(err);
          }
          resolve(hash);
        });
      });
    });
  };

export default hashPassword
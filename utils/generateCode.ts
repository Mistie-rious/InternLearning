interface CodeWithExpiration {
    code: string;
    expiresAt: Date;
  }
  
  const generateCode = (codeLength: number, expirationDurationMinutes: number = 5): CodeWithExpiration => {
    const number = String(Math.random()).split('.')[1].split("");
    const length = number.length;
  
    let code = '';
  
    if (!codeLength) {
      codeLength = 4; 
    }
  
    for (let i = 0; i < codeLength; i++) {
      code += number[length - (i + 1)];
    }
  

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expirationDurationMinutes);
  
    return {
      code,
      expiresAt
    };
  };
  
  export default generateCode;
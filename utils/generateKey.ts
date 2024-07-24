const generateKey = (codeLength: number = 4): string => {
    const number = String(Math.random()).split('.')[1].split("");
    const length = number.length;
  
    let code = '';
  
    for (let i = 0; i < codeLength; i++) {
      code += number[length - (i + 1)];
    }
  
    return code;
};
  
export default generateKey;
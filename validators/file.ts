const validateExtension = (ext: string) => {
    if(ext === '.jpg' || ext === '.png' || ext === '.jpeg' || ext == '.mp4'){
        return true
    } else {
        return false
    }
}

const validateSpreadsheetExtension = (ext: string) => {
    const spreadsheetExtensions = ['.xls', '.xlsx', '.xlsm', '.xlsb', '.csv', '.ods'];
    return spreadsheetExtensions.includes(ext);
}



export {validateExtension, validateSpreadsheetExtension}
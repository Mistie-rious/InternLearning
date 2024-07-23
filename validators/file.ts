const validateVideoExtension = (ext: string) => {
    const videoExtensions = ['.mp4', '.mkv', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mpeg', '.mpg'];
    return videoExtensions.includes(ext);
}

const validateSpreadsheetExtension = (ext: string) => {
    const spreadsheetExtensions = ['.xls', '.xlsx', '.xlsm', '.xlsb', '.csv', '.ods'];
    return spreadsheetExtensions.includes(ext);
}



export {validateVideoExtension, validateSpreadsheetExtension}
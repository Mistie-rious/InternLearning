const validateExtension = (ext: string) => {
    const videoExtensions = ['.mp4', '.mkv', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mpeg', '.mpg'];
    return videoExtensions.includes(ext);
}


export default validateExtension
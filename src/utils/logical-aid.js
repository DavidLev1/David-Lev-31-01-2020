export const isOnlyEnglishLetters = value => {
    const regex = /^[A-Za-z ]*$/;
    const isLegalInput = regex.test(value);
    
    if(isLegalInput) return true;   
}


export const isValidMinLength = (value, minLength) => {
    if(value.trim().length >= minLength) return true;
}
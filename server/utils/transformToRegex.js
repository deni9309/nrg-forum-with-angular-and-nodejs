/**
 * Transforms string to a valid regex pattern - all special characters are escaped;
 * Example: c++ => c\\+\\+
 * @param {string} stringValue 
 * @returns string
 */
function transformToRegex(stringValue) {  //c++
    const specialChars = ['.', ',', '+', '*', '?', '^', '$', '(', ')', '[', ']', '{', '}', '|', '\\'];
    let regex = stringValue;
    specialChars.forEach(c => {
        if (stringValue.includes(c)) {
            let match = new RegExp(('\\' + c), 'g'); // \+
            regex = stringValue.replace(match, '\\' + c);//\+
        }
    });
    return regex;
}

module.exports = {
    transformToRegex,
}

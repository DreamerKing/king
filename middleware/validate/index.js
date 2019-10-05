function parseField(filed) {
    return filed.split(/\[|\]/).filter(s => s);
}

function getField(req, filed){
    let val = req.body;
    filed.forEach((prop) => {
        val = val[prop];
    });
    return val;
}

exports.required = (field) => {
    field = parseField(field);
    return (req, res, next) => {
        if(getField(req, field)){
            next();
        } else {
            throw new Error(`${field.join(' ')} is required`);
        }
    }
}

exports.lengthAbove = (filed, length) => {
    field = parseField(filed);
    return (req, res, next) => {
        if(getField(req, field).lenght > length){
            next();
        } else {
            throw new Error(`${field.join(' ')} must have more ${length} characters`);
        }
    }
}
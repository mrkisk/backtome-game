function setParameterGlobal(data) {
    parameters = {};
    loadStrings(data, function(lines) {
        for (let line of lines) {
            let parts = line.split(': ');
            if (parts.length === 2) {
                let key = parts[0].trim();
                let valueStr = parts[1].trim();
                let value = parseValue(valueStr);
                if (value !== null) {
                    parameters[key] = value;
                }
            }
        }
        fileLoaded = true;
    });
}

function parseValue(valueStr) {
    let value = parseFloat(valueStr);
    if (!isNaN(value)) {
        return value;
    }
    return valueStr;
}

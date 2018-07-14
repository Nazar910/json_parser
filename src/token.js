const assert = require('assert');

const TYPES = {
    EOF: 'EOF',
    OPEN_CURLY: 'OPEN_CURLY',
    CLOSE_CURLY: 'CLOSE_CURLY',
    OPEN_BRACKET: 'OPEN_BRACKET',
    CLOSE_BRACKET: 'CLOSE_BRACKET',
    COLON: 'COLON',
    COMMA: 'COMMA',
    STRING: 'STRING',
    NUMBER: 'NUMBER',
    BOOLEAN: 'BOOLEAN'
}

class Token {
    constructor(type, value) {
        assert.ok(type, 'You should specify type of token')
        Object.assign(this, {
            type,
            value
        });
    }

    static get types() {
        return TYPES;
    }

    static create(...args) {
        return new this(...args);
    }
}

module.exports = Token;

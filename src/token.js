const assert = require('assert');

const EOF = 'EOF';
const OPEN_CURLY = 'OPEN_CURLY';
const CLOSE_CURLY = 'CLOSE_CURLY';
const OPEN_BRACKET = 'OPEN_BRACKET';
const CLOSE_BRACKET = 'CLOSE_BRACKET';
const COLON = 'COLON';
const COMMA = 'COMMA';
const STRING = 'STRING';
const NUMBER = 'NUMBER';

class Token {
    constructor(type, value) {
        assert.ok(type, 'You should specify type of token')
        Object.assign(this, {
            type,
            value
        });
    }

    static get types() {
        return {
            EOF,
            OPEN_CURLY,
            CLOSE_CURLY,
            OPEN_BRACKET,
            CLOSE_BRACKET,
            COLON,
            COMMA,
            STRING,
            NUMBER
        }
    }

    static create(...args) {
        return new this(...args);
    }
}

module.exports = Token;

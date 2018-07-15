const assert = require('assert');

const Token = require('./token');

const {
    EOF,
    OPEN_CURLY,
    CLOSE_CURLY,
    OPEN_BRACKET,
    CLOSE_BRACKET,
    DOUBLE_QUOTE,
    COLON,
    COMMA,
    STRING,
    NUMBER,
    BOOLEAN
} = Token.types;

/**
 * @class Lexer
 * Lexer is class responsible for parsing input
 * text into stream of tokens with specified types
 */
class Lexer {
    /**
     * @constructor
     * @param {String} text - input text
     */
    constructor(text) {
        assert.ok(text, 'Please specify text');
        this.text = text;
        this.pos = 0;
        this.currentChar = this.text[this.pos];
    }

    /**
     * Static fabric method
     * for instantiating Lexer object
     *
     * @returns {Lexer}
     */
    static create(...args) {
        return new this(...args);
    }

    /**
     * Helper method for throwing Error
     * @throws {Error}
     */
    error() {
        throw new Error('Lexical error');
    }

    /**
     * Makes iteration by incrementing pos
     * and selecting next currentChar
     *
     * @throws {Error}
     */
    advance() {
        if (this.pos > this.text.length - 1) {
            this.error();
        }

        this.pos++;
        this.currentChar = this.text[this.pos];
    }

    /**
     * Method that iterates throught text while current char
     * is whitespace
     */
    skipWhitespaces() {
        while (this.currentChar && /\s/.test(this.currentChar)) {
            this.advance();
        }
    }

    /**
     * Read from text while has a valid character
     * and return result
     *
     * @returns {String}
     */
    string() {
        let result = '';
        while (/[\w\"\s\\]/.test(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }
        return result;
    }

    /**
     * Read from text while has a valid number
     * and return result
     *
     * @returns {Number}
     **/
    number() {
        let result = '';
        while (/[\d\.]/.test(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }
        return Number(result);
    }

    /**
     * Read from test while get true or false
     * and return result
     *
     * @returns {Boolean}
     */
    boolean() {
        let expectedStr = '';
        if (this.currentChar === 'f') {
            expectedStr = 'false';
        } else if (this.currentChar === 't') {
            expectedStr = 'true';
        } else {
            this.error();
        }

        for (let i = 0; i < expectedStr.length; i++) {
            if (this.currentChar !== expectedStr[i]) {
                this.error();
            }
            this.advance();
        }

        return expectedStr === 'true';
    }

    /**
     * Get next token from input text
     *
     * @returns {Token}
     */
    getNextToken() {
        while (this.currentChar) {
            if (/\s/.test(this.currentChar)) {
                this.skipWhitespaces();
                continue;
            }

            if (this.currentChar === '{') {
                this.advance();
                return Token.create(OPEN_CURLY, '{')
            }

            if (this.currentChar === '}') {
                this.advance();
                return Token.create(CLOSE_CURLY, '}')
            }

            if (this.currentChar === '[') {
                this.advance();
                return Token.create(OPEN_BRACKET, '[');
            }

            if (this.currentChar === ']') {
                this.advance();
                return Token.create(CLOSE_BRACKET, ']');
            }

            if (this.currentChar === ':') {
                this.advance();
                return Token.create(COLON, ':');
            }

            if (this.currentChar === ',') {
                this.advance();
                return Token.create(COMMA, ',');
            }

            if (/\d/.test(this.currentChar)) {
                return Token.create(NUMBER, this.number());
            }

            if (/\"/.test(this.currentChar)) {
                return Token.create(STRING, this.string());
            }

            if (this.currentChar === 't' || this.currentChar === 'f') {
                return Token.create(BOOLEAN, this.boolean());
            }

            this.error();
        }

        return Token.create(EOF);
    }
}

module.exports = Lexer;

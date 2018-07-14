const assert = require('assert');

const Token = require('./token');

const {
    EOF,
    OPEN_CURLY,
    CLOSE_CURLY,
    OPEN_BRACKET,
    CLOSE_BRACKET,
    COLON,
    COMMA,
    STRING,
    NUMBER
} = Token.types;

class Parser {
    /**
     * @constructor
     * @param {Lexer} lexer
     */
    constructor(lexer) {
        assert.ok(lexer, 'Please specify lexer');
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }

    /**
     * Static fabric method
     * for instantiating Parser
     *
     * @returns {Parser}
     */
    static create(...args) {
        return new this(...args);
    }

    /**
     * Method helper for throwing Error
     * @throws {Error}
     */
    error() {
        throw new Error('Syntax error');
    }

    /**
     * "Eat" current token and check
     * if current type is expected
     *
     * @param {String} expectedType
     * @throws {Error}
     */
    eat(expectedType) {
        if (this.currentToken.type === expectedType) {
            this.currentToken = this.lexer.getNextToken();
        } else {
            this.error();
        }
    }

    /**
     * Checks if current token's type is STRING and
     * return it's value
     *
     * @returns {String}
     */
    string() {
        const str = this.currentToken.value.slice(1, -1);
        this.eat(STRING);
        return str;
    }

    /**
     * Handler for json object key
     *
     * @returns {String}
     */
    key() {
        return this.string();
    }

    /**
     * Checks if current token type is NUMBER
     * and return its value
     *
     * @returns {Number}
     */
    number() {
        const num = this.currentToken.value;
        this.eat(NUMBER);
        return num;
    }

    /**
     * Handler for json object value
     *
     * @returns {String|Object}
     */
    value() {
        if (this.currentToken.type === STRING) {
            return this.string();
        }

        if (this.currentToken.type === NUMBER) {
            return this.number();
        }

        if (this.currentToken.type === OPEN_CURLY) {
            return this.jsonObject();
        }

        if (this.currentToken.type === OPEN_BRACKET) {
            return this.jsonArray();
        }

        this.error();
    }


    /**
     * Handler for json array
     *
     * @returns {Array}
     */
    jsonArray() {
        const array = [];
        this.eat(OPEN_BRACKET);

        if (this.currentToken.type === STRING) {
            array.push(this.string());
            while (this.currentToken.type === COMMA) {
                this.eat(COMMA);
                array.push(this.string());
            }
        }

        this.eat(CLOSE_BRACKET);
        return array;
    }

    /**
     * Handler for json object
     *
     * @returns {Object}
     */
    jsonObject() {
        const result = {};
        this.eat(OPEN_CURLY);

        let keyVal = this.key();
        this.eat(COLON);
        let val = this.value();
        result[keyVal] = val;

        while(this.currentToken.type === COMMA) {
            this.eat(COMMA);
            keyVal = this.key();
            this.eat(COLON);
            val = this.value();
            result[keyVal] = val;
        }

        this.eat(CLOSE_CURLY);

        return result;
    }

    /**
     * Parse token stream from lexer
     * and return javascript json object
     *
     * @returns {Object}
     */
    parse() {
        if (this.currentToken.type === OPEN_BRACKET) {
            return this.jsonArray();
        } else if (this.currentToken.type === OPEN_CURLY) {
            return this.jsonObject();
        }
        this.error();
    }
}

module.exports = Parser;

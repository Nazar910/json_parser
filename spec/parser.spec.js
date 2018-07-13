const { expect } = require('chai');
const Lexer = require('../src/lexer');
const Parser = require('../src/parser');

describe('Parser', () => {
    describe('constructor', () => {
        describe('lexer is specified', () => {
            it('should return parser object', () => {
                const lexer = Lexer.create('some text');
                const parser = Parser.create(lexer);
                expect(parser).to.be.an.instanceOf(Parser)
            });
        });
    });
    describe('parse', () => {
        const data = require('./data/parser_samples.json');

        for (const test of data) {
            it(test.title, () => {
                const lexer = Lexer.create(test.sample);
                const parser = Parser.create(lexer);

                expect(parser.parse()).to.eql(test.expected_json);
            });
        }
    });
});

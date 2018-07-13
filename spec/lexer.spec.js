const { expect } = require('chai');
const Lexer = require('../src/lexer');

describe('Lexer', () => {
    describe('constructor', () => {
        describe('text is valid', () => {
            it('should return lexer object', () => {
                const lexer = Lexer.create('some text');
                expect(lexer).to.be.an.instanceOf(Lexer)
            });
        });
    });
    describe('getNextToken', () => {
        const data = require('./data/lexer_samples.json');

        for (const test of data) {
            it(test.title, () => {
                const lexer = Lexer.create(test.sample)

                for (const token of test.tokens) {
                    expect(lexer.getNextToken()).to.eql(token);
                }
            });
        }
    });
});

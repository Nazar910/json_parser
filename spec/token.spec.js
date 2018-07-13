const { expect } = require('chai');
const Token = require('../src/token');

describe('Token', () => {
    describe('valid fields', () => {
        it('shuold init token object with type and value', () => {
            const token = new Token('INTEGER', 1);
            expect(token.type).to.be.equal('INTEGER');
            expect(token.value).to.be.equal(1);
        });
    });
    describe('type is not valid', () => {
        it('should throw error', () => {
            expect(Token.create.bind(Token, undefined, 1))
                .to.throw(Error, 'You should specify type of token');
        });
    });
});

const Lexer = require('./lexer.js');
const Parser = require('./parser.js');

module.exports = function parse(jsonString) {
    const lexer = new Lexer(jsonString);
    const parser = new Parser(lexer);

    return parser.parse();
}

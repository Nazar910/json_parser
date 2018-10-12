# Json parser [![Build Status](https://travis-ci.com/Nazar910/json_parser.svg?branch=master)](https://travis-ci.com/Nazar910/json_parser)
*Descent recursive json parser (created for educational reasons, do not use it in production)*

## Getting started

In order to play with json_parser:

- install Node.js ([click here to see a way to install it on your system](https://nodejs.org/en/download/package-manager))
- clone json_parser with
```bash
git clone git@github.com:Nazar910/json_parser.git
```
- cd into location where you cloned json_parser
```bash
cd ~/Documents/examples/json_parser
```
- install dependencies
```bash
npm install
```
- run tests (optional)
```bash
npm test
```
- run following command, where flag `f` points to json file you need to parse
```bash
node src/runner.js -f /tmp/example.json
```
![Alt screen](https://user-images.githubusercontent.com/19594637/43678850-3309cfa8-9823-11e8-8231-416f94cabd34.png)

Also you can require it and use in your node.js code (I don't know for what reason but you can)
```js
const parse = require('./json_parser/src/index');
console.log(parse('{"foo":"bar"}'));
```

## Details

Inspired by a series of articles about interpeters at https://ruslanspivak.com ([click to see the first article about interpeters](https://ruslanspivak.com/lsbasi-part1/))

Json parser consists of two main parts: Lexer and Parser. Both of them work with Tokens.

### Token

Token is a atomic part of the grammar. In this example it may be type of `NUMBER` with value `5`. Generally it is a just an object that has type and value. See implementation [here](https://github.com/Nazar910/json_parser/blob/master/src/token.js).

### Lexer

Lexer component is implemented as class (see [src/lexer.js](https://github.com/Nazar910/json_parser/blob/master/src/lexer.js)). It gets a json string as his input, and provides a stream of tokens: for each call of `getNextToken()` you'll get new Token object, untill EOF.

### Parser

Parser is a component which validates token order and creates object from json string on the fly. As input it accepts lexer object. Method `parse` is the main method that returns object parsed from json string. See Parser implementation [here](https://github.com/Nazar910/json_parser/blob/master/src/parser.js).

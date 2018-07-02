// Enter your solution here
function validBraces(braces) {
  if (braces.length % 2 !== 0) {
    return false;
  }
  switch (braces) {
    case "()":
    case "[]":
    case "{}":
      return true;
  }
  const validCharacters = ["[", "]", "{", "}", "(", ")"];
  let expectedCharactersNext = [];
  let current;
  let validPosition;

  for (let i = 0; (current = braces[i]); i++) {
    validPosition = validCharacters.indexOf(current);

    if (validPosition === -1) {
      continue;
    }

    if (validPosition % 2 === 0) {
      // open braces are in even valid Positions
      expectedCharactersNext.push(validCharacters[validPosition + 1]); // I'm expecting the close correspondant brace to be the next odd positioned character
    } else {
      if (expectedCharactersNext.pop() !== validCharacters[validPosition]) {
        return false;
      }
    }
  }
  return !expectedCharactersNext.length;
}

let assert = require("chai").assert;
describe("Challenge", function() {
  it("should handle basic valid braces", function() {
    assert.equal(validBraces("()"), true);
    assert.equal(validBraces("[]"), true);
    assert.equal(validBraces("{}"), true);
  });
  it("should handle basic invalid braces", function() {
    assert.equal(validBraces("(}"), false);
    assert.equal(validBraces("[(])"), false);
    assert.equal(validBraces("(})"), false);
  });
  it("should handle longer valid braces", function() {
    assert.equal(validBraces("(){}[]"), true);
    assert.equal(validBraces("([{}])"), true);
  });
  it("should handle longer invalid braces", function() {
    assert.equal(validBraces(")(}{]["), false);
    assert.equal(validBraces("(((({{"), false);
  });
  it("should handle tricky valid braces", function() {
    assert.equal(validBraces("({})[({})]"), true);
    assert.equal(validBraces("(({{[[]]}}))"), true);
    assert.equal(validBraces("{}({})[]"), true);
  });
  it("should handle tricky invalid braces", function() {
    assert.equal(validBraces("())({}}{()][]["), false);
    assert.equal(validBraces("}}]]))}])"), false);
    assert.equal(validBraces("([[{{{}}}]]))}])"), false);
  });
});

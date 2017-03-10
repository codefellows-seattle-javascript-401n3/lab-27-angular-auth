let splitMe = function(str) {
  let pattern = `./*s${str.split('').join('.*')}.*`;
  return new RegExp(pattern);
};

//think of: not just uppercasing everything but also the first letter of the word

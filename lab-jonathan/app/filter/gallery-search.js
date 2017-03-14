'use strict';

module.exports = function() {
  return function(galleries, searchTerm) {
    let fuzzySearch = generateFuzzySearch(searchTerm);

    return galleries.filter(gallery => {
      return fuzzySearch.test(gallery.name.toUpperCase());
    });
  };
};

function generateFuzzySearch(input){
  if(!input) return /.*/
  let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
  return new RegExp(fuzzyString);
};

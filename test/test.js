var utils = require('../index.js');

describe('resolve5Arguments', function(){

  it('should resolve 5 arguments to same', function(done){
    var args = utils.resolve5Arguments();
    console.log(args);
  });

});
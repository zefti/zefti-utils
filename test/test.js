var utils = require('../index.js');
var type = utils.type;
var assert = require('assert');

describe('resolve5Arguments', function(){

  it('should resolve 0 arguments to 4 objects and function', function(done){
    var args = utils.resolve5Arguments([]);
    assert.equal(args.length, 5);
    assert.equal(type(args[0]), 'object');
    assert.equal(type(args[1]), 'object');
    assert.equal(type(args[2]), 'object');
    assert.equal(type(args[3]), 'object');
    assert.equal(type(args[4]), 'function');
    done()
  });

  it('should resolve 1 obj to 4 objects and function', function(done){
    var args = utils.resolve5Arguments([{}]);
    assert.equal(args.length, 5);
    assert.equal(type(args[0]), 'object');
    assert.equal(type(args[1]), 'object');
    assert.equal(type(args[2]), 'object');
    assert.equal(type(args[3]), 'object');
    assert.equal(type(args[4]), 'function');
    done()
  });

  it('should resolve 1 function to 4 objects and same function', function(done){
    var func = function(){
      return 7;
    };
    var args = utils.resolve5Arguments([func]);
    assert.equal(args.length, 5);
    assert.equal(type(args[0]), 'object');
    assert.equal(type(args[1]), 'object');
    assert.equal(type(args[2]), 'object');
    assert.equal(type(args[3]), 'object');
    assert.equal(type(args[4]), 'function');
    assert.equal(args[4](), 7);
    done();
  });

  it('should resolve 1 obj and 1 function to 4 objects and same function', function(done){
    var func = function(){
      return 7;
    };
    var args = utils.resolve5Arguments([{a:'b'}, func]);
    assert.equal(args.length, 5);
    assert.equal(type(args[0]), 'object');
    assert.equal(args[0].a, 'b');
    assert.equal(type(args[1]), 'object');
    assert.equal(type(args[2]), 'object');
    assert.equal(type(args[3]), 'object');
    assert.equal(type(args[4]), 'function');
    assert.equal(args[4](), 7);
    done();
  });

  it('should resolve 2 obj and 1 function to 4 objects and same function', function(done){
    var func = function(){
      return 7;
    };
    var args = utils.resolve5Arguments([{a:'b'}, {c:'d'}, func]);
    assert.equal(args.length, 5);
    assert.equal(type(args[0]), 'object');
    assert.equal(args[0].a, 'b');
    assert.equal(type(args[1]), 'object');
    assert.equal(args[1].c, 'd');
    assert.equal(type(args[2]), 'object');
    assert.equal(type(args[3]), 'object');
    assert.equal(type(args[4]), 'function');
    assert.equal(args[4](), 7);
    done();
  });

  it('should resolve 3 obj and 1 function to 4 objects and same function', function(done){
    var func = function(){
      return 7;
    };
    var args = utils.resolve5Arguments([{a:'b'}, {c:'d'}, {e:'f'}, func]);
    assert.equal(args.length, 5);
    assert.equal(type(args[0]), 'object');
    assert.equal(args[0].a, 'b');
    assert.equal(type(args[1]), 'object');
    assert.equal(args[1].c, 'd');
    assert.equal(type(args[2]), 'object');
    assert.equal(args[2].e, 'f');
    assert.equal(type(args[3]), 'object');
    assert.equal(type(args[4]), 'function');
    assert.equal(args[4](), 7);
    done();
  });

  it('should resolve 3 obj and 1 function to 4 objects and same function', function(done){
    var func = function(){
      return 7;
    };
    var args = utils.resolve5Arguments([{a:'b'}, {c:'d'}, {e:'f'}, {g:'h'}, func]);
    assert.equal(args.length, 5);
    assert.equal(type(args[0]), 'object');
    assert.equal(args[0].a, 'b');
    assert.equal(type(args[1]), 'object');
    assert.equal(args[1].c, 'd');
    assert.equal(type(args[2]), 'object');
    assert.equal(args[2].e, 'f');
    assert.equal(type(args[3]), 'object');
    assert.equal(args[3].g, 'h');
    assert.equal(type(args[4]), 'function');
    assert.equal(args[4](), 7);
    done();
  });

});


describe('resolve4Arguments', function(){

  it('should resolve 0 arguments to 3 objects and function', function(done){
    var args = utils.resolve4Arguments([]);
    assert.equal(args.length, 4);
    assert.equal(type(args[0]), 'object');
    assert.equal(type(args[1]), 'object');
    assert.equal(type(args[2]), 'object');
    assert.equal(type(args[3]), 'function');
    done()
  });

  it('should resolve 1 obj to 3 objects and function', function(done){
    var args = utils.resolve4Arguments([{}]);
    assert.equal(args.length, 4);
    assert.equal(type(args[0]), 'object');
    assert.equal(type(args[1]), 'object');
    assert.equal(type(args[2]), 'object');
    assert.equal(type(args[3]), 'function');
    done()
  });

  it('should resolve 1 function to 3 objects and same function', function(done){
    var func = function(){
      return 7;
    };
    var args = utils.resolve4Arguments([func]);
    assert.equal(args.length, 4);
    assert.equal(type(args[0]), 'object');
    assert.equal(type(args[1]), 'object');
    assert.equal(type(args[2]), 'object');
    assert.equal(type(args[3]), 'function');
    assert.equal(args[3](), 7);
    done();
  });

  it('should resolve 1 obj and 1 function to 3 objects and same function', function(done){
    var func = function(){
      return 7;
    };
    var args = utils.resolve4Arguments([{a:'b'}, func]);
    assert.equal(args.length, 4);
    assert.equal(type(args[0]), 'object');
    assert.equal(args[0].a, 'b');
    assert.equal(type(args[1]), 'object');
    assert.equal(type(args[2]), 'object');
    assert.equal(type(args[3]), 'function');
    assert.equal(args[3](), 7);
    done();
  });

  it('should resolve 2 obj and 1 function to 3 objects and same function', function(done){
    var func = function(){
      return 7;
    };
    var args = utils.resolve4Arguments([{a:'b'}, {c:'d'}, func]);
    assert.equal(args.length, 4);
    assert.equal(type(args[0]), 'object');
    assert.equal(args[0].a, 'b');
    assert.equal(type(args[1]), 'object');
    assert.equal(args[1].c, 'd');
    assert.equal(type(args[2]), 'object');
    assert.equal(type(args[3]), 'function');
    assert.equal(args[3](), 7);
    done();
  });

  it('should resolve 3 obj and 1 function to 3 objects and same function', function(done){
    var func = function(){
      return 7;
    };
    var args = utils.resolve4Arguments([{a:'b'}, {c:'d'}, {e:'f'}, func]);
    assert.equal(args.length, 4);
    assert.equal(type(args[0]), 'object');
    assert.equal(args[0].a, 'b');
    assert.equal(type(args[1]), 'object');
    assert.equal(args[1].c, 'd');
    assert.equal(type(args[2]), 'object');
    assert.equal(args[2].e, 'f');
    assert.equal(type(args[3]), 'function');
    assert.equal(args[3](), 7);
    done();
  });

  it('should resolve 1 string and 1 function to 1 string, 2 objects and a function', function(done){
    var func = function(){
      return 7;
    };
    var args = utils.resolve4Arguments(['foo', func]);
    assert.equal(args.length, 4);
    assert.equal(type(args[0]), 'string');
    assert.equal(args[0], 'foo');
    assert.equal(type(args[1]), 'object');
    assert.equal(type(args[2]), 'object');
    assert.equal(type(args[3]), 'function');
    assert.equal(args[3](), 7);
    done();
  })

});

describe('resolve3Arguments', function(){

  it('should resolve 0 arguments to 2 objects and function', function(done){
    var args = utils.resolve3Arguments([]);
    assert.equal(args.length, 3);
    assert.equal(type(args[0]), 'object');
    assert.equal(type(args[1]), 'object');
    assert.equal(type(args[2]), 'function');
    done()
  });

  it('should resolve 1 obj to 2 objects and function', function(done){
    var args = utils.resolve3Arguments([{}]);
    assert.equal(args.length, 3);
    assert.equal(type(args[0]), 'object');
    assert.equal(type(args[1]), 'object');
    assert.equal(type(args[2]), 'function');
    done()
  });

  it('should resolve 1 function to 2 objects and same function', function(done){
    var func = function(){
      return 7;
    };
    var args = utils.resolve3Arguments([func]);
    assert.equal(args.length, 3);
    assert.equal(type(args[0]), 'object');
    assert.equal(type(args[1]), 'object');
    assert.equal(type(args[2]), 'function');
    assert.equal(args[2](), 7);
    done();
  });

  it('should resolve 1 obj and 1 function to 2 objects and same function', function(done){
    var func = function(){
      return 7;
    };
    var args = utils.resolve3Arguments([{a:'b'}, func]);
    assert.equal(args.length, 3);
    assert.equal(type(args[0]), 'object');
    assert.equal(args[0].a, 'b');
    assert.equal(type(args[1]), 'object');
    assert.equal(type(args[2]), 'function');
    assert.equal(args[2](), 7);
    done();
  });

  it('should resolve 2 obj and 1 function to 2 objects and same function', function(done){
    var func = function(){
      return 7;
    };
    var args = utils.resolve3Arguments([{a:'b'}, {c:'d'}, func]);
    assert.equal(args.length, 3);
    assert.equal(type(args[0]), 'object');
    assert.equal(args[0].a, 'b');
    assert.equal(type(args[1]), 'object');
    assert.equal(args[1].c, 'd');
    assert.equal(type(args[2]), 'function');
    assert.equal(args[2](), 7);
    done();
  });

});

describe('resolve2Arguments', function(){

  it('should resolve 0 arguments to 1 object and function', function(done){
    var args = utils.resolve2Arguments([]);
    assert.equal(args.length, 2);
    assert.equal(type(args[0]), 'object');
    assert.equal(type(args[1]), 'function');
    done()
  });

  it('should resolve 1 obj to 1 object and function', function(done){
    var args = utils.resolve2Arguments([{}]);
    assert.equal(args.length, 2);
    assert.equal(type(args[0]), 'object');
    assert.equal(type(args[1]), 'function');
    done()
  });

  it('should resolve 1 function to 1 object and same function', function(done){
    var func = function(){
      return 7;
    };
    var args = utils.resolve2Arguments([func]);
    assert.equal(args.length, 2);
    assert.equal(type(args[0]), 'object');
    assert.equal(type(args[1]), 'function');
    assert.equal(args[1](), 7);
    done();
  });

  it('should resolve 1 obj and 1 function to 1 object and same function', function(done){
    var func = function(){
      return 7;
    };
    var args = utils.resolve2Arguments([{a:'b'}, func]);
    assert.equal(args.length, 2);
    assert.equal(type(args[0]), 'object');
    assert.equal(args[0].a, 'b');
    assert.equal(type(args[1]), 'function');
    assert.equal(args[1](), 7);
    done();
  });

});

describe('isEmpty', function(){

  it('should return true for empty object', function(done){
    assert.equal(utils.isEmpty({}), true);
    done();
  });

  it('should return false for non-empty object', function(done){
    assert.equal(utils.isEmpty({a:'b'}), false);
    done();
  });

});

//TODO: all other util methods
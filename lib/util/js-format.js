var vm = require('vm');

module.exports = {

  stringify: function(obj) {
    return "module.exports = " + JSON.stringify(obj, null, 2) + ";"
  },

  parse: function(str) {
    var sandbox = {
      module: {},
      exports: {}
    };

    try {
      vm.runInNewContext(str, sandbox);
    } catch(err) {
      console.error(error.stack);
      throw err;
    }
    return sandbox.module.exports || sandbox.exports;
  }

};
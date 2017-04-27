/* Modelo para Collection */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

module.exports = function() {

  var usuarioSchema = mongoose.Schema({
    nome: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      index: true
    },
    site: {
      type: String,
      trim: true
    },
    password: {
      type: String
    },
    data_cad: {
      type: Date,
      default: Date.now
    }
  });

  usuarioSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  /*usuarioSchema.methods.validPassword = function(password, old_password) {
    return bcrypt.compareSync(password, old_password, null);
  }*/
  /*
  usuarioSchema.methods.validPassword = function(password) {
    if (password === this.password) {
      return true;
    } else {
      return false;
    }
  }*/
  /*
    usuarioSchema.methods.validPassword = function(password) {
      return bcrypt.compareSync(password, this.password)
    }*/
  /*usuarioSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
  }*/

  return mongoose.model('Usuarios', usuarioSchema);

}

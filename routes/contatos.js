var autenticar = require('../middleware/autenticar.js');

module.exports = function(app) {

  var contato = app.controllers.contatos;

  app.route('/contatos/:id').get(autenticar, contato.index);
  app.route('/contatos/create/:id')
    .get(autenticar, contato.create)
    .post(contato.post);

}
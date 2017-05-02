module.exports = function(app) {

    var contato = app.controllers.contatos;
    var autenticar = require('../middleware/autenticar.js');

    app.route('/contatos/:id').get(autenticar, contato.index);
    app.route('/contatos/create/:id')
        .get(autenticar, contato.create)
        .post(contato.post);

    app.route('/contatos/delete/:id/:amigo').post(contato.excluir);

}

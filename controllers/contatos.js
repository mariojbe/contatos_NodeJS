var validacao = require('../validacoes/contatos');

module.exports = function(app) {

    var Amigo = app.models.amigos;

    var ContatoController = {

        index: function(req, res) {
            var _id = req.params.id;
            Amigo.findById(_id, function(err, dados) {
                if (err) {
                    req.flash('erro', 'Erro ao buscar contatos: ' + err);
                    res.render('contatos/index', {
                        lista: null
                    });
                }
                res.render('contatos/index', {
                    lista: dados.contatos,
                    id: _id
                });
            });
        },

        create: function(req, res) {
            res.render('contatos/create', {
                model: new Amigo(),
                id: req.params.id
            });
        },

        post: function(req, res) {
            var _id = req.params.id;
            Amigo.findById(_id, function(err, dados) {
                var contato = req.body.contatos;
                dados.contatos.push(contato);
                dados.save(function(err) {
                    if (err) {
                        req.flash('erro', 'Erro ao cadastrar contato: ' + err);
                    }
                    res.redirect('/contatos/' + _id);
                });
            });
        }

    }

    return ContatoController;

}

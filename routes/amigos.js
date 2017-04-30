module.exports = function(app){

  var amigo    = app.controllers.amigos;

  app.route('/amigos').get(amigo.index);

  app.route('/amigos/create')
      .get(amigo.create)
      .post(amigo.salvar);

  app.route('/amigos/show/:id').get(amigo.show);
  app.route('/amigos/delete/:id').post(amigo.excluir);

  app.route('/amigos/edit/:id')
      .get(amigo.editar)
      .post(amigo.update);

}

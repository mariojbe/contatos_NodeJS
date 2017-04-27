module.exports = function(req, res) {

  req.assert('nome', 'Informe seu nome.').notEmpty();

  if (req.body.email != '') {
    req.assert('email', 'O E-mail informado é inválido! Preencha no padrão email@email.com').isEmail();
  }

  var validacoesErros = req.validationErrors() || [];

  if (validacoesErros.length > 0) {
    validacoesErros.forEach(function(e) {
      req.flash('erro', e.msg);
    });
    return false;
  }
  return true;

}

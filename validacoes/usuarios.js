var url = require('url');

module.exports = function(req, res){
  var createUrl = url.parse(req.url).pathname == "/usuarios/create";
  var updateUrl = !createUrl;

  req.assert('nome', 'Favor, preencha o campo nome.').notEmpty();
  if(createUrl){
    req.assert('email', 'O E-mail informado é inválido! Preencha no padrão email@email.com').isEmail();
    req.assert('password', 'A sua senha deve conter de 6 a 10 caracteres.').len(6,10);
  }
  req.assert('site', 'O site informado não é uma url válida. Preencha no padrão url.com').isURL();

  var validateErros = req.validationErrors() || [];

  /* Verificar se a senha confere*/
  if(req.body.password != req.body.password_confirmar){
    validateErros.push({msg: 'Confirmar Senha deve ser idêntico ao campo senha.'});
  }

  if(validateErros.length > 0){
    validateErros.forEach(function(e){
      req.flash('erro', e.msg);
    });
    return false;
  }else{
    return true;
  }

}

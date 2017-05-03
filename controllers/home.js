var nodemailer = require('nodemailer');

module.exports = function(app) {

  var Usuario = app.models.usuarios;
  var validacao = require('../validacoes/autenticacao');

  var HomeController = {
    index: function(req, res) {
      res.render('home/index');
    },

    login: function(req, res) {
      res.render('home/login');
    },

    autenticacao: function(req, res) {
      var usuario = new Usuario();
      var email = req.body.email;
      var password = req.body.password;

      if (validacao(req, res)) {
        Usuario.findOne({
          'email': email
        }, function(err, data) {
          if (err) {
            req.flash('erro', 'Erro ao entrar no sistema: ' + err);
            res.redirect('/');
          } else if (!data) {
            req.flash('erro', 'E-mail não encontrado!');
            res.redirect('/');
          }
          /*else if (!usuario.validPassword(password, data.password)) {
                     req.flash('erro', 'E-mail ou senha inválidos!');
                     res.redirect('/');
                   }*/
          else {
            req.session.usuario = data;
            res.redirect('/home');
          }
        });
      } else {
        res.redirect('/');
      }
    },

    logout: function(req, res) {
      req.session.destroy();
      res.redirect('/');
    },

    email: function(req, res) {
      res.render('home/email');
    },

    enviar: function(req, res) {
      /*
      var transport = nodemailer.createTransport("SMTP", {
        host: "smtp.abmnet.org.br",
        port: 587,
        auth: {
          user: 'contato@abmnet.org.br',
          pass: 'abm40170'
        }
      });
      */
      var transport = nodemailer.createTransport({
        host: 'smtp.abmnet.org.br',
        port: '587',
        secure: false,
        auth: {
          user: 'abm.contato@abmnet.org.br',
          pass: 'abm40170'
          //user: 'mario@abmnet.org.br',
          //pass: '@16marioe'
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      var mailOptions = {
        from: req.body.nome + "<" + req.body.email + ">",
        to: "abm.contato@abmnet.org.br",
        //to: "mario@abmnet.org.br",
        subject: req.body.assunto,
        text: req.body.mensagem
      }

      transport.sendMail(mailOptions, function(err, response) {
        if (err) {
          req.flash('erro', 'Erro ao enviar e-mail: ' + err);
          res.redirect('/email');
        } else {
          req.flash('info', 'E-mail enviado com sucesso!');
          res.redirect('/email');
        }
      });
    }

  }
  return HomeController;

}

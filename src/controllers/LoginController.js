
//En este archivo estan todas las funciones utilizadas en el programa.

//Función encargada de renderizar la hbs de index/login
function login(req, res) {

        res.render('login/index');
    } 

//Función encargada de realizar el login.
function auth(req, res) {
    const data = req.body;
  
    if (req.session.loggedin) {
      res.redirect('/');
      return;
    } 

    //Aqui se recuperan los datos de la base de datos a traves del nombre de usuario
    //escrito en el input de la pagina login.
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM usuarios WHERE nombre = ?', [data.nombre], (err, userdata) => {
        //En caos de que se encuentre algo, se entra en el if
        if (userdata.length > 0) {
          const element = userdata[0];
          //Se comparan la contraseña guardada en la base de datos con la contraseña introducida en el input de la pagina
          if (data.clave === element.clave) {
           //req.session.loggedin = true;
            req.session.name = element.nombre;
            res.redirect('/');
          } else {
            res.render('login/index', { error: 'La contraseña es incorrecta' });
          }
        } else {
          res.render('login/register', { error: 'El nombre de usuario no existe' });
        }
      })
    })
  } 

  //Función encargada de renderizar la hbs de register
  function register(req, res) {
    if (req.session.loggedin) {
      res.redirect('/');
      return;
    }
    res.render('login/register');
  }

  //Función que realiza el registro de usuarios.
function storeUser(req, res) {
    const data = req.body;

    const dedicaStr = data.dedicaEmpresa.join(',');
    data.dedicaEmpresa = dedicaStr;

     
    const pagoStr = data.pago.join(',');
    data.pago = pagoStr;
    
    req.getConnection((err, conn) => {
        //Se busca si existe un nombre de usuario registrado en la base de datos
        //que sea igual al introducido en el input de registrar usuario.
        conn.query('SELECT * FROM registros WHERE nombreLegal = ? AND correo = ?', [data.nombreLegal, data.correo], (err, userdata)  => {
            
          //Se revisa si existe respuesta por parte de la base de datos
            if(userdata.length > 0) {
          
                res.render('login/register', { error: 'Persona ya registrada'});
            } else {
              //Se realiza el registro del usuario.
                req.getConnection((err, conn) => {
                conn.query('INSERT INTO registros SET ?', [data], (err, rows) => {

                //req.session.loggedin = true;
                req.session.name = "Gracias " + data.nombrePrefe;
     
          
            res.redirect('/');
        });
    });
            }
        });
    });
    console.log(data)
}

//Funcion que se encarga de realizar el logout o cerrar la sesión
function logout(req, res) {
  
    res.redirect('/register'); 
}

//Aqui se exportan todas las funciones realizadas para ser utilizadas por login.js
module.exports = {
    login,
    register,
    storeUser,
    auth,
   logout,
}
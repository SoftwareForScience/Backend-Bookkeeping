// /*
//  * @Author: Frederick van der Meulen
//  * @Date:   2018-04-24 09:20:44
//  * @Last Modified by:   Frederick van der Meulen
//  * @Last Modified time: 2018-06-11 13:41:47
//  */
// (() => {
//   'use strict';
//   const Database = require('./../database/database.js').Database;
//   const database = Database.getInstance();
//   const {JwtToken, Log} = require('@aliceo2/web-ui');
//   const Config = require('./../configuration_files/Config.js').Config;
//   const config = Config.getInstance();
//   const jwt = new JwtToken(config.getJsonWebTokenConfiguration());

//   /**
//    * The user model class
//    */
//   class User {
//     /**
//      * The constructor of the user model
//      * @param  {request} req The given request
//      */
//     constructor(req) {
//       this.req = req;
//     }

//     /**
//      * The autentication method for the users. TODO: Implement SAMS
//      * @param  {return} callback Returns the JWToken
//      * @return {JWToken} The JSONWebToken
//      */
//     postUserAuthentication(callback) {
//       let result = undefined;
//       const userAuthenticationQuery = 'SELECT user FROM users.users WHERE email = $1';
//       const userAuthenticationQueryValues = [this.req.body.email];
//       return new Promise((resolve, reject) => {
//         if (this.req.body.email == undefined ||
//           this.req.body.password == undefined) {
//           reject(['No email address or password is filled in. Please try again.', 403]);
//         }

//         database.getClient().query(userAuthenticationQuery,
//           userAuthenticationQueryValues).then((res) => {
//           result = res.rows;
//           if (result[0].password == undefined) {
//             reject(['The password or emailaddress could not be found. Please try again.', 403]);
//           }
//           argon2.verify(result[0].password, this.req.body.password).then((match) => {
//             if (match) {
//               const token = jwt.generateToken(res.id, res.name);
//               callback(token);
//               resolve(token);
//             } else {
//               reject(['The password or emailaddress could not be found. Please try again', 403]);
//             }
//           }).catch((err) => {
//             Log.error('Internal failure. Cause: ' + err);
//             reject('Internal failure. Cause: ' + err, 500);
//           });
//         }).catch((err) => {
//           Log.error('Internal failure. Cause: ' + err);
//           reject('Internal failure. Cause: ' + err, 500);
//         });
//       });
//     }
//   }
//   module.exports = {User};
// })();

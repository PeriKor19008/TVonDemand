const  config = {
  user:  'root', // sql user
  password:  'peri1908', //sql user password
  server:  '127.0.0.1', // if it does not work try- localhost
  database:  'tvondemand',
  dialect: 'mysql',

  options: {
    trustedconnection:  true,
    enableArithAbort:  true,
    instancename:  'SQLEXPRESS'  // SQL Server instance name
  },
  port:  3306
}

module.exports = config;

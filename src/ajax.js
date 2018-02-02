const request = require('request');
const iconv = require('iconv-lite');

module.exports.ajax = function(obj) {
  return new Promise((resolve, reject) => {
    request(obj, function (err, reponse, body) {
      if (err) {
        reject();
        return;
      }
      
    });
  });
}

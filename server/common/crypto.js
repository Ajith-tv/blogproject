const crypto = require('crypto-js')


function encrypt(data,key){

  if(data==''||key ==''|| typeof(key)!='string')return 'error';

        return   crypto.AES.encrypt(data,key).toString()

}
 
function decrypt(data,key){
    if(data==''||key ==''|| typeof(key)!='string')return 'error';

    return crypto.AES.decrypt(data,key).toString(crypto.enc.Utf8)
}


module.exports={encrypt,decrypt}


const axios = require('axios');

axios.get('http://m.sbkk88.com/yuwenkewen/', {
  responseType: 'arraybuffer'
}).then((res) => {
  console.log(res.data);
}).catch((err) =>{
  console.log(err);
})
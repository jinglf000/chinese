/**
 * 配合async await 使程序等待指定的时间
 * @param {Number} time 毫秒
 * @returns {Promise}
 */
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}


module.exports.sleep = sleep;
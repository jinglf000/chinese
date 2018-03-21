/**
 * 写入数据库
 * @author jinglf000
 * ###### Sun Feb 11 14:39:45 CST 2018
 */

const article = require('./articleDao');
const data = require('./article.json');
const utils = require('./utils');

for (let i = 0; i < data.length; i++) {
  const current = data[i];
  const yearid = current.id;
  const year = new article.Year({
    title: current.title,
    id: current.id,
    url: current.url
  });
  // 对year进行保存
  year
    .save()
    .then(res => {
      utils.logSuccess(yearid);
    })
    .catch(err => {
      utils.logError(yearid);
    });
  for (let j = 0, len = current.list.length; j < len; j++) {
    console.log(`${i}-${j}`);
    const curArticle = current.list[j];
    const articleCon = new article.Article({
      title: curArticle.title,
      id: curArticle.id,
      url: curArticle.url,
      text: curArticle.text,
      type: yearid
    });
    articleCon
      .save()
      .then(res => {
        utils.logSuccess(curArticle.id);
      })
      .catch(err => {
        utils.logError(curArticle.id);
      });
  }
}

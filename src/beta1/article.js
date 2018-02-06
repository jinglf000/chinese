/* 
 * 定义文章类
 * 
 */

/**
 * 文章上下册学年分类
 */
class ArticlYear {
  /**
   * 文章册
   * @param {String} title 标题
   * @param {String} url url地址
   * @param {Array} list 文章列表
   */
  constructor(title, url, list = []) {
    this.title = title;
    this.url = url;
    this.list = list;
  }
}

/**
 * 文章内容类
 */
class Artical {
  /**
   * 文章内容
   * @param {Stirng} title 文章标题
   * @param {String} url 文章url地址
   * @param {String} text 文章正文
   */
  constructor(title, url, text) {
    this.title = title;
    this.url = url;
    this.text = text;
  }
}

module.exports.ArticlYear = ArticlYear;
module.exports.Artical = Artical;

/**
 * 控制层
 * @author jinglf000
 * ###### Sun Feb 11 16:21:54 CST 2018
 */
const dao = require('../dao');

module.exports.getYearlist = () => dao.findYearList();

module.exports.getYearArts = (type) => dao.findYearArts(type);

module.exports.getArtsDetail = (id) => dao.getArtsDetail(id);

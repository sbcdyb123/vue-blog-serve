import { PaginateValidator } from './common';
import { isOptional } from '../lib/util';

const { LinValidator, Rule, checkDateFormat } = require('lin-mizar');

class CreateOrUpdateArticleValidator extends LinValidator {
  constructor () {
    super();
    this.title = new Rule('isNotEmpty', '必须传入标题');
    this.summary = new Rule('isNotEmpty', '必须传入简介');
    this.banner = new Rule('isNotEmpty', '必须传入首图');
    this.author = new Rule('isNotEmpty', '必须传入作者');
    this.content = new Rule('isNotEmpty', '必须传入简介');
    this.status = new Rule('isNotEmpty', '必须传入状态');
    this.label = new Rule('isNotEmpty', '必须传入标签');
  }
}
class GetArticleListValidator extends PaginateValidator {
  constructor () {
    super();
    this.title = new Rule('isOptional');
  }
  validateStart (data) {
    const start = data.query.start;
    // 如果 start 为可选
    if (isOptional(start)) {
      return true;
    }
    const ok = checkDateFormat(start);
    if (ok) {
      return ok;
    } else {
      return [false, '请输入正确格式开始时间', 'start'];
    }
  }

  validateEnd (data) {
    if (!data.query) {
      return true;
    }
    const end = data.query.end;
    if (isOptional(end)) {
      return true;
    }
    const ok = checkDateFormat(end);
    if (ok) {
      return ok;
    } else {
      return [false, '请输入正确格式结束时间', 'end'];
    }
  }
}
export { CreateOrUpdateArticleValidator, GetArticleListValidator };
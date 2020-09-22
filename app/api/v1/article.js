
import {
  PositiveIdValidator
} from '../../validator/common';
const {
  LinRouter
} = require('lin-mizar');
const {
  ArticleDao
} = require('../../dao/article');

const articleApi = new LinRouter({
  prefix: '/v1/article',
  module: '文章'
});

const articleDto = new ArticleDao();

articleApi.linGet(
  'getArticleById',
  '/getArticleById/:id',
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    const artice = await articleDto.getArticleById(id);
    ctx.json(artice);
  }
);
export {
  articleApi
};
import {
  loginRequired
} from '../../middleware/jwt';
import {
  PositiveIdValidator
} from '../../validator/common';
const {
  LinRouter
} = require('lin-mizar');
const {
  ArticleDao
} = require('../../dao/article');
const {
  CreateOrUpdateArticleValidator, GetArticleListValidator
} = require('../../validator/article');

const articleApi = new LinRouter({
  prefix: '/cms/article',
  module: '文章'
});

const articleDto = new ArticleDao();

articleApi.linPost(
  'createArticle',
  '/create',
  articleApi.permission('创建文章'),
  loginRequired,
  async ctx => {
    const v = await new CreateOrUpdateArticleValidator().validate(ctx);
    await articleDto.createArticle(v);
    ctx.success({
      code: 16
    });
  });
articleApi.linDelete(
  'deleteArticle',
  '/delete/:id',
  articleApi.permission('删除文章'),
  loginRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await articleDto.deleteArticle(id);
    ctx.success({
      code: 17
    });
  }
);
articleApi.linPut(
  'updateArticle',
  '/edit/:id',
  articleApi.permission('修改文章'),
  loginRequired,
  async ctx => {
    const v = await new CreateOrUpdateArticleValidator().validate(ctx);
    const id = v.get('path.id');
    await articleDto.updateArticle(v, id);
    ctx.success({
      code: 18
    });
  }
);
articleApi.linGet(
  'getArticleById',
  '/getArticleById/:id',
  loginRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    const artice = await articleDto.getArticleById(id);
    ctx.json(artice);
  }
);
articleApi.linGet(
  'getArticleList',
  '/getArticleList',
  loginRequired,
  async ctx => {
    const v = await new GetArticleListValidator().validate(ctx);
    const { rows, total } = await articleDto.getArticleList(v);
    ctx.json({
      items: rows,
      total,
      count: v.get('query.count'),
      page: v.get('query.page')
    });
  }
);
export {
  articleApi
};
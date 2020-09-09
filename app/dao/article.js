import { Forbidden, NotFound } from 'lin-mizar';
import Sequelize from 'sequelize';
import { Article } from '../model/article';
import { set } from 'lodash';
class ArticleDao {
  async createArticle (v) {
    const article = await Article.findOne({
      where: {
        title: v.get('body.title')
      }
    });
    if (article) {
      throw new Forbidden({
        code: 10260
      });
    }
    const art = new Article();

    art.title = v.get('body.title');
    art.summary = v.get('body.summary');
    art.banner = v.get('body.banner');
    art.author = v.get('body.author');
    art.content = v.get('body.content');
    art.status = v.get('body.status');
    art.label = v.get('body.label');
    await art.save();
  }
  async deleteArticle (id) {
    const art = await Article.findOne({
      where: {
        id
      }
    });
    if (!art) {
      throw new NotFound({
        code: 10261
      });
    }
    art.destroy();
  }
  async updateArticle (v, id) {
    const art = await Article.findOne({
      where: {
        id
      }
    });
    if (!art) {
      throw new NotFound({
        code: 10261
      });
    }
    art.title = v.get('body.title');
    art.summary = v.get('body.summary');
    art.banner = v.get('body.banner');
    art.author = v.get('body.author');
    art.content = v.get('body.content');
    art.status = v.get('body.status');
    art.label = v.get('body.label');
    await art.save();
  }
  async getArticleById (id) {
    const art = Article.findOne({
      where: {
        id
      }
    });
    if (!art) {
      throw new NotFound({
        code: 10261
      });
    }
    return art;
  }
  async getArticleList (v) {
    const page = v.get('query.page');
    const count1 = v.get('query.count');
    const condition = {};
    v.get('query.start') &&
      v.get('query.end') &&
      set(condition, 'create_time', {
        [Sequelize.Op.between]: [v.get('query.start'), v.get('query.end')]
      });
    const { rows, count } = await Article.findAndCountAll({
      where: Object.assign({}, condition, {
        title: {
          [Sequelize.Op.like]: `%${v.get('query.title', false, '')}%`
        }
      }),
      offset: page * count1,
      limit: count1,
      order: [['create_time', 'DESC']]
    });
    return {
      rows,
      total: count
    };
  }
}
export { ArticleDao };
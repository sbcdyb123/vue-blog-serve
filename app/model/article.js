import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Article extends Model {
  toJSON () {
    const json = {
      id: this.id,
      title: this.title,
      summary: this.summary,
      banner: this.banner,
      author: this.author,
      content: this.content,
      like_count: this.like_count,
      pageviews: this.pageviews,
      status: this.status,
      label: this.label,
      create_time: this.create_time,
      update_time: this.update_time
    };
    return json;
  }
}

Article.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    summary: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    banner: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    author: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    like_count: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    pageviews: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    label: {
      type: Sequelize.STRING(100),
      allowNull: true
    }
  },
  merge(
    {
      sequelize,
      tableName: 'article',
      modelName: 'article'
    },
    InfoCrudMixin.options
  )
);
export { Article };
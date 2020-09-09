import '../initial';
import sequelize from '../../../app/lib/db';
import { UserModel } from '../../../app/model/user';
import { GroupModel } from '../../../app/model/group';
import { UserGroupModel } from '../../../app/model/user-group';

const run = async () => {
  // 查找需要关联的权限组 id
  const group = await GroupModel.findOne({
    where: {
      name: '普通分组'
    }
  });

  // 查找 pedro 用户的 id 用去关联权限组
  const user = await UserModel.findOne({
    where: {
      username: 'pedro'
    }
  });

  // 关联用户和权限组
  await UserGroupModel.create({
    user_id: user.id,
    group_id: group.id
  });

  setTimeout(() => {
    sequelize.close();
  }, 500);
};

run();

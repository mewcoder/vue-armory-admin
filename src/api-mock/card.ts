import Mock from 'mockjs';
import { success, pagination } from '@/utils/mock';

Mock.mock('/card/getList', getList);

const random = Mock.Random;

function getList({ body }: any) {
  const req = JSON.parse(body);
  const list: any = [];
  for (let i = 0; i < 200; i++) {
    list.push({
      id: random.integer(),
      title: random.ctitle(),
      description: random.csentence(),
      img: random.dataImage('100x100', i + 1 + '')
    });
  }
  const pageList = pagination(list, req.pageNo, req.pageSize);
  return success(pageList);
}

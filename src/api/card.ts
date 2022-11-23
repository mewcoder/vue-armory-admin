import http from './http';

export function getCardList(data: any) {
  return http.post('/card/getList', data);
}

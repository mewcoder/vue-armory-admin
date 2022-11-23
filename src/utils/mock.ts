export const success = (data: unknown, msg?: string) => {
  return {
    data,
    msg: msg || 'success',
    code: 200
  };
};

export function pagination(list: [], pageNo: number, pageSize: number) {
  const offset = (pageNo - 1) * pageSize;
  const res =
    offset + pageSize >= list.length
      ? list.slice(offset, list.length)
      : list.slice(offset, offset + pageSize);

  return {
    pageNo,
    pageSize,
    total: list.length,
    list: res
  };
}

export const fail = (msg: string) => {
  return {
    data: null,
    msg,
    code: 500
  };
};

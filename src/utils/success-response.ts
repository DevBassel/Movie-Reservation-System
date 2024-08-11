export function SuccessRes<T>(data: T, code: number = 200) {
  return {
    status: 'success',
    code,
    data,
  };
}

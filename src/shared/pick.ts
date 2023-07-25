const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Partial<T> => {
  const finalObject: Partial<T> = {};
  //req.query,                paginationFields
  // .             ['page', 'limit', 'sortBy', 'sortOrder']
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObject[key] = obj[key];

      /*const finalObject = {
         page=
         limit=
         sortBy=
         sortOrder=

        (finalObject[key])

exmpll: page: req.body.page,
.             obj        key

      }; */
    }
  }
  return finalObject;
};
export default pick;

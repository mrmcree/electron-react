/**
 * Created by 1 on 2019/12/15 21:22
 */
export const flattenArr = (arr) => {
    return arr.reduce((map, item) => {
        map[item.id] = item;
        return map
    }, {})
};

export const objToArr = (obj) => {
    return Object.keys(obj).map(key => obj[key])
};
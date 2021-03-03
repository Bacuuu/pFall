// 列数
let colNum = 0;
// 每列高度总和
let colsHeight = null;
// 每列的真实数据储存, [[{ }], [{ }], [{ }]]
let cols = null;

/**
 * 数组中最小值的index，多个取第一个
 * @param {Array} list
 */
function findMinIndex(list) {
  if (list.length === 0) {
    return 0;
  }
  const min = Math.min(...list);
  return list.indexOf(min);
}

/**
 * 增加数据
 * @param {Object} data 数据
 */
function colInsert(data) {
  // 对data进行校验
  if (!data.width || !data.height) {
    console.warn(`${data.imgSrc}缺失宽高数据`);
    return;
  }
  // 需要进行插入的index
  const index = findMinIndex(colsHeight);
  console.log(index);
  // 进行插值操作
  if (whCheck(data)) {
    cols[index].push(data);
    colsHeight[index] += data.vHeight;
  } else {
    cols[index].push(data);
    colsHeight[index] += data.height;
  }
}

/**
 * 对图片进行高宽的校验，用于进行实际宽高的计算统计
 * 因为宽度是一定的，所以如果width/height过小，则图片会过长，进行设定最大长度
 * @param {Object} data 图片数据
 * @return {Boolean} 是否进行vHeight的注入
 */
function whCheck(data) {
  const { width, height } = data;
  if (height / width > 2) {
    data.vHeight = 200;
    return true;
  }
  return false;
}

/**
 * 对列数进行更改
 * @param {Number} e 改变后的列数
 */
function colNumChangeTo(e) {
  if (e === colNum) {
    return;
  }
  colNum = e;
  colsHeight = new Array(colNum).fill(0);
  cols = new Array(0);
  for (let i = 0; i < colNum; i++) {
    cols.push(new Array(0));
  }
}

/**
 * 获取数据储存
 */
function getColData() {
  return cols;
}

export { colInsert, colNumChangeTo, getColData };

// 列数
let colNum = 0;
// 每列高度总和
let colsHeight = null;
// 每列的真实数据储存, [[{ }], [{ }], [{ }]]
let cols = null;
// 当前视图的宽度，用于计算大致的vheiight对应高度
let viewWidth = 0

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
  // 进行插值操作
  if (whCheck(data)) {
    cols[index].push(data);
    colsHeight[index] += data.vHeight;
  } else {
    cols[index].push(data);
    // 这里对vheight进行换算
    // 先拿到大致的每列宽度
    const width = viewWidth / colNum
    // 图片width / 图片height == 列width / height（非vHeight是auto）
    const _height = width / (data.width / data.height)
    colsHeight[index] += _height;
    // colsHeight[index] += data.height;
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
  viewWidth = document.body.offsetWidth
  const data = getColData()
  colNum = e;
  colsHeight = new Array(colNum).fill(0);
  cols = new Array(0);
  for (let i = 0; i < colNum; i++) {
    cols.push(new Array(0));
  }
  // 对已经有的数据进行换算而不是重新请求
  data && computeByBefore(smoothArray(data))
}

/**
 * 获取数据储存
 */
function getColData() {
  return cols;
}

function computeByBefore (list) {
  list.forEach(i => {
    // 需要进行插入的index
    const index = findMinIndex(colsHeight);
    // 进行插值操作
    if (i.vHeight) {
      cols[index].push(i);
      colsHeight[index] += i.vHeight;
    } else if (i.height) {
      cols[index].push(i);
      // 这里对height进行换算
      // 先拿到大致的每列宽度
      const width = viewWidth / colNum
      // 图片width / 图片height == 列width / height（非vHeight是auto）
      const _height = width / (i.width / i.height)
      colsHeight[index] += _height
      // colsHeight[index] += i.height;
    }
  })
}

/**
 * 将二维的数组数据展开
 * @param {Array} arr 待展开数据
 */
function smoothArray (arr) {
  if(!(arr instanceof Array)) {
    return []
  }
  const newArr = []
  arr.forEach(i => {
    if (i instanceof Array) {
      newArr.push(...i)
    }
  })
  return newArr.sort((x, y) => y.time - x.time)
}

export { colInsert, colNumChangeTo, getColData };

const fetch = require('node-fetch');

const resultObj = fetch('https://raw.githubusercontent.com/ReactMaker/api_server/master/db/album.json');

const request = async () => {
  const response = await resultObj;
  // const json = response.json();
  return response;
};
// 1. deep clone array
//   輸入陣列，輸出一個深層複製的陣列。兩者記憶體位置不能一樣。
// fix this bug, a should be [1,2,3]:

// var a = [1,2,3];
// var b = a;
// b.push(4);
// console.log(a); // [1,2,3,4]

const deepArray = (data) => {
  if (typeof data !== 'number') return 'data error';
  const a = [1, 2, 3];
  const b = [...a, data];
  return b;
};

// 用 fetch 取得陣列到程式中

// 2. 搜尋資料中id為特定的資料

// 範例：

// 輸入：5
// 輸出：{
//         "id": 5,
//         "img": "https://unsplash.it/300/300?image=868",
//         "title": "城市幻影2",
//         "desc": "如詩般迷炫的法文爵士好歌, 樸實無華且細膩的爵士樂編曲，凸顯了「幻影」專輯中歌詞的如詩美感",
//         "price": 300
//     }

const searchId = async (initdata, id) => {
  const res = (await initdata.clone().json()).find(result => result.id === id);
  return res || 'no data';
};

// 3. 模糊搜尋title包含特定文字的資料

// 範例：

// 輸入：美好
// 輸出：{
//         "id": 1,
//         "img": "https://unsplash.it/300/300?image=946",
//         "title": "美好時光1",
//         "desc": "追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律",
//         "price": 200,
//         "discount": true
//     },
//     {
//         "id": 2,
//         "img": "https://unsplash.it/300/300?image=944",
//         "title": "美好時光2",
//         "desc": "追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律",
//         "price": 300
//     },
//     {
//         "id": 3,
//         "img": "https://unsplash.it/300/300?image=882",
//         "title": "美好時光3",
//         "desc": "追求心靈養生走入自然，便走入了永恆。我們用音樂邀您進入自然之道，聆聽永恆。自然、和諧，讓人一聽就會放鬆心情、解除一切武裝的旋律",
//         "price": 400
//     }

const findTitle = async (value, data) => {
  if (typeof data !== 'string') return 'data error';
  const res = (await value.clone().json()).filter(result => result.title.includes(data));
  if (res.length === 0) return 'no data';
  return res;
};

// 4. 新增一筆id=99的資料(內容隨意)，於id=10和id=11中間

// 範例：

// 輸入：{id: 99, img: 'xxx', title: 'xxx', desc: 'xxx', price: 100}
// 輸出：
// ...
// {id: 10, img: 'xxx', title: 'xxx', desc: 'xxx', price: 800},
// {id: 99, img: 'xxx', title: 'xxx', desc: 'xxx', price: 100},
// {id: 11, img: 'xxx', title: 'xxx', desc: 'xxx', price: 2659},
// ...

const addOtherObj = async (value, sample) => {
  const res = (await value.clone().json());
  if (typeof sample !== 'object' || sample.length) return 'data error';
  const findIndex = res.findIndex(result => result.id === 10);
  const result = [
    ...res.splice(findIndex + 1, 0, sample),
    ...res,
  ];
  return result;
};

// 5. 修改id為特定的資料

// 範例：

// 輸入：3, {title: '修改title', desc: '修改desc'}
// 輸出：
// ...
// {
//         "id": 3,
//         "img": "https://unsplash.it/300/300?image=882",
//         "title": "修改title",
//         "desc": "修改desc",
//         "price": 400
//     },

// ...


const editIdObj = async (value, id, data) => {
  if (typeof id !== 'number') {
    return 'id is error';
  } else if (!data.hasOwnProperty('title')) {
    return 'data error';
  }
  const res = (await value.clone().json());
  const findIndex = res.findIndex(result => result.id === id);
  if (findIndex === -1) return 'no data';
  return res.map((result) => {
    if (result.id === id) {
      result.title = data.title;
      result.desc = data.desc;
    }
    return result;
  });
};

// 6. 刪除特定id的資料
// 輸入 5 輸出已經刪除完 id 為 5 的陣列
const delIdObj = async (value, id) => {
  if (typeof id !== 'number') return 'id is error';
  const res = (await value.clone().json());
  const findIndex = res.findIndex(result => result.id === id);
  if (findIndex === -1) return 'no data';
  const result = [...res];
  result.splice(findIndex, 1);
  return result;
};

// 7. 依照價格排序

// 輸入 desc or asc
// 輸出價格對應排序的陣列

const sortIdObj = async (value, sortData) => {
  const res = (await value.clone().json());
  if (typeof sortData !== 'string') return 'data error';
  switch (sortData) {
    case 'desc':
      res.sort((sortA, sortB) => (sortA.price - sortB.price));
      break;
    case 'esc':
      res.sort((sortA, sortB) => (sortB.price - sortA.price));
      break;
    default:
      res.sort((sortA, sortB) => (sortA.price - sortB.price));
  }
  return res;
};

// 使用立即函式(IIFE)執行
(async () => {
  const value = await request();
  console.log('Array1', await deepArray(4));
  console.log('Array2', await searchId(value, 14));
  console.log('Array3', await findTitle(value, '美好'));
  console.log('Array4', await addOtherObj(value, { id: 99, img: ' ', title: ' ', desc: ' ', price: 100 }));
  console.log('Array5', await editIdObj(value, 12, { title: '修改title', desc: '修改desc' }));
  console.log('Array6', await delIdObj(value, 5));
  console.log('Array7', await sortIdObj(value, 'desc'));
})();

module.exports = {
  deepArray,
  searchId,
  findTitle,
  addOtherObj,
  editIdObj,
  delIdObj,
  sortIdObj,
};
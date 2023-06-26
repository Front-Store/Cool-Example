
// 合并行 列
function exportSelect() {
  const calendar = getCalendar();
  const workbook = utils.book_new();
  const exportColumns = columns.filter(d => Object.hasOwn(d, 'prop') && d.isExport !== false);
  const titleList: string[] = exportColumns.map(f => f.label)
  const dataList: any[][] = tableData.value.map(item => exportColumns.map(f => item[f.prop.toString()]));

  // 第二列
  const titleCol2 = [...titleList, ...calendar[1]]

  // 第一列
  const titleCol1 = new Array(titleCol2.length);

  titleCol1[0] = "人员信息";
  titleCol1[titleList.length] = calendar[0] + "考勤日历";

  const worksheet = utils.aoa_to_sheet([
    titleCol1,
    titleCol2,
    ...dataList
  ]);

  // 设置工作表的记录范围
  // [列号][行号]，A1 则代表 A 列的第1行
  // 列数一般是已知的（未知时可以设置为ZZ）
  // 行数则以 xlsxData 内容的长度结束即可
  worksheet['!ref'] = `A1:AI${titleCol2.length}`;

  // s 意为 start ，即开始的单元格
  // r 是 row ，表示行号，从 0 计起
  // c 是 col ，表示列号，从 0 计起
  const merge = [
    // 横向合并，范围是第1行的列3到列5
    { s: { r: 0, c: 0 }, e: { r: 0, c: titleList.length - 1 } },
    { s: { r: 0, c: titleList.length }, e: { r: 0, c: titleCol2.length - 1 } },

    // // 纵向合并，范围是第1列的行1到行2
    // { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
    // // 纵向合并，范围是第2列的行1到行2
    // { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
    // 横向合并，范围是第1行的列3到列5
    // { s: { r: 0, c: 2 }, e: { r: 0, c: 4 } },
    // // 横向合并，范围是第1行的列6到列11
    // { s: { r: 0, c: 5 }, e: { r: 0, c: 10 } },
    // // 横向合并，范围是第1行的列12到列17
    // { s: { r: 0, c: 11 }, e: { r: 0, c: 16 } },
    // // 横向合并，范围是第1行的列18到列23
    // { s: { r: 0, c: 17 }, e: { r: 0, c: 22 } },
    // // 横向合并，范围是第1行的列24到列29
    // { s: { r: 0, c: 23 }, e: { r: 0, c: 28 } },
    // // 横向合并，范围是第1行的列30到列35
    // { s: { r: 0, c: 29 }, e: { r: 0, c: 34 } }
  ];
  worksheet['!merges'] = merge;
  // sheet0 是工作表的名称
  utils.book_append_sheet(workbook, worksheet, 'sheet0');
  // 执行数据转换文件写入
  writeFile(workbook, 'test.xlsx');
}

function getCalendar() {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;

  const daysInMonth = new Date(year, month, 0).getDate();
  const calendar = [];

  // Add the year and month header
  calendar.push(year + '年' + month + '月份');

  // Add each day as a subheader
  const subHeader = [];
  for (let i = 1; i <= daysInMonth; i++) {
    subHeader.push(month + '月' + i + '日');
  }
  calendar.push(subHeader);

  return calendar;
}
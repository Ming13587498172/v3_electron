<template>
  <div class="whStyle box-padding import-study-box">
    <a-upload name="file" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :headers="{ authorization: 'authorization-text' }" @change="handleChange">
      <a-button>
        <upload-outlined></upload-outlined>
        xlsx导入
      </a-button>
    </a-upload>
    <a-table :columns="tableHead" :data-source="tableData" bordered size="middle"
      :scroll="{ x: 'max-content', scrollToFirstRowOnChange: true }"></a-table>
  </div>
</template>

<script setup lang="ts" name="ImportStudy">
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import type { UploadChangeParam } from 'ant-design-vue'
import { dealExcelFileData } from './xlsxStudy/xlsx'


type valItem = [[number], number]
let tableHead = ref<any[]>([
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    customCell: (_: object, index: number, __: object, col: valItem, row: valItem) => {
      // type valItem = [[number], number]
      let colList: valItem[] = [[[0], 2], [[3], 4], [[2], 0],]
      let rowList: valItem[] = [[[1], 2],]
      if (col !== undefined) colList.push(col)
      if (row !== undefined) rowList.push(row)
      if (index !== undefined) {
        return {
          colSpan: colList.filter((item: valItem) => item[0].includes(index)).length !== 0 ? colList.filter((item: valItem) => item[0].includes(index))[0][1] : 1,
          rowSpan: rowList.filter((item: valItem) => item[0].includes(index)).length !== 0 ? rowList.filter((item: valItem) => item[0].includes(index))[0][1] : 1,
        }
      }
    },
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
    customCell: (_: object, index: number, __: object) => {
      return {
        colSpan: [0, 3].includes(index) ? 0 : [1].includes(index) ? 2 : 1,
      }
    },
  }, {
    title: '职业',
    dataIndex: 'zy',
    key: 'zy',
    align: 'center',
    customCell: (_: object, index: number, __: object) => {
      return {
        colSpan: [1, 3].includes(index) ? 0 : 1,
      }
    },
  }, {
    title: '电话',
    dataIndex: 'dh',
    key: 'dh',
    align: 'center',
    customCell: (_: object, index: number, __: object) => {
      return {
        colSpan: [3].includes(index) ? 0 : [0, 2].includes(index) ? 2 : 1,
        rowSpan: [0].includes(index) ? 2 : [1].includes(index) ? 0 : 1,
      }
    },
  }, {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    align: 'center',
    customCell: (_: object, index: number, __: object) => {
      return {
        colSpan: [0, 1, 2].includes(index) ? 0 : 1,
        rowSpan: [0].includes(index) ? 0 : 1,
      }
    },
  },
])
let tableData = ref<any[]>([
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    zy: '西湖区湖底公园1号',
    dh: 'hhhhhhh',
    sex: '男',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    zy: '西湖区湖底公园1号',
    dh: 'hhhhhhhhhh',
    sex: '男',
  },
  {
    key: '3',
    name: '胡彦斌11111',
    age: 32,
    zy: '西湖区湖底公园1号',
    dh: 'hhhhhhhhhhhhh',
    sex: '男',
  },
  {
    key: '4',
    name: '胡彦祖22222',
    age: 42,
    zy: '西湖区湖底公园1号',
    dh: 'hhhhhhhhhhhhhh',
    sex: '男',
  },
  {
    key: '5',
    name: '胡彦斌33333',
    age: 32,
    zy: '西湖区湖底公园1号',
    dh: 'hhhhhhhhhhhh',
    sex: '男',
  },
  {
    key: '6',
    name: '胡彦祖44444',
    age: 42,
    zy: '西湖区湖底公园1号',
    dh: 'hhhhhhhhhhhhhh',
    sex: '男',
  },
])

console.log(tableHead.value[0].customCell(undefined, undefined, undefined, [[3], 2], undefined), 'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')

// xlsx导入
const handleChange = (info: UploadChangeParam) => {
  // if (info.file.status !== 'uploading') {
  //   console.log(info,info.file,info.file.originFileObj, info.fileList)
  // }
  const file = info.fileList[0].originFileObj
  const reader = new FileReader()
  reader.onload = (e) => {
    let data = new Uint8Array(e.target!.result as ArrayBuffer)
    const workbook = XLSX.read(data, { type: 'array' })
    const firstSheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[firstSheetName]
    console.log("🚀 ~ handleFileUpload ~ worksheet:", worksheet)
    // let a = getHeaderRow(worksheet)
    // console.log("🚀 ~ handleFileUpload ~ a:", a)
    const jsonData = XLSX.utils.sheet_to_json(worksheet)
    console.log(jsonData, 'aaaaaaaaaaaaaaaaaaaaaaaa')

    let { headList, dataList } = dealExcelFileData(worksheet, jsonData as object[])
    tableHead.value = headList
    tableData.value = dataList
  }
  reader.readAsArrayBuffer(file as Blob)
}

// const getHeaderRow = (sheet: any) => {
//   const headers = [] // 定义数组，用于存放解析好的数据
//   const range = XLSX.utils.decode_range(sheet["!ref"]) // 读取sheet的单元格数据
//   let C
//   const R = range.s.r
//   /* start in the first row */
//   for (C = range.s.c; C <= range.e.c; ++C) {
//     /* walk every column in the range */
//     const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
//     /* find the cell in the first row */
//     let hdr = "UNKNOWN " + C // <-- replace with your desired default
//     if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
//     headers.push(hdr)
//   }
//   return headers // 经过上方一波操作遍历，得到最终的第一行头数据
// }

</script>

<style scoped lang="scss">
.import-study-box {
  // :deep(.ant-table-container .ant-table-cell){
  //   white-space: nowrap;
  // }
  :deep(.ant-table-wrapper) {
    width: 100%;
    height: 90%;
  }
}
</style>

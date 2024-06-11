import { MergesItem } from './xlsx.d'

/**
 * 对 xlsx 插件解析后 的 Excel文件数据 进行处理
 * @param unDealObj xlsx 处理 完成的前一步 数据
 * @param arr xlsx 处理 完成 后的数据
 * @returns 
 */
let customCellObj: any = {}
type valItem = [[number], number]
export const dealExcelFileData = (unDealObj: object, arr: object[]) => {
  // 遍历对象时，储存上一个 key 值
  let lastKey: string
  // 表头数组
  let headList: any[] = []
  // 表格数据
  let dataList: any[] = []
  // 记录遍历的属性数量 -> 用于判断对象是否遍历完成
  let traversedCount: number = 0
  // 从xlsx未处理完全的数据中提取 所有表头信息
  let allHeadList: string[] = Object.entries(unDealObj).map(([key, val]) => { if (Number(key.slice(-1)) === 1) return val.v }).filter(item => item !== undefined)
  // 如果key不等于''空 或者 不是 _ 开头并且数字拼接 -> 例：_1 或 _2....
  let isFirst = Object.entries(arr[0] as Record<string, string>).every(([k, _]) => { return !/^[_0-9]+$/.test(k) && !k.includes('__EMPTY') && k !== '' })
  // 遍历 xlsx 处理后 的表格数据中 代表表头的第一个对象数据(剩余数据为表格数据)
  Object.entries(arr[0] as Record<string, string>).forEach(([k, value]) => {
    // 如果key不等于''空 或者 不是 _ 开头并且数字拼接 -> 例：_1 或 _2....
    // 代表 一级表头
    if (isFirst) {
      // 储存上一个数据的 key 值
      lastKey = k
      // 往表头数组中添加 表头->单元格对象数据
      // 对象格式要对应 自定义表格表头的数据格式 或 ui组件库中表格表头的数据格式
      // 如果遍历 xlsx 处理后 的表格数据第一个对象数据长度 等于 所有表头数据的长度，那就正常处理添加
      if (allHeadList.length === Object.entries(arr[0] as Record<string, string>).length) {
        headList.push({ 
          title: k, 
          key: k, 
          dataIndex: k, 
          align: 'center',
          col: [],
          row: [],
          customCell: (_: object, index: number, __: any) => {
            let colList: valItem[] = []
            let rowList: valItem[] = []
              if (__ !== undefined) colList = __.col
              if (__ !== undefined) rowList = __.row
            if (index !== undefined) {
              return {
                colSpan: colList.filter((item: valItem) => item[0].includes(index)).length !== 0 ? colList.filter((item: valItem) => item[0].includes(index))[0][1] : 1,
                rowSpan: rowList.filter((item: valItem) => item[0].includes(index)).length !== 0 ? rowList.filter((item: valItem) => item[0].includes(index))[0][1] : 1,
              }
            }
          }, 
          children: []
        })
      } else {  // 若长度不相等，则根据所有表头信息进行表头数据的处理添加
        allHeadList.forEach(item => {
          headList.push({ 
            title: item, 
            key: item, 
            dataIndex: item, 
            align: 'center',
            col: [],
            row: [],
            customCell: (_: object, index: number, __: any) => {
              let colList: valItem[] = []
              let rowList: valItem[] = []
              if (__ !== undefined) colList = __.col
              if (__ !== undefined) rowList = __.row
              if (index !== undefined) {
                return {
                  colSpan: colList.filter((item: valItem) => item[0].includes(index)).length !== 0 ? colList.filter((item: valItem) => item[0].includes(index))[0][1] : 1,
                  rowSpan: rowList.filter((item: valItem) => item[0].includes(index)).length !== 0 ? rowList.filter((item: valItem) => item[0].includes(index))[0][1] : 1,
                }
              }
            }, 
            children: []
          })
        })
      }
      
      // 增加遍历计数
      traversedCount++
      // 判断是否遍历完成
      if (traversedCount === Object.keys(arr[0]).length) {
        headList = headList.filter((item, index, self) => { return index === self.findIndex(obj => obj.dataIndex === item.dataIndex) })
        // 如果有合并项 则继续
        if (unDealObj.hasOwnProperty('!merges')) {
          dealMergeData(unDealObj, headList, false)
          headList.forEach((item: any) => {
            item.col = customCellObj[item.title].col
            item.row = customCellObj[item.title].row
          })
        }
        
      }
    } else { // 否则 代表 除一级表头外 的 多级表头
      if (!/^[_0-9]+$/.test(k) && !k.includes('__EMPTY') && k !== '') {
        // 储存上一个数据的 key 值
        lastKey = k
        // 往表头数组中添加 表头->单元格对象数据
        // 对象格式要对应 自定义表格表头的数据格式 或 ui组件库中表格表头的数据格式
        headList.push({ title: k, key: k, dataIndex: k, align: 'center', col: [], row: [],
          customCell: (_: object, index: number, __: any) => {
            let colList: valItem[] = []
            let rowList: valItem[] = []
              if (__ !== undefined) colList = __.col
              if (__ !== undefined) rowList = __.row
            if (index !== undefined) {
              return {
                colSpan: colList.filter((item: valItem) => item[0].includes(index)).length !== 0 ? colList.filter((item: valItem) => item[0].includes(index))[0][1] : 1,
                rowSpan: rowList.filter((item: valItem) => item[0].includes(index)).length !== 0 ? rowList.filter((item: valItem) => item[0].includes(index))[0][1] : 1,
              }
            }
          }, 
          children: []
        })
      }
      // 循环表头数组
      headList.forEach(item => {
        // 如果一级表头的数据对象属性名({key: value} 中的 key) 等于 储存的key值，那就在改一级对象下添加对应的二级数据对象
        if (item.title === lastKey) {
          // 往表头数组中添加 表头->单元格对象数据
          // 对象格式要对应 自定义表格表头的数据格式 或 ui组件库中表格表头的数据格式
          /** 
           * 下方之所以添加多遍，是因为：
           * @ 1. 一级表头中某个单元格进行了合并，该单元格下有对应二级表头的单元格
           * @ 2. 经xlsx处理过后的表头数据是表头单元格的集合，一级和二级的表头单元格数据是按顺序排列的，所以 一级表头的合并单元格数据 和 其对应的二级表头单元格数据 是挨在一起的
           */
          // 这次是因为二级表头的首个单元格数据为：一级单元格对象的 属性值 ({key: value} 中的 value)
          
          item.children.push({ title: (arr[0] as Record<string, string>)[lastKey], key: lastKey, dataIndex: lastKey, align: 'center', col: [], row: [],
            customCell: (_: object, index: number, __: any) => {
              let colList: valItem[] = []
              let rowList: valItem[] = []
                if (__ !== undefined) colList = __.col
                if (__ !== undefined) rowList = __.row
              if (index !== undefined) {
                return {
                  colSpan: colList.filter((item: valItem) => item[0].includes(index)).length !== 0 ? colList.filter((item: valItem) => item[0].includes(index))[0][1] : 1,
                  rowSpan: rowList.filter((item: valItem) => item[0].includes(index)).length !== 0 ? rowList.filter((item: valItem) => item[0].includes(index))[0][1] : 1,
                }
              }
            }, 
            children: [] 
          })
          // 这次是因为二级表头剩余单元格的数据，如果为'' 则改变其值，因为属性名为''数据展示不出来 
          item.children.push({ title: value, key: k === '' ? '__k__' : k, dataIndex: k === '' ? '__k__' : k, align: 'center', col: [], row: [],
            customCell: (_: object, index: number, __: any) => {
              let colList: valItem[] = []
              let rowList: valItem[] = []
                if (__ !== undefined) colList = __.col
                if (__ !== undefined) rowList = __.row
              if (index !== undefined) {
                return {
                  colSpan: colList.filter((item: valItem) => item[0].includes(index)).length !== 0 ? colList.filter((item: valItem) => item[0].includes(index))[0][1] : 1,
                  rowSpan: rowList.filter((item: valItem) => item[0].includes(index)).length !== 0 ? rowList.filter((item: valItem) => item[0].includes(index))[0][1] : 1,
                }
              }
            }, 
            children: []
          })
          // 去重：添加二级表头数据时，因为暂时没想好判断条件，可能会添加重复的数据，所以暂时用去重的方式解决
          item.children = Array.from(new Set(item.children.map((item: object) => JSON.stringify(item)))).map((item) => JSON.parse(item as string))
        }
      })
    }
  })
  // xlsx解析后的数据第一项为表头数据，剩余为表格数据
  // 先判断表头数据的属性名是否等于或包含''、__EMPTY、_数字(例：_1、_2、_3.....)
  // 如果都不包含或不等于 则表格数据就为xlsx解析后的所有数据
  // 如果包含或等于 则表格数据为 xlsx解析后 除去第1项 的剩余数据，所以进行截取，取出代表表格数据的剩余数据
  Object.keys(arr[0]).every(key => !/^[_0-9]+$/.test(key) && !key.includes('__EMPTY') && key !== '') ? dataList = arr : dataList = arr.slice(1)
  // 将数据中属性名等于 '' 的改为对应表头的值
  dataList = dataList.map(obj => {
    return Object.keys(obj).reduce((acc: {[key: string]: string}, key) => {
      let val = obj[key];
      if (key === '') {
        key = '__k__'
      }
      acc[key] = val
      return acc
    }, {})
  })
  customCellObj = {}
  // 返回 表头数据 和 表格数据
  return { headList, dataList }
}

/**
 * 表格数据的单元格有合并时，处理相应的表头数据
 * @param unDealObj  xlsx 处理 完成的前一步 数据
 */
const dealMergeData = (unDealObj: object, headArr: any[], isMulti: boolean) => {
  // 提取 合并项 数据
  let mergeList: MergesItem[] = Object.entries(unDealObj).filter(([key]) => key === '!merges')[0][1]
  // 提取 单元格范围 的数据 例：A1:F18
  // let refList = Object.entries(unDealObj).filter(([key]) => key === '!ref')[0][1]
  // 从xlsx未处理完全的数据中提取 所有表头信息
  let allHeadList = Object.entries(unDealObj).map(([key, val]) => { if (Number(key.slice(-1)) === 1) return val.v }).filter(item => item !== undefined)
  // console.log("🚀 ~ dealMergeData ~ allHeadList:", allHeadList)
  // // 根据合并项数据(mergeList)中的条件和所有表头信息(allHeadList)数据 从处理好的表头(headList)数据中找出对应的数据
  // type valItem = [[number], number] // 定义数组类型 - 元组
  // let colList: valItem[] = []  //  列 合并数据
  // let rowList: valItem[] = []  //  行 合并数据
  // // 根据 s.c 将 合并项(mergeList) 中的数据 进行分组
  // let newMergeList: {[key: number]: MergesItem[]} = mergeList.reduce((acc: {[key: number]: MergesItem[]}, obj: MergesItem) => {
  //   const key: number = obj!.s!.c
  //   if (!acc[key]) {
  //     acc[key] = []
  //   }
  //   acc[key].push(obj)
  //   return acc
  // }, {})
  // Object.entries(newMergeList).forEach(([i, v]: [string, MergesItem[]]) => {
  //   let traversedCount: number = 0
  //   v.forEach((item: MergesItem) => {
  //     console.log("🚀 ~ Object.entries ~ item:", item)
  //     traversedCount++
  //     if (traversedCount === v.length) {
  //       traversedCount = 0
  //       colList = []
  //       rowList = []
  //     }
  //   })
  // })
  /** 
   * 合并规则
   * @ s和e 的 r 相同 -> 代表：同行 列合并 例：A1:B1
   * @ s和e 的 c 相同 -> 代表：同列 行合并 例：A1:A2
   * @ s和e 的 c、r 都不相同 -> 代表:跨行跨列合并 例：A1:B5
   */
  Object.entries(mergeList).forEach(([_, v]: [string, MergesItem]) => {
    // 根据 起始位置和结束位置 提取出对应的表头下标
    let headRangeList: number[] = Array.from({ length: v!.e!.c + 1 }, (_, i) => i).slice(v!.s!.c, v!.e!.c + 1)
    // 根据 表头下标(headRangeList) 提取对应表头title数据
    let titleList: string[] = headRangeList.map(index => allHeadList[index])
    // 判断当前合并项是 列合并 还是 行合并
    if (v.s?.c !== v.e?.c && v.s?.r === v.e?.r) {
      extractHeadData(headArr, titleList, v, isMulti, 'col')
    } else if (v.s?.c === v.e?.c && v.s?.r !== v.e?.r) {
      extractHeadData(headArr, titleList, v, isMulti, 'row')
    } else {
      console.log('hl')
      extractHeadData(headArr, titleList, v, isMulti, 'all')
    }
  })
}

/**
 * 根据条件 查找表头数据中对应的表头数据 并进行数据修改
 * @param headArr 表头完整数据
 * @param titleList 表头title数据
 * @param isMulti 是否为多级表头
 * @returns 
 */
const extractHeadData = (headArr: any[], titleList: string[], v: MergesItem, isMulti: boolean, type: string) => {
  let headList: any[]
  // 根据表头分组合并项数据的处理
  headArr.forEach((item) => {
    if (!customCellObj.hasOwnProperty(item.title)) {
      customCellObj[item.title] = { col: [], row: []}
    }
  })
  titleList.forEach((title: string) => {
    console.log("🚀 ~ titleList.forEach ~ title:", title)
    if (!isMulti) { // 一级表头
      let list: number[] = []
      headArr.forEach((item) => {
        switch (type) {
          case 'col':
            list = Array.from({ length: (v!.e!.c - v!.s!.c) + 1 }, (_, i) => v!.s!.c + i)
            if (item.title === titleList[0]) {
                customCellObj[item.title].col.push([[v!.s!.r - 1], (v!.e!.c - v!.s!.c + 1)])
            } else {
                list.slice(1).forEach((val, _) => customCellObj[headArr[val].title].col.push([[v!.s!.r - 1], 0]))
            }
            // 去重 -> 数据少是少了，但好像没完全去重，至少比去重前数据少，后续再进行优化
            customCellObj[item.title].col = unique(customCellObj[item.title].col)
            customCellObj[item.title].row = unique(customCellObj[item.title].row)
            break
          case 'row':
            list = Array.from({ length: ((v!.e!.r - 1) - (v!.s!.r - 1)) + 1 }, (_, i) => (v!.s!.r - 1) + i)
            if (item.title === titleList[0]) {
              customCellObj[item.title].row.push([[v!.s!.r - 1], ((v!.e!.r - v!.s!.r) + 1)])
              list.slice(1).forEach((val, _) => { 
                customCellObj[item.title].col.push([[val], 0])
              })
            // } else {
              // list.slice(1).forEach((val, i) => {
              //   customCellObj[headArr[val].title].row.push([[val], 0])
              // })
            }
            customCellObj[item.title].col = unique(customCellObj[item.title].col)
            customCellObj[item.title].row = unique(customCellObj[item.title].row)
            break
          case 'all':
            if (item.title === titleList[0]) {
              list = new Array(v!.e!.r - v!.s!.r + 1).fill(0).map((_, i) => v!.s!.r - 1 + i)
              customCellObj[item.title].row.push([[list[0]], ((v!.e!.r - v!.s!.r) + 1)])
              list.forEach(val => {
                customCellObj[item.title].col.push([[val], ((v!.e!.c - v!.s!.c) + 1)])
              })
              list.slice(1).forEach(val => {
                customCellObj[item.title].row.push([[val], 0])
              })
            } else {

              list = new Array((v!.e!.c - v!.s!.c) + 1).fill(0).map((_, i) => v!.s!.c + i)
              list.slice(1).forEach((val, _) => {
                let newList = new Array(v!.e!.r - v!.s!.r + 1).fill(0).map((_, i) => v!.s!.r - 1 + i)
                newList.forEach(item => {
                  customCellObj[headArr[val].title].col.push([[item], 0])
                  customCellObj[headArr[val].title].row.push([[newList[0]], 0])
                })
              })
            }
            customCellObj[item.title].col = unique(customCellObj[item.title].col)
            customCellObj[item.title].row = unique(customCellObj[item.title].row)
            break
          default:
            break
        }
      })
    } else {  // 多级表头
      // dealMultiHeader(headArr, title, type)
    }
  })
  headList = headArr

  /**
   * 多级表头数据修改
   * @param arr 多级表头数据
   * @param title 表头title
   */
  const dealMultiHeader = (arr: any[], title: string, type: string) => {
    arr.forEach((item: object) => {
      if ((item as { title: string }).title !== title && (item as { children: any[] }).children && (item as { children: any[] }).children.length > 0) {
        dealMultiHeader((item as { children: any[] }).children, title, type)
      } else {
        switch (type) {
          case 'col':
            
            break
          case 'row':
            
            break
          case 'all':
            
            break
          default:
            break
        }
      }
    })
  }

  return headList
}

// 去重
const unique = (arr: any) => {
  const seen = new Set()
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const subArrString = JSON.stringify(arr[i])
    if (!seen.has(subArrString)) {
      seen.add(subArrString)
      result.push(arr[i])
    }
  }
  return result
}

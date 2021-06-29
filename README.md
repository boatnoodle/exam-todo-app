## Exam todo app <br/>

#### How to review
- `yarn install`
- `yarn start`
- go to `http://localhost:3000/` <br/>

## Bonus <br/>
กำหนดข้อมูล 2 ชุด เป็น array of number จงคิดวิธีการในการ filter array ชุดแรก ให้เหลือเพียงแค่สมาชิกที่มีใน array ที่ชุดสอง
const arr1 = [1, 2 ,3 ,4 ,5];
const arr2 = [2,5]

`return arr1.filter(number => arr2.indexOf(number) !== -1)` 

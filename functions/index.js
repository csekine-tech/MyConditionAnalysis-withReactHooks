import correlationCoefficient from "./correlationCoefficient.js";
import jsondata from "./data.json";

let jsonObj = JSON.parse(JSON.stringify(jsondata));
let data1 = [];
let data2 = [];

jsonObj.forEach((obj) => {
  data1.push(obj.data1);
  data2.push(obj.data2);
});
let R = correlationCoefficient(data1, data2);
console.log(R);

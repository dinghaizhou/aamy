(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2086a8"],{a564:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._v(" 词云 "),a("div",{staticStyle:{width:"800px",height:"300px",border:"1px solid red"},attrs:{id:"wordCloud"}}),a("div",{staticStyle:{width:"800px",height:"300px",border:"1px solid red"},attrs:{id:"dataset"}})])}],s=(a("54bc"),{mounted:function(){this.myChart=this.$echarts.init(document.getElementById("wordCloud")),this.myChart2=this.$echarts.init(document.getElementById("dataset")),this.drawTable(),this.drawTable2()},methods:{drawTable:function(){var t={color:["#AEDD81","#00CCFF","#FC9D99"],xAxis:{type:"category",data:["Matcha Latte","Milk Tea","Cheese Cocoa","Walnut Brownie"]},yAxis:{},series:[{type:"line",name:"2016",data:[95.8,89.4,91.2,76.9]},{type:"bar",name:"2017",data:[97.7,83.1,92.5,78.1]}]};this.myChart.setOption(t)},drawTable2:function(){var t={legend:{},tooltip:{},dataset:{source:[["product","2015","2016","2017"],["Matcha Latte",43.3,85.8,93.7],["Milk Tea",83.1,73.4,55.1],["Cheese Cocoa",86.4,65.2,82.5],["Walnut Brownie",72.4,53.9,39.1]]},xAxis:{type:"category"},yAxis:{},series:[{type:"bar"},{type:"line"}]};this.myChart2.setOption(t)}}}),n=s,d=a("2877"),o=Object(d["a"])(n,i,r,!1,null,null,null);e["default"]=o.exports}}]);
//# sourceMappingURL=chunk-2d2086a8.0d9fcd65.js.map
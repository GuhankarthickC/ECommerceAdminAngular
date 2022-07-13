import { Component, OnInit } from '@angular/core';
import { Order } from 'Models/Order';
import { CanvasJS } from 'src/assets/charts/canvasjs.angular.component';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
orders:Order[]=[];
totalorders:number;
dataPoints1 = []
chartoptions={}
  constructor(private orderobj:OrdersService) { }

  ngOnInit(): void {
	this.orderobj.getAllorder().subscribe(data=>{this.orders=data;  
    this.totalorders=this.orders.length;
	var reduced=this.orders.reduce((acc, o) => (acc[o.orderStatus] = (acc[o.orderStatus] || 0) + 1, acc), {});
	console.log(reduced);
	 var result2 = Object.keys(reduced).map(x =>  {
		return {name : x, value : reduced[x]}}) 
	for(var j=0;j<result2.length;j++){
		result2[j].value=((result2[j].value/this.totalorders)*100);
	}
	console.log(result2);
	for(var k=0;k<result2.length;k++){
		this.dataPoints1.push({name: String(result2[k].name), y: Number(result2[k].value)});
	}
	console.log(this.dataPoints1);
	this.chartoptions = {
		animationEnabled: true,
		theme: "light2",
		exportEnabled: true,
		subtitles: [{
		  text: "Total Orders Overview",fontFamily: "Calibri, Arial, sans-serif"
		}],
		data: [{
		  type: "pie", //change type to column, line, area, doughnut, etc
		  showInLegend:true,
		  indexLabel: "{name}: {y}%",
		  dataPoints: this.dataPoints1
		}]
	  }
     });
	
  
  }
  
}

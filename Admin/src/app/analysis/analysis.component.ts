import { Component, OnInit } from '@angular/core';

declare function chart():any;
@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    chart();
  }

}

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  @ViewChild("canvas", { static: true }) myCanvas!: ElementRef

  color1: string = "#ff0000"
  color2: string = "#fff200"
  color3: string = "#0a6522"

  strokeColor: string = "#ff0000";

  input = 0;

  @Input()
  vote: number | undefined = 0;

  @Input()
  height: number = 0;

  @Input()
  width: number = 0;

  @Input()
  fontsize: string = "";

  ngOnInit(): void {
    const canvas = this.myCanvas.nativeElement;
    const context = canvas.getContext("2d");
    canvas.width = this.width;
    canvas.height = this.height;

    if (context) {
      this.drawCircle(context);
    }
  }

  drawCircle(context: CanvasRenderingContext2D) {

    let ValueHigh = 360;
    let ValueLow = 0;
    let InputHigh = 100;
    let InputLow = 0;

    if (this.vote) {
      this.input = Math.round(this.vote * 10);
    }

    if (this.input <= 25) {
      this.strokeColor = this.color1;
    } else if (this.input > 25 && this.input <= 60) {
      this.strokeColor = this.color2;
    } else {
      this.strokeColor = this.color3;
    }

    let scaling = (ValueHigh - ValueLow) / (InputHigh - InputLow);
    let value = ValueLow + ((this.input - InputLow) * scaling);

    context.arc(this.width / 2, this.height / 2, (this.width / 2) - 2, 0, value * (Math.PI / 180), false);
    context.lineWidth = 3;
    context.strokeStyle = this.strokeColor;
    context.stroke();
  }

}

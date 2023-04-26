import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Media } from '../models/media-detail';

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
  canvasHeight: number = 0;
  canvasWidth: number = 0;

  input = 0;

  @Input()
  media?: Media

  @Input()
  height: number = 0;

  @Input()
  width: number = 0;

  ngOnInit(): void {
    const canvas = this.myCanvas.nativeElement;
    const context = canvas.getContext("2d");
    canvas.width = this.width;
    canvas.height = this.height;

    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    if (context) {
      this.drawCircle(context);
    }
  }

  drawCircle(context: CanvasRenderingContext2D) {


    let ValueHigh = 360;
    let ValueLow = 0;
    let InputHigh = 100;
    let InputLow = 0;

    if (this.media?.vote_average) {
      this.input = Math.round(this.media?.vote_average * 10);
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

    context.arc(this.canvasWidth / 2, this.canvasHeight / 2, (this.canvasWidth / 2) - 2, 0, value * (Math.PI / 180), false);
    context.lineWidth = 3;
    context.strokeStyle = this.strokeColor;
    context.stroke();
  }

}

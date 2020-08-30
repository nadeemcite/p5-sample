import { Component, VERSION } from "@angular/core";
declare const p5: any;

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;
  p5Obj;
  ngOnInit() {
    this.init();
  }
  async init(){
    await this.loadP5();
    this.p5Obj = new p5((p)=>{
      return this.sketch(p);
    })
  }
  sketch(p){
    p.setup =()=>{
      p.createCanvas(400,400);
    }
    p.draw =()=>{
      p.background(100);
      p.circle(p.mouseX, p.mouseY, 30);
    }
  }
  loadP5() {
    return new Promise(resolve => {
      if (document.getElementById("__js__p5js")) {
        resolve();
      } else {
        const script = document.createElement("script");
        script.id = "__js__p5js";
        script.src = "https://cdn.jsdelivr.net/npm/p5@1.1.9/lib/p5.js";
        script.onload = () => {
          resolve();
        };
        document.head.appendChild(script);
      }
    });
  }
}

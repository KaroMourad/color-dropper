import {
  RADIUS,
  BORDER_WIDTH,
  CENTER_SQUARE_COLOR,
  BORDER_OUTER_WIDTH,
  BORDER_INNER_WIDTH,
  BORDER_INNER,
  RECT_SIZE,
  RECT_LINE_WIDTH,
  STROKE_COLOR,
  INNER_STROKE_COLOR,
  OUTER_STROKE_COLOR,
} from "@/lib/configs/dropper";

class Cursor {
  private readonly radius = RADIUS;
  private readonly borderWidth = BORDER_WIDTH;
  private readonly centerSquareColor = CENTER_SQUARE_COLOR;
  private readonly borderOuterWidth = BORDER_OUTER_WIDTH;
  private readonly borderInnerWidth = BORDER_INNER_WIDTH;
  private readonly borderInner = BORDER_INNER;
  private readonly rectSize = RECT_SIZE;
  private readonly rectLineWidth = RECT_LINE_WIDTH;
  private readonly strokeColor = STROKE_COLOR;
  private readonly innerStrokeColor = INNER_STROKE_COLOR;
  private readonly outerStrokeColor = OUTER_STROKE_COLOR;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private x = 0;
  private y = 0;

  constructor(canvas: HTMLCanvasElement | null) {
    if (canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d", { willReadFrequently: true });
    } else {
      throw Error("Canvas is Required");
    }
  }

  private drawArc(radius: number, color: string, lineWidth: number) {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.lineWidth = lineWidth;
      this.ctx.strokeStyle = color;
      this.ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  private drawInnerBorder() {
    this.drawArc(
      this.borderInner,
      this.innerStrokeColor,
      this.borderInnerWidth
    );
  }

  private drawMiddleBorder(color: string) {
    this.drawArc(this.radius, color ?? this.strokeColor, this.borderWidth);
  }

  private drawOuterBorder() {
    const borderOuter = this.radius + this.borderWidth / 2;
    this.drawArc(borderOuter, this.outerStrokeColor, this.borderOuterWidth);
  }

  private drawGrid(cursorColors: string[]) {
    if (this.ctx) {
      this.ctx.beginPath();
      const drawSize = this.radius + this.borderWidth / 2;
      const rectsPerRow = Math.ceil(Math.sqrt(cursorColors.length));
      const rows = Math.ceil(cursorColors.length / rectsPerRow);
      const startX = this.x - drawSize;
      const startY = this.y - drawSize;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < rectsPerRow; col++) {
          const color = cursorColors[row * rectsPerRow + col];
          if (color) {
            const x = startX + col * this.rectSize;
            const y = startY + row * this.rectSize;
            const size = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
            if (size <= this.radius) {
              this.ctx.fillStyle = color;
              this.ctx.fillRect(x, y, this.rectSize, this.rectSize);
              this.ctx.strokeStyle = this.strokeColor;
              this.ctx.lineWidth = this.rectLineWidth;
              this.ctx.strokeRect(x, y, this.rectSize, this.rectSize);
            }
          }
        }
      }
      this.ctx.closePath();
    }
  }

  private drawBall(color: string, cursorColors: string[]) {
    if (this.ctx) {
      // Draw grid
      this.drawGrid(cursorColors);
      // Draw center square
      this.drawCenterSquare();
      // Draw borders
      this.drawInnerBorder();
      this.drawMiddleBorder(color);
      this.drawOuterBorder();
    }
  }

  private drawCenterSquare() {
    if (this.ctx) {
      const centerX = this.x - this.rectSize / 2;
      const centerY = this.y - this.rectSize / 2;
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.centerSquareColor;
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(centerX, centerY, this.rectSize, this.rectSize);
      this.ctx.closePath();
    }
  }

  clear() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  draw(color: string, cursorColors: string[], x: number, y: number) {
    this.clear();
    this.drawBall(color, cursorColors);
    this.x = x;
    this.y = y;
  }
}

export { Cursor };

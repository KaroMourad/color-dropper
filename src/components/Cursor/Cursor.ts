import {
  RADIUS,
  BORDER_WIDTH,
  CENTER_SQUARE_COLOR,
  BORDER_OUTER_WIDTH,
  BORDER_INNER_WIDTH,
  BORDER_INNER,
  RECT_SIZE,
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

  private drawBall(color: string, cursorColors: string[]) {
    if (this.ctx) {
      this.ctx.beginPath();
      const drawSize = (this.radius + this.borderWidth / 2);


      const rectsPerRow = Math.ceil(Math.sqrt(cursorColors.length));
      const rows = Math.ceil(cursorColors.length / rectsPerRow);

      const startX = this.x - drawSize;
      const startY = this.y - drawSize;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < rectsPerRow; col++) {
          const color = this.getAverageColor(
            cursorColors,
            row,
            col,
            rectsPerRow
          );
          if (color) {
            const x = startX + col * this.rectSize;
            const y = startY + row * this.rectSize;
            const size = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
            if (size <= this.radius) {
              this.ctx.fillStyle = color;
              this.ctx.fillRect(x, y, this.rectSize, this.rectSize);
              this.ctx.strokeStyle = this.strokeColor;
              this.ctx.lineWidth = 1;
              this.ctx.strokeRect(x, y, this.rectSize, this.rectSize);
            }
          }
        }
      }

      this.ctx.closePath();

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

  private getAverageColor(
    cursorColors: string[],
    row: number,
    col: number,
    rectsPerRow: number
  ): string | null {
    const pixels = [];
    const start = row * rectsPerRow + col;
    const end = start + 1;
    for (let i = start; i < end; i++) {
      if (cursorColors[i]) {
        pixels.push(this.hexToRgb(cursorColors[i]));
      }
    }

    if (pixels.length === 0) return null;

    // Average RGB values
    const avgRgb = pixels.reduce(
      (acc, color) => {
        acc.r += color.r;
        acc.g += color.g;
        acc.b += color.b;
        return acc;
      },
      { r: 0, g: 0, b: 0 }
    );

    avgRgb.r = Math.round(avgRgb.r / pixels.length);
    avgRgb.g = Math.round(avgRgb.g / pixels.length);
    avgRgb.b = Math.round(avgRgb.b / pixels.length);

    return this.rgbToHex(avgRgb.r, avgRgb.g, avgRgb.b);
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  }

  clear() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  draw(color: string, cursorColors: string[], x: number, y: number) {
    this.clear();
    this.drawBall(color, cursorColors);
    debugger;
    this.x = x;
    this.y = y;
  }
}

export { Cursor };

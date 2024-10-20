import { Cursor } from ".";

class CursorManager {
  private static instance: CursorManager | null = null;
  private cursor: Cursor | null = null;

  private constructor() {}

  public static getInstance(): CursorManager {
    if (!CursorManager.instance) {
      CursorManager.instance = new CursorManager();
    }
    return CursorManager.instance;
  }

  public initializeCursor(canvas: HTMLCanvasElement) {
    if (!this.cursor) {
      this.cursor = new Cursor(canvas);
    }
  }

  public resize(width: number, height: number) {
    this.cursor?.resize(width, height);
  }

  public clear() {
    this.cursor?.clear();
  }

  public draw(color: string, cursorColors: string[], x: number, y: number) {
    this.cursor?.draw(color, cursorColors, x, y);
  }
}

export { CursorManager };

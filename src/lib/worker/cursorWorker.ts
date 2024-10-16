import { CursorManager } from "@/components/Cursor";

// Worker onmessage logic
onmessage = (ev: MessageEvent) => {
  const { pos, canvas, centerColor, cursorColors, clear } = ev.data;

  const cursorManager = CursorManager.getInstance();

  cursorManager.initializeCursor(canvas);

  if (clear) {
    cursorManager.clear();
  }

  if (pos) {
    cursorManager.draw(centerColor, cursorColors, pos.x, pos.y);
  }
};

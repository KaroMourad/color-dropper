import { CursorManager } from "@/components/Cursor";
import { DATA_TYPE } from "@/lib/configs/worker";

onmessage = (e: MessageEvent) => {
  const cursorManager = CursorManager.getInstance();

  if (e.data.type === DATA_TYPE.INIT) {
    cursorManager.initializeCursor(e.data.canvas);
  }
  if (e.data.type === DATA_TYPE.RESIZE) {
    cursorManager.clear();
    cursorManager.resize(e.data.width, e.data.height);
  }
  if (e.data.type === DATA_TYPE.CLEAR) {
    cursorManager.clear();
  }
  if (e.data.type === DATA_TYPE.UPDATE) {
    cursorManager.draw(
      e.data.centerColor,
      e.data.cursorColors,
      e.data.pos.x,
      e.data.pos.y
    );
  }
};

import React from "react";
import ReactDOM from "react-dom/client";
import { SoundToggle } from "./buttons/SoundToggle";
import { BulletMenu } from "./buttons/BulletMenu";

export function mountUI(uiSignal: Phaser.Events.EventEmitter) {
  const rootEl = document.createElement("div");
  rootEl.id = "ui-layer";
  Object.assign(rootEl.style, {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none", // щоб кліки не заважали грі
  });
  document.body.appendChild(rootEl);

  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <>
      <SoundToggle uiSignal={uiSignal} />
      <BulletMenu balls={["Saw.png", "Mac_128.png", "Mace_1.png"]} uiSignal={uiSignal} />
    </>
  );
}
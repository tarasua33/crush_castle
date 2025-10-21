import React from "react";
import { BulletButton } from "./BulletButton";
import { EVENTS } from "../../game/libs/events/Events";

type BulletMenuProps = { balls: string[], uiSignal: Phaser.Events.EventEmitter };
type BulletMenuState = { activeIndex: number; open: boolean };

export class BulletMenu extends React.Component<BulletMenuProps, BulletMenuState> {
  private _available = false;
  constructor(props: BulletMenuProps) {
    super(props);

    this._available = false;
    const { uiSignal } = props;
    this.state = { activeIndex: 0, open: false };

    uiSignal.on(EVENTS.CHANGE_BULLET_AVAILABLE, this.toggleAvailable, this);
  }

  toggleAvailable = (available: boolean) => {
    this._available = available;
  }

  toggleMenu = () => {
    if (!this.state.open) {
      if (this._available) {
        this.setState((prev) => ({ open: !prev.open }));
      }
    }
    else {
      this.setState((prev) => ({ open: !prev.open }));
    }
  }

  selectBall = (i: number) => {
    if (this._available) {
      this.setState({ activeIndex: i, open: false });
      const { uiSignal } = this.props;
      uiSignal.emit(EVENTS.CHANGE_BULLET, i);
    } else {
      this.setState({ open: false });
    }
  };

  render() {
    const { balls } = this.props;
    const { activeIndex, open } = this.state;

    return (
      <div
        className={`absolute top-3 left-3 z-[1000] pointer-events-auto 
                    transition-all duration-300 flex flex-col items-center`}
      >

        <div
          className={`bg-[#F9BCBA] backdrop-blur-sm rounded-2xl shadow-lg flex flex-col items-center 
                      transition-all duration-300`}
          style={{
            height: open ? `${(balls.length) * 64}px` : "64px",
          }}
        >

          <BulletButton src={balls[activeIndex]} onClick={this.toggleMenu} />

          <div
            className={`flex flex-col items-center transition-all duration-300 
                        ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
          >
            {balls.map(
              (src, i) =>
                i !== activeIndex && (
                  <BulletButton
                    key={i}
                    src={src}
                    onClick={() => this.selectBall(i)}
                    className="w-14 h-14"
                  />
                )
            )}
          </div>
        </div>
      </div>
    );
  }
}
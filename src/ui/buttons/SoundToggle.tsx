import React from "react";

type Props = {};
type State = { enabled: boolean };

export class SoundToggle extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { enabled: true };
  }

  toggle = () => {
    const enabled = !this.state.enabled;
    this.setState({ enabled });
    window.dispatchEvent(new CustomEvent("toggle-sound", { detail: enabled }));
  };

  render() {
    return (
      <div className="absolute top-3 right-3 z-[1000] pointer-events-auto">
        <img
          src={this.state.enabled ? "/sound-on.png" : "/sound-off.png"}
          width={48}
          height={48}
          className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
          onClick={this.toggle}
          alt="Sound toggle"
        />
      </div>
    );
  }
}
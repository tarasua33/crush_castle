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
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          zIndex: 1000,
          pointerEvents: "auto",
        }}
      >
        <img
          src={this.state.enabled ? "/sound-on.png" : "/sound-off.png"}
          width={48}
          height={48}
          style={{ cursor: "pointer" }}
          onClick={this.toggle}
        />
      </div>
    );
  }
}
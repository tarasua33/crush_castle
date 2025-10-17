import React from "react";

type BulletButtonProps = {
  src: string;
  onClick?: () => void;
  className?: string;
};

export class BulletButton extends React.Component<BulletButtonProps> {
  render() {
    const { src, onClick, className } = this.props;
    return (
      <button
        onClick={onClick}
        className={`bg-[#EF5351] rounded-2xl shadow-md border-l-4 border-b-4 border-[#EA423F] w-16 h-16
                    flex flex-shrink-0 items-center justify-center 
                    transition-transform hover:scale-105 active:scale-95 ${className ?? ""}`}
      >
        <img src={src} alt="ball" className="w-10 h-10 object-contain" />
      </button>
    );
  }
}
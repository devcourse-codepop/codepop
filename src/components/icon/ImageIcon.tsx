import imageIcon from "../../assets/ImageIcon.svg";

export default function ImageIcon() {
  return (
    <div className="w-6 h-6 flex items-center justify-center">
      <img src={imageIcon} />
    </div>
  );
}

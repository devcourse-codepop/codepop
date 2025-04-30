import imageIcon from "../../assets/ImageIcon.svg";

export default function ImageIcon() {
  return (
    <>
      <div className="flex p-4 gap-3">
        <img src={imageIcon} />
      </div>
    </>
  );
}

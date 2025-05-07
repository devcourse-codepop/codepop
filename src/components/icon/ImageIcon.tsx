import imageIcon from "../../assets/ImageIcon.svg";

export default function ImageIcon() {
  return (
    <>
      <img
        src={imageIcon}
        className="w-[30px] h-[30px] inline-block cursor-pointer"
      />
    </>
  );
}

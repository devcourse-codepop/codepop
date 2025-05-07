import Button from "../components/common/Button";
import img_error from "../assets/images/error/404.svg";

export default function Error() {
  return (
    <>
      <div className="w-full min-h-dvh flex justify-center items-center flex-col">
        <img className="h-[500px]" src={img_error}></img>
        <Button className="button-style1" value="Go back home"></Button>
      </div>
    </>
  );
}

import Button from '../components/common/Button';
import img_error from '../assets/images/error/404.svg';
import { useNavigate } from 'react-router-dom';

export default function Error() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full min-h-dvh flex justify-center items-center flex-col">
        <img className="h-[500px]" src={img_error}></img>
        <Button
          className="button-style1 mt-10"
          value="Go back home"
          onClick={() => navigate('/')}
        ></Button>
      </div>
    </>
  );
}

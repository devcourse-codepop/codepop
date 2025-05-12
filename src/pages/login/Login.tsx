import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import logo from '../../assets/images/header/logo.svg';
import Delete from '../../assets/images/input-delete/input-delete.svg';
import defaultProfileImage from '../../assets/images/profile/defaultProfileImage.jpg';
import defaultCover from '../../assets/images/profile/defaultCover.png';

import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth/login';
import { AxiosError } from 'axios';
import { axiosInstance } from '../../api/axios';
import { useLocation } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const storeLogin = useAuthStore((state) => state.login);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [loginError, setLoginError] = useState('');

  const location = useLocation();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value && emailError) {
      setEmailError('');
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value && passwordError) {
      setPasswordError('');
    }
  };

  const fetchImageAsFile = async (url: string, filename: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // console.clear();
    // setEmailError('');
    // setPasswordError('');

    if (!email) {
      setLoginError('이메일은 필수 입력 항목입니다.');
      return;
    }

    if (!password) {
      setLoginError('비밀번호는 필수 입력 항목입니다.');
      return;
    }

    try {
      const res = await login(email, password);
      const token = res.data.token;
      console.log(res.data);
      storeLogin(token);

      if (!res.data.image) {
        const fileProfile = await fetchImageAsFile(
          defaultProfileImage,
          'default-profile.jpg'
        );
        const formDataProfile = new FormData();
        formDataProfile.append('image', fileProfile);
        formDataProfile.append('isCover', 'false');
        await axiosInstance.post('/users/upload-photo', formDataProfile, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (!res.data.coverImage) {
        const fileCover = await fetchImageAsFile(
          defaultCover,
          'default-cover.jpg'
        );
        const formDataCover = new FormData();
        formDataCover.append('image', fileCover);
        formDataCover.append('isCover', 'true');
        await axiosInstance.post('/users/upload-photo', formDataCover, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      const from = location.state?.from || '/';
      navigate(from);

      // navigate('/');
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 400) {
        const message = error.response.data as string;
        if (
          message.toLowerCase().includes('email') &&
          message.toLowerCase().includes('password') &&
          message.includes('match')
        ) {
          setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.');
        } else {
          console.error(err);
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-15">
      <img src={logo} alt="로고" className="w-50" />

      <form className="flex flex-col">
        <div className="mb-5">
          <div className="relative">
            <Input
              value={email}
              type="email"
              label="Email"
              className={`peer cursor-pointer outline-none border border-gray-300  focus:border-[#1E293B] focus:border-2 input-style1 `}
              placeholder=" "
              onChange={handleEmail}
            />
            {email && (
              <img
                src={Delete}
                alt="삭제"
                onClick={() => {
                  setEmail('');
                  setEmailError('');
                }}
                className="absolute w-[20px] h-[20px] right-5 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            )}
          </div>
        </div>

        <div className="mb-5">
          <div className="relative">
            <Input
              value={password}
              type="password"
              label="Password"
              className={`peer cursor-pointer outline-none border border-gray-300  focus:border-[#1E293B] focus:border-2 input-style1 `}
              placeholder=" "
              onChange={handlePassword}
            />

            {password && (
              <img
                src={Delete}
                alt="삭제"
                onClick={() => {
                  setPassword('');
                  setPasswordError('');
                }}
                className="absolute w-[20px] h-[20px] right-5 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            )}
          </div>
        </div>
        <p className="text-sm text-red-500 px-1 mb-2">
          {loginError || emailError || passwordError || '\u00A0'}
        </p>

        <Button
          value="Log In"
          className="button-style1 mb-5 mt-2"
          onClick={handleSubmit}
        />
        <p className="flex justify-center text-sm">
          <span className="opacity-50 ">회원이 아니신가요?</span>
          <a href="/signup" className="underline ml-2 text-[#1E293B]">
            회원가입
          </a>
        </p>
      </form>
    </div>
  );
}

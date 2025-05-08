import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import logo from '../../assets/images/header/logo.svg';
import Delete from '../../assets/images/input-delete/input-delete.svg';

import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { login } from '../../api/auth/login';
import { emailRegex, passwordRegex } from '../../utils/validators';
import { AxiosError } from 'axios';

export default function Login() {
  // const navigate = useNavigate();
  const storeLogin = useAuthStore((state) => state.login);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return passwordRegex.test(password);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // console.clear();
    // setEmailError('');
    // setPasswordError('');
    try {
      const res = await login(email, password);
      const token = res.data.token;
      storeLogin(token);
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
          setEmailError('이메일이 올바르지 않습니다.');
          setPasswordError('비밀번호가 올바르지 않습니다.');
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
              onChange={handleEmail}
              onBlur={() => {
                if (!email) {
                  setEmailError('이메일은 필수 입력 항목입니다.');
                  return;
                } else if (!validateEmail(email)) {
                  setEmailError('이메일 형식을 확인해주세요.');
                  return;
                } else {
                  setEmailError('');
                }
              }}
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
          <p className="text-sm text-red-500 pt-1 px-2 h-2.5">
            {emailError || '\u00A0'}
          </p>
        </div>

        <div className="mb-10">
          <div className="relative">
            <Input
              value={password}
              type="password"
              label="Password"
              onChange={handlePassword}
              onBlur={() => {
                if (!password) {
                  setPasswordError('비밀번호는 필수 입력 항목입니다.');
                  return;
                } else if (!validatePassword(password)) {
                  setPasswordError(
                    '비밀번호는 영문, 숫자, 특수문자를 포함해 8~16자로 입력해주세요.'
                  );
                  return;
                } else {
                  setPasswordError('');
                }
              }}
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
          <p className="text-sm text-red-500 pt-1 px-2 h-2.5">
            {passwordError || '\u00A0'}
          </p>
        </div>

        <Button
          value="Log In"
          className="button-style1 mb-5"
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

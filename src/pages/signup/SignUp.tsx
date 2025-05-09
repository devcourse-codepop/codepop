import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import logo from '../../assets/images/header/logo.svg';
import Delete from '../../assets/images/input-delete/input-delete.svg';

import { useState } from 'react';
import { signup } from '../../api/auth/signup';
import { useNavigate } from 'react-router-dom';
import {
  emailRegex,
  fullNameRegex,
  passwordRegex,
} from '../../utils/validators';
import { AxiosError } from 'axios';

export default function SignUp() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateEmail = (email: string) => {
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return passwordRegex.test(password);
  };

  const validateUsername = (fullName: string) => {
    return fullNameRegex.test(fullName);
  };

  const handleFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);

    if (value && fullNameError) {
      setFullNameError('');
    }
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

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value && confirmPasswordError) {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // console.clear();
    // setEmailError('');
    try {
      await signup(fullName, email, password);
      navigate('/login');
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 400) {
        const message = error.response.data as string;
        if (
          message.toLowerCase().includes('email') &&
          message.includes('used')
        ) {
          setEmailError('이미 사용 중인 이메일입니다.');
        } else {
          console.error(err);
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-15">
      <img src={logo} alt="Signup 로고" className="w-50" />

      <form className="flex flex-col">
        <div className="mb-5">
          <div className="relative">
            <Input
              value={fullName}
              type="email"
              label="Username"
              onChange={handleFullName}
              onBlur={() => {
                if (!fullName) {
                  setFullNameError('이름은 필수 입력 항목입니다.');
                  return;
                } else if (!validateUsername(fullName)) {
                  setFullNameError(
                    '이름은 특수문자 없이 10글자 이하로 입력해주세요.'
                  );
                  return;
                } else {
                  setFullNameError('');
                }
              }}
            />
            {fullName && (
              <img
                src={Delete}
                alt="삭제"
                onClick={() => {
                  setFullName('');
                  setFullNameError('');
                }}
                className="absolute w-[20px] h-[20px] right-5 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            )}
          </div>
          <p className="text-sm text-red-500 pt-1 px-1 h-2.5">
            {fullNameError || '\u00A0'}
          </p>
        </div>

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
                } else if (
                  email.split('@')[0].length < 5 ||
                  email.split('@')[0].length > 20
                ) {
                  setEmailError('이메일 아이디는 5~20자 사이여야 합니다.');
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
          <p className="text-sm text-red-500 pt-1 px-1 h-2.5">
            {emailError || '\u00A0'}
          </p>
        </div>

        <div className="mb-5">
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

          <p className="text-sm text-red-500 pt-1 px-1 h-2.5">
            {passwordError || '\u00A0'}
          </p>
        </div>

        <div className="mb-10">
          <div className="relative">
            <Input
              value={confirmPassword}
              type="password"
              label="Confirm Password"
              onChange={handleConfirmPassword}
              onBlur={() => {
                if (password !== confirmPassword) {
                  setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
                  return;
                } else {
                  setConfirmPasswordError('');
                }
              }}
            />

            {confirmPassword && (
              <img
                src={Delete}
                alt="삭제"
                onClick={() => {
                  setConfirmPassword('');
                  setConfirmPasswordError('');
                }}
                className="absolute w-[20px] h-[20px] right-5 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            )}
          </div>

          <p className="text-sm text-red-500 pt-1 px-1 h-2.5">
            {confirmPasswordError || '\u00A0'}
          </p>
        </div>

        <Button
          value="Sign Up"
          className="button-style1 mb-5 mt-2"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

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

    if (value && !validateUsername(value)) {
      setFullNameError('이름은 특수문자 없이 10글자 이하로 입력해주세요.');
    } else {
      setFullNameError('');
    }
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const [id] = value.split('@');
    if (id.split('@')[0].length < 5 || id.split('@')[0].length > 20) {
      setEmailError('이메일 아이디는 5~20자 사이여야 합니다.');
      return;
    }

    if (!validateEmail(value)) {
      setEmailError('이메일 형식을 확인해주세요.');
      return;
    }
    setEmailError('');
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (!validatePassword(password)) {
      setPasswordError(
        '비밀번호는 영문, 숫자, 특수문자를 포함해 8~16자로 입력해주세요.'
      );
      return;
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (password !== value) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    setFullNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!fullName) {
      setFullNameError('이름은 필수 입력 항목입니다.');
      hasError = true;
    } else if (!validateUsername) {
      setFullNameError('이름은 특수문자 없이 10글자 이하로 입력해주세요.');
      hasError = true;
    }

    if (!email) {
      setEmailError('이메일은 필수 입력 항목입니다.');
      hasError = true;
    } else {
      const [id] = email.split('@');
      if (id.length < 5 || id.length > 20) {
        setEmailError('이메일 아이디는 5~20자 사이여야 합니다.');
        hasError = true;
      } else if (!validateEmail(email)) {
        setEmailError('이메일 형식을 확인해주세요.');
        hasError = true;
      }
    }

    if (!password) {
      setPasswordError('비밀번호는 필수 입력 항목입니다.');
      hasError = true;
    } else if (!validatePassword(password)) {
      setPasswordError(
        '비밀번호는 영문, 숫자, 특수문자를 포함해 8~16자로 입력해주세요.'
      );
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('비밀번호 확인은 필수 입력 항목입니다.');
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    }

    if (hasError) return;

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

        <div className="mb-5">
          <div className="relative">
            <Input
              value={confirmPassword}
              type="password"
              label="Confirm Password"
              onChange={handleConfirmPassword}
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
          className="button-style1 mt-2"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

import { useEffect, useState } from 'react';
import ImageEditBtn from '../../../assets/ImageEditBtn.svg';
import { fullNameRegex, passwordRegex } from '../../../utils/validators';
import EditMenu from './EditMenu';
import Input from '../../../components/common/Input';
import { axiosInstance } from '../../../api/axios';
import PhotoUploadModal from './PhotoUploadModal';
import Button from '../../../components/common/Button';
import { getUserData } from '../../../api/profileInfo/profile';
import { useAuthStore } from '../../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from '../../../assets/images/profile/defaultProfileImage.jpg';
import defaultCover from '../../../assets/images/profile/defaultCover.png';

export default function EditProfile({ userId }: { userId: string }) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [userData, setUserData] = useState<User | null>(null);
  const [didEdit, setDidEdit] = useState(false);

  const [enteredErrorValues, setEnteredErrorValues] = useState<EnteredErrorValues>({
    myNameError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackgroundMenuOpen, setIsBackgroundMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCover, setIsCover] = useState(false);

  const [enteredUserValues, setEnteredUserValues] = useState<EnteredValues>({
    myName: user?.fullName || '',
    password: '',
    confirmPassword: '',
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreviewUrl, setProfilePreviewUrl] = useState<string | null>(null);

  const handleInputChange = (identifier: string, value: string) => {
    setEnteredUserValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit(false);
  };

  const axiosList = async () => {
    try {
      const { data: userData } = await getUserData(userId);
      setUserData(userData);
    } catch (error) {
      console.error('getUserData 오류:', error);
    }
  };

  useEffect(() => {
    setUserData(null);
    if (userId) axiosList();
  }, [userId]);

  if (!userData) {
    return <div className='text-center py-10 text-gray-500'>로딩 중...</div>;
  }

  const handleBlur = (identifier: string) => {
    const value = enteredUserValues[identifier as keyof EnteredValues];
    let errorMessage = '';

    if (identifier === 'myName') {
      if (!value) {
        errorMessage = '이름은 필수 입력 항목입니다.';
      } else if (!validateUsername(value)) {
        errorMessage = '이름은 특수문자 없이 10글자 이하로 입력해주세요.';
      }
    }

    if (identifier === 'password') {
      if (!value) {
        errorMessage = '비밀번호는 필수 입력 항목입니다.';
      } else if (!validatePassword(value)) {
        errorMessage = '비밀번호는 영문, 숫자, 특수문자를 포함해 8~16자로 입력해주세요.';
      }
    }

    if (identifier === 'confirmPassword') {
      if (value !== enteredUserValues.password) {
        errorMessage = '비밀번호가 일치하지 않습니다.';
      }
    }

    setEnteredErrorValues((prevErrors) => ({
      ...prevErrors,
      [`${identifier}Error`]: errorMessage,
    }));
  };

  const handleSavePhoto = (file: File, previewUrl: string) => {
    if (isCover) {
      setCoverImage(file);
      setCoverPreviewUrl(previewUrl);
    } else {
      setProfileImage(file);
      setProfilePreviewUrl(previewUrl);
    }
  };

  const handleDelete = async () => {
    setIsBackgroundMenuOpen(false);
    setIsProfileMenuOpen(false);

    const imagePath = isCover ? defaultCover : defaultProfileImage;
    const response = await fetch(imagePath);
    const blob = await response.blob();

    const file = new File([blob], 'default-image.jpg', { type: blob.type });

    if (isCover) {
      setCoverImage(file);
      setCoverPreviewUrl(URL.createObjectURL(file));
    } else {
      setProfileImage(file);
      setProfilePreviewUrl(URL.createObjectURL(file));
    }

    const formData = new FormData();
    if (!file) {
      return;
    }
    formData.append('image', imagePath);
    formData.append('isCover', String(isCover));
    await axiosInstance.post('/users/upload-photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { myName, password, confirmPassword } = enteredUserValues;

    const isValid = validateUsername(myName) && validatePassword(password) && confirmPassword === password;
    const hasValidationErrors = Object.values(enteredErrorValues).some((val) => val !== '');

    if (!isValid) {
      if (!hasValidationErrors) {
        setDidEdit(true);
      }
      return;
    }

    await axiosInstance.put('/settings/update-user', { fullName: myName, username: myName });
    await axiosInstance.put('/settings/update-password', { password });

    const imagePath = isCover ? coverImage : profileImage;
    if (imagePath) {
      const formData = new FormData();
      formData.append('image', imagePath);
      formData.append('isCover', String(isCover));
      await axiosInstance.post('/users/upload-photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    setDidEdit(true);
    navigate('/profile');
  };

  const validatePassword = (password: string) => passwordRegex.test(password);
  const validateUsername = (fullName: string) => fullNameRegex.test(fullName);

  const getMissingFieldsMessage = () => {
    const missing = [];
    if (!enteredUserValues.myName) missing.push('이름');
    if (!enteredUserValues.password) missing.push('비밀번호');
    if (!enteredUserValues.confirmPassword) missing.push('비밀번호 확인');
    return missing.length === 0
      ? '\u00A0'
      : `${missing.join(', ')} ${missing.length > 1 ? '항목을 입력해주세요.' : '를 입력해주세요.'}`;
  };

  return (
    <>
      <div className='w-full h-[calc(100vh-100px-30px)] bg-white rounded-[10px] shadow-md font-semibold '>
        <div className='relative h-[223px] rounded-t-[10px]'>
          <img
            src={coverPreviewUrl || userData.coverImage}
            className='w-full h-full rounded-t-[10px]'
            alt='Background'
          />
          <div className='relative'>
            <img
              src={ImageEditBtn}
              alt='BackgroundEdit'
              className='absolute cursor-pointer w-[30px] h-[30px] bottom-[19px] right-3'
              onClick={() => {
                setIsBackgroundMenuOpen((prev) => !prev);
                setIsCover(true);
              }}
            />
            {isBackgroundMenuOpen && (
              <EditMenu
                onEdit={() => setIsModalOpen(true)}
                onDelete={handleDelete}
                onClose={() => setIsBackgroundMenuOpen(false)}
              />
            )}
          </div>
        </div>

        <div className='flex justify-center items-center'>
          <div className='relative inline-block mt-[19px]'>
            <img
              src={profilePreviewUrl || userData.image}
              className='w-[300px] h-[300px] rounded-[5px] ml-[100px] border border-[#E3E3E3] object-cover'
              alt='Profile'
            />
            <div className='relative'>
              <img
                src={ImageEditBtn}
                alt='ProfileEdit'
                className='absolute cursor-pointer w-[30px] h-[30px] bottom-[19px] right-3'
                onClick={() => {
                  setIsProfileMenuOpen((prev) => !prev);
                  setIsCover(false);
                }}
              />
              {isProfileMenuOpen && (
                <EditMenu
                  onEdit={() => setIsModalOpen(true)}
                  onDelete={handleDelete}
                  onClose={() => setIsProfileMenuOpen(false)}
                />
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className='w-full max-w-md pl-[50px] ml-[120px] mt-9'>
            <p className='pt-[35px] font-bold text-[14px]'>이름</p>
            <Input
              type='text'
              value={enteredUserValues.myName}
              className='input-profile'
              onChange={(event) => handleInputChange('myName', event.target.value)}
              onBlur={() => handleBlur('myName')}
            />
            <p className='text-[11px] text-red-500 pt-1 h-2.5'>{enteredErrorValues.myNameError || '\u00A0'}</p>

            <p className='mt-[22px] font-bold text-[14px]'>이메일</p>
            <Input type='text' value={userData.email} readOnly className='input-profile bg-[#E3E3E3] text-black/50' />

            <p className='mt-[22px] font-bold text-[14px]'>비밀번호</p>
            <Input
              type='password'
              placeholder='Password'
              className='input-profile'
              value={enteredUserValues.password}
              onChange={(event) => handleInputChange('password', event.target.value)}
              onBlur={() => handleBlur('password')}
            />
            <p className='text-[11px] text-red-500 pt-1 h-2.5'>{enteredErrorValues.passwordError || '\u00A0'}</p>

            <p className='mt-[22px] font-bold text-[14px]'>비밀번호 확인</p>
            <Input
              type='password'
              placeholder='Password'
              className='input-profile'
              value={enteredUserValues.confirmPassword}
              onChange={(event) => handleInputChange('confirmPassword', event.target.value)}
              onBlur={() => handleBlur('confirmPassword')}
            />
            <p className='text-[11px] text-red-500 pt-1 h-2.5'>{enteredErrorValues.confirmPasswordError || '\u00A0'}</p>

            <div className='flex justify-end mr-[113px] mt-[25px] relative'>
              <p className='text-[11px] text-red-500 pt-2 h-2.5 absolute bottom-[45px]'>
                {didEdit && getMissingFieldsMessage()}
              </p>
              <Button value='수정' className='button-edit' />
            </div>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <PhotoUploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSavePhoto} />
      )}
    </>
  );
}

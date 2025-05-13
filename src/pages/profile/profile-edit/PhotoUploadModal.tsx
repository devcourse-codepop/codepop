import { useRef, useState } from 'react';

export default function PhotoUploadModal({ isOpen, onClose, onSave }: PhotoUploadModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 파일 변했을 때 URL 설정
  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  // 파일 드랍한 경우
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // 클릭 시 숨겨진 파일 선택창 오픈하게
  const handleButtonClick = () => inputRef.current?.click();

  // input에서 파일 선택한 경우
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onClose();
  };

  // 파일과 URL 넘기기
  const handleSave = () => {
    if (!selectedFile || !previewUrl) return alert('파일을 선택해주세요.');
    onSave(selectedFile, previewUrl);
    handleCancel();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50' onClick={handleCancel}>
      <div className='absolute inset-0 bg-black opacity-40 backdrop-blur-none'></div>
      <div
        className='bg-white p-6 rounded-[5px] w-96 shadow-lg relative'
        onClick={(e) => e.stopPropagation()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <h2 className='text-lg font-bold mb-4'>사진 업로드</h2>
        <div
          className='border-2 border-dashed border-gray-300 rounded-[5px] p-4 text-center cursor-pointer'
          onClick={handleButtonClick}
        >
          {previewUrl ? (
            <img src={previewUrl} alt='preview' className='w-full h-full object-cover rounded-[5px]' />
          ) : (
            <p className='text-gray-500'>클릭하거나 파일을 드래그하여 업로드</p>
          )}
          <input type='file' accept='image/*' className='hidden' ref={inputRef} onChange={handleFileInputChange} />
        </div>
        <div className='flex justify-end gap-2 mt-6'>
          <button className='px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer' onClick={handleCancel}>
            취소
          </button>
          <button
            className='bg-[#1E293B] text-white px-4 py-2 rounded-[5px] cursor-pointer'
            onClick={handleSave}
            disabled={!selectedFile}
          >
            변경
          </button>
        </div>
      </div>
    </div>
  );
}

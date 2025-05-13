import { useRef, useState } from 'react';

interface Theme {
  name: string;
}

interface PhotoUploadModalProps2 extends PhotoUploadModalProps {
  theme: Theme;
}

export default function PhotoUploadModal({
  isOpen,
  onClose,
  onSave,
  theme,
}: PhotoUploadModalProps2) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleButtonClick = () => inputRef.current?.click();

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

  const handleSave = () => {
    if (!selectedFile || !previewUrl) return alert('파일을 선택해주세요.');
    onSave(selectedFile, previewUrl);
    handleCancel();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleCancel}
    >
      <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-none"></div>
      <div
        className={`p-6 rounded-[5px] w-96 shadow-lg relative ${
          theme.name === 'Dark' ? 'bg-[#2D2D2D]' : 'bg-[#ffffff]'
        }`}
        onClick={(e) => e.stopPropagation()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <h2
          className={`text-lg font-bold mb-4 ${
            theme.name === 'Dark' ? 'text-[#ffffff]' : 'text-[#111111]'
          }`}
        >
          사진 업로드
        </h2>
        <div
          className="border-2 border-dashed border-gray-300 rounded-[5px] p-4 text-center cursor-pointer"
          onClick={handleButtonClick}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="preview"
              className="w-full h-full object-cover rounded-[5px]"
            />
          ) : (
            <p
              className={` ${
                theme.name === 'Dark'
                  ? 'text-[#ffffff] opacity-50'
                  : 'text-gray-500'
              }`}
            >
              클릭하거나 파일을 드래그하여 업로드
            </p>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={inputRef}
            onChange={handleFileInputChange}
          />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            className={`px-4 py-2   cursor-pointer ${
              theme.name === 'Dark'
                ? 'text-[#ffffff] opacity-60'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={handleCancel}
          >
            취소
          </button>
          <button
            className={` px-4 py-2 rounded-[5px] cursor-pointer ${
              theme.name === 'Dark'
                ? 'bg-[#ffffff] text-[#111111]'
                : 'bg-[#1E293B] text-white'
            }`}
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

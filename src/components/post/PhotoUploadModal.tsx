// import React, { useRef, useState } from "react";
// import { axiosAuthInstance } from "./api/a";

// export default function PhotoUploadModal({ isOpen, isCover, onClose }: PhotoUploadModalProps) {
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (file: File) => {
//     setSelectedFile(file);
//     const reader = new FileReader();
//     reader.onloadend = () => setPreviewUrl(reader.result as string);
//     reader.readAsDataURL(file);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     if (e.dataTransfer.files?.[0]) {
//       handleFileChange(e.dataTransfer.files[0]);
//     }
//   };

//   const handleButtonClick = () => inputRef.current?.click();

//   const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       handleFileChange(e.target.files[0]);
//     }
//   };

//   const handleCancel = () => {
//     setSelectedFile(null);
//     setPreviewUrl(null);
//     onClose();
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return alert("파일을 선택해주세요.");

//     const formData = new FormData();
//     formData.append("image", selectedFile);
//     formData.append("isCover", String(isCover));
//     await axiosAuthInstance.post("/users/upload-photo", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     handleCancel();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-none"></div>
//       <div
//         className="bg-white p-6 rounded-lg w-96 shadow-lg relative"
//         onDrop={handleDrop}
//         onDragOver={(e) => e.preventDefault()}
//       >
//         <h2 className="text-lg font-bold mb-4">사진 업로드</h2>

//         <div
//           className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer"
//           onClick={handleButtonClick}
//         >
//           {previewUrl ? (
//             <img src={previewUrl} alt="preview" className="w-full h-48 object-cover rounded" />
//           ) : (
//             <p className="text-gray-500">클릭하거나 파일을 드래그하여 업로드</p>
//           )}
//           <input type="file" accept="image/*" className="hidden" ref={inputRef} onChange={handleFileInputChange} />
//         </div>

//         <div className="flex justify-end gap-2 mt-6">
//           <button className="px-4 py-2 text-gray-600 hover:text-gray-800" onClick={handleCancel}>
//             취소
//           </button>
//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             onClick={handleUpload}
//             disabled={!selectedFile}
//           >
//             변경
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

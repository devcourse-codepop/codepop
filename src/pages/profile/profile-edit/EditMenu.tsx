import { useEffect, useRef } from 'react';

export default function EditMenu({ onEdit, onDelete, onClose }: EditMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className='absolute top-[-15px] right-[10px] w-[120px] bg-white border rounded-[5px] shadow-md z-50'
    >
      <div className='py-2 px-3 cursor-pointer hover:bg-gray-100 text-sm rounded-[5px] text-black' onClick={onEdit}>
        이미지 변경
      </div>
      <div className='py-2 px-3 cursor-pointer hover:bg-red-100 text-sm rounded-[5px] text-red-500' onClick={onDelete}>
        삭제하기
      </div>
    </div>
  );
}

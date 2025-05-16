export default function Button({
  className,
  value,
  onClick,
  imageSrc,
  imageAlt = '',
}: {
  className: string;
  value: string;
  imageSrc?: string;
  imageAlt?: string;
  onClick?: (e: React.FormEvent) => void;
}) {
  return (
    <>
      <button className={className} type='submit' onClick={onClick}>
        {value}
        {imageSrc && <img src={imageSrc} alt={imageAlt} className='w-[18px] h-[18px] inline-block ml-[8px] mb-[4px]' />}
      </button>
    </>
  );
}

{
  /* 
  <Button value="LogIn" className="button-style1"></Button>
  <Button value="완료" className="button-style2"></Button>
  <Button value="댓글달기" className="button-style3"></Button> 
*/
}

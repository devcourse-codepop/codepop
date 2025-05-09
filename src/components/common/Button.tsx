export default function Button({
  className,
  value,
  onClick,
}: {
  className: string;
  value: string;
  onClick: (e: React.FormEvent) => void;
}) {
  return (
    <>
      <button className={className} type="submit" onClick={onClick}>
        {value}
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

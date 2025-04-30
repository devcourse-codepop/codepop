export default function Button({
  className,
  value,
}: {
  className: string;
  value: string;
}) {
  return (
    <>
      <button className={className} type="submit">
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

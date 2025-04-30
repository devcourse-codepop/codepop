type OnlyLiterals<T> = T extends string
  ? string extends T
    ? never
    : T
  : never;

type ReactInputType = OnlyLiterals<
  React.InputHTMLAttributes<HTMLInputElement>["type"]
>;
type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "type"> & {
  type?: Exclude<ReactInputType, "radio" | "checkbox" | "range">;
};

export default function Input(props: InputProps) {
  const { className, placeholder, ...rest } = props;
  return (
    <>
      <input
        type={rest.type}
        className={className}
        placeholder={placeholder}
        disabled={rest.disabled}
      ></input>
    </>
  );
}

//  <Input type="email" placeholder="Email" className="input-style1"></Input>

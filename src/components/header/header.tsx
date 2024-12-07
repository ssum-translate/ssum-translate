type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return <header className="h-[56px] flex justify-center items-center font-semibold">{title}</header>;
}

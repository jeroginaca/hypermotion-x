export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-off-white flex flex-col items-center w-full mx-auto max-w-[108rem] px-6 pb-6 pt-[7rem] gap-[14rem]">
      {children}
    </div>
  );
}

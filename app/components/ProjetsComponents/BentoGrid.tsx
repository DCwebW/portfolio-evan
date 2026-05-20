export function BentoGrid({ children }: { children: React.ReactNode[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-none lg:grid-rows-2 gap-2 h-auto lg:h-[65vh] mb-10">
      {children}
    </div>
  );
}

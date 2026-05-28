"use client"

export function BentoGrid({ children }: { children: React.ReactNode[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(2,280px)] gap-3 isolate">
      {children}
    </div>
  );
}

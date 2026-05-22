"use client"

export function BentoGrid({ children }: { children: React.ReactNode[] }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 isolate"
      style={{
        // Sur desktop : 2 rangées de hauteur égale et explicite.
        // Les 4 petites cellules (aspect-video) héritent de cette hauteur
        // via h-full, et la featured couvre les 2 rangées exactement.
        gridTemplateRows: "repeat(2, 280px)",
      }}
    >
      {children}
    </div>
  );
}

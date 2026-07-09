import { createClient } from '@/app/api/supabase/server'
import type { Project } from '@/lib/projects'
import { ProjectsAdmin } from './ProjectsAdmin'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('category', { ascending: true })
    .order('display_order', { ascending: true })

  return (
    <main className="min-h-screen bg-(--dark) text-white px-5 md:px-8 lg:px-[52px] py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-10">
        <div>
          <span className="text-[11px] font-semibold text-(--red) uppercase tracking-[2px]">
            Back office
          </span>
          <h1 className="font-display font-black text-[clamp(28px,6vw,48px)] tracking-[-1px] text-white leading-none mt-2">
            Gestion des projets
          </h1>
          <p className="text-white/50 text-sm mt-3 max-w-xl">
            Ajoute, modifie ou supprime les projets affichés dans les sections
            Graphisme, Vidéo et Prise de vue du portfolio.
          </p>
        </div>

        {error && (
          <p className="text-red-400 text-sm">
            Erreur lors du chargement des projets : {error.message}
          </p>
        )}

        <ProjectsAdmin initialProjects={(projects as Project[] | null) ?? []} />
      </div>
    </main>
  )
}

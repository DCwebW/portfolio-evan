import { createClient } from '@/app/api/supabase/client'
import type { Project, ProjectCategory } from './projects'

export async function fetchProjects(category?: ProjectCategory): Promise<Project[]> {
  const supabase = createClient()
  let query = supabase.from('projects').select('*').order('display_order', { ascending: true })

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Erreur lors de la récupération des projets : ${error.message}`)
  }

  return (data as Project[]) ?? []
}

import snapshot from '@/data/projects-snapshot.json'
import type { Project, ProjectCategory } from './projects'

// Snapshot généré au build par scripts/generate-projects-snapshot.mjs (voir le
// script "prebuild" de package.json). Lire ce fichier statique évite tout
// appel réseau à Supabase pendant l'affichage du site.
const projectsSnapshot = snapshot as Project[]

export function getProjectsSnapshot(category?: ProjectCategory): Project[] {
  if (!category) return projectsSnapshot
  return projectsSnapshot.filter((p) => p.category === category)
}

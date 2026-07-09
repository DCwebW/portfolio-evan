export type ProjectCategory = 'graphisme' | 'video' | 'prise_de_vue'

export type Project = {
  id: string
  category: ProjectCategory
  title: string
  description: string
  media_url: string
  thumbnail_url: string | null
  featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export const PROJECT_CATEGORIES: { value: ProjectCategory; label: string }[] = [
  { value: 'graphisme', label: 'Graphisme' },
  { value: 'video', label: 'Vidéo' },
  { value: 'prise_de_vue', label: 'Prise de vue' },
]

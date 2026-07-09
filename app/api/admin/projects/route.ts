import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/app/api/supabase/admin'

const CATEGORIES = ['graphisme', 'video', 'prise_de_vue'] as const
type ProjectCategory = (typeof CATEGORIES)[number]

function isCategory(value: unknown): value is ProjectCategory {
  return typeof value === 'string' && (CATEGORIES as readonly string[]).includes(value)
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 })
  }

  const { category, title, description, media_url, thumbnail_url, featured, display_order } = body

  if (!isCategory(category)) {
    return NextResponse.json({ error: 'Catégorie invalide.' }, { status: 400 })
  }
  if (typeof title !== 'string' || !title.trim()) {
    return NextResponse.json({ error: 'Le titre est requis.' }, { status: 400 })
  }
  if (typeof media_url !== 'string' || !media_url.trim()) {
    return NextResponse.json({ error: "L'URL du média est requise." }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('projects')
    .insert({
      category,
      title: title.trim(),
      description: typeof description === 'string' ? description.trim() : '',
      media_url: media_url.trim(),
      thumbnail_url: typeof thumbnail_url === 'string' && thumbnail_url.trim() ? thumbnail_url.trim() : null,
      featured: Boolean(featured),
      display_order: Number.isFinite(display_order) ? display_order : 0,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ project: data }, { status: 201 })
}

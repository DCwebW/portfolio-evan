'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { PROJECT_CATEGORIES, type Project, type ProjectCategory } from '@/lib/projects'

type FormState = {
  title: string
  description: string
  media_url: string
  thumbnail_url: string
  featured: boolean
  display_order: string
}

const EMPTY_FORM: FormState = {
  title: '',
  description: '',
  media_url: '',
  thumbnail_url: '',
  featured: false,
  display_order: '0',
}

const inputClass =
  'bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-(--red) transition-colors w-full'
const labelClass = 'text-white/50 text-[11px] uppercase tracking-wider'

export function ProjectsAdmin({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('graphisme')
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<FormState>(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filteredProjects = useMemo(
    () =>
      projects
        .filter((p) => p.category === activeCategory)
        .sort((a, b) => a.display_order - b.display_order),
    [projects, activeCategory]
  )

  const resetForm = () => setForm(EMPTY_FORM)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: activeCategory,
          title: form.title,
          description: form.description,
          media_url: form.media_url,
          thumbnail_url: form.thumbnail_url || null,
          featured: form.featured,
          display_order: Number(form.display_order) || 0,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Une erreur est survenue.')
        return
      }

      setProjects((prev) => [...prev, data.project as Project])
      resetForm()
    } catch {
      setError('Impossible de contacter le serveur.')
    } finally {
      setSubmitting(false)
    }
  }

  const startEditing = (project: Project) => {
    setEditingId(project.id)
    setEditForm({
      title: project.title,
      description: project.description,
      media_url: project.media_url,
      thumbnail_url: project.thumbnail_url ?? '',
      featured: project.featured,
      display_order: String(project.display_order),
    })
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditForm(EMPTY_FORM)
  }

  const handleUpdate = async (id: string) => {
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editForm.title,
          description: editForm.description,
          media_url: editForm.media_url,
          thumbnail_url: editForm.thumbnail_url || null,
          featured: editForm.featured,
          display_order: Number(editForm.display_order) || 0,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Une erreur est survenue.')
        return
      }

      setProjects((prev) => prev.map((p) => (p.id === id ? (data.project as Project) : p)))
      cancelEditing()
    } catch {
      setError('Impossible de contacter le serveur.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    setError(null)

    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Une erreur est survenue.')
        return
      }

      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch {
      setError('Impossible de contacter le serveur.')
    } finally {
      setDeletingId(null)
    }
  }

  const isImage = (url: string) => /\.(jpe?g|png|webp|gif|avif)$/i.test(url)

  return (
    <div className="flex flex-col gap-10">
      {/* Onglets de catégorie */}
      <div className="flex gap-2 border-b border-(--border)">
        {PROJECT_CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActiveCategory(value)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors cursor-pointer ${
              activeCategory === value
                ? 'text-white border-b-2 border-(--red)'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Formulaire d'ajout */}
      <form
        onSubmit={handleCreate}
        className="flex flex-col gap-5 bg-white/[0.03] border border-(--border) rounded-2xl p-6 md:p-8"
      >
        <h2 className="font-display font-bold text-lg text-white">
          Ajouter un projet — {PROJECT_CATEGORIES.find((c) => c.value === activeCategory)?.label}
        </h2>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Titre</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Titre du projet"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Description</label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Décrivez le projet en quelques lignes..."
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>URL du média</label>
            <input
              type="text"
              value={form.media_url}
              onChange={(e) => setForm((prev) => ({ ...prev, media_url: e.target.value }))}
              placeholder="/Graphisme/MonVisuel.jpeg"
              required
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>URL de la vignette (optionnel)</label>
            <input
              type="text"
              value={form.thumbnail_url}
              onChange={(e) => setForm((prev) => ({ ...prev, thumbnail_url: e.target.value }))}
              placeholder="Poster pour une vidéo"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Ordre d&apos;affichage</label>
            <input
              type="number"
              value={form.display_order}
              onChange={(e) => setForm((prev) => ({ ...prev, display_order: e.target.value }))}
              className={inputClass}
            />
          </div>
          <label className="flex items-center gap-2 text-white/70 text-sm pb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
              className="w-4 h-4 accent-(--red)"
            />
            Mise en avant
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="self-start flex items-center gap-2 bg-(--red) hover:bg-(--red-hover) disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-full px-6 py-3 text-sm font-semibold transition-colors cursor-pointer"
        >
          {submitting ? 'Ajout en cours…' : 'Ajouter le projet'}
        </button>
      </form>

      {/* Liste des projets existants */}
      <div className="flex flex-col gap-4">
        <h2 className="font-display font-bold text-lg text-white">
          Projets existants ({filteredProjects.length})
        </h2>

        {filteredProjects.length === 0 && (
          <p className="text-white/40 text-sm">Aucun projet dans cette catégorie pour le moment.</p>
        )}

        <div className="flex flex-col gap-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white/[0.03] border border-(--border) rounded-2xl p-5 flex flex-col gap-4"
            >
              {editingId === project.id ? (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Titre</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Description</label>
                    <textarea
                      rows={3}
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, description: e.target.value }))
                      }
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>URL du média</label>
                      <input
                        type="text"
                        value={editForm.media_url}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, media_url: e.target.value }))
                        }
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>URL de la vignette</label>
                      <input
                        type="text"
                        value={editForm.thumbnail_url}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, thumbnail_url: e.target.value }))
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>Ordre</label>
                      <input
                        type="number"
                        value={editForm.display_order}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, display_order: e.target.value }))
                        }
                        className={inputClass}
                      />
                    </div>
                    <label className="flex items-center gap-2 text-white/70 text-sm pb-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editForm.featured}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, featured: e.target.checked }))
                        }
                        className="w-4 h-4 accent-(--red)"
                      />
                      Mise en avant
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpdate(project.id)}
                      disabled={submitting}
                      className="bg-(--red) hover:bg-(--red-hover) disabled:opacity-60 text-white rounded-full px-5 py-2.5 text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Enregistrer
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-white/10 hover:bg-white/20 text-white rounded-full px-5 py-2.5 text-sm transition-colors cursor-pointer"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  <div className="relative w-full md:w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-white/5">
                    {isImage(project.media_url) ? (
                      <Image
                        src={project.media_url}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/30 text-xs text-center px-2">
                        Média non prévisualisable
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white font-semibold text-sm truncate">{project.title}</h3>
                      {project.featured && (
                        <span className="text-[10px] uppercase tracking-wider text-(--red) bg-(--red)/10 rounded-full px-2 py-0.5">
                          Mise en avant
                        </span>
                      )}
                      <span className="text-[10px] text-white/30">
                        Ordre : {project.display_order}
                      </span>
                    </div>
                    <p className="text-white/40 text-xs mt-1 line-clamp-2">{project.description}</p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => startEditing(project)}
                      className="bg-white/10 hover:bg-white/20 text-white rounded-full px-4 py-2 text-xs font-medium transition-colors cursor-pointer"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={deletingId === project.id}
                      className="bg-white/10 hover:bg-red-500/20 disabled:opacity-60 text-white hover:text-red-400 rounded-full px-4 py-2 text-xs font-medium transition-colors cursor-pointer"
                    >
                      {deletingId === project.id ? 'Suppression…' : 'Supprimer'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

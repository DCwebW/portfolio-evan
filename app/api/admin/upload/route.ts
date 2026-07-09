import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

// Un bucket R2 dédié par catégorie de projet
const BUCKET_BY_CATEGORY: Record<string, string | undefined> = {
  graphisme: process.env.R2_BUCKET_IMAGES,
  video: process.env.R2_BUCKET_VIDEO,
  prise_de_vue: process.env.R2_BUCKET_PRISES_DE_VUE,
}

// URL publique r2.dev (ou domaine personnalisé) associée à chaque bucket,
// utilisée pour construire l'URL finale stockée en base
const PUBLIC_URL_BY_CATEGORY: Record<string, string | undefined> = {
  graphisme: process.env.R2_PUBLIC_URL_IMAGES,
  video: process.env.R2_PUBLIC_URL_VIDEO,
  prise_de_vue: process.env.R2_PUBLIC_URL_PRISES_DE_VUE,
}

const MAX_FILE_SIZE = 200 * 1024 * 1024 // 200 Mo

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_')
}

export async function POST(request: NextRequest) {
  const formData = await request.formData().catch(() => null)
  if (!formData) {
    return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 })
  }

  const file = formData.get('file')
  const category = formData.get('category')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Fichier manquant.' }, { status: 400 })
  }
  if (typeof category !== 'string' || !(category in BUCKET_BY_CATEGORY)) {
    return NextResponse.json({ error: 'Catégorie invalide.' }, { status: 400 })
  }

  const bucket = BUCKET_BY_CATEGORY[category]
  if (!bucket) {
    return NextResponse.json(
      { error: `Aucun bucket R2 configuré pour la catégorie "${category}" (variable d'environnement manquante).` },
      { status: 500 }
    )
  }
  const publicBaseUrl = PUBLIC_URL_BY_CATEGORY[category]
  if (!publicBaseUrl) {
    return NextResponse.json(
      { error: `Aucune URL publique R2 configurée pour la catégorie "${category}" (variable d'environnement manquante).` },
      { status: 500 }
    )
  }
  if (!process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    return NextResponse.json(
      { error: 'Configuration R2 incomplète : R2_ACCOUNT_ID, R2_ACCESS_KEY_ID et R2_SECRET_ACCESS_KEY doivent être définies dans .env.' },
      { status: 500 }
    )
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'Fichier trop volumineux (200 Mo max).' }, { status: 400 })
  }

  const key = `${category}/${randomUUID()}-${sanitizeFileName(file.name)}`
  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    await r2.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type || 'application/octet-stream',
      })
    )
  } catch (err) {
    console.error('POST /api/admin/upload', err)
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? `Échec de l'envoi vers R2 : ${err.message}`
            : "Échec de l'envoi vers R2.",
      },
      { status: 500 }
    )
  }

  const url = `${publicBaseUrl.replace(/\/$/, '')}/${key}`

  return NextResponse.json({ key, url }, { status: 201 })
}

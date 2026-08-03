// Récupère la table "projects" depuis Supabase au moment du build et écrit
// le résultat dans data/projects-snapshot.json. Ce fichier est ensuite lu de
// façon statique par le site (voir lib/projectsSnapshot.ts) : les visiteurs
// ne font donc plus aucun appel réseau à Supabase, ce qui évite de dépendre
// de sa disponibilité (le plan gratuit met le projet en pause après une
// période d'inactivité).
//
// Exécuté automatiquement avant "next build" via le script "prebuild" de
// package.json.
import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const snapshotPath = path.join(rootDir, 'data', 'projects-snapshot.json');

// Next.js charge automatiquement .env / .env.local pour "next dev"/"next build",
// mais ce script tourne en dehors de Next : on relit donc le .env nous-mêmes.
function loadEnvFile(filename) {
  const filePath = path.join(rootDir, filename);
  if (!existsSync(filePath)) return;

  for (const line of readFileSync(filePath, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile('.env');
loadEnvFile('.env.local');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    '[projects-snapshot] Variables Supabase manquantes : le snapshot existant est conservé tel quel.'
  );
  process.exit(0);
}

try {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;

  writeFileSync(snapshotPath, JSON.stringify(data ?? [], null, 2) + '\n', 'utf-8');
  console.log(
    `[projects-snapshot] ${data?.length ?? 0} projet(s) écrit(s) dans data/projects-snapshot.json`
  );
} catch (err) {
  // Supabase en pause, hors ligne, clé invalide... : on n'interrompt pas le
  // build, on garde le dernier snapshot connu (déjà committé dans le repo).
  console.warn(
    '[projects-snapshot] Échec de la récupération Supabase, snapshot existant conservé :',
    err instanceof Error ? err.message : err
  );
}

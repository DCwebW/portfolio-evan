-- =========================================================
-- Migration : table `projects`
-- Objectif : rendre les projets du portfolio (Graphisme,
-- Vidéo, Prises de vue) modifiables dynamiquement depuis
-- une back office, sans redéploiement du code.
-- =========================================================

-- Type de catégorie, aligné sur les 3 blocs de la section Projets
create type project_category as enum ('graphisme', 'video', 'prise_de_vue');

create table if not exists projects (
  id            uuid primary key default gen_random_uuid(),
  category      project_category not null,
  title         text not null,
  description   text not null default '',
  media_url     text not null,              -- URL de l'image ou de la vidéo (R2, Vercel Blob, /public, etc.)
  thumbnail_url text,                        -- optionnel : poster/vignette pour une vidéo
  featured      boolean not null default false, -- correspond à la cellule "featured" du BentoGrid
  display_order integer not null default 0,  -- ordre d'affichage au sein d'une catégorie
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_projects_category_order
  on projects (category, display_order);

-- Maintien automatique de updated_at
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_projects_updated_at on projects;
create trigger trg_projects_updated_at
  before update on projects
  for each row
  execute function set_updated_at();

-- =========================================================
-- Row Level Security
-- Lecture publique (le site affiche les projets à tous)
-- Écriture réservée aux utilisateurs authentifiés (back office /app/admin)
-- =========================================================
alter table projects enable row level security;

drop policy if exists "Projets visibles publiquement" on projects;
create policy "Projets visibles publiquement"
  on projects for select
  using (true);

drop policy if exists "Ecriture reservee aux admins connectes" on projects;
create policy "Ecriture reservee aux admins connectes"
  on projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- =========================================================
-- Données existantes : catégorie "Graphisme"
-- (reprises de lib/graphisme.ts, assets déjà présents dans /public/Graphisme)
-- =========================================================
insert into projects (category, title, description, media_url, display_order) values
('graphisme', 'Fally Ipupa - Promotion concert',
  'Réalisation d''un visuel promotionnel autour de l''univers de Fally Ipupa, pensé pour mettre en avant l''élégance, la présence scénique et l''énergie de l''artiste. Le travail graphique s''appuie sur une esthétique moderne et immersive afin de créer un support visuel fort, adapté à la communication événementielle et musicale.',
  '/Graphisme/FallyIpupaProjet.jpeg', 1),
('graphisme', 'Félicia - Communication artistique',
  'Création d''un support visuel destiné à accompagner la communication artistique et médiatique de Félicia.',
  '/Graphisme/FeliciaProjet.jpeg', 2),
('graphisme', 'Félicia - Communication artistique',
  'Création d''un support visuel destiné à accompagner la communication artistique et médiatique de Félicia.',
  '/Graphisme/FeliciaProjet2.png', 3),
('graphisme', 'Freddy Conduite',
  'Cette affiche promotionnelle a été réalisée dans le cadre d''une campagne de communication pour l''auto-école Freddy Conduite. L''objectif était de mettre en avant une offre exceptionnelle de 10 % de réduction sur le permis B durant la période des soldes, tout en attirant rapidement l''attention grâce à une identité visuelle dynamique et impactante.',
  '/Graphisme/FreddyConduiteProjet.jpeg', 4),
('graphisme', 'Freddy Conduite',
  'Cette affiche promotionnelle a été réalisée pour mettre en avant l''offre « TeamCOOP » proposée par l''auto-école Freddy Conduite. Le concept repose sur une inscription en groupe permettant aux candidats de bénéficier de tarifs avantageux sur le permis B et le permis A2 en formant une équipe de trois personnes minimum.',
  '/Graphisme/FreddyConduiteProjet2.jpeg', 5),
('graphisme', 'La Fouine - Héritage & retour à Bercy',
  'Création d''un visuel retraçant le parcours musical de La Fouine à travers les différentes époques de sa carrière et les projets qui ont marqué le rap français.',
  '/Graphisme/LaFouineProjet.jpeg', 6),
('graphisme', 'Lil Durk - Mixtape',
  'Cette création s''inspire directement de l''univers visuel de Lil Durk et du collectif OTF (Only The Family).',
  '/Graphisme/LilDurkProjet.jpeg', 7),
('graphisme', 'Mbappé - Signature au Real Madrid',
  'Cette affiche a été réalisée à l''occasion de la signature de Kylian Mbappé au Real Madrid.',
  '/Graphisme/MbappeProjet.jpeg', 8),
('graphisme', 'Pierre Feret - Affiche',
  'Affiche publicitaire réalisée pour l''atelier de joaillerie Pierre Feret (Fontainebleau). Un design élégant et haut de gamme valorisant le savoir-faire artisanal et les services de l''atelier',
  '/Graphisme/PierreFeretAffiche.png', 9),
('graphisme', 'Pierre Feret - Affiche 2',
  'Affiche publicitaire réalisée pour l''atelier de joaillerie Pierre Feret (Fontainebleau). Un design élégant et haut de gamme valorisant le savoir-faire artisanal et les services de l''atelier',
  '/Graphisme/PierreFeretAffiche-2.png', 10),
('graphisme', 'S-Pri Noir - La clé du château',
  'Cette création a été conçue pour accompagner le single La clé du château. Le concept visuel s''articule autour de la symbolique de la clé, utilisée ici comme élément central afin de renforcer l''identité et le sens du titre.',
  '/Graphisme/S-PriNoirProjet.jpeg', 11),
('graphisme', 'Tiakola',
  'Pour cette création réalisée autour de Tiakola et de son projet Melo, j''ai imaginé une direction artistique inspirée des codes visuels du documentaire. L''objectif était de concevoir un visuel capable de retranscrire l''univers de l''artiste, son identité et l''atmosphère qui entoure son image.',
  '/Graphisme/TiakolaProjet.jpeg', 12);

-- =========================================================
-- Données existantes : catégorie "Vidéo"
-- (reprises de VIDEO_META dans app/components/Projets.tsx)
-- media_url à compléter depuis la back office avec l'URL R2 réelle
-- de chaque vidéo (actuellement servie dynamiquement par /api/get-videos)
-- =========================================================
insert into projects (category, title, description, media_url, featured, display_order) values
('video', 'Felicia (interprétation d''un extrait inédit)',
  'Cette vidéo a été réalisée pour l''artiste Felicia à l''occasion de l''interprétation d''un extrait de son prochain single. L''objectif était de créer une ambiance immersive et artistique mettant en valeur son univers musical, son expression scénique et l''émotion transmise à travers sa performance.',
  'A_COMPLETER', true, 1),
('video', 'Nemours Basket Club - Gala Game',
  'Vidéo réalisée pour un match de Gala organisé par le Nemours Basket Club au Gymnase Roux',
  'A_COMPLETER', false, 2),
('video', 'Mitcho - Session Studio',
  'Cette vidéo a été tournée pendant une séance studio de la chanteuse Michou afin de montrer les coulisses de l''enregistrement et son immersion dans le processus créatif. À travers des images spontanées et une ambiance intimiste, cette réalisation met en lumière le travail artistique, l''énergie du studio et l''authenticité du moment.',
  'A_COMPLETER', false, 3),
('video', 'Félicia - Session Studio',
  'Cette vidéo plonge au cœur d''une séance studio de l''artiste Felicia pendant l''enregistrement de ses morceaux. L''objectif était de montrer les coulisses de la création musicale en mettant en avant l''ambiance du studio, le travail artistique et l''authenticité du processus d''enregistrement.',
  'A_COMPLETER', false, 4),
('video', 'Amewoui (préparation physique)',
  'Cette vidéo met en avant la préparation physique du joueur de football Amewoui à travers une réalisation dynamique centrée sur l''effort, la discipline et la performance sportive. L''objectif était de retranscrire l''intensité de ses entraînements tout en valorisant son engagement et son rythme de préparation.',
  'A_COMPLETER', false, 5),
('video', 'Training Arouna',
  'Cette vidéo a été réalisée lors d''un entraînement du joueur Harouna du Nemours Basketball Club. L''objectif était de capturer l''intensité des exercices, la concentration du joueur et l''énergie propre à la pratique du basketball.',
  'A_COMPLETER', false, 6);

-- Catégorie "Prise de vue" : aucune métadonnée n'était en dur dans le code
-- (titres générés depuis le nom de fichier R2). À créer depuis la back office.

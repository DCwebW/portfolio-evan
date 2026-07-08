-- =========================================================
-- Migration : seed de la catégorie "prise_de_vue"
-- Complète la table `projects` (voir 0001_create_projects.sql)
-- avec les prises de vue existantes, dans l'ordre d'affichage souhaité.
-- media_url à compléter depuis la back office (fichiers hébergés sur R2).
-- =========================================================

insert into projects (category, title, description, media_url, display_order) values
('prise_de_vue', 'Entrainement Amewoui',
  'Prise de vue faite lors de l''entrainement d''Amewoui',
  'A_COMPLETER', 1),
('prise_de_vue', 'Entrainement Amewoui-2',
  'Prise de vue faite lors de l''entrainement d''Amewoui',
  'A_COMPLETER', 2),
('prise_de_vue', 'Match de Gala du Nemours Basket Club',
  'Vidéo faite à l''occasion d''un match du Nemours Basket Club',
  '', 3);

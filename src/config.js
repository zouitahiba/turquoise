// ============================================================
//  PERSONNALISEZ VOTRE INVITATION ICI
// ============================================================
export const config = {
  // Langue affichée à l'ouverture : 'ar' ou 'fr'
  langue: 'ar',

  prenom1: 'Alma',
  prenom2: 'Aziz',
  prenom1Ar: 'ألما',
  prenom2Ar: 'عزيز',

  // Date et heure (AAAA-MM-JJTHH:MM)
  date: '2026-12-26T18:30',
  rsvpAvant: '2026-12-15',

  lieu: {
    nom: 'Hôtel de Ville de Tunis',
    nomAr: 'بلدية تونس',
    ville: 'Tunis',
    villeAr: 'تونس',
    // Remplacez par votre photo : déposez « lieu.jpg » dans public/ puis mettez '/lieu.jpg'
    image: '/lieu.svg',
    maps: 'https://www.google.com/maps/search/?api=1&query=H%C3%B4tel+de+Ville+de+Tunis',
  },

  programme: [
    { heure: '18:30', icone: 'bouquet', fr: 'Accueil', ar: 'الاستقبال' },
    { heure: '19:30', icone: 'anneaux', fr: 'Acte de mariage', ar: 'عقد القران' },
    { heure: '21:00', icone: 'musique', fr: 'Soirée', ar: 'السهرة' },
  ],

  // Code couleur (dress code) : nom affiché + couleur
  couleurs: [
    { fr: 'Turquoise', ar: 'فيروزي', hex: '#3FB2A8' },
    { fr: 'Menthe glacée', ar: 'نعناعي', hex: '#A9DDD5' },
    { fr: 'Ivoire', ar: 'عاجي', hex: '#F5EFE4' },
    { fr: 'Nacre', ar: 'لؤلؤي', hex: '#E7E3DC' },
    { fr: 'Or', ar: 'ذهبي', hex: '#C9A66D' },
  ],

  // Mot des mariés
  mot: {
    fr: 'Deux cœurs, une promesse, et toute une vie à écrire ensemble. Votre présence à nos côtés en ce jour si précieux sera le plus beau des cadeaux. Merci de faire partie de notre histoire.',
    ar: 'قلبان، ووعدٌ واحد، وعمرٌ نكتبه معًا. حضوركم إلى جانبنا في هذا اليوم الغالي هو أجمل هدية. شكرًا لأنكم جزء من حكايتنا.',
  },

  // Déposez « musique.mp3 » dans public/ (sinon une mélodie douce est générée)
  musique: '/musique.mp3',

  // Optionnel : URL qui reçoit les réponses RSVP (POST JSON). Vide = stockage local.
  rsvpEndpoint: '',
};

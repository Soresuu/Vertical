/*
 * ============================================================
 *  TEXTOS Y ENLACES DE LA WEB  (editar aquí)
 * ============================================================
 *  - Cada texto existe en inglés (en) y español (es).
 *  - En "lead" y "founders" las palabras entre llaves, p. ej. {athletes}
 *    o {marc}, son las partes interactivas. No borres las llaves:
 *    puedes mover su posición dentro de la frase y cambiar su texto
 *    en "categories" / "people".
 *  - Para añadir o quitar talentos, edita las listas de "talents".
 *  - {br} fuerza un salto de línea; {brd} solo lo fuerza en escritorio.
 * ============================================================
 */
window.VERTICAL_CONTENT = {
  defaultLang: 'en',

  // Personas (fundadores): nombre visible y enlace al pulsar la foto o el nombre
  people: {
    marc:  { name: 'Marc Márquez',            url: 'https://www.instagram.com/marcmarquez93/' },
    jaime: { name: 'Jaime Martínez Recasens', url: 'https://www.linkedin.com/in/jmrecasens/' },
    alex:  { name: 'Álex Márquez',            url: 'https://www.instagram.com/alexmarquez73/' }
  },

  // Número que aparece en superíndice delante de cada palabra interactiva
  markers: {
    athletes: 1, creators: 2, artists: 3,
    marc: 4, jaime: 5, alex: 6
  },

  // Talentos que se muestran al pulsar cada categoría
  talents: {
    athletes: [
      { name: 'Marc Márquez',  url: 'https://www.instagram.com/marcmarquez93/' },
      { name: 'Alex Márquez',  url: 'https://www.instagram.com/alexmarquez73/' },
      { name: 'Máximo Quiles', url: 'https://www.instagram.com/maximoquiles28/' }
    ],
    creators: [
      { name: 'María Pombo',             url: 'https://www.instagram.com/mariapombo/' },
      { name: 'Marta Pombo',             url: 'https://www.instagram.com/mpombor/' },
      { name: 'Lucía Pombo',             url: 'https://www.instagram.com/luciapombo/' },
      { name: 'Pablo Castellano',        url: 'https://www.instagram.com/pablocastellano86/' },
      { name: 'María Martín de Pozuelo', url: 'https://www.instagram.com/mariamartinn/' },
      { name: 'Gemma Pinto',             url: 'https://www.instagram.com/gemmpinto/' },
      { name: 'Lucía de Luis',           url: 'https://www.instagram.com/luciadeluis/' },
      { name: 'Sarah Catalá',            url: 'https://www.instagram.com/sarahcatala/' }
    ],
    artists: [
      { name: 'JA Bayona',              url: 'https://www.instagram.com/filmbayona/' },
      { name: 'Candela Peña',           url: 'https://www.instagram.com/candela_penya/' },
      { name: 'Vicky Luengo',           url: 'https://www.instagram.com/vickyluengo/' },
      { name: 'Miguel Ángel Silvestre', url: 'https://www.instagram.com/miguelangelsilvestre/' }
    ]
  },

  i18n: {
    en: {
      title: 'Vertical — Building Global Icons',
      description: 'At Vertical, we represent athletes, creators and artists, building their personal brands and expanding their influence beyond their fields.',
      tagline: 'Building Global Icons',
      status: 'Website Under Development',
      categories: { athletes: 'Athletes,', creators: 'Creators', artists: 'Artists' },
      lead: 'At Vertical, we represent {athletes} {creators} and {artists}, building their personal brands and expanding their influence beyond their fields.',
      founders: [
        'Founded in Madrid in 2022 by {marc}, {jaime} and {alex}, Vertical brings together strategic expertise, global ambition, high standards and a long-term vision.',
        'A selected few. Each for a reason.{br}We believe the people we represent should be more than the face of a project.{br}They should be the ones leading it.'
      ],
      rosterTitle: { athletes: 'Athletes', creators: 'Creators', artists: 'Artists' },
      showing: 'Showing {category}',
      addressAria: 'C/ Ayala 27, Madrid (open in Google Maps)',
      copyright: '© 2026 Vertical Group. All rights reserved.'
    },
    es: {
      title: 'Vertical — Building Global Icons',
      description: 'En Vertical representamos y desarrollamos la marca personal de deportistas, creadores y artistas que trascienden su disciplina.',
      tagline: 'Building Global Icons',
      status: 'Web en desarrollo',
      categories: { athletes: 'Deportistas,', creators: 'Creadores', artists: 'Artistas' },
      lead: 'En Vertical representamos y desarrollamos la marca personal de {athletes} {creators} y {artists} que trascienden su disciplina.',
      founders: [
        'Fundada en Madrid en 2022 por {marc}, {jaime} y {alex}, Vertical combina estrategia, exigencia, ambición global y visión a largo plazo.',
        'Pocos nombres, ninguno al azar.{br}Nuestra filosofía es que los talentos no solo representen proyectos, sino que sean quienes los lideren.'
      ],
      rosterTitle: { athletes: 'Deportistas', creators: 'Creadores', artists: 'Artistas' },
      showing: 'Mostrando {category}',
      addressAria: 'C/ Ayala 27, Madrid (abrir en Google Maps)',
      copyright: '© 2026 Vertical Group. Todos los derechos reservados.'
    }
  }
};

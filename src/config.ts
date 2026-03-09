/**
 * SECURITY NOTE: All HTML content in this configuration file is automatically
 * sanitized using DOMPurify before being rendered on the website. This prevents
 * Cross-Site Scripting (XSS) attacks and ensures that only safe HTML tags and
 * attributes are allowed. We use a <SafeHtml> component to enforce sanitization.
 * 
 * Allowed tags: a, span, div, br, ul, li, strong, em, i, p
 * Allowed attributes: href, target, rel, style, class
 * 
 * For more details, see src/components/SafeHtml.astro
 */

// Colors
const ACCENT_COLOR = "#E86C5E";

// Link constants
const LINKS = {
  github: "https://github.com/charlas-rse-espanol",
  email: "charlas.rse.espanol@gmail.com",
  rsecon24: "https://rsecon24.society-rse.org/",
  mailingList: "https://groups.google.com/g/rse-en-espaniol/",
  AlanTuringInstitute: "https://www.turing.ac.uk/",
  SainsburyWellcomeCentre: "https://www.sainsburywellcome.org/",
} as const;

// Section titles
const SECTIONS = {
  about: {
    id: "about",
    title: "About",
    navTitle: "About",
  },
  nextSpeaker: {
    id: "next-speaker",
    title: "Next session",
    navTitle: "Next session",
  },
  previousSessions: {
    id: "previous-sessions",
    title: "Previous sessions",
    navTitle: "Previous sessions",
  },
  callForSpeakers: {
    id: "speak-with-us",
    title: "Interested in presenting?",
    navTitle: "¡Participa!",
  },
  organizers: {
    id: "organizers",
    title: "Organisers",
    navTitle: "Organisers",
  },
} as const;

// Create links function
const createLink = (url: string, text: string, color: string = ACCENT_COLOR) =>
  `<a href='${url}' target='_blank' rel='noopener noreferrer' style='color: ${color}; font-weight: bold;'>${text}</a>`;

// Create GitHub handle links with @ prefix
const createGitHubHandleLink = (handle: string, color: string = ACCENT_COLOR) =>
  createLink(`https://github.com/${handle}`, `@${handle}`, color);

export const siteConfig = {
  name: "Charlas RSE en español",
  title: "Tech talks en español",
  description: "Monthly seminar series showcasing Research Software Engineers across the Spanish-speaking world",
  accentColor: ACCENT_COLOR,
  sections: SECTIONS,
  logo: "/images/charlas-logo.png",
  logoAlt: "Charlas RSE en español logo",

  // Hero layout options: "centered" | "inline" | "split"
  // "centered" = large logo above title (Option A)
  // "inline" = logo next to title (Option B)  
  // "split" = logo on left, text on right (Option C)
  heroLayout: "centered" as "centered" | "inline" | "split",

  social: {
    github: LINKS.github,
    email: LINKS.email,
    mailingList: LINKS.mailingList,
  },

  //////////////////////////////////////////////////////////////
  // ABOUT SECTION
  //////////////////////////////////////////////////////////////
  aboutMe:
    "<span style='font-size: 1.25em;'>🤓</span> Keen to connect <i>en español</i> with engineers & researchers in Europe and across the pond? " +
    "<br/>" +
    "<span style='font-size: 1.25em;'>🦉</span> Curious to see how far your Duolingo skills can take you in a tech talk? " +
    "<br/>" +
    "<span style='font-size: 1.25em;'>❓</span> Tired of announcements full of questions? " +
    "<br/><br/>" +
    "<div style='text-align: center;'><strong>Then come join us at the monthly <i>Charlas RSE en español!</i> 👏</strong></div>" +
    "<br/>" +
    "An initiative started by Carlos (" + createGitHubHandleLink('cptanalatriste') + ", from the " +
    createLink(LINKS.AlanTuringInstitute, "Alan Turing Institute") + ") " +
    "and Sofía (" + createGitHubHandleLink('sfmig') + ", from the " +
    createLink(LINKS.SainsburyWellcomeCentre, 'Sainsbury Wellcome Centre') + ") " +
    "from a conversation at the DEI workshop during " + createLink(LINKS.rsecon24, 'RSECon24') + ". " +
    "Our aims are: " +
    "<ul style='margin-top: 0.5rem; margin-left: 1.5rem; list-style-type: disc;'>" +
    "<li>to showcase the RSE role across the Spanish-speaking world</li>" +
    "<li>to connect with the cool research and tech carried out by hispanophones all over the world</li>" +
    "<li>to selfishly speak our mother tongue before we forget it!</li>" +
    "</ul>",

  //////////////////////////////////////////////////////////////
  // NEXT SPEAKER
  //////////////////////////////////////////////////////////////
  // If only name, institution and date are provided a "Save the date" message will be rendered
  // If also title, abstract, bio, time and location are provided, a full card is shown
  // If you just want to display a custom message, write it under the `message` key
  nextSpeaker: {
    name: "Patricia Loto",
    institution: "RSE Argentina",
    date: "Monday 20th April 2026",
    // title: "Ribbit AI - Un “Shazam” Para Ranas",
    // abstract:
    //   "Ribbit AI es una aplicación web que utiliza el aprendizaje automático para la identificación de anuros (ranas y sapos) " +
    //   "a través de vocalizaciones. Busca contribuir datos a repositorios de biodiversidad, con el fin de reducir la brecha de " +
    //   "datos que existe en zonas altamente ricas en especies. Así mismo, tiene como objetivo empoderar a los científicos " +
    //   "ciudadanos, y ayudar a los investigadores en el monitoreo ecológico. ",
    // bio:
    //   createLink("https://julianagomezconsuegra-edi.netlify.app/", "Juliana Gómez Consuegra") +
    //   " se desempeña como especialista en calidad de datos en " +
    //   createLink("https://www.cdp.net/en", "CDP") +
    //   ", una ONG pionera en la divulgación de datos de impacto ambiental. Tiene una maestría en ciencia de datos de la " +
    //   "Universidad de California en Berkeley, y una maestría y pregrado en biología de la Universidad de los Andes de Bogotá. " +
    //   "Ribbit AI es la combinación de estas dos pasiones - los datos y las ranas; su especie de estudio. Adicionalmente, ha " +
    //   "sido investigadora, docente y empresaria. El año pasado, pasó del desarrollo de software para el análisis de datos " +
    //   "educativos, a la ciencia de datos como herramienta de mitigación del cambio climático. ",
    // time: "4pm UK time",
    // location:
    //   "Online and in-person at " +
    //   createLink("https://maps.app.goo.gl/mPhtJThfkRHjj1os6", "Chandler House (Room 201), 2 Wakefield St, London WC1N 1PF"),
    // calendarLink: "https://drive.usercontent.google.com/u/0/uc?id=1axIbEh93QF1njUKKzhz2BATZvv3-si4N&export=download",
    // // "https://drive.google.com/file/d/1axIbEh93QF1njUKKzhz2BATZvv3-si4N/view?usp=sharing",
  },

  //////////////////////////////////////////////////////////////
  // PREVIOUS SESSIONS 
  //////////////////////////////////////////////////////////////
  previousSessions: [
  {
      name: "Juliana Gómez Consuegra",
      institution: "Ribbit AI & CDP",
      date: "9 de marzo de 2026",
      title: "Ribbit AI - Un “Shazam” Para Ranas",
      abstract:
        "Ribbit AI es una aplicación web que utiliza el aprendizaje automático para la identificación de anuros (ranas y sapos) " +
        "a través de vocalizaciones. Busca contribuir datos a repositorios de biodiversidad, con el fin de reducir la brecha de " +
        "datos que existe en zonas altamente ricas en especies. Así mismo, tiene como objetivo empoderar a los científicos " +
        "ciudadanos, y ayudar a los investigadores en el monitoreo ecológico. ",
      bio:
        createLink("https://julianagomezconsuegra-edi.netlify.app/", "Juliana Gómez Consuegra") +
        " se desempeña como especialista en calidad de datos en " +
        createLink("https://www.cdp.net/en", "CDP") +
        ", una ONG pionera en la divulgación de datos de impacto ambiental. Tiene una maestría en ciencia de datos de la " +
        "Universidad de California en Berkeley, y una maestría y pregrado en biología de la Universidad de los Andes de Bogotá. " +
        "Ribbit AI es la combinación de estas dos pasiones - los datos y las ranas; su especie de estudio. Adicionalmente, ha " +
        "sido investigadora, docente y empresaria. El año pasado, pasó del desarrollo de software para el análisis de datos " +
        "educativos, a la ciencia de datos como herramienta de mitigación del cambio climático. ",
      skills: ["machine learning", "biodiversity", "bioacoustics"],
      // linkButtons: [
      //   { href: "https://youtu.be/8SBdCbtlcLw", label: "View demo 🎥" },
      //   { href: "https://drive.google.com/file/d/1P7hCDrdway_C9VsSR0h9M8h3y4aUS335/view?usp=sharing", label: "View slides" }
      // ],
  },
  {
    name: "David Salvador-Jasin",
    institution: "The Alan Turing Institute",
    date: "16 de febrero 2026",
    title: "SVD-ROM: Modelado de Orden Reducido de matrices enormes mediante la Descomposición en Valores Singulares",
    abstract:
      "Presentamos SVD-ROM, un paquete Python de código abierto para realizar Modelado de Orden Reducido (ROM) de matrices " +
      "muy grandes mediante la Descomposición en Valores Singulares (SVD). A pesar de la alta dimensionalidad de los " +
      "conjuntos de datos que se suelen encontrar en escenarios reales como la dinámica de fluidos o el clima y la " +
      "meteorología, estos suelen ser de bajo rango: existen algunos patrones dominantes que explican esta alta " +
      "dimensionalidad. La SVD es una técnica de reducción de dimensionalidad útil para estos sistemas y ofrece las ventajas " +
      "de ser explicable y computacionalmente eficiente. SVD-ROM permite la aplicación de métodos de aprendizaje automático " +
      "basados ​​en SVD, como la Descomposición Ortogonal Propia (POD) o la Descomposición en Modos Dinámicos (DMD). " +
      "Utilizamos Dask para computación paralela y fuera del núcleo, Xarray para matrices N-dimensionales etiquetadas, y " +
      "formatos de datos como Zarr y NetCDF para el almacenamiento fragmentado de matrices grandes. Desarrollamos SVD-ROM " +
      "pensando en la facilidad de uso, exponiendo una API de Python que permite la aplicación directa de métodos como " +
      "preprocesamiento, ajuste de modelos, reconstrucción y pronóstico. Además, Dask facilita la portabilidad del código " +
      "entre computadoras portátiles, clústeres de HPC o la nube, permitiendo al usuario ejecutar SVD-ROM en diferentes " +
      "entornos computacionales con cambios mínimos. El desarrollo de SVD-ROM también ha dado lugar a múltiples " +
      "contribuciones a PyDMD, el paquete de Python de código abierto más popular para la aplicación de DMD. En esta charla, " +
      "mostramos cómo podemos ajustar un modelo DMD a un conjunto de datos meteorológicos globales de decenas de GB y generar " +
      "un pronóstico subestacional preciso (con un horizonte de seis semanas) en una computadora portátil en tan solo unos " +
      "minutos. ",
    bio:
      "David es un RSE en el Instituto Alan Turing de Londres. Estudió ingeniería mecánica y posteriormente realizó una " +
      "maestría y un doctorado en ingeniería aeronáutica, especializándose en aerodinámica de turbinas de gas. Como RSE, ha " +
      "dedicado los últimos dos años a la modelización meteorológica basada en datos. ",
    skills: ["clima", "álgebra lineal", "dask", "xarray", "zarr"],
    linkButtons: [
      { href: "https://github.com/SVDROM/svdrom/blob/a28389e031c268c180278e9ade5d2d3587a1fcda/demos/dmd_demo_1.ipynb", label: "View demo ✨" },
      { href: "https://doi.org/10.5281/zenodo.18468075", label: "View slides" },
    ],
  },
    {name: "Jesús Urtasun Elizari",
    institution: "Imperial College London",
    date: "19 de enero 2026",
    title: "Complejidad computacional para RSEs",
    abstract:
      "Cuando se trabaja con juegos, problemas y algoritmos, una de las primeras cuestiones que surgen es, <i>plain and simple</i>, que algunos son más complicados que otros:" +
      "<ul style='list-style-type: disc; padding-left: 1.5em; margin: 0.5em 0;'>" +
      "<li>¿Cómo medimos cuán complicado es un problema?</li>" +
      "<li>¿Qué son las clases de complejidad y cómo se agrupan los problemas según su dificultad?</li>" +
      "<li>¿Por qué la factorización o el trazado de caminos son ejemplos de problemas 'difíciles', o problemas 'NP'?</li>" +
      "<li>¿Cómo se relacionan con la seguridad, la criptografía, el modelado de proteínas, y la alineación y el ensamblaje de genomas?</li>" +
      "</ul>" +
      "Este tipo de preguntas se estudian en la <strong>Teoría de la Complejidad</strong>, la rama de la computación y las matemáticas que describe cuán difícil es realmente resolver un problema y cómo escala esa dificultad en distintos escenarios.",
    bio:
      "Jesús estudió el grado en Física en la Universidad de Barcelona (2017) y posteriormente el máster en Física de Altas Energías y Cosmología en el IFAE de Barcelona (2018). Completó su doctorado en Física Teórica y Computacional en la Universidad de Milán (2022), trabajando en Higgs boson physics y Quantum Chromodynamics (QCD), desarrollando cálculos teóricos de alta precisión para la high luminosity era del LHC en el CERN. " +
      "En 2022 se incorporó al MRC Laboratory of Medical Sciences, donde se ha especializado en el desarrollo de algoritmos y pipelines, inferencia estadística y hypothesis testing, análisis de datos y visualización. Dentro del campo de la biología computacional, actualmente trabaja en genómica y NGS, junto con high performance computing (HPC) y cluster computing. " +
      "Desde 2023 trabaja como part-time lecturer en el Imperial College London, dentro del departamento de "+
      createLink("https://www.imperial.ac.uk/early-career-researcher-institute/learning-and-development/courses-by-programme/research-computing-and-data-science/","Research Computing and Data Science (RCDS)") +
      ". Actualmente da clases sobre introducción a la probabilidad, inferencia estadística y hypothesis testing, junto con fundamentos de programación y C++.  " +
      "Sus intereses abarcan desde la física teórica, la mecánica cuántica, la gravitación y la cosmología, hasta la computación, la teoría de la información y la filosofía de la ciencia. " +
      "Fun fact, fue a través del ICL que conoció a Diego Alonso-Álvarez ("+
      createLink("sessions#:~:text=diciembre%20de%202024-,Diego%20Alonso%20%C3%81lvarez,-Ingenieros%20de%20software", "anterior ponente") + 
      " en las charlas), y escuchó por primera vez el término RSE!",
    skills: ["algoritmos", "complejidad computacional", "bioinformática"],
    linkButtons: [
      { href: "https://drive.google.com/file/d/1JIMQto3ZSBzs3ODb1iL9ViIFIIjpusGj/view?usp=sharing", label: "View slides" },
    ],
  },
    {
      name: "Ivan Ogasawara",
      institution: "Open Science Labs",
      date: "15 de diciembre 2025",
      title: "Equipos de alto rendimiento humano: bienestar, colaboración y resultados",
      abstract:
        "En proyectos y equipos de RSE, y en el desarrollo de software en general, suele ponerse el foco casi exclusivamente en las hard skills (conocimientos y habilidades técnicas), dejando en segundo plano las soft skills (habilidades personales, interpersonales y sociales). " +
        "En muchas organizaciones se recurre a bonificaciones y programas basados en métricas con la intención de “forzar” la productividad o la “motivación”. " +
        "En esta charla compartiré ideas y experiencias para mejorar la cultura de los equipos de trabajo y crear entornos que fomenten la colaboración, el bienestar y un alto rendimiento sostenible. ",
      bio:
        "Ivan es RSE senior y líder técnico con más de 22 años de trayectoria en sistemas backend, plataformas de datos, DevOps, ML/RAG y compiladores. Ha trabajado con múltiples lenguajes (como Python, C/C++, JavaScript, Java, R y Rust) y es fundador de " + createLink("https://opensciencelabs.org/", "Open Science Labs") + ". Colaboró como asesor en comunidades como " + createLink("https://www.pyopensci.org/", "pyOpenSci") + " y " + createLink("https://www.cos.io/products/osf", "Open Science Framework") + ", y es investigador independiente afiliado a " + createLink("https://igdore.org/", "IGDORE - Institute for Globally Distributed Open Research and Education") + ".",
      skills: ["soft skills", "colaboración", "bienestar"],
    },
    {
      name: "Jaime Ruiz Zapatero",
      institution: "University College London",
      date: "10 de noviembre 2025",
      title: "Cosmología con datos a lo bestia",
      abstract:
        "La inferencia estadística consiste en estimar las propiedades de un grupo dada una pequeña muestra. " +
        "En Cosmología esto se traduce en aprender las propiedades del Universo en su conjunto dadas unas pocas" +
        " (cientos de millones) de galaxias. A mitad de los años dos mil la Cosmología empezó a experimentar " +
        "un rápido proceso de cuantificación. En los últimos años este proceso se ha convertido en exponencial " +
        "gracias a la llegada de los llamados telescopios de cuarta generación. Por tanto, la Cosmología se encuentra envuelta " +
        "en una carrera armamentística en la que datos más complejos requieren de modelos igualmente complicados. " +
        "Tal es el punto que nuestras técnicas de inferencia estadística para extraer los valores de estos nuevos modelos no dan abasto. " +
        "En esta charla expondré brevemente cual es el estado actual de la Cosmología como campo y cuales son sus principales desafíos. Luego " +
        "me enfocaré en los problemas y soluciones que este nuevo aluvión de datos nos está trayendo. Particularmente me centraré en los últimos desarrollos en los métodos de inferencia estadística que hacen posible su procesamiento.",
      bio:
        createLink("https://jaimeruizzapatero.net/", "Jaime Ruiz Zapatero") + ", vallisoletano por cuna y gaditano por sentimiento, es ingeniero de software para los telescopios Vera Rubin y Euclides desde 2023. Anteriormente, completó su doctorado en Astronomía, estudiando la aplicación de métodos auto-diferenciables para agilizar la inferencia estadística de modelos con alta dimensionalidad.",
      skills: ["astronomía", "cosmología", "inferencia estadística"],
    },
    {
      name: "Camilo Rodríguez López",
      institution: "Stanford University",
      date: "20 de octubre 2025",
      title: "De la selva al escritorio: lo que las ranas venenosas me enseñaron sobre ecología, neurociencia y ciencia de datos",
      abstract:
        "En esta charla compartiré cómo mi trabajo con ranas venenosas ha moldeado mi trayectoria, desde el trabajo de campo en la selva, pasando por el laboratorio, hasta llegar a un escritorio con tres pantallas. Contaré en detalle mi experiencia postdoctoral, en la que aprendí neurociencia y descubrí la necesidad de desarrollar y usar herramientas informáticas, de acceso libre para investigar organismos no modelo. A lo largo de la presentación mostraré cómo la ciencia de datos se ha convertido en una herramienta clave en mi carrera científica.",
      bio:
        "Soy biólogo y mi carrera se ha enfocado en la ecología comportamental, las hormonas y la neurociencia en ranas venenosas. Tras finalizar mi postdoctorado en el laboratorio de Lauren O'Connell en agosto de 2024, asumí el rol de analista de datos en el mismo grupo, donde combino la biología con la ciencia de datos para abordar preguntas complejas en organismos no modelo.",
      linkButtons: [
        { href: "https://drive.google.com/file/d/1l4D4F7xyWLkpulSlM-tOnyGTlCJ-um2y/view?usp=sharing", label: "View slides" },
      ],
      skills: ["biología", "neurociencia", "ciencia de datos"],
    },
    {
      name: "Lucía Cipolina-Kun",
      institution: "Meta Research",
      date: "15 de septiembre 2025",
      title: "Game Reasoning Arena: una librería abierta y un benchmark para evaluar las capacidades de razonamiento de los modelos de lenguaje de gran escala a través de juegos estratégicos",
      abstract:
        "Los Modelos de Lenguaje de Gran Escala (LLMs) se utilizan cada vez más en tareas que requieren planificación y toma de decisiones, pero aún no está claro cómo razonan realmente. Los juegos de estrategia ofrecen una vía ideal para explorar esta cuestión: son estructurados, interactivos y exigen tanto previsión como adaptabilidad. En esta charla, presentaré Game Reasoning Arena, un marco que evalúa a los LLMs no solo en función de si ganan, sino también de cómo justifican sus elecciones. Al analizar el razonamiento que los modelos articulan durante el juego, obtenemos nuevas perspectivas sobre sus fortalezas y debilidades estratégicas, así como sobre los patrones de razonamiento que emergen en diferentes escalas de modelo.",
      bio:
        "Lucía Cipolina-Kun es científica investigadora en el laboratorio de META Research. Sus intereses se encuentran en la intersección entre la teoría de juegos y la inteligencia artificial. Lucía es doctora en Ingeniería Eléctrica por la Universidad de Bristol y posee una maestría en Matemáticas por la Universidad de Nueva York (NYU).",
      linkButtons: [
        { href: "https://docs.google.com/presentation/d/e/2PACX-1vRbELBk8PefI2WyjsjBwYDOM1TdIrhCQwenof_BuROpo3RgtTtmcllxPzVq93Vekw/pub?start=false&loop=false&delayms=3000", label: "View slides" },
      ],
      skills: ["LLMs", "teoría de juegos", "IA"],
    },
    {
      name: "Felipe Huerta Pérez",
      institution: "Pontificia Universidad Católica de Chile",
      date: "19 de agosto 2025",
      title: "La guinda de la torta: desarrollo y publicación de software open-source para transferir la investigación doctoral a la sociedad",
      abstract:
        "La ingeniería de software aplicada a la investigación científica es clave para escalar el impacto de modelos y simulaciones. Esto facilita su transferencia a la industria, la academia y la sociedad. En esta charla les presentaré la historia de desarrollo de CryoEvap, un software libre y de código abierto para simular la evaporación isobárica de líquidos criogénicos en tanques cilíndricos verticales. Es aplicable al almacenamiento a gran escala de hidrógeno líquido, aire líquido, CO₂ y gas natural licuado, contribuyendo así a la transición energética. Su primera versión la programé en MATLAB el 2017. El código fue refactorizado en 2018 a programación orientada a objetos y reescrito en Python en 2022, un año después de finalizar mi doctorado. Publicado a fines de 2024, CryoEvap ha sido reconocido por centros de investigación y es utilizado rutinariamente por miembros de nuestro grupo. Esto no hubiera sido posible sin haber aprendido en GitHub e Ingeniería de software básica en mi doctorado en Imperial College, lugar que contaba con la comunidad y la cultura adecuada.",
      bio:
        "Felipe Huerta Pérez es profesor asistente en el Departamento de Ingeniería Química y Bioprocesos de la Pontificia Universidad Católica de Chile. Dicta los cursos de Fenómenos de Transporte, Operaciones Unitarias II y Procesamiento de hidrógeno para energías sostenibles. Obtuvo su magíster en la Pontificia Universidad Católica de Chile en el año 2016, y su doctorado en Imperial College London en el año 2021. En el año 2019 obtuvo el premio John S. Archer Award a la excelencia en investigación en geociencias e ingeniería del petróleo. Sus áreas actuales de investigación son la modelación y simulación de fenómenos de transporte, líquidos criogénicos y almacenamiento de energía renovable. Le gusta mucho el software de investigación y cree que la ciencia abierta apoyará un futuro más justo, sostenible y próspero para todas las regiones del planeta, sobre todo las con más carencias materiales.",
      linkButtons: [
        { href: "https://drive.google.com/file/d/1CO-qH8lxRR9EDXpzjrrUA-79V71Kaulr/view?usp=sharing", label: "View slides" },
      ],
      skills: ["Python", "open source", "simulación"],
    },
    {
      name: "María Guadalupe Barrios Sazo",
      institution: "Juelich Supercomputing Centre",
      date: "14 de julio 2025",
      title: "Scavenger Hunt para RSE: Aprendizaje interactivo y flexible",
      abstract:
        "En esta charla, les compartiré un poco sobre mi trayectoria en investigación y en RSE. Luego, me gustaría presentar una idea para fortalecer el aprendizaje de técnicas utilizadas por RSEs. La forma tradicional de adquirir una nueva competencia es a través de cursos o talleres. Sin embargo, muchos investigadores no siempre coinciden con el tiempo o el estilo de aprendizaje, lo que puede ser una barrera. Nuestro grupo está proponiendo un esquema basado en gamificación y funcionalidades de GitHub para aprender o mejorar las técnicas (https://github.com/FZJ-JSC/rse-scavenger-hunt). El diseño está inspirado en el juego 'scavenger hunt', donde los participantes pueden obtener puntos o tokens por cada ejercicio que realizan. Estos ejercicios son calificados automáticamente por GitHub Actions. Los ejercicios se basan en material desarrollado por la comunidad, como Software Carpentries.",
      bio:
        "Guadalupe (Lupe) forma parte del equipo de RSE en el Juelich Supercomputing Centre en Alemania desde 2023. Previamente, trabajó como RSE en la Universidad de Oslo en el Rosseland Centre for Solar Physics, donde desarrolló y brindó soporte a códigos utilizados para la simulación de la atmósfera solar. Obtuvo su doctorado en Física en la Universidad de Stony Brook en Nueva York, y su investigación se centró en astrofísica computacional. Durante ese período, contribuyó al desarrollo del código Castro, principalmente en la implementación de un solucionador de magnetohidrodinámica. Sus intereses se enfocan en computación científica, computación de alto rendimiento y sostenibilidad del software.",
      skills: ["HPC", "gamificación", "GitHub Actions"],
    },
    {
      name: "Riva Quiroga",
      institution: "Tabular",
      date: "27 de mayo 2025",
      title: "Convertirse en RSE viniendo de cualquier parte",
      abstract:
        "¿Cómo alguien que estudió Lengua y Literatura y trabajó 7 años como maestra de escuela termina dedicada a la ingeniería de software de investigación? En esta charla abordaremos cómo una trayectoria muy poco probable se vuelve posible gracias al apoyo de las comunidades de práctica. Discutiremos también el valor de estas comunidades para mantenerse al día sobre nuevos desarrollos y contaremos acerca de los planes para establecer el primer grupo de RSE en Latinoamérica.",
      bio:
        "Riva Quiroga es RSE en Tabular, una pequeña empresa que ofrece servicios de desarrollo de software a proyectos de investigación. Es Fellow del Software Sustainability Institute y editora en Programming Historian. Es, además, una voluntaria serial: participa activamente en distintas iniciativas de las comunidades de R y Python, desde la organización de eventos a la traducción de materiales y documentación.",
      linkButtons: [
        { href: "https://tinyurl.com/RSE-charlas-mayo-2025", label: "View slides" },
      ],
      skills: ["comunidades", "R", "humanidades digitales"],
    },
    {
      name: "Jenny Vega",
      institution: "Isomorphic Labs",
      date: "7 de abril 2025",
      title: "De ML engineering a Pre sales a Software Engineer en Biotech research",
      abstract:
        "Quiero compartirles un poco sobre mi carrera, desde un punto de vista de 'perseguir lo que te gusta y aprender en el camino'. He trabajado en diferentes roles y diferentes empresas de diferentes tamaños (Startups, Consulting companies, 'BigTechs') y el único factor en común ha sido Machine Learning / AI. Me gustaría contarles sobre mis experiencias en estos años trabajando en compañías que se dedican a usar machine learning para crear productos y empresas que combinan biología, química y la ingeniería para crear soluciones a desafíos críticos en la medicina.",
      bio:
        "Jenny Vega ha trabajado en equipos de ingeniería de Machine Learning y pre-sales como arquitecta de soluciones de inteligencia artificial en AWS y Google. Actualmente se desempeña como ingeniera de software en Isomorphic Labs, spin-off de DeepMind, desarrollando herramientas para equipos de biólogos, químicos y científicos que trabajan en Drug Design y Medical Research. Además de su pasión por la ingeniería de software y machine learning, Jenny tiene un gran interés en el área de AI Safety.",
      skills: ["ML", "biotech", "AI"],
    },
    {
      name: "Cecilia Herbert",
      institution: "OpenEphys",
      date: "17 de marzo 2025",
      title: "¿Qué soluciones de software requieren los usuarios y desarrolladores de hardware abierto para investigación?",
      abstract:
        "Les quería compartir mi transición de la neurociencia experimental al mundo de la tecnología open source y compartirles un panorama de una empresa pequeña dedicada al hardware de adquisición de registros neuro-comportamentales. Desde mi perspectiva no RSE, qué necesidades veo a nivel usuario, desarrollador e intraempresa. Me gustaría discutir con ustedes qué opciones de formación existen para quienes vienen de la academia y ese elusivo límite entre aprender a hacer algo por cuenta propia y llamar a alguien que sabe (y retribuir su tiempo y expertise).",
      bio:
        "Soy neurocientífica y me dedico a diseminar tecnologías abiertas. Lidero el equipo científico de Training, Support and Outreach en Open Ephys, una empresa que desarrolla, produce y distribuye herramientas open source para neurociencias. Actúo como nexo entre desarrolladores y usuarios, enseñando sobre nuestros equipos, con el objetivo de desmitificar conceptos técnicos, escuchar las necesidades de la comunidad y retroalimentar los proyectos abiertos. Intento difundir el conocimiento de forma inclusiva y accesible, con un foco especial en usuarios nuevos y barreras lingüísticas, usando actividades prácticas e interactivas, con la esperanza de empoderar investigadores a que obtengan la flexibilidad e independencia necesarias para abordar sus preguntas científicas.",
      skills: ["hardware abierto", "neurociencia", "formación"],
    },
    {
      name: "Mauro Lepore",
      institution: "ixpantia",
      date: "17 de febrero de 2025",
      title: "Expandiendo colaboraciones en Ingeniería de Software de Investigación",
      abstract:
        "En esta presentación comparto mis experiencias al hacer la transición como Research Software Engineer (RSE) desde la academia hacia la industria. En la última década, desarrollé código para investigación en una universidad en Australia, un centro de investigación en Panamá, un museo en EE.UU., una ONG en Alemania y ahora una consultora enfocada en ciencia, ingeniería y estrategia de datos. Voy a compartir las necesidades que noté, y voy a explicar por qué creo que las personas que trabajamos en RSE podemos aportar mucho valor combinando experiencia en investigación e industria. Sin embargo, quisiera que mi experiencia sea solo un punto de partida y promover una discusión en la que podamos explorar más profundamente el valor que podemos aportar, especialmente en la comunidad hispanohablante: ¿Quiénes nos necesitan? ¿Dónde están? ¿Qué necesitan? ¿Cómo podemos ayudarlos?",
      bio:
        "Trabajo en ixpantia donde lidero la práctica de RSE. Soy un educador y desarrollador de software especializado en el ecosistema de R. Mantengo varios paquetes de R de código abierto y soy editor asociado en rOpenSci.",
      linkButtons: [
        { href: "https://docs.google.com/presentation/d/e/2PACX-1vTDQf8BMwdcC7Nj0rqt6LCS0yuGjGoVrpafBU5r9iHVvn91JWEvDIx2XQC12WgdzdjYuDnn3EHx5Qgd/pub?start=false&loop=false&delayms=3000", label: "View slides" },
      ],
      skills: ["R", "academia-industria", "consultoría"],
    },
    {
      name: "Pablo Vicente Munuera",
      institution: "University College London",
      date: "20 de enero de 2025",
      title: "¿Cómo un movimiento de pole dance y la biología están conectados? Historias de un 'unofficial RSE'",
      abstract:
        "¿Cómo un informático acaba haciendo biología? ¿Cuál es el papel del software en el campo de las ciencias naturales? Éstas son algunas de las preguntas que abordaré desde mi propia experiencia en esta charla. Hablaré de Escutoides. De software y equipos multidisciplinares. De conseguir autorías en artículos siendo computacional en un mundo de laboratorios. De open source y la obligación de llegar primero. También disfrutaréis de chistes malos y otras cosas absurdas que a veces hacen muy feliz.",
      bio:
        "Soy un informático especializado en abordar problemas biológicos. Durante mi doctorado en la Universidad de Sevilla, bajo la supervisión de Luis M. Escudero, creé herramientas como EpiGraph para analizar imágenes de microscopía y estudiar la organización de los tejidos, descubriendo el Escutoide. Ahora, trabajo como investigador postdoctoral con Yanlan Mao en la University College London, desarrollando un modelo computacional 3D para entender cómo las fuerzas moldean tejidos. A lo largo de mi carrera, he colaborado con científicos de diversas disciplinas, liderando el desarrollo de herramientas como EpiGraph y supervisando proyectos de análisis de imágenes en 3D, siempre con un enfoque en open source y accesibles para la comunidad científica.",
      skills: ["biología computacional", "análisis de imágenes", "open source"],
    },
    {
      name: "Diego Alonso Álvarez",
      institution: "Imperial College London",
      date: "9 de diciembre de 2024",
      title: "Ingenieros de software de investigación: breve historia, cómo se hacen y a qué se dedican",
      abstract:
        "El software ha sido aplicado a la ciencia y la investigación prácticamente desde la aparición de los ordenadores, pero ha sido sólo recientemente cuando su uso se ha extendido tanto y es tan común en todas las ramas del conocimiento, que se ha hecho imposible negar lo innegable: que el software es una pieza clave de los resultados de una investigación que debe recibir la atención, el cuidado y el valor que se merecen. En esta charla, hablaré de mi viaje a lo largo de mi carrera investigadora, cómo he acabado donde he acabado como RSE - historias que seguro que resuenan con las de muchos otros RSEs -, y que iniciativas tiene en marcha el RSE Team del Imperial para lograr precisamente eso, que el software producido en investigación sea de la máxima calidad, valorado y creando impacto.",
      bio:
        "El Dr. Diego Alonso Álvarez es físico con 13 años de experiencia en investigación en el ámbito académico, incluido un doctorado en nanoestructuras de semiconductores e investigación postdoctoral sobre nuevos conceptos de energía solar y células solares. Se unió al equipo de Ingeniería de Software de Investigación (RSE Team) del Imperial College de Londres en noviembre de 2018 y ha contribuido a decenas de proyectos desde entonces. Diego es Fellow del Software Sustainability Institute, miembro de la Society of Research Software Engineering, y le entusiasma promover los beneficios de las buenas prácticas de desarrollo de software entre otros investigadores. Su experiencia se centra en la sostenibilidad y la accesibilidad del software, especialmente en relación con el desarrollo de interfaces gráficas de usuario para software de investigación. Diego dirige el RSE Team dentro de los Servicios de Computación de Investigación del Imperial desde noviembre de 2021.",
      linkButtons: [
        { href: "https://doi.org/10.5281/zenodo.14350523", label: "View slides" },
      ],
      skills: ["buenas prácticas", "sostenibilidad", "física"],
    },
    {
      name: "Juan Rodríguez Herrera",
      institution: "EPCC",
      date: "18 de noviembre 2024",
      title: "Aventuras y desventuras de ARCHER2, el servicio de supercomputación del Reino Unido",
      abstract:
        "ARCHER2, el servicio de supercomputación del Reino Unido, inició sus operaciones en mayo de 2020. Este servicio se basa en el supercomputador ARCHER2, un HPE Cray EX que cuenta con casi 6,000 nodos de cómputo, proporcionando una capacidad de procesamiento excepcional. En esta charla, exploraremos en detalle los diversos componentes que conforman este servicio. Discutiremos las características avanzadas del hardware, incluyendo su arquitectura y rendimiento. Además, abordaremos el software disponible para sus usuarios. También destacaremos los programas de formación diseñados para capacitar a los usuarios en el uso eficiente de este recurso, así como el soporte técnico continuo que se ofrece para resolver cualquier problema y maximizar el aprovechamiento del sistema. Esta presentación ofrecerá una visión completa de cómo ARCHER2 está impulsando la investigación y la innovación en el Reino Unido.",
      bio:
        "Juan Rodríguez Herrera se incorporó a EPCC en 2015 tras obtener el Doctorado en Informática en la Universidad de Almería. Es el responsable de formación de ARCHER2. También participa en otras actividades del servicio ARCHER2, tales como el soporte a los usuarios y la divulgación.",
      skills: ["HPC", "supercomputación", "formación"],
    },
  ],


  //////////////////////////////////////////////////////////////
  // CALL FOR SPEAKERS
  //////////////////////////////////////////////////////////////
  callForSpeakers: {
    description: "Check out our speaker guidelines and feel free to contact us if you have any questions.",
    email: LINKS.email,
  },

  //////////////////////////////////////////////////////////////
  // ORGANIZERS
  //////////////////////////////////////////////////////////////
  organizers: [
    {
      name: "Sofía Miñano",
      githubHandle: "sfmig",
      githubAvatar: "https://avatars1.githubusercontent.com/u/33267254?v=4?s=100",
      institution: "Sainsbury Wellcome Centre at UCL",
      role: "Co-organizer",
    },
    {
      name: "Carlos Gavidia-Calderón",
      githubHandle: "cptanalatriste",
      githubAvatar: "https://avatars.githubusercontent.com/u/1616531?v=4?s=100",
      institution: "Alan Turing Institute",
      role: "Co-organizer",
    },
  ],
};

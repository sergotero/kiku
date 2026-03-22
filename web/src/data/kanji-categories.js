const categories = {
  jlpt: [
    { tag: "JLPT1", description: "Nivel N1 - Dominio avanzado (superior)" },
    { tag: "JLPT2", description: "Nivel N2 - Nivel medio-alto (social y académico)" },
    { tag: "JLPT3", description: "Nivel N3 - Nivel intermedio (cotidiano)" },
    { tag: "JLPT4", description: "Nivel N4 - Japonés básico (elemental)" },
    { tag: "JLPT5", description: "Nivel N5 - Nivel inicial (introductorio)" }
  ],
  gradeLevel: {
    kyouiku: [
      { tag: "grado 1", description: "1.º Primaria: Introducción a la escritura (80 kanjis)" },
      { tag: "grado 2", description: "2.º Primaria: Conceptos básicos y naturaleza (160 kanjis)" },
      { tag: "grado 3", description: "3.º Primaria: Vida cotidiana y ciudad (200 kanjis)" },
      { tag: "grado 4", description: "4.º Primaria: Conceptos abstractos y geografía (202 kanjis)" },
      { tag: "grado 5", description: "5.º Primaria: Sociedad y ciencia (193 kanjis)" },
      { tag: "grado 6", description: "6.º Primaria: Historia y pensamiento (191 kanjis)" },
    ],
    jouyou: [
      { tag: "grado 7", description: "1.º Secundaria: Inicio del ciclo Jōyō avanzado (316 kanjis)" },
      { tag: "grado 8", description: "2.º y 3.º Secundaria: Resto de kanjis de uso común (821 kanjis)" },
    ],
    jinmeiyou: [
      { tag: "grado 9", description: "Kanjis para nombres propios: Variantes tradicionales (Hantaiji)" },
      { tag: "grado 10", description: "Kanjis para nombres propios: Variantes simplificadas o adicionales" }
    ],
    hyougaiji: [
      { tag: "hyougaiji", description: "Kanjis fuera de la lista oficial (uso literario, técnico o arcaico)" }
    ]
  },
  frequency: [
    { tag: "top 500", description: "Kanjis de uso muy frecuente (imprescindibles)" },
    { tag: "top 1000", description: "Kanjis de uso frecuente (lectura de prensa)" },
    { tag: "top 2500", description: "Kanjis de uso medio/bajo (literario)" },
    { tag: "raro", description: "Kanjis de uso muy limitado o técnico" }
  ]
};

export default categories;
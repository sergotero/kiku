const categories = {
  // --- ADJETIVOS ---
  adjectivesI: [
    { tag: 'adj-i', description: 'adjetivo (keiyoushi)' },
    { tag: 'adj-ix', description: 'adjetivo (keiyoushi) - clase especial yoi/ii' },
    { tag: 'adj-ku', description: "adjetivo en 'ku' (arcaico)" },
    { tag: 'adj-shiku', description: "adjetivo en 'shiku' (arcaico)" }
  ],
  adjectivesNa: [
    { tag: 'adj-na', description: 'sustantivo adjetival / cuasi-adjetivo (keiyodoshi)' },
    { tag: 'adj-nari', description: 'forma arcaica/formal del adjetivo tipo na' }
  ],
  adjectivesNo : [
    { tag: 'adj-no', description: "sustantivo con partícula de caso genitivo 'no'" }
  ],
  adjectivesPrenominal: [
    { tag: 'adj-pn', description: 'adjetivo pre-nominal (rentaishi)' },
    { tag: 'adj-f', description: 'sustantivo o verbo actuando como prenominal' },
    { tag: 'adj-t', description: "adjetivo tipo 'taru'" }
  ],

  // --- VERBOS ---
  verbsModern: [
    { tag: 'v1', description: 'verbo Ichidan' },
    { tag: 'v5aru', description: 'verbo Godan - clase especial -aru' },
    { tag: 'v5b', description: "verbo Godan terminado en 'bu'" },
    { tag: 'v5g', description: "verbo Godan terminado en 'gu'" },
    { tag: 'v5k', description: "verbo Godan terminado en 'ku'" },
    { tag: 'v5k-s', description: 'verbo Godan - clase especial Iku/Yuku' },
    { tag: 'v5m', description: "verbo Godan terminado en 'mu'" },
    { tag: 'v5n', description: "verbo Godan terminado en 'nu'" },
    { tag: 'v5r', description: "verbo Godan terminado en 'ru'" },
    { tag: 'v5r-i', description: "verbo Godan terminado en 'ru' (irregular)" },
    { tag: 'v5s', description: "verbo Godan terminado en 'su'" },
    { tag: 'v5t', description: "verbo Godan terminado en 'tsu'" },
    { tag: 'v5u', description: "verbo Godan terminado en 'u'" },
    { tag: 'v5u-s', description: "verbo Godan terminado en 'u' (clase especial)" },
    { tag: 'vi', description: 'verbo intransitivo' },
    { tag: 'vt', description: 'verbo transitivo' },
    { tag: 'vk', description: 'verbo Kuru - clase especial' },
    { tag: 'vs', description: 'sustantivo o participio que toma el auxiliar suru' },
    { tag: 'vs-i', description: 'verbo suru - incluido' },
    { tag: 'vs-s', description: 'verbo suru - clase especial' },
    { tag: 'vz', description: 'verbo Ichidan - forma alternativa de -jiru' }
  ],
  // --- FORMAS ARCAICAS (v2, v4, vn, vr y vs-c) ---
  verbsArchaic: [
    { tag: 'v2a-s', description: "verbo Nidan terminado en 'u' (arcaico)" },
    { tag: 'v2b-k', description: "verbo Nidan (clase superior) terminado en 'bu' (arcaico)" },
    { tag: 'v2d-s', description: "verbo Nidan (clase inferior) terminado en 'dzu' (arcaico)" },
    { tag: 'v2g-k', description: "verbo Nidan (clase superior) terminado en 'gu' (arcaico)" },
    { tag: 'v2g-s', description: "verbo Nidan (clase inferior) terminado en 'gu' (arcaico)" },
    { tag: 'v2h-k', description: "verbo Nidan (clase superior) terminado en 'hu/fu' (arcaico)" },
    { tag: 'v2h-s', description: "verbo Nidan (clase inferior) terminado en 'hu/fu' (arcaico)" },
    { tag: 'v2k-k', description: "verbo Nidan (clase superior) terminado en 'ku' (arcaico)" },
    { tag: 'v2k-s', description: "verbo Nidan (clase inferior) terminado en 'ku' (arcaico)" },
    { tag: 'v2m-s', description: "verbo Nidan (clase inferior) terminado en 'mu' (arcaico)" },
    { tag: 'v2n-s', description: "verbo Nidan (clase inferior) terminado en 'nu' (arcaico)" },
    { tag: 'v2r-k', description: "verbo Nidan (clase superior) terminado en 'ru' (arcaico)" },
    { tag: 'v2r-s', description: "verbo Nidan (clase inferior) terminado en 'ru' (arcaico)" },
    { tag: 'v2s-s', description: "verbo Nidan (clase inferior) terminado en 'su' (arcaico)" },
    { tag: 'v2t-k', description: "verbo Nidan (clase superior) terminado en 'tsu' (arcaico)" },
    { tag: 'v2t-s', description: "verbo Nidan (clase inferior) terminado en 'tsu' (arcaico)" },
    { tag: 'v2w-s', description: "verbo Nidan (clase inferior) terminado en 'u' con conjugación 'we' (arcaico)" },
    { tag: 'v2y-k', description: "verbo Nidan (clase superior) terminado en 'yu' (arcaico)" },
    { tag: 'v2y-s', description: "verbo Nidan (clase inferior) terminado en 'yu' (arcaico)" },
    { tag: 'v2z-s', description: "verbo Nidan (clase inferior) terminado en 'zu' (arcaico)" },
    { tag: 'v4b', description: "verbo Yodan terminado en 'bu' (arcaico)" },
    { tag: 'v4g', description: "verbo Yodan terminado en 'gu' (arcaico)" },
    { tag: 'v4h', description: "verbo Yodan terminado en 'hu/fu' (arcaico)"},
    { tag: 'v4k', description: "verbo Yodan terminado en 'ku' (arcaico)" },
    { tag: 'v4m', description: "verbo Yodan terminado en 'mu' (arcaico)" },
    { tag: 'v4r', description: "verbo Yodan terminado en 'ru' (arcaico)" },
    { tag: 'v4s', description: "verbo Yodan terminado en 'su' (arcaico)" },
    { tag: 'v4t', description: "verbo Yodan terminado en 'tsu' (arcaico)" },
    { tag: 'vs-c', description: 'verbo su - precursor del suru moderno' }
  ],

  // --- SUSTANTIVOS ---
  nouns: [
    { tag: 'n', description: 'sustantivo común (futsuumeishi)' }
  ],

  // --- PRONOMBRES ---
  pronouns: [
    { tag: 'pn', description: 'pronombre' }
  ],

  // --- ONOMATOPEYAS Y ADVERBIOS ---
  adverbsAndOno: [
    { tag: 'adv', description: 'adverbio (fukushi)' },
    { tag: 'adv-to', description: "adverbio/onomatopeya con partícula 'to'" }
  ],

  // --- COMPONENTES LINGÜÍSTICOS ---
  structure: [
    { tag: 'prt', description: 'partícula' },
    { tag: 'conj', description: 'conjunción' },
    { tag: 'aux', description: 'auxiliar' },
    { tag: 'aux-adj', description: 'adjetivo auxiliar' },
    { tag: 'aux-v', description: 'verbo auxiliar' },
    { tag: 'cop', description: 'cópula' }
  ],
  affixes: [
    { tag: 'pref', description: 'prefijo' },
    { tag: 'suf', description: 'sufijo' },
    { tag: 'n-pref', description: 'sustantivo usado como prefijo' },
    { tag: 'n-suf', description: 'sustantivo usado como sufijo' }
  ],
  quantifiers: [
    { tag: 'num', description: 'numérico' },
    { tag: 'ctr', description: 'contador (clasificador)' }
  ],

  // --- OTROS ---
  miscellaneous: [
    { tag: 'exp', description: 'expresiones y frases hechas' },
    { tag: 'int', description: 'interjección (kandoushi)' },
    { tag: 'unc', description: 'sin clasificar' }
  ]
};

export default categories;
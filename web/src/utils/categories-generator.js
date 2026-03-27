export function orderKanjiCategories(categories) {
  const newCategories = [];

  for (const key in categories) {
    const element = categories[key];
    if (!Array.isArray(element)) {
      for (const k in element) {
        const itemArray = element[k];
        for (let i = 0; i < itemArray.length; i++) {
          const tag = itemArray[i].tag;
          newCategories.push(tag);
        }
      }
    }

    if (Array.isArray(element)) {
      for (let i = 0; i < element.length; i++) {
        const tag = element[i].tag;
        newCategories.push(tag);
      }
    }
  }
  return newCategories;
}


export function orderWordCategories(categories) {
  const orderedCategories = [];
  const tags = new Map();
  for (const category in categories) {

    switch (category) {
      case "adjectivesI":
        orderedCategories.push("Adjetivos ～い");
        tags.set("Adjetivos ～い", categories[category].map((el) => el.tag));
        break;
      case "adjectivesNa":
        orderedCategories.push("Adjetivos ～な");
        tags.set("Adjetivos ～な", categories[category].map((el) => el.tag));
        break;
      case "adjectivesNo":
        orderedCategories.push("Adjetivos ～の");
        tags.set("Adjetivos ～の", categories[category].map((el) => el.tag));
        break;
      case "adjectivesPrenominal":
        orderedCategories.push("Adjetivos prenominales");
        tags.set("Adjetivos prenominales", categories[category].map((el) => el.tag));
        break;
      case "verbsModern":
        orderedCategories.push("Verbos (Forma moderna)");
        tags.set("Verbos (Forma moderna)", categories[category].map((el) => el.tag));
        break;
      case "verbsArchaic":
        orderedCategories.push("Verbos (Forma arcaica)");
        tags.set("Verbos (Forma arcaica)", categories[category].map((el) => el.tag));
        break;
      case "nouns":
        orderedCategories.push("Sustantivos");
        tags.set("Sustantivos", categories[category].map((el) => el.tag));
        break;
      case "pronouns":
        orderedCategories.push("Pronombres");
        tags.set("Pronombres", categories[category].map((el) => el.tag));
        break;
      case "adverbsAndOno":
        orderedCategories.push("Adverbios");
        tags.set("Adverbios", categories[category].map((el) => el.tag));
        break;
      case "structure":
        orderedCategories.push("Componentes lingüísticos");
        tags.set("Componentes lingüísticos", categories[category].map((el) => el.tag));
        break;
      case "affixes":
        orderedCategories.push("Prefijos y Sufijos");
        tags.set("Prefijos y Sufijos", categories[category].map((el) => el.tag));
        break;
      case "quantifiers":
        orderedCategories.push("Números y Contadores");
        tags.set("Números y Contadores", categories[category].map((el) => el.tag));
        break;
      case "miscellaneous":
        orderedCategories.push("Expresiones");
        tags.set("Expresiones", categories[category].map((el) => el.tag));
        break;
    }

  }

  orderedCategories.sort((a, b) => a.localeCompare(b));

  return { categories: orderedCategories, tags };
}
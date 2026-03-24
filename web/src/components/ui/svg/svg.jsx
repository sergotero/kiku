import styles from "./svg.module.css";

function SVGGenerator({ svgs }) {
  
  if (!svgs || svgs.length === 0) return null;

  const svgCollection = [];

  for (let i = 0; i < svgs.length; i++) {
    const step = svgs.slice(0, i + 1);

    const svgCol = (
      <svg 
        key={`step-${i}`} 
        viewBox="0 0 109 109" 
        className={styles.kanjiSvg}
      >
        {/* RETÍCULA DE GUÍA (Dibujada primero para que quede al fondo) */}
        <g className={styles.guidelines}>
          {/* Línea horizontal central */}
          <path d="M0,54.5 L109,54.5" />
          {/* Línea vertical central */}
          <path d="M54.5,0 L54.5,109" />
          {/* Marcos */}
          <path d="M0,0 L109,0 L109,109 L0,109 Z" />
        </g>
        {step.map((p, index) => (
          <path 
            key={`path-${i}-${index}`} 
            d={p.path}
            className={index === step.length - 1 ? styles.activeStroke : styles.oldStroke}
          />
        ))}
      </svg>
    );

    svgCollection.push(svgCol);
  }

  return (
    <>
      {svgCollection}
    </>
  );
}

export default SVGGenerator;
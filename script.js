async function cargarDatos() {
  try {
    const resp = await fetch('datos.json');
    if (!resp.ok) throw new Error('No se pudo cargar datos.json');
    const datos = await resp.json();
    mostrarDatos(datos);
  } catch (error) {
    document.getElementById('contenido').innerHTML = '<p style="color:red;">Error cargando datos.</p>';
    console.error(error);
  }
}

function mostrarDatos(datos) {
  const contenido = document.getElementById('contenido');
  contenido.innerHTML = `
    <section class="section">
      <h2>Experiencia Laboral</h2>
      ${datos.experiencia_laboral.map(exp => `
        <article class="item">
          <strong>${exp.puesto}</strong> ${exp.empresa ? `- ${exp.empresa}` : ''} ${exp.lugar ? `- ${exp.lugar}` : ''}
          <em>${exp.periodo}</em>
          <p>${exp.descripcion}</p>
        </article>
      `).join('')}
    </section>

    <section class="section">
      <h2>Educación</h2>
      ${datos.educacion.map(ed => `
        <article class="item">
          <strong>${ed.titulo}</strong><br/>
          <em>${ed.institucion} - ${ed.periodo}</em>
        </article>
      `).join('')}
    </section>

    <section class="section">
      <h2>Logros</h2>
      <ul>
        ${datos.logros.map(logro => `<li>${logro}</li>`).join('')}
      </ul>
    </section>

    <section class="section">
      <h2>Idiomas</h2>
      <ul>
        ${Object.entries(datos.idiomas).map(([idioma, nivel]) => `<li><strong>${idioma.charAt(0).toUpperCase() + idioma.slice(1)}</strong>: ${nivel}</li>`).join('')}
      </ul>
    </section>

    <section class="section">
      <h2>Habilidades</h2>
      <ul>
        ${datos.habilidades.map(h => `<li>${h}</li>`).join('')}
      </ul>
    </section>
  `;
}

// Solo lo ejecutamos si existe el div con ID "contenido"
if (document.getElementById("contenido")) {
  cargarDatos();
}

import React from 'react';
import {
  AudioLines,
  CheckCircle2,
  Eye,
  FileWarning,
  HeartHandshake,
  Keyboard,
  LifeBuoy,
  MousePointerClick,
  ScanEye,
  Smartphone,
} from 'lucide-react';

const commitments = [
  {
    icon: Eye,
    title: 'Contenido perceptible',
    text: 'Trabajamos para que textos, iconos, estados, formularios y avisos médicos sean legibles, con contraste suficiente y alternativas claras cuando una imagen o elemento visual aporte información.',
  },
  {
    icon: Keyboard,
    title: 'Interacción operable',
    text: 'La navegación debe poder usarse con teclado, foco visible, controles reconocibles, botones con propósito claro y flujos que no dependan únicamente de gestos, color o movimiento.',
  },
  {
    icon: ScanEye,
    title: 'Experiencia comprensible',
    text: 'Buscamos usar lenguaje directo, mensajes de error accionables, formularios con etiquetas, confirmaciones visibles y una estructura consistente en módulos de salud, citas, búsqueda y perfil.',
  },
  {
    icon: Smartphone,
    title: 'Compatibilidad robusta',
    text: 'La interfaz debe funcionar de manera razonable en móviles, escritorio, lectores de pantalla, zoom del navegador, temas claro/oscuro y conexiones inestables.',
  },
];

const supportedFeatures = [
  'Diseño responsivo para móviles y escritorio.',
  'Soporte visual para tema claro y oscuro.',
  'Iconos acompañados por títulos o texto contextual cuando corresponde.',
  'Estados visibles para carga, errores, conexión offline y sincronización.',
  'Controles táctiles amplios en navegación móvil.',
  'Uso progresivo de almacenamiento offline para continuidad del servicio.',
  'Mensajes de seguridad y emergencia destacados visualmente.',
];

const improvementAreas = [
  'Auditoría completa con lector de pantalla en formularios complejos.',
  'Revisión de orden de foco en modales, mapas y componentes animados.',
  'Etiquetas ARIA más precisas en controles solo con icono.',
  'Validación de contraste en todos los estados de tema claro y oscuro.',
  'Alternativas completas para mapas, geolocalización y resultados visuales.',
  'Pruebas con zoom alto, texto grande y navegación solo por teclado.',
];

export default function Accessibility() {
  return (
    <div className="w-full px-4 md:px-6 py-8 md:py-10 pb-28">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <section className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 text-secondary text-xs font-black uppercase tracking-widest mb-4">
                <HeartHandshake className="w-4 h-4" />
                Declaración de accesibilidad
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-black text-on-surface tracking-tight">
                Accesibilidad
              </h1>
              <p className="mt-4 text-on-surface-variant leading-relaxed max-w-3xl">
                Salud Conecta IA busca ofrecer una experiencia usable para personas con distintas capacidades visuales,
                motoras, auditivas, cognitivas y tecnológicas. Nuestro objetivo es avanzar hacia conformidad con WCAG 2.2
                nivel AA, adaptada al contexto de una plataforma digital de salud.
              </p>
              <p className="mt-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                Última actualización: 23 de mayo de 2026
              </p>
            </div>

            <div className="lg:w-72 bg-surface-container border border-outline-variant/30 rounded-2xl p-5">
              <div className="flex items-center gap-3 text-primary mb-3">
                <LifeBuoy className="w-5 h-5" />
                <h2 className="text-sm font-black uppercase tracking-widest">Ayuda</h2>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Si encuentras una barrera de accesibilidad, reporta el problema indicando pantalla, dispositivo,
                navegador, tecnología asistiva y pasos para reproducirlo.
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commitments.map((item) => (
            <article key={item.title} className="bg-surface-container border border-outline-variant/30 rounded-2xl p-6">
              <item.icon className="w-6 h-6 text-primary mb-4" />
              <h2 className="text-lg font-display font-black text-on-surface">{item.title}</h2>
              <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <article className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <CheckCircle2 className="w-6 h-6 text-secondary" />
              <h2 className="text-xl font-display font-black text-on-surface">Funciones disponibles</h2>
            </div>
            <ul className="space-y-3">
              {supportedFeatures.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-on-surface-variant leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <FileWarning className="w-6 h-6 text-tertiary" />
              <h2 className="text-xl font-display font-black text-on-surface">Mejoras en curso</h2>
            </div>
            <ul className="space-y-3">
              {improvementAreas.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-on-surface-variant leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-tertiary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="bg-surface-container border border-outline-variant/30 rounded-3xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-3">
              <Keyboard className="w-6 h-6 text-primary" />
              <h2 className="text-base font-display font-black text-on-surface">Teclado</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Debes poder avanzar, activar controles y cerrar componentes importantes sin usar mouse.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <AudioLines className="w-6 h-6 text-primary" />
              <h2 className="text-base font-display font-black text-on-surface">Lectores de pantalla</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Priorizamos etiquetas, jerarquía semántica y avisos comprensibles en procesos críticos.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <MousePointerClick className="w-6 h-6 text-primary" />
              <h2 className="text-base font-display font-black text-on-surface">Interacción táctil</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Los controles principales deben ser claros, consistentes y suficientemente grandes en móvil.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-display font-black text-on-surface">Contacto de accesibilidad</h2>
          <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
            Antes de producción, configura un canal real para reportes de accesibilidad. Sugerencia temporal:
            <span className="font-bold text-on-surface"> accesibilidad@saludconecta.example</span>.
            Procuraremos revisar reportes con prioridad cuando afecten triaje, citas, historial médico, pagos o acceso a servicios de emergencia.
          </p>
        </section>
      </div>
    </div>
  );
}

import React from 'react';
import {
  AlertTriangle,
  BrainCircuit,
  Database,
  FileText,
  LockKeyhole,
  MapPin,
  Scale,
  ShieldCheck,
  UserCheck,
  ArrowLeft,
} from 'lucide-react';

const sections = [
  {
    title: '1. Responsable y alcance',
    body: [
      'Esta Política de Privacidad y estos Términos de Uso aplican al uso de Salud Conecta IA, una plataforma digital orientada a facilitar orientación inicial de salud, búsqueda de centros, citas, beneficios, historial y herramientas de apoyo para pacientes y profesionales.',
      'Salud Conecta IA puede tratar datos personales y datos sensibles relacionados con la salud. El uso de la plataforma implica que aceptas este documento y autorizas el tratamiento descrito, según corresponda y conforme a la ley aplicable.',
    ],
  },
  {
    title: '2. Datos que podemos recopilar',
    body: [
      'Datos de cuenta: nombre, correo electrónico, foto de perfil, identificador de usuario, proveedor de inicio de sesión y preferencias de idioma.',
      'Datos de salud: síntomas ingresados, resultados de triaje, recomendaciones, alergias, grupo sanguíneo, fecha de nacimiento, documentos médicos, contactos de emergencia y notas relacionadas con citas.',
      'Datos de ubicación: coordenadas aproximadas o exactas cuando das permiso, usadas para sugerir hospitales, centros de salud, farmacias o laboratorios cercanos.',
      'Datos técnicos: estado de conexión, registros de sincronización, almacenamiento local, errores, dispositivo, navegador y datos necesarios para seguridad, operación y mejora del servicio.',
      'Datos de pago o membresía: plan seleccionado, estado de suscripción y método de pago elegido. Salud Conecta IA no debe almacenar el número completo de tarjeta ni el CVV.',
    ],
  },
  {
    title: '3. Finalidades del tratamiento',
    body: [
      'Prestar funciones de cuenta, autenticación, perfil, historial, citas, beneficios, búsqueda de centros y soporte.',
      'Generar orientación inicial mediante IA o reglas locales, mostrar centros cercanos y guardar resultados de triaje cuando lo solicites.',
      'Sincronizar información entre el dispositivo, Firebase/Firestore, almacenamiento local offline y servicios clínicos compatibles con FHIR cuando estén habilitados.',
      'Mejorar seguridad, disponibilidad, rendimiento, prevención de abuso, trazabilidad de errores y continuidad del servicio.',
      'Gestionar membresías, beneficios, comunicación transaccional y soporte al usuario.',
    ],
  },
  {
    title: '4. Inteligencia artificial y límites médicos',
    body: [
      'Las respuestas de IA, el triaje y las recomendaciones de Salud Conecta IA son herramientas de apoyo informativo. No sustituyen diagnóstico, consulta médica, receta profesional, evaluación presencial ni atención de emergencia.',
      'Si presentas síntomas graves, riesgo vital, dolor intenso, dificultad respiratoria, pérdida de conciencia, sangrado severo u otra emergencia, debes llamar a los servicios de emergencia o acudir al centro de salud más cercano.',
      'Los datos ingresados en funciones de IA pueden procesarse por proveedores tecnológicos integrados para generar respuestas. Debes evitar ingresar información de terceros sin autorización.',
    ],
  },
  {
    title: '5. Almacenamiento local y sincronización',
    body: [
      'La app puede guardar datos en el dispositivo mediante localStorage, IndexedDB y caché persistente para permitir uso offline, borradores, historial, cola de sincronización, citas y resultados de triaje.',
      'Cuando recuperes conexión, ciertos datos pendientes pueden sincronizarse con servicios en la nube. Puedes reducir datos locales cerrando sesión, borrando caché del navegador o solicitando eliminación de datos asociados a tu cuenta.',
    ],
  },
  {
    title: '6. Compartición de datos',
    body: [
      'Podemos compartir datos solo cuando sea necesario para operar la plataforma: autenticación, nube, base de datos, mapas, IA, mensajería, servicios clínicos, pagos, soporte, seguridad o cumplimiento legal.',
      'Los profesionales, clínicas, farmacias o laboratorios solo deberían acceder a información necesaria para prestar el servicio solicitado o autorizado por ti.',
      'No vendemos datos personales de salud. No usamos datos sensibles para publicidad conductual sin una base legal válida y consentimiento cuando corresponda.',
    ],
  },
  {
    title: '7. Seguridad y confidencialidad',
    body: [
      'Aplicamos controles técnicos y organizativos razonables para proteger la información, incluyendo autenticación, reglas de acceso, caché controlada, validaciones, registros de errores y medidas de cifrado disponibles en los proveedores usados.',
      'Ningún sistema es completamente infalible. El usuario debe proteger sus credenciales, cerrar sesión en dispositivos compartidos y reportar accesos no autorizados o sospechas de exposición.',
    ],
  },
  {
    title: '8. Derechos del titular',
    body: [
      'Puedes solicitar acceso, rectificación, actualización, cancelación, oposición, limitación o eliminación de tus datos cuando corresponda legalmente.',
      'También puedes revocar permisos del navegador, como ubicación, cámara, micrófono o notificaciones. Algunas funciones pueden dejar de operar si retiras permisos necesarios.',
      'Para ejercer derechos, escribe al canal oficial de soporte o al correo de privacidad que el responsable publique en producción, indicando tu nombre, correo de cuenta y solicitud concreta.',
    ],
  },
  {
    title: '9. Retención',
    body: [
      'Conservamos los datos durante el tiempo necesario para prestar el servicio, cumplir obligaciones legales, resolver disputas, mantener seguridad, respaldar historial médico solicitado por el usuario y atender auditorías o requerimientos válidos.',
      'La app puede limpiar ciertos datos locales antiguos, como mensajes o elementos de sincronización, conforme a sus reglas técnicas de retención.',
    ],
  },
  {
    title: '10. Términos de uso',
    body: [
      'Debes usar Salud Conecta IA de forma lícita, aportar información verdadera, no suplantar identidades, no intentar acceder a datos de terceros y no interferir con la seguridad o disponibilidad de la plataforma.',
      'Las cuentas de profesionales o entidades pueden requerir verificación documental. La plataforma puede rechazar, suspender o retirar perfiles que no sean verificables, sean engañosos o incumplan estos términos.',
      'Los beneficios, descuentos, disponibilidad de citas, centros cercanos y tiempos de atención pueden variar según ubicación, proveedores, conectividad y datos disponibles.',
    ],
  },
  {
    title: '11. Menores de edad',
    body: [
      'Si la plataforma es utilizada por menores, debe hacerse con autorización y supervisión de madre, padre, tutor o representante legal. No debe ingresarse información sensible de menores sin autorización válida.',
    ],
  },
  {
    title: '12. Cambios al documento',
    body: [
      'Podemos actualizar esta Política de Privacidad y Términos de Uso para reflejar cambios técnicos, legales o de negocio. La versión vigente será la publicada dentro de la aplicación.',
    ],
  },
];

const highlights = [
  { icon: ShieldCheck, label: 'Datos sensibles', value: 'Salud, ubicación y documentos clínicos' },
  { icon: Database, label: 'Almacenamiento', value: 'Firebase, FHIR, IndexedDB y caché offline' },
  { icon: BrainCircuit, label: 'IA', value: 'Orientación informativa, no diagnóstico médico' },
  { icon: UserCheck, label: 'Derechos', value: 'Acceso, rectificación, cancelación y oposición' },
];

export default function PrivacyTerms() {
  return (
    <div className="w-full px-4 md:px-6 py-8 md:py-10 pb-28">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <section className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('goBack'))}
                  className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center hover:bg-surface-container-high transition-all text-on-surface-variant border border-outline-variant/30 shadow-sm"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 text-primary text-xs font-black uppercase tracking-widest mb-1">
                    <LockKeyhole className="w-4 h-4" />
                    Documento legal
                  </div>
                  <h1 className="text-3xl md:text-5xl font-display font-black text-on-surface tracking-tight">
                    Privacidad y Términos de Uso
                  </h1>
                </div>
              </div>
              <p className="mt-2 text-on-surface-variant leading-relaxed max-w-3xl md:pl-16">
                Este documento describe cómo Salud Conecta IA recopila, usa, protege y comparte información personal,
                especialmente datos sensibles de salud, y establece las condiciones básicas para utilizar la plataforma.
              </p>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest md:pl-16">
                Última actualización: 23 de mayo de 2026
              </p>
            </div>

            <div className="lg:w-72 bg-surface-container border border-outline-variant/30 rounded-2xl p-5">
              <div className="flex items-center gap-3 text-error mb-3">
                <AlertTriangle className="w-5 h-5" />
                <h2 className="text-sm font-black uppercase tracking-widest">Aviso importante</h2>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Este texto es una base operativa para la app y debe ser revisado por asesoría legal antes de publicarse
                como documento definitivo.
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item) => (
            <div key={item.label} className="bg-surface-container border border-outline-variant/30 rounded-2xl p-5">
              <item.icon className="w-5 h-5 text-primary mb-4" />
              <h2 className="text-sm font-black text-on-surface">{item.label}</h2>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-display font-black text-on-surface">Marco de referencia</h2>
              <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                Para Nicaragua, la Ley No. 787 reconoce los datos relativos a la salud como datos personales sensibles
                y exige bases legítimas como consentimiento del titular, autorización legal u orden judicial para su
                tratamiento. La operación final debe ajustarse también a cualquier regulación sanitaria, contractual y
                de protección al consumidor aplicable.
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          {sections.map((section) => (
            <article key={section.title} className="bg-surface-container border border-outline-variant/30 rounded-2xl p-6 md:p-7">
              <div className="flex items-start gap-3 mb-4">
                <FileText className="w-5 h-5 text-primary mt-1 shrink-0" />
                <h2 className="text-lg md:text-xl font-display font-black text-on-surface">{section.title}</h2>
              </div>
              <div className="space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm text-on-surface-variant leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-display font-black text-on-surface">Contacto de privacidad</h2>
              <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                Antes de producción, configura un correo real de privacidad y soporte. Sugerencia temporal:
                <span className="font-bold text-on-surface"> privacidad@saludconecta.example</span>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

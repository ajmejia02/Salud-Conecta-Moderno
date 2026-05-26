/**
═══════════════════════════════════════════════════════════════
BASE DE DATOS DE SALUD — Salud-Conecta IA (Granada, Nicaragua)
═══════════════════════════════════════════════════════════════
📌 VERSIÓN: 14.0.0
📌 ÚLTIMA ACTUALIZACIÓN: 2026-12-30
📌 CAMBIOS v14.0.0:
- Actualización TITÁNICA: Adición de 20 escenarios de soporte vital, obstetricia, pediatría y toxicología.
- Cobertura clínica experta para Preeclampsia, Apendicitis, Intoxicación por pesticidas, Mordedura de serpiente, Fracturas abiertas, Edema pulmonar y más.
- Incorporación de 8 nuevos medicamentos de uso especializado y emergencia (Clonazepam, Tramadol, Labetalol, Ácido Tranexámico).
═══════════════════════════════════════════════════════════════
*/

export const VERSION_BASE_DATOS = '14.0.0';
export const ULTIMA_ACTUALIZACION = '2026-12-30';

// ═══════════════════════════════════════════════════════════════
//  🏥 HOSPITALES
// ═══════════════════════════════════════════════════════════════
export const HOSPITALES = [
  {
    id: 1,
    categoria: 'hospital',
    nombre: 'Hospital Amistad Japón Nicaragua',
    direccion: 'Km 44.5 Carretera Granada-Masaya, Barrio El Capullo',
    telefono: '2552-7050',
    emergencia: true,
    lat: 11.93749, lng: -85.97651,
    horario: '24 horas',
    servicios: ['urgencias','consulta','hospitalizacion','laboratorio','rayos_x','cirugia','pediatria','ginecologia','maternidad','oncologia','medicina_natural'],
    disponible: true, verificado: true,
    barrio: 'Barrio El Capullo',
    notas: 'Hospital Departamental público principal de Granada (MINSA/SILAIS). Urgencias 24h gratuitas. Referencia departamental.',
    seguros: ['INSS','MINSA','Atención gratuita']
  },
];

// ═══════════════════════════════════════════════════════════════
//  🏥 CLÍNICAS / CENTROS DE SALUD
// ═══════════════════════════════════════════════════════════════
export const CLINICAS = [
  {
    id: 5, categoria: 'clinica',
    nombre: 'Centro de Salud Villa Sandino',
    direccion: 'Barrio Villa Sandino, Granada',
    telefono: '2552-0800', emergencia: false,
    lat: 11.940325538533882, lng: -85.95034747503418,
    horario: 'Lun-Vie 7am-5pm',
    servicios: ['consulta','vacunacion','curaciones'],
    disponible: true, verificado: true,
    barrio: 'Villa Sandino',
    notas: 'Centro de Salud MINSA. Atención gratuita.',
    seguros: ['MINSA','Atención gratuita']
  },
  
  {
    id: 8, categoria: 'clinica',
    nombre: 'CMP MINSA — Amistad Japón Nicaragua',
    direccion: 'Km 44.5 Carretera Granada-Masaya, junto al Hospital',
    telefono: '2552-7060', emergencia: false,
    lat: 11.9378, lng: -85.9768,
    horario: 'Lun-Vie 7am-4pm',
    servicios: ['consulta','especialidades','laboratorio','ultrasonido','fisioterapia'],
    disponible: true, verificado: true,
    barrio: 'Barrio El Capullo',
    notas: 'Clínica Médica Previsional MINSA. Atención INSS.',
    seguros: ['INSS']
  },
  {
    id: 9, categoria: 'clinica',
    nombre: 'Centro de Salud Pedro José Chamorro',
    direccion: 'Shell Palmira 1/2 Cuadra al sur, Barrio Calle Palmira',
    telefono: '2552-0550', emergencia: false,
    lat: 11.924550288880951, lng: -85.9551822857508,
    horario: 'Lun-Vie 7am-5pm',
    servicios: ['consulta','vacunacion','curaciones','control_nino_sano'],
    disponible: true, verificado: true,
    barrio: 'Barrio Calle Palmira',
    notas: 'Centro de Salud MINSA. Atención gratuita.',
    seguros: ['MINSA','Atención gratuita']
  },
  
{
    id: 10, categoria: 'clinica',
    nombre: 'Centro de Salud Jorge Sinforoso Bravo',
    direccion: 'Costado norte del Parque Sandino, Barrio Estación',
    telefono: '2552-0600',
    emergencia: false,
    lat: 11.937906439969485, lng: -85.95607792577198,
    horario: 'Lun-Vie 7am-8pm, Sab-Dom 7am-12pm',
    servicios: ['urgencias','consulta','vacunacion','maternidad','pediatria','laboratorio','medicina_natural'],
    disponible: true, verificado: true,
    barrio: 'Barrio Estación',
    notas: 'Centro de Salud principal MINSA Granada. Frente al Parque Sandino. Atención gratuita.',
    seguros: ['MINSA','Atención gratuita']
  },
  {
    id: 15, categoria: 'clinica',
    nombre: 'Clínica Santa Gema',
    direccion: 'Calle El Consulado, de la Iglesia La Merced 2 cuadras al sur',
    telefono: '2552-6226', emergencia: false,
    lat: 11.9288, lng: -85.9561,
    horario: 'Lun-Vie 8am-6pm, Sab 8am-1pm',
    servicios: ['consulta_general','especialidades','ultrasonido','procedimientos_menores'],
    disponible: true, verificado: true,
    barrio: 'El Consulado',
    notas: 'Clínica privada con atención de especialidades.',
    seguros: ['Particular', 'Seguros privados']
  }

];

// ═══════════════════════════════════════════════════════════════
//  🔬 LABORATORIOS
// ═══════════════════════════════════════════════════════════════
export const LABORATORIOS = [
 
  {
    id: 13, categoria: 'laboratorio',
    nombre: 'Laboratorio Clínico San Pablo',
    direccion: 'De la Alcaldía Municipal, 1/2 cuadra al lago, Granada',
    telefono: '2552-4659', emergencia: false,
    lat: 11.9313, lng: -85.9555,
    horario: 'Lun-Vie 7am-5pm, Sab 7am-12pm',
    servicios: ['analisis_sangre', 'examenes_orina', 'examenes_heces', 'pruebas_especiales', 'perfil_lipidico', 'quimica_sanguinea'],
    disponible: true, verificado: true,
    barrio: 'Centro',
    notas: 'Laboratorio privado con amplia gama de pruebas clínicas.',
    seguros: ['Particular']
  }
];

// ═══════════════════════════════════════════════════════════════
//  💊 FARMACIAS
// ═══════════════════════════════════════════════════════════════
export const FARMACIAS = [
  {
    id: 12, categoria: 'farmacia',
    nombre: 'Farmacia Praga',
    direccion: 'Calle Real Xalteva, Granada',
    telefono: '2552-5726', emergencia: true,
    lat: 11.929166203335145, lng: -85.95543572290977,
    horario: '8 am - 10 pm',
    servicios: ['medicamentos'],
    disponible: true, verificado: true,
    barrio: 'Xalteva',
    notas: 'Precios económicos.'
  },
  {
    id: 14, categoria: 'farmacia',
    nombre: 'Farmacia Xolotlán',
    direccion: 'Calle La Calzada, del Parque Central 1 cuadra al lago',
    telefono: '2552-2628', emergencia: true,
    lat: 11.9305, lng: -85.9532,
    horario: '24 horas',
    servicios: ['medicamentos','productos_higiene','recargas'],
    disponible: true, verificado: true,
    barrio: 'La Calzada',
    notas: 'Farmacia céntrica con servicio 24 horas.'
  },
  
];

// ═══════════════════════════════════════════════════════════════
//  💊 MEDICAMENTOS
// ═══════════════════════════════════════════════════════════════
export const MEDICAMENTOS = [
  // ════════════════════════════════════════════════════════
  //  GRUPO 1 — ANALGÉSICOS Y ANTIPIRÉTICOS
  // ════════════════════════════════════════════════════════
  {
    id: 1,
    nombre_es: 'Paracetamol',
    nombre_en: 'Acetaminophen',
    nombres_comerciales: ['Tempra','Panadol','Tylenol','Acetaminofén MK','Tabcin','Dolartrin'],
    sinonimos: ['acetaminofen','acetaminofén','tylenol','panadol','tempra','paracetamol mk','tabcin','dolartrin'],
    categoria: 'Analgésico/Antipirético',
    uso_principal: 'Dolor leve a moderado, fiebre, dolor de cabeza, dolor muscular',
    dosis_adulto: '500-1000 mg cada 6-8 horas (máximo 4 g por día)',
    dosis_nino: '10-15 mg/kg cada 6 horas (consultar médico)',
    contraindicaciones: 'Enfermedad hepática grave, alergia al paracetamol, consumo de alcohol',
    efectos_secundarios: 'Raro: daño hepático con sobredosis. No exceder dosis máxima.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '25-192 C$ (según presentación: gotas 25C$, jarabe 33-92.50C$, tabletas 43-192C$)',
    embarazo: 'Categoría B — Seguro bajo supervisión médica'
  },
  {
    id: 2,
    nombre_es: 'Ibuprofeno',
    nombre_en: 'Ibuprofen',
    nombres_comerciales: ['Advil','Motrin','Nurofen','Ibuprofeno MK','Aleve','Ibuwin'],
    sinonimos: ['advil','motrin','ibuprofeno','ibuprofeno mk','aleve','ibuwin'],
    categoria: 'Antiinflamatorio No Esteroideo (AINE)',
    uso_principal: 'Dolor, inflamación, fiebre, dolor muscular, artritis',
    dosis_adulto: '400-600 mg cada 6-8 horas (máximo 2.4 g por día). Tomar con comida.',
    dosis_nino: '5-10 mg/kg cada 6-8 horas (consultar médico)',
    contraindicaciones: 'Úlceras gástricas, enfermedad renal, embarazo en 3er trimestre, alergia a AINEs',
    efectos_secundarios: 'Malestar estomacal, mareos. Tomar con alimentos.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '48.50-611 C$ (según presentación: jarabe 31-48.50C$, tabletas 63-242C$, forte 361.50-611C$)',
    embarazo: 'Categoría C — Evitar en 3er trimestre'
  },
  {
    id: 3,
    nombre_es: 'Amoxicilina',
    nombre_en: 'Amoxicillin',
    nombres_comerciales: ['Amoxal','Trimox','Novamox','Amoxicilina MK','Solkamox','Cilamox'],
    sinonimos: ['amoxal','amoxicillin','amoxicilina mk','solkamox','cilamox'],
    categoria: 'Antibiótico (Betalactámico)',
    uso_principal: 'Infecciones bacterianas: garganta, oído, sinusitis, urinarias, bronquitis',
    dosis_adulto: '500 mg cada 8 horas, o 875 mg cada 12 horas (7-10 días)',
    dosis_nino: '20-40 mg/kg/día dividido en 3 dosis (consultar médico)',
    contraindicaciones: 'Alergia a penicilinas o cefalosporinas, mononucleosis infecciosa',
    efectos_secundarios: 'Diarrea, náuseas, erupción cutánea. Completar el tratamiento.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '32-206 C$ (según presentación: suspensión 32-89C$, cápsulas 127-206C$)',
    embarazo: 'Categoría B — Generalmente seguro con prescripción'
  },
  {
    id: 4,
    nombre_es: 'Omeprazol',
    nombre_en: 'Omeprazole',
    nombres_comerciales: ['Losec','Prilosec','Omepral','Omeprazol MK'],
    sinonimos: ['losec','prilosec','omepral','omeprazol mk'],
    categoria: 'Inhibidor de Bomba de Protones (IBP)',
    uso_principal: 'Acidez, reflujo gastroesofágico (ERGE), úlceras gástricas, gastritis',
    dosis_adulto: '20-40 mg una vez al día, 30 min antes del desayuno',
    dosis_nino: 'Consultar médico (uso pediátrico con supervisión)',
    contraindicaciones: 'Alergia al omeprazol o benzimidazoles. Interacción con clopidogrel.',
    efectos_secundarios: 'Dolor de cabeza, diarrea, náuseas. Uso prolongado puede reducir vitamina B12.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '44-83 C$ (según presentación: inyectable 44C$, cápsulas 83C$)',
    embarazo: 'Categoría C — Consultar médico'
  },
  {
    id: 5,
    nombre_es: 'Ácido Fólico',
    nombre_en: 'Folic Acid',
    nombres_comerciales: ['Folamil','Acido Fólico MK','Folato'],
    sinonimos: ['acido folico','folato','folic acid','folamil','vitamina b9'],
    categoria: 'Vitamina B9 / Suplemento Prenatal',
    uso_principal: 'Prevención de defectos del tubo neural en el feto. Anemia megaloblástica. Suplemento prenatal.',
    dosis_adulto: '400-800 mcg una vez al día (iniciar 1 mes antes del embarazo)',
    dosis_nino: 'Consultar médico pediátrico',
    contraindicaciones: 'Alergia al ácido fólico. Puede enmascarar deficiencia de vitamina B12.',
    efectos_secundarios: 'Muy raros: náuseas leves, malestar estomacal',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '143 C$ (100 tabletas)',
    embarazo: 'Categoría A — SEGURO y RECOMENDADO en embarazo',
    trimestres: 'Especialmente importante en primer trimestre'
  },
  {
    id: 6,
    nombre_es: 'Loratadina',
    nombre_en: 'Loratadine',
    nombres_comerciales: ['Claritin','Loratadina MK','Clarityne','Histiacil','Restaler'],
    sinonimos: ['claritin','clarityne','histiacil','antihistaminico','loratadina mk','restaler'],
    categoria: 'Antihistamínico (no sedante)',
    uso_principal: 'Alergias, rinitis alérgica, urticaria, picazón ocular, estornudos frecuentes',
    dosis_adulto: '10 mg una vez al día (no causa sueño)',
    dosis_nino: '5 mg una vez al día (niños 2-12 años, consultar médico)',
    contraindicaciones: 'Alergia a la loratadina. Precaución en insuficiencia hepática grave.',
    efectos_secundarios: 'Dolor de cabeza, boca seca. Generalmente bien tolerado.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '26-159.50 C$ (según presentación: jarabe 35-48C$, tabletas 62-159.50C$)',
    embarazo: 'Categoría B — Generalmente seguro, consultar médico'
  },
  {
    id: 7,
    nombre_es: 'Metronidazol',
    nombre_en: 'Metronidazole',
    nombres_comerciales: ['Flagyl','Metronidazol MK','Rozex','Metrazol'],
    sinonimos: ['flagyl','metronidazole','rozex','metronidazol mk','metrazol'],
    categoria: 'Antibiótico/Antiparasitario',
    uso_principal: 'Infecciones por bacterias anaerobias, amebas (diarrea con sangre), Giardia, vaginosis bacteriana',
    dosis_adulto: '500 mg cada 8 horas por 7-10 días (según infección)',
    dosis_nino: '7.5 mg/kg cada 8 horas (consultar médico)',
    contraindicaciones: 'Alergia al metronidazol. No consumir alcohol durante el tratamiento (reacción grave).',
    efectos_secundarios: 'Náuseas, sabor metálico en la boca, mareos. Orina puede oscurecerse.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '35-232 C$ (según presentación: suspensión 35-123C$, tabletas 56-232C$)',
    embarazo: 'Categoría B — Evitar en primer trimestre, consultar médico'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 2 — GASTROENTEROLOGÍA
  // ════════════════════════════════════════════════════════
  {
    id: 8,
    nombre_es: 'Ranitidina',
    nombre_en: 'Ranitidine',
    nombres_comerciales: ['Zantac','Ulcodin','Ranitidina MK'],
    sinonimos: ['zantac','ulcodin','para la acidez','antiulcera','anti acido'],
    categoria: 'Antiulceroso (H2)',
    uso_principal: 'Úlcera gástrica y duodenal, reflujo, acidez estomacal',
    dosis_adulto: '150 mg dos veces al día o 300 mg en la noche',
    dosis_nino: '2-4 mg/kg/día dividido en 2 dosis',
    contraindicaciones: 'Alergia a ranitidina. Precaución en insuficiencia renal.',
    efectos_secundarios: 'Dolor de cabeza, mareos, constipación. Generalmente bien tolerado.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '125 C$ (100 cápsulas)',
    embarazo: 'Categoría B — Generalmente seguro, consultar médico'
  },
  {
    id: 9,
    nombre_es: 'Loperamida',
    nombre_en: 'Loperamide',
    nombres_comerciales: ['Imodium','Lopex','Loperamida MK','Tape-C','Ilo mida'],
    sinonimos: ['imodium','antidiarreico','para la diarrea','para el estomago','tape-c','ilomida'],
    categoria: 'Antidiarreico',
    uso_principal: 'Diarrea aguda no complicada en adultos y mayores de 2 años',
    dosis_adulto: '4 mg al inicio, luego 2 mg tras cada deposición líquida (máx 16 mg/día)',
    dosis_nino: 'Mayores de 2 años: 1-2 mg según peso. NO en menores de 2 años.',
    contraindicaciones: 'Diarrea con sangre o fiebre alta, menores de 2 años, colitis.',
    efectos_secundarios: 'Estreñimiento, náuseas, dolor abdominal leve.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '180-265 C$ (según presentación: 50-100 cápsulas)',
    embarazo: 'Categoría C — Evitar en primer trimestre'
  },
  {
    id: 10,
    nombre_es: 'Metoclopramida',
    nombre_en: 'Metoclopramide',
    nombres_comerciales: ['Plasil','Primperan','Metoclopramida MK','Nausyl'],
    sinonimos: ['plasil','primperan','para el vomito','antinausea','antiemetico','nausyl'],
    categoria: 'Antivomitivo / Procinético',
    uso_principal: 'Náuseas y vómitos, reflujo gastroesofágico',
    dosis_adulto: '10 mg tres veces al día, 30 minutos antes de comidas. Máx 5 días.',
    dosis_nino: '0.1 mg/kg tres veces al día (consultar médico)',
    contraindicaciones: 'Epilepsia, hemorragia gastrointestinal, obstrucción intestinal.',
    efectos_secundarios: 'Somnolencia, inquietud, movimientos involuntarios con uso prolongado.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '71-270 C$ (según presentación: tabletas 50-208C$, inyectable 75C$)',
    embarazo: 'Categoría B — Consultar médico'
  },
  {
    id: 11,
    nombre_es: 'Sales de Rehidratación Oral',
    nombre_en: 'Oral Rehydration Salts',
    nombres_comerciales: ['Suero oral','Hidraplus','Rehidrat','Litrosol','Electrolit','Pedialyte','Oralectril'],
    sinonimos: ['suero','suero oral','rehidratacion','sales orales','litrosol','hidraplus','para deshidratacion','suero casero','electrolit','pedialyte','oralectril'],
    categoria: 'Electrolítico / Rehidratación',
    uso_principal: 'Deshidratación por diarrea, vómitos o fiebre alta',
    dosis_adulto: '1 sobre disuelto en 1 litro de agua hervida, tomar a sorbos frecuentes',
    dosis_nino: '50-100 mL por kg en 4 horas (casos moderados)',
    contraindicaciones: 'Vómitos incoercibles (requiere suero IV). Obstrucción intestinal.',
    efectos_secundarios: 'Náuseas leves si se toma muy rápido. Muy bien tolerado.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '39.50-266 C$ (según presentación: 475-1000ml)',
    embarazo: 'Categoría A — Seguro y recomendado'
  },
  {
    id: 12,
    nombre_es: 'Sulfato de Zinc',
    nombre_en: 'Zinc Sulfate',
    nombres_comerciales: ['Zinc MK','Zincovit','Zintablets','Nor Crezinc'],
    sinonimos: ['zinc','para la diarrea del niño','suplemento zinc','nor crezinc'],
    categoria: 'Suplemento / Antidiarreico pediátrico',
    uso_principal: 'Diarrea infantil (junto al suero oral), deficiencia de zinc',
    dosis_adulto: '20 mg al día por 10-14 días',
    dosis_nino: 'Menores de 6 meses: 10 mg/día. Mayores: 20 mg/día por 10-14 días.',
    contraindicaciones: 'Alergia al zinc. No exceder dosis recomendada.',
    efectos_secundarios: 'Náuseas o vómitos si se toma en ayunas. Tomar con comida.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '63-126.50 C$ (según presentación)',
    embarazo: 'Categoría A — Suplemento seguro'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 3 — RESPIRATORIO
  // ════════════════════════════════════════════════════════
  {
    id: 13,
    nombre_es: 'Salbutamol',
    nombre_en: 'Salbutamol / Albuterol',
    nombres_comerciales: ['Ventolin','Salbumax','Broncovent','Albuterol','Asthamol'],
    sinonimos: ['ventolin','inhalador','para el asma','broncodilatador','dificultad para respirar','silbido','asthamol'],
    categoria: 'Broncodilatador (Beta-2)',
    uso_principal: 'Asma, broncoespasmo, EPOC. Alivio rápido de dificultad para respirar.',
    dosis_adulto: 'Inhalador: 1-2 puffs cada 4-6 h. Jarabe: 2-4 mg tres veces al día.',
    dosis_nino: 'Inhalador: 1-2 puffs según necesidad. Jarabe: 0.1-0.15 mg/kg 3 veces al día.',
    contraindicaciones: 'Alergia al salbutamol. Precaución en cardiopatías y diabetes.',
    efectos_secundarios: 'Temblor de manos, palpitaciones, dolor de cabeza. Transitorios.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '34.50-63 C$ (según presentación: jarabe 34.50C$, inhalador 50.50-63C$, gotas nebulizar 48.50C$)',
    embarazo: 'Categoría C — Usar solo si es necesario'
  },
  {
    id: 14,
    nombre_es: 'Clorfeniramina',
    nombre_en: 'Chlorpheniramine',
    nombres_comerciales: ['Alercort','Allergan','CTM','Clorfeniramina MK','Histac lor'],
    sinonimos: ['ctm','antihistaminico sedante','alergia','picazon','estornudos','histaclor'],
    categoria: 'Antihistamínico (1ra generación, causa sueño)',
    uso_principal: 'Alergias, rinitis alérgica, urticaria, picazón. Causa somnolencia.',
    dosis_adulto: '4 mg cada 6 horas (causa sueño — no conducir)',
    dosis_nino: '0.35 mg/kg/día dividido en 3-4 dosis',
    contraindicaciones: 'Glaucoma, retención urinaria, asma agudo. No conducir.',
    efectos_secundarios: 'Somnolencia (intensa), boca seca, visión borrosa.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '32.50-157 C$ (según presentación)',
    embarazo: 'Categoría B — Consultar médico'
  },
  {
    id: 15,
    nombre_es: 'Bromuro de Ipratropio',
    nombre_en: 'Ipratropium Bromide',
    nombres_comerciales: ['Atrovent','Ipravent','Ipratropio MK','Reloxyl'],
    sinonimos: ['atrovent','para epoc','broncodilatador anticolin','para enfisema','reloxyl'],
    categoria: 'Broncodilatador anticolinérgico',
    uso_principal: 'EPOC (enfisema, bronquitis crónica), asma como terapia adicional',
    dosis_adulto: 'Inhalador: 2-3 puffs tres o cuatro veces al día',
    dosis_nino: 'Bajo supervisión médica',
    contraindicaciones: 'Alergia a atropina o ipratropio.',
    efectos_secundarios: 'Boca seca, retención urinaria leve, visión borrosa.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '75-207 C$ (según presentación: solución nebulizar 75-207C$, inhalador 216C$)',
    embarazo: 'Categoría B — Consultar médico'
  },
  {
    id: 163,
    nombre_es: 'Ambroxol + Clenbuterol',
    nombre_en: 'Ambroxol + Clenbuterol',
    nombres_comerciales: ['Ambroxol+Clambuterol MK','Broncodil'],
    sinonimos: ['ambroxol clenbuterol','tos flema','broncodilatador','broncodil'],
    categoria: 'Mucolítico + Broncodilatador',
    uso_principal: 'Tos con flema, bronquitis, asma',
    dosis_adulto: '15mg+5mcg/5ml: 10ml tres veces al día',
    dosis_nino: '7.5mg+5mcg/5ml: según edad',
    contraindicaciones: 'Alergia, cardiopatías, hipertiroidismo',
    efectos_secundarios: 'Temblor, palpitaciones, náuseas',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '45.50-115 C$ (según presentación: jarabe adulto 73C$, pediátrico 45.50C$, gotas 97-115C$)',
    embarazo: 'Categoría C — Consultar médico'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 4 — CARDIOVASCULAR
  // ════════════════════════════════════════════════════════
  {
    id: 16,
    nombre_es: 'Enalapril',
    nombre_en: 'Enalapril',
    nombres_comerciales: ['Renitec','Vasotec','Lotrial','Enalapril MK'],
    sinonimos: ['renitec','para la presion','ieca','antihipertensivo','presion alta'],
    categoria: 'Antihipertensivo (IECA)',
    uso_principal: 'Hipertensión arterial, insuficiencia cardíaca, protección renal en diabetes',
    dosis_adulto: '5-40 mg una o dos veces al día (iniciar con 5 mg)',
    dosis_nino: 'Bajo supervisión médica estricta',
    contraindicaciones: 'Embarazo (contraindicado absolutamente), angioedema previo, alergia.',
    efectos_secundarios: 'Tos seca persistente (muy común), mareos, hiperpotasemia.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '54-70 C$ (100 tabletas)',
    embarazo: 'Categoría D — CONTRAINDICADO en embarazo'
  },
  {
    id: 17,
    nombre_es: 'Losartán',
    nombre_en: 'Losartan',
    nombres_comerciales: ['Cozaar','Losartan MK','Losacar','Losaraven'],
    sinonimos: ['cozaar','losacar','para la presion','ara2','antihipertensivo','sinttos','losaraven'],
    categoria: 'Antihipertensivo (ARA II)',
    uso_principal: 'Hipertensión arterial, nefropatía diabética, insuficiencia cardíaca',
    dosis_adulto: '50-100 mg una vez al día',
    dosis_nino: 'Mayores de 6 años bajo supervisión médica',
    contraindicaciones: 'Embarazo (contraindicado), alergia. No combinar con enalapril ni potasio sin control.',
    efectos_secundarios: 'Mareos, hiperpotasemia. NO causa tos (ventaja sobre enalapril).',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '27.50-334 C$ (según presentación: 10-100 tabletas)',
    embarazo: 'Categoría D — CONTRAINDICADO en embarazo'
  },
  {
    id: 18,
    nombre_es: 'Amlodipina',
    nombre_en: 'Amlodipine',
    nombres_comerciales: ['Norvasc','Amlocard','Amlodipina MK'],
    sinonimos: ['norvasc','para la presion','calcioantagonista','para angina'],
    categoria: 'Antihipertensivo (Bloqueador calcio)',
    uso_principal: 'Hipertensión arterial, angina de pecho',
    dosis_adulto: '5-10 mg una vez al día',
    dosis_nino: 'Consultar médico pediátrico',
    contraindicaciones: 'Alergia a dihidropiridinas. Precaución en insuficiencia cardíaca grave.',
    efectos_secundarios: 'Edema en tobillos, enrojecimiento facial, palpitaciones, dolor de cabeza.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '80-111 C$ (30 tabletas)',
    embarazo: 'Categoría C — Consultar médico'
  },
  {
    id: 19,
    nombre_es: 'Hidroclorotiazida',
    nombre_en: 'Hydrochlorothiazide',
    nombres_comerciales: ['HCT','Dichlotride','Hidroclorotiazida MK'],
    sinonimos: ['hct','diuretico','para los pies hinchados','para la presion','tiazida'],
    categoria: 'Diurético tiazídico / Antihipertensivo',
    uso_principal: 'Hipertensión arterial, edemas, insuficiencia cardíaca',
    dosis_adulto: '12.5-25 mg una vez al día (mañana)',
    dosis_nino: 'Consultar médico',
    contraindicaciones: 'Insuficiencia renal grave, alergia a sulfas. Precaución en diabetes y gota.',
    efectos_secundarios: 'Baja el potasio (calambres), sube el azúcar y el ácido úrico.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '38-50 C$ (según presentación)',
    embarazo: 'Categoría B — Consultar médico'
  },
  {
    id: 20,
    nombre_es: 'Furosemida',
    nombre_en: 'Furosemide',
    nombres_comerciales: ['Lasix','Diurin','Furosemida MK','Diuremide'],
    sinonimos: ['lasix','diuretico fuerte','para pies hinchados','edema','para el corazon','diuremide'],
    categoria: 'Diurético de asa',
    uso_principal: 'Edema (pies/tobillos hinchados), insuficiencia cardíaca, hipertensión grave',
    dosis_adulto: '20-80 mg una o dos veces al día',
    dosis_nino: '0.5-1 mg/kg (consultar médico)',
    contraindicaciones: 'Insuficiencia renal grave, deshidratación severa, alergia a sulfas.',
    efectos_secundarios: 'Pérdida de potasio (calambres), deshidratación, mareos al pararse.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '77-104 C$ (100 tabletas)',
    embarazo: 'Categoría C — Usar solo si es necesario'
  },
  {
    id: 21,
    nombre_es: 'Atenolol',
    nombre_en: 'Atenolol',
    nombres_comerciales: ['Tenormin','Betacard','Atenolol MK'],
    sinonimos: ['tenormin','betabloqueador','para el corazon','para la presion','para las palpitaciones'],
    categoria: 'Antihipertensivo / Betabloqueador',
    uso_principal: 'Hipertensión arterial, angina, arritmias, prevención de infarto',
    dosis_adulto: '25-100 mg una vez al día',
    dosis_nino: 'Consultar médico',
    contraindicaciones: 'Asma o EPOC grave, bloqueo cardíaco. No suspender bruscamente.',
    efectos_secundarios: 'Cansancio, manos frías, bradicardia, puede agravar asma.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '68.50 C$ (100 tabletas)',
    embarazo: 'Categoría D — Consultar médico'
  },
  {
    id: 131,
    nombre_es: 'Irbesartán',
    nombre_en: 'Irbesartan',
    nombres_comerciales: ['Irbesartán MK','Aprovel','Irbesartan LaSanté'],
    sinonimos: ['irbesartan','ara2','para la presion','antihipertensivo'],
    categoria: 'Antihipertensivo (ARA II)',
    uso_principal: 'Hipertensión arterial, nefropatía diabética',
    dosis_adulto: '150-300 mg una vez al día',
    dosis_nino: 'Mayores de 6 años bajo supervisión médica',
    contraindicaciones: 'Embarazo, alergia, insuficiencia renal grave',
    efectos_secundarios: 'Mareos, fatiga, hiperpotasemia',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '108-352 C$ (según presentación)',
    embarazo: 'Categoría D — CONTRAINDICADO'
  },
  {
    id: 132,
    nombre_es: 'Carvedilol',
    nombre_en: 'Carvedilol',
    nombres_comerciales: ['Coreg','Dilatrend','Carvedilol MK'],
    sinonimos: ['coreg','dilatrend','para el corazon','betabloqueador','insuficiencia cardiaca'],
    categoria: 'Betabloqueador / Alfa-bloqueador',
    uso_principal: 'Insuficiencia cardíaca, hipertensión arterial, cardioprotección post-infarto',
    dosis_adulto: 'HTA: 12.5-25 mg dos veces al día. IC: iniciar 3.125 mg dos veces al día.',
    dosis_nino: 'Solo bajo supervisión cardiológica pediátrica',
    contraindicaciones: 'Asma grave, bloqueo cardíaco, bradicardia severa. No suspender bruscamente.',
    efectos_secundarios: 'Mareos, fatiga, manos frías, bradicardia.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '70-116.50 C$ (30 tabletas)',
    embarazo: 'Categoría C — Consultar médico'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 5 — ANTIINFLAMATORIOS ADICIONALES
  // ════════════════════════════════════════════════════════
  {
    id: 39,
    nombre_es: 'Diclofenaco',
    nombre_en: 'Diclofenac',
    nombres_comerciales: ['Voltaren','Cataflam','Artren','Diclofenaco MK','Diclo Azul','Dro pa Gel'],
    sinonimos: ['voltaren','cataflam','artren','para el dolor','antiinflamatorio','para la artritis','dolor muscular','diclo azul','dropa gel'],
    categoria: 'AINE / Antiinflamatorio',
    uso_principal: 'Dolor musculoesquelético, artritis, cólicos menstruales, traumatismos',
    dosis_adulto: '50 mg dos o tres veces al día con comida. Máx 150 mg/día.',
    dosis_nino: '1-3 mg/kg/día (consultar médico)',
    contraindicaciones: 'Úlcera gástrica, insuficiencia renal o cardíaca, embarazo avanzado. SIEMPRE con comida.',
    efectos_secundarios: 'Malestar estomacal, úlcera si no come, retención de líquidos.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '19.50-300 C$ (según presentación: gel 29.50-60.50C$, tabletas 60-101C$, complejo B 300C$)',
    embarazo: 'Categoría D en 3er trimestre — CONTRAINDICADO'
  },
  {
    id: 134,
    nombre_es: 'Dexketoprofeno',
    nombre_en: 'Dexketoprofen',
    nombres_comerciales: ['Dolkyl','Doltium','Enantyum','Dolantyum'],
    sinonimos: ['dexketoprofeno','dolkyl','doltium','para dolor fuerte','enantyum','dolantyum'],
    categoria: 'AINE potente',
    uso_principal: 'Dolor agudo moderado a severo',
    dosis_adulto: '25 mg cada 8 horas. MAX 75 mg/día',
    dosis_nino: 'No recomendado menores de 18 años',
    contraindicaciones: 'Úlcera, insuficiencia renal, embarazo',
    efectos_secundarios: 'Náuseas, malestar gástrico',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '24-935 C$ (según presentación: tabletas 71-75C$, solución oral 225-356C$, stick 513C$)',
    embarazo: 'Categoría C — Contraindicado en 3er trimestre'
  },
  {
    id: 40,
    nombre_es: 'Dipirona / Metamizol',
    nombre_en: 'Metamizole / Dipyrone',
    nombres_comerciales: ['Novalgin','Novalgina','Conmel','Dipirona MK','Biovalgina'],
    sinonimos: ['novalgin','novalgina','conmel','metamizol','para el dolor fuerte','para la fiebre alta','biovalgina'],
    categoria: 'Analgésico / Antipirético',
    uso_principal: 'Dolor intenso, fiebre alta, cólico renal o biliar',
    dosis_adulto: '500-1000 mg cada 6-8 horas (oral o inyectable)',
    dosis_nino: '10-15 mg/kg cada 6-8 horas',
    contraindicaciones: 'Alergia, porfiria, depresión de médula ósea.',
    efectos_secundarios: 'Reacciones alérgicas, caída de presión con inyección rápida. Rara agranulocitosis.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '11.50-110 C$ (según presentación: ampolla 11.50C$, jarabe 56-110C$, tabletas 43C$)',
    embarazo: 'Categoría C — Evitar en primer y tercer trimestre'
  },
  {
    id: 41,
    nombre_es: 'Ketorolaco',
    nombre_en: 'Ketorolac',
    nombres_comerciales: ['Toradol','Dolac','Ketorolaco MK','Ketalorac'],
    sinonimos: ['toradol','dolac','para el dolor fuerte','inyeccion para el dolor','antiinflamatorio inyectable'],
    categoria: 'AINE potente (oral e inyectable)',
    uso_principal: 'Dolor moderado a severo de corta duración (máx 5 días), dolor posoperatorio',
    dosis_adulto: '10-30 mg cada 4-6 horas. MAX 5 días de tratamiento.',
    dosis_nino: 'Bajo supervisión médica',
    contraindicaciones: 'Úlcera, insuficiencia renal, embarazo, uso prolongado. MAX 5 días.',
    efectos_secundarios: 'Malestar gástrico, riesgo de sangrado gastrointestinal.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '42.50-291.50 C$ (según presentación: tabletas 10-225C$, ampollas 42.50-74.50C$)',
    embarazo: 'Categoría C/D — Contraindicado en tercer trimestre'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 6 — ANTIBIÓTICOS ADICIONALES
  // ════════════════════════════════════════════════════════
  {
    id: 125,
    nombre_es: 'Azitromicina',
    nombre_en: 'Azithromycin',
    nombres_comerciales: ['Aziram','Zitromax','Azitromicina MK','Bactazit'],
    sinonimos: ['aziram','azitromicina','antibiotico fuerte','para infeccion','bactazit'],
    categoria: 'Antibiótico Macrólido',
    uso_principal: 'Infecciones respiratorias, faringitis, neumonía, ITS',
    dosis_adulto: '500 mg día 1, luego 250 mg días 2-5 O 500 mg por 3 días',
    dosis_nino: '10 mg/kg día 1, luego 5 mg/kg días 2-5',
    contraindicaciones: 'Alergia a macrólidos, enfermedad hepática grave',
    efectos_secundarios: 'Náuseas, diarrea, dolor abdominal',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '35.50-825 C$ (según presentación: suspensión 48.50-72.50C$, tabletas 35.50-191.50C$)',
    embarazo: 'Categoría B — Consultar médico'
  },
  {
    id: 126,
    nombre_es: 'Cefadroxilo',
    nombre_en: 'Cefadroxil',
    nombres_comerciales: ['Cefadroxilo MK','Duracef'],
    sinonimos: ['cefadroxilo','cefalosporina','antibiotico'],
    categoria: 'Antibiótico Cefalosporina (1ra generación)',
    uso_principal: 'Infecciones de piel, garganta, urinarias',
    dosis_adulto: '500 mg-1 g cada 12 horas',
    dosis_nino: '30-50 mg/kg/día dividido en 2 dosis',
    contraindicaciones: 'Alergia a cefalosporinas o penicilinas',
    efectos_secundarios: 'Diarrea, náuseas, erupción cutánea',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '61-380 C$ (según presentación: suspensión 61-78C$, tabletas 258-380C$)',
    embarazo: 'Categoría B — Generalmente seguro'
  },
  {
    id: 127,
    nombre_es: 'Cefalexina',
    nombre_en: 'Cephalexin',
    nombres_comerciales: ['Cefalexina MK','Keflex'],
    sinonimos: ['cefalexina','cefalosporina','antibiotico'],
    categoria: 'Antibiótico Cefalosporina (1ra generación)',
    uso_principal: 'Infecciones de piel, respiratorias, urinarias',
    dosis_adulto: '250-500 mg cada 6 horas',
    dosis_nino: '25-50 mg/kg/día dividido en 4 dosis',
    contraindicaciones: 'Alergia a cefalosporinas',
    efectos_secundarios: 'Diarrea, náuseas, mareos',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '409.50 C$ (100 cápsulas)',
    embarazo: 'Categoría B — Generalmente seguro'
  },
  {
    id: 128,
    nombre_es: 'Dicloxacilina',
    nombre_en: 'Dicloxacillin',
    nombres_comerciales: ['Dicloxacilina MK','Dicloxapen'],
    sinonimos: ['dicloxacilina','penicilina','antibiotico','dicloxapen'],
    categoria: 'Antibiótico Penicilina',
    uso_principal: 'Infecciones por Staphylococcus, piel, huesos',
    dosis_adulto: '250-500 mg cada 6 horas',
    dosis_nino: '12.5-25 mg/kg/día dividido en 4 dosis',
    contraindicaciones: 'Alergia a penicilinas',
    efectos_secundarios: 'Diarrea, náuseas, erupción',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '33-395 C$ (según presentación: suspensión 33-39C$, cápsulas 304.50-395C$)',
    embarazo: 'Categoría B — Generalmente seguro'
  },
  {
    id: 129,
    nombre_es: 'Ampicilina',
    nombre_en: 'Ampicillin',
    nombres_comerciales: ['Ampicilina MK','Omnipen','Unicilina'],
    sinonimos: ['ampicilina','penicilina','antibiotico','unicilina'],
    categoria: 'Antibiótico Penicilina',
    uso_principal: 'Infecciones respiratorias, urinarias, meningitis',
    dosis_adulto: '250-500 mg cada 6 horas',
    dosis_nino: '25-50 mg/kg/día dividido en 4 dosis',
    contraindicaciones: 'Alergia a penicilinas, mononucleosis',
    efectos_secundarios: 'Diarrea, erupción, náuseas',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '56.50-185.50 C$ (según presentación)',
    embarazo: 'Categoría B — Generalmente seguro'
  },
  {
    id: 130,
    nombre_es: 'Cloranfenicol',
    nombre_en: 'Chloramphenicol',
    nombres_comerciales: ['Cloranfenicol MK','Cloranfenicol Selectpharma'],
    sinonimos: ['cloranfenicol','antibiotico','para infeccion'],
    categoria: 'Antibiótico de amplio espectro',
    uso_principal: 'Infecciones graves, meningitis, infecciones oculares',
    dosis_adulto: '500 mg cada 6 horas',
    dosis_nino: '50-100 mg/kg/día dividido en 4 dosis',
    contraindicaciones: 'Alergia, embarazo, lactancia, neonatos',
    efectos_secundarios: 'Anemia aplásica (raro), náuseas, diarrea',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '45.50-290 C$ (según presentación: oftálmico 45.50C$, cápsulas 290C$)',
    embarazo: 'Categoría C — Evitar'
  },
  {
    id: 102,
    nombre_es: 'Amoxicilina + Ácido Clavulánico',
    nombre_en: 'Amoxicillin + Clavulanic Acid',
    nombres_comerciales: ['Augmentin','Clavulin','Amoxiclav','Cil Amox','Claviphar'],
    sinonimos: ['augmentin','clavulin','amoxiclav','antibiotico fuerte','para infeccion resistente','amoxicilina reforzada','claviphar'],
    categoria: 'Antibiótico amplio espectro (Penicilina + inhibidor)',
    uso_principal: 'Infecciones resistentes a amoxicilina: otitis, sinusitis, neumonía, ITU, mordeduras',
    dosis_adulto: '875/125 mg cada 12 horas por 7-10 días',
    dosis_nino: 'Suspensión: 25-45 mg/kg/día dividido cada 12 horas',
    contraindicaciones: 'Alergia a penicilinas, hepatitis previa por amoxiclav.',
    efectos_secundarios: 'Diarrea (común), náuseas, erupción cutánea. Tomar con comida.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '92.50-330 C$ (según presentación)',
    embarazo: 'Categoría B — Generalmente seguro'
  },
  {
    id: 103,
    nombre_es: 'Claritromicina',
    nombre_en: 'Clarithromycin',
    nombres_comerciales: ['Biaxin','Klaricid','Clanic','Claritromicina MK'],
    sinonimos: ['biaxin','klaricid','clanic','macrolido','para infeccion respiratoria','para h pylori'],
    categoria: 'Antibiótico Macrólido (2da generación)',
    uso_principal: 'Infecciones respiratorias, H. pylori (combinado), sinusitis, faringitis',
    dosis_adulto: '250-500 mg cada 12 horas por 7-14 días',
    dosis_nino: '7.5 mg/kg cada 12 horas',
    contraindicaciones: 'Alergia a macrólidos. Muchas interacciones (estatinas, warfarina, digoxina).',
    efectos_secundarios: 'Sabor metálico, náuseas, diarrea, dolor abdominal.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '290-360 C$ (30 tabletas)',
    embarazo: 'Categoría C — Evitar en primer trimestre'
  },
  {
    id: 104,
    nombre_es: 'Cefixima',
    nombre_en: 'Cefixime',
    nombres_comerciales: ['Suprax','Baxfim','Cefixima MK'],
    sinonimos: ['suprax','baxfim','cefalosporina oral','para gonorrea','infeccion urinaria complicada'],
    categoria: 'Antibiótico Cefalosporina (3ra generación oral)',
    uso_principal: 'Infecciones urinarias, gonorrea, otitis, faringitis, bronquitis',
    dosis_adulto: '400 mg una vez al día o 200 mg cada 12 horas por 7-10 días',
    dosis_nino: '8 mg/kg/día una vez al día (suspensión)',
    contraindicaciones: 'Alergia a cefalosporinas o penicilinas (precaución).',
    efectos_secundarios: 'Diarrea, náuseas, dolor abdominal.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '100-166 C$ (según presentación)',
    embarazo: 'Categoría B — Generalmente seguro'
  },
  {
    id: 46,
    nombre_es: 'Ceftriaxona',
    nombre_en: 'Ceftriaxone',
    nombres_comerciales: ['Rocephin','Ceftriaxona MK','Triaxon','Ceftril','Rocefort'],
    sinonimos: ['rocephin','triaxon','cefalosporina','antibiotico inyectable','para infeccion grave','ceftril','rocefort'],
    categoria: 'Antibiótico Cefalosporina (3ra generación)',
    uso_principal: 'Infecciones graves: neumonía, meningitis, sepsis, ITS (gonorrea)',
    dosis_adulto: '1-2 g al día (IM o IV)',
    dosis_nino: '50-100 mg/kg/día (consultar médico)',
    contraindicaciones: 'Alergia a cefalosporinas o penicilinas (precaución). Neonatos con hiperbilirrubinemia.',
    efectos_secundarios: 'Dolor en sitio de inyección, diarrea, reacciones alérgicas.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '38.50-190 C$ (según presentación: 1g IM/IV)',
    embarazo: 'Categoría B — Generalmente seguro'
  },
  {
    id: 107,
    nombre_es: 'Levofloxacina',
    nombre_en: 'Levofloxacin',
    nombres_comerciales: ['Levaquin','Xinanx','Levofloxacina MK'],
    sinonimos: ['levaquin','xinanx','quinolona potente','para neumonia','para infeccion grave'],
    categoria: 'Antibiótico Fluoroquinolona (3ra generación)',
    uso_principal: 'Neumonía, infecciones urinarias complicadas, sinusitis, bronquitis crónica agudizada',
    dosis_adulto: '500-750 mg una vez al día por 5-14 días',
    dosis_nino: 'No recomendado en menores de 18 años (excepto casos especiales)',
    contraindicaciones: 'Alergia a quinolonas, embarazo, epilepsia. Evitar sol excesivo.',
    efectos_secundarios: 'Náuseas, diarrea, fotosensibilidad, tendinitis (raro pero importante).',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '97-157 C$ (30 tabletas)',
    embarazo: 'Categoría C — Evitar'
  },
  {
    id: 45,
    nombre_es: 'Ciprofloxacina',
    nombre_en: 'Ciprofloxacin',
    nombres_comerciales: ['Cipro','Cifran','Ciprofloxacina MK','Ciprofthal'],
    sinonimos: ['cipro','cifran','quinolona','para infeccion urinaria','para la diarrea bacteriana','ciprofthal'],
    categoria: 'Antibiótico Fluoroquinolona',
    uso_principal: 'Infecciones urinarias complicadas, diarrea bacteriana, infecciones respiratorias',
    dosis_adulto: '250-750 mg dos veces al día por 3-14 días según infección',
    dosis_nino: 'Uso limitado (bajo supervisión médica)',
    contraindicaciones: 'Alergia a quinolonas, embarazo, menores de 18 años rutinario. Evitar con antiácidos.',
    efectos_secundarios: 'Náuseas, diarrea, sensibilidad al sol, tendinitis (raro). No tomar con leche.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '85-127 C$ (según presentación)',
    embarazo: 'Categoría C — Evitar si es posible'
  },
  {
    id: 108,
    nombre_es: 'Nitrofurantoína',
    nombre_en: 'Nitrofurantoin',
    nombres_comerciales: ['Macrobid','Uvamin','Nitrofurantoina MK'],
    sinonimos: ['macrobid','uvamin','para infeccion urinaria','para cistitis','antibiotico orina','itu recurrente'],
    categoria: 'Antibiótico urinario específico',
    uso_principal: 'Infecciones del tracto urinario inferior (cistitis), profilaxis de ITU recurrente. SOLO actúa en orina.',
    dosis_adulto: '100 mg cada 12 horas por 5-7 días. Profilaxis: 50-100 mg/noche.',
    dosis_nino: '5-7 mg/kg/día dividido (mayores de 3 meses)',
    contraindicaciones: 'Insuficiencia renal, embarazo término, menores de 3 meses.',
    efectos_secundarios: 'Orina amarilla/marrón (normal), náuseas. Tomar con comida.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '213 C$ (100 tabletas)',
    embarazo: 'Categoría B — Evitar en término y parto'
  },
  {
    id: 116,
    nombre_es: 'Eritromicina',
    nombre_en: 'Erythromycin',
    nombres_comerciales: ['Ery-Tab','Ilosone','Eritromicina MK','Ericiclina'],
    sinonimos: ['ilosone','macrolido basico','para acne','alternativa penicilina','para alergia a penicilina','ericiclina'],
    categoria: 'Antibiótico Macrólido (1ra generación)',
    uso_principal: 'Infecciones en alérgicos a penicilina, acné moderado, infecciones de piel y respiratorias',
    dosis_adulto: '250-500 mg cada 6-12 horas por 7-10 días',
    dosis_nino: '30-50 mg/kg/día dividido cada 6-8 horas',
    contraindicaciones: 'Alergia a macrólidos. Muchas interacciones medicamentosas.',
    efectos_secundarios: 'Náuseas, vómitos, diarrea (comunes). Tomar con comida si hay malestar.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '50-84.50 C$ (según presentación)',
    embarazo: 'Categoría B — Generalmente seguro'
  },
  {
    id: 43,
    nombre_es: 'Cotrimoxazol',
    nombre_en: 'Trimethoprim-Sulfamethoxazole',
    nombres_comerciales: ['Bactrim','Septrin','Trimel','Cotrimoxazol MK','Sulfaprim'],
    sinonimos: ['bactrim','septrin','trimel','trimetoprim','para la orina','infeccion urinaria','sulfa','sulfaprim'],
    categoria: 'Antibiótico Sulfonamida',
    uso_principal: 'Infecciones urinarias, diarrea bacteriana, toxoplasmosis',
    dosis_adulto: '1 tableta forte (800/160 mg) dos veces al día por 7-10 días',
    dosis_nino: '8/40 mg/kg/día dividido en 2 dosis',
    contraindicaciones: 'Alergia a sulfas, insuficiencia renal grave, embarazo 3er trimestre, menores de 2 meses.',
    efectos_secundarios: 'Sarpullido, náuseas. Tomar mucho líquido.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '59-413.50 C$ (según presentación)',
    embarazo: 'Categoría C — Evitar en tercer trimestre'
  },
  {
    id: 44,
    nombre_es: 'Doxiciclina',
    nombre_en: 'Doxycycline',
    nombres_comerciales: ['Vibramycin','Vivox','Doxiciclina MK'],
    sinonimos: ['vibramycin','tetraciclina','para acne','para infeccion','para malaria'],
    categoria: 'Antibiótico Tetraciclina',
    uso_principal: 'Infecciones respiratorias, acné moderado-grave, ITS, malaria',
    dosis_adulto: '100 mg dos veces al día el primer día, luego 100 mg/día',
    dosis_nino: 'Contraindicado en menores de 8 años',
    contraindicaciones: 'Menores de 8 años, embarazo, lactancia. Evitar sol excesivo.',
    efectos_secundarios: 'Náuseas, fotosensibilidad (protegerse del sol), reduce efecto de anticonceptivos.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '30-70 C$ (cápsulas)',
    embarazo: 'Categoría D — CONTRAINDICADO'
  },
  {
    id: 66,
    nombre_es: 'Tetraciclina',
    nombre_en: 'Tetracycline',
    nombres_comerciales: ['Tetraciclina MK','Vistaclina'],
    sinonimos: ['tetraciclina','antibiotico','para acne','vistaclina'],
    categoria: 'Antibiótico Tetraciclina',
    uso_principal: 'Infecciones bacterianas, acné, infecciones oculares',
    dosis_adulto: '250-500 mg cada 6 horas',
    dosis_nino: 'No usar en menores de 8 años',
    contraindicaciones: 'Menores de 8 años, embarazo, lactancia',
    efectos_secundarios: 'Náuseas, fotosensibilidad, decoloración dental',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '42-177 C$ (según presentación: oftálmico 42C$, cápsulas 144-177C$)',
    embarazo: 'Categoría D — CONTRAINDICADO'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 7 — ANTIHIPERTENSIVOS ADICIONALES
  // ════════════════════════════════════════════════════════
  {
    id: 109,
    nombre_es: 'Captopril',
    nombre_en: 'Captopril',
    nombres_comerciales: ['Capoten','Captopril MK','Tensiomin'],
    sinonimos: ['capoten','tensiomin','para la presion alta','ieca','crisis hipertensiva','tableta bajo la lengua presion'],
    categoria: 'Antihipertensivo IECA (acción corta)',
    uso_principal: 'Hipertensión arterial, insuficiencia cardíaca, crisis hipertensiva (sublingual)',
    dosis_adulto: '25-50 mg dos o tres veces al día. Crisis: 25 mg sublingual.',
    dosis_nino: '0.1-0.5 mg/kg cada 8-12 horas (bajo supervisión)',
    contraindicaciones: 'Embarazo (contraindicado), angioedema previo, estenosis renal bilateral.',
    efectos_secundarios: 'Tos seca persistente, mareos, hiperpotasemia.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '49.50-77 C$ (50 tabletas)',
    embarazo: 'Categoría D — CONTRAINDICADO'
  },
  {
    id: 110,
    nombre_es: 'Propranolol',
    nombre_en: 'Propranolol',
    nombres_comerciales: ['Inderal','Sumial','Propranolol MK'],
    sinonimos: ['inderal','sumial','para la migrana','para el temblor','betabloqueador','palpitaciones','para la ansiedad fisica'],
    categoria: 'Betabloqueador no selectivo',
    uso_principal: 'Hipertensión, prevención de migraña, temblor esencial, ansiedad somática, hipertiroidismo',
    dosis_adulto: 'HTA: 40-80 mg dos veces al día. Migraña: 40-80 mg dos veces al día.',
    dosis_nino: '1-4 mg/kg/día dividido (bajo supervisión)',
    contraindicaciones: 'Asma o EPOC grave, bloqueo cardíaco. No suspender bruscamente.',
    efectos_secundarios: 'Fatiga, extremidades frías, bradicardia, puede agravar asma.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '59 C$ (100 tabletas)',
    embarazo: 'Categoría C — Consultar médico'
  },
  {
    id: 112,
    nombre_es: 'Nifedipina',
    nombre_en: 'Nifedipine',
    nombres_comerciales: ['Adalat','Procardia','Nifedipina MK'],
    sinonimos: ['adalat','procardia','para la presion','para angina','bloqueador calcio','para parto prematuro'],
    categoria: 'Bloqueador de calcio (Dihidropiridina)',
    uso_principal: 'Hipertensión arterial, angina de pecho, parto prematuro (tocolítico)',
    dosis_adulto: 'Liberación inmediata: 10-30 mg tres veces al día. Sostenida: 30-90 mg/día.',
    dosis_nino: 'Bajo supervisión médica',
    contraindicaciones: 'Choque cardiogénico, estenosis aórtica grave.',
    efectos_secundarios: 'Enrojecimiento facial, edema en tobillos, palpitaciones, dolor de cabeza.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '125-130 C$ (100 tabletas)',
    embarazo: 'Categoría C — Se usa como tocolítico bajo supervisión'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 8 — ANTIHIPERTENSIVOS / LIPÍDICOS
  // ════════════════════════════════════════════════════════
  {
    id: 22,
    nombre_es: 'Simvastatina',
    nombre_en: 'Simvastatin',
    nombres_comerciales: ['Zocor','Sivastin','Simvastatina MK'],
    sinonimos: ['zocor','estatina','para el colesterol','colesterol alto','trigliceridos'],
    categoria: 'Hipolipemiante (Estatina)',
    uso_principal: 'Colesterol elevado, prevención de enfermedades cardiovasculares',
    dosis_adulto: '10-40 mg una vez al día (noche)',
    dosis_nino: 'Bajo supervisión médica',
    contraindicaciones: 'Enfermedad hepática activa, embarazo, lactancia. Interacciones con antibióticos.',
    efectos_secundarios: 'Dolor muscular (importante: consultar médico si es severo).',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '79 C$ (30 tabletas)',
    embarazo: 'Categoría X — CONTRAINDICADO en embarazo'
  },
  {
    id: 114,
    nombre_es: 'Atorvastatina',
    nombre_en: 'Atorvastatin',
    nombres_comerciales: ['Lipitor','Torvast','Atorvastatina MK'],
    sinonimos: ['lipitor','torvast','para el colesterol','estatina potente','colesterol alto','ldl alto'],
    categoria: 'Hipolipemiante (Estatina potente)',
    uso_principal: 'Colesterol LDL elevado, triglicéridos altos, prevención cardiovascular',
    dosis_adulto: '10-80 mg una vez al día (noche). Más potente que simvastatina.',
    dosis_nino: 'Bajo supervisión médica',
    contraindicaciones: 'Enfermedad hepática activa, embarazo, lactancia.',
    efectos_secundarios: 'Dolor muscular (mialgia — consultar si es severo), enzimas hepáticas elevadas.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '154 C$ (30 tabletas)',
    embarazo: 'Categoría X — CONTRAINDICADO'
  },
  {
    id: 121,
    nombre_es: 'Omega 3',
    nombre_en: 'Omega-3 Fatty Acids',
    nombres_comerciales: ['Cardio-Vital','Omega 3 MK','Aceite de salmon','EPA DHA'],
    sinonimos: ['omega 3','acidos grasos','aceite de salmon','para el colesterol','para el corazon','trigliceridos altos'],
    categoria: 'Ácido graso esencial / Suplemento cardiovascular',
    uso_principal: 'Triglicéridos elevados, prevención cardiovascular, salud cerebral',
    dosis_adulto: '1000-3000 mg al día con las comidas',
    dosis_nino: 'Formulas pediátricas bajo indicación médica',
    contraindicaciones: 'Alergia al pescado. Anticoagulantes (consultar con dosis altas).',
    efectos_secundarios: 'Eructos con sabor a pescado, náuseas. Tomar con comida.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '147-653.50 C$ (según presentación)',
    embarazo: 'Categoría C — Generalmente seguro en dosis normales'
  },
  {
    id: 23,
    nombre_es: 'Aspirina',
    nombre_en: 'Aspirin',
    nombres_comerciales: ['Aspirina Bayer','Ecotrin','AAS','ASA','Cardioaspirina'],
    sinonimos: ['acido acetilsalicilico','asa','aas','para el dolor','para el infarto','antipiretico','cardioaspirina'],
    categoria: 'AINE / Antiagregante / Antipirético',
    uso_principal: 'Dolor leve, fiebre, prevención de trombosis e infartos (dosis baja 75-100 mg)',
    dosis_adulto: 'Dolor/fiebre: 500-1000 mg cada 6-8 h. Cardiovascular: 75-100 mg/día.',
    dosis_nino: 'NO usar en menores de 16 años con fiebre viral (riesgo síndrome de Reye).',
    contraindicaciones: 'Úlcera gástrica, alergia a AINEs, hemofilia. Menores de 16 con fiebre.',
    efectos_secundarios: 'Irritación gástrica, sangrado. Tomar con comida.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '138-299 C$ (según presentación: niño 138C$, forte 245.25C$, cardio 81mg 299C$)',
    embarazo: 'Categoría D en tercer trimestre — Evitar'
  },
  {
    id: 24,
    nombre_es: 'Clopidogrel',
    nombre_en: 'Clopidogrel',
    nombres_comerciales: ['Plavix','Clopidogrel MK','Iscover'],
    sinonimos: ['plavix','antiagregante','para el corazon','para el infarto','para la trombosis'],
    categoria: 'Antiagregante plaquetario',
    uso_principal: 'Prevención de infarto y ACV en pacientes de alto riesgo cardiovascular',
    dosis_adulto: '75 mg una vez al día',
    dosis_nino: 'No aplica en uso pediátrico rutinario',
    contraindicaciones: 'Sangrado activo, úlcera péptica activa, alergia.',
    efectos_secundarios: 'Sangrado (hematomas, encías), raramente sangrado grave.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '190 C$ (30 tabletas)',
    embarazo: 'Categoría B — Consultar médico'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 9 — ANTIPARASITARIOS
  // ════════════════════════════════════════════════════════
  {
    id: 47,
    nombre_es: 'Albendazol',
    nombre_en: 'Albendazole',
    nombres_comerciales: ['Zentel','Eskazole','Albendazol MK','Aldal','Sol kalben','Mebendamin'],
    sinonimos: ['zentel','antiparasitario','para los parasitos','gusanos','lombrices','parasitosis','oxiuros','aldal','sol kalben','mebendamin'],
    categoria: 'Antihelmíntico / Antiparasitario',
    uso_principal: 'Parasitosis intestinal (lombrices, oxiuros, tenias)',
    dosis_adulto: '400 mg dosis única',
    dosis_nino: 'Mayores de 2 años: 400 mg. Menores de 2: 200 mg.',
    contraindicaciones: 'Alergia, embarazo primer trimestre, enfermedad hepática grave.',
    efectos_secundarios: 'Dolor abdominal leve, náuseas.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '14-98 C$ (según presentación: suspensión 14-65C$, tabletas 17.50-98C$)',
    embarazo: 'Categoría C — Evitar en primer trimestre'
  },
  {
    id: 135,
    nombre_es: 'Mebendazol',
    nombre_en: 'Mebendazole',
    nombres_comerciales: ['Vermox','Mebendazol MK','Mebendamin'],
    sinonimos: ['mebendazol','vermox','antiparasitario','lombrices','mebendamin'],
    categoria: 'Antihelmíntico',
    uso_principal: 'Parasitosis intestinal (lombrices, oxiuros)',
    dosis_adulto: '100 mg dos veces al día por 3 días O 500 mg dosis única',
    dosis_nino: 'Mayores de 2 años: misma dosis que adulto',
    contraindicaciones: 'Alergia, menores de 1 año, embarazo 1er trimestre',
    efectos_secundarios: 'Dolor abdominal leve, diarrea',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '17.50-98 C$ (según presentación)',
    embarazo: 'Categoría C — Evitar en 1er trimestre'
  },
  {
    id: 57,
    nombre_es: 'Ivermectina',
    nombre_en: 'Ivermectin',
    nombres_comerciales: ['Stromectol','Ivexterm','Ivermectina MK'],
    sinonimos: ['stromectol','ivexterm','para la sarna','para los parasitos','antiparasitario oral'],
    categoria: 'Antiparasitario sistémico',
    uso_principal: 'Sarna (escabiosis), oncocercosis, estrongiloidiasis, piojos',
    dosis_adulto: 'Sarna: 200 mcg/kg dosis única (repetir a los 7-14 días)',
    dosis_nino: 'Mayores de 15 kg: 200 mcg/kg. No usar en menores de 15 kg.',
    contraindicaciones: 'Menores de 15 kg, embarazo, meningitis. Alergia.',
    efectos_secundarios: 'Mareos, náuseas, reacción de Mazzotti (en oncocercosis).',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '30-80 C$ (tabletas)',
    embarazo: 'Categoría C — Evitar'
  },
  {
    id: 77,
    nombre_es: 'Nitazoxanida',
    nombre_en: 'Nitazoxanide',
    nombres_comerciales: ['Alinia','Nitazoxanida MK','Paramix'],
    sinonimos: ['alinia','paramix','para parasitos','giardia','cryptosporidium','diarrea parasitaria'],
    categoria: 'Antiparasitario / Antiprotozoario',
    uso_principal: 'Giardiasis, criptosporidiosis, diarrea por parásitos, algunas infecciones virales digestivas',
    dosis_adulto: '500 mg dos veces al día por 3 días con comida',
    dosis_nino: '1-3 años: 100 mg dos veces al día. 4-11 años: 200 mg dos veces al día.',
    contraindicaciones: 'Alergia a nitazoxanida.',
    efectos_secundarios: 'Dolor abdominal leve, náuseas, orina amarilla (normal).',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '86-760 C$ (según presentación)',
    embarazo: 'Categoría B — Consultar médico'
  },
  {
    id: 78,
    nombre_es: 'Tinidazol',
    nombre_en: 'Tinidazole',
    nombres_comerciales: ['Fasigyn','Tinidazol MK','Triconex'],
    sinonimos: ['fasigyn','triconex','para parasitos','giardia','amebas','tricomonas'],
    categoria: 'Antiparasitario / Antibiótico',
    uso_principal: 'Giardiasis, amebiasis, tricomoniasis, vaginosis bacteriana',
    dosis_adulto: 'Giardia: 2 g dosis única. Amebiasis: 2 g al día por 3 días.',
    dosis_nino: '50-60 mg/kg/día (consultar médico)',
    contraindicaciones: 'Alergia, embarazo primer trimestre. NO alcohol durante tratamiento.',
    efectos_secundarios: 'Sabor metálico, náuseas, mareo. Evitar alcohol.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '104 C$ (100 tabletas)',
    embarazo: 'Categoría C — Evitar en primer trimestre'
  },
  {
    id: 117,
    nombre_es: 'Secnidazol',
    nombre_en: 'Secnidazole',
    nombres_comerciales: ['Flagentyl','Secnil','Secnidazol MK'],
    sinonimos: ['flagentyl','secnil','para parasitos dosis unica','giardia rapido','vaginosis','amebiasis'],
    categoria: 'Antiparasitario (5-nitroimidazol, dosis única)',
    uso_principal: 'Giardiasis, amebiasis, vaginosis bacteriana, tricomoniasis. Ventaja: dosis única.',
    dosis_adulto: '2 g dosis única. Vaginosis: 1 g dosis única.',
    dosis_nino: '30 mg/kg dosis única (consultar médico)',
    contraindicaciones: 'Alergia, embarazo primer trimestre. NO alcohol.',
    efectos_secundarios: 'Náuseas, sabor metálico, mareos. Evitar alcohol.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '13.50-36 C$ (según presentación)',
    embarazo: 'Categoría B — Evitar en primer trimestre'
  },
  {
    id: 80,
    nombre_es: 'Furazolidona',
    nombre_en: 'Furazolidone',
    nombres_comerciales: ['Furoxona','Furazolidona MK','Enterogel'],
    sinonimos: ['furoxona','para la diarrea bacteriana','colitis','enterocolitis','giardia','enterogel'],
    categoria: 'Antibiótico / Antiparasitario intestinal',
    uso_principal: 'Diarrea bacteriana, giardiasis, cólera, enterocolitis',
    dosis_adulto: '100 mg cuatro veces al día por 5-7 días con comida',
    dosis_nino: '1.25 mg/kg cuatro veces al día',
    contraindicaciones: 'Alergia. NO consumir alcohol. Menores de 1 mes.',
    efectos_secundarios: 'Náuseas, vómitos, orina oscura (normal). Evitar alcohol.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '40-69.50 C$ (según presentación)',
    embarazo: 'Categoría C — Consultar médico'
  },
  {
    id: 56,
    nombre_es: 'Permetrina',
    nombre_en: 'Permethrin',
    nombres_comerciales: ['Elimite','Nix','Scabimite','Permetrina MK','Escabiax'],
    sinonimos: ['nix','para la sarna','para los piojos','scabiosis','pediculosis','parasitos piel','escabiax'],
    categoria: 'Antiparasitario tópico',
    uso_principal: 'Sarna (escabiosis), piojos de la cabeza (pediculosis)',
    dosis_adulto: 'Sarna: cuello a pies, dejar 8-12 h, lavar. Piojos: cabello 10 min, lavar.',
    dosis_nino: 'Igual que adulto. Menores de 2 meses: consultar médico.',
    contraindicaciones: 'Alergia a la permetrina. Evitar contacto con ojos.',
    efectos_secundarios: 'Picazón o ardor leve temporal.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '30-90 C$ (crema o champú)',
    embarazo: 'Categoría B — Generalmente seguro'
  },
  {
    id: 122,
    nombre_es: 'Benzoato de Bencilo',
    nombre_en: 'Benzyl Benzoate',
    nombres_comerciales: ['Ascabiol','Scabinil','Benzoato de bencilo MK'],
    sinonimos: ['ascabiol','scabinil','para la sarna','escabiosis','acaricida','alternativa permetrina'],
    categoria: 'Antiparasitario tópico (acaricida)',
    uso_principal: 'Sarna (escabiosis) — alternativa cuando permetrina no está disponible',
    dosis_adulto: 'Loción 25%: de cuello a pies, dejar 24 horas, lavar. Repetir a los 7 días.',
    dosis_nino: 'Diluir al 12.5% en niños. NO en menores de 2 años.',
    contraindicaciones: 'Alergia, heridas abiertas extensas. Evitar ojos y mucosas.',
    efectos_secundarios: 'Ardor local (normal y transitorio), irritación de piel.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '24 C$ (loción 120 mL)',
    embarazo: 'Categoría C — Usar con precaución'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 10 — ANTIMICÓTICOS
  // ════════════════════════════════════════════════════════
  {
    id: 48,
    nombre_es: 'Aciclovir',
    nombre_en: 'Acyclovir',
    nombres_comerciales: ['Zovirax','Acivir','Aciclovir MK','Andi Tevirin'],
    sinonimos: ['zovirax','para el herpes','fuego labial','culebrina','varicela','antiviral','andi tevirin'],
    categoria: 'Antiviral',
    uso_principal: 'Herpes labial, herpes genital, varicela, culebrina (herpes zoster)',
    dosis_adulto: 'Herpes labial: 200 mg 5 veces/día por 5 días. Varicela: 800 mg 5 veces/día.',
    dosis_nino: '20 mg/kg 4 veces al día para varicela',
    contraindicaciones: 'Alergia al aciclovir. Beber abundante agua.',
    efectos_secundarios: 'Náuseas, dolor de cabeza. Beber mucha agua.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '30.50-196.50 C$ (según presentación: crema 30.50-40.50C$, tabletas 196.50C$)',
    embarazo: 'Categoría B — Generalmente seguro'
  },
  {
    id: 49,
    nombre_es: 'Fluconazol',
    nombre_en: 'Fluconazole',
    nombres_comerciales: ['Diflucan','Fluconazol MK','Fluconal','Caplin'],
    sinonimos: ['diflucan','para los hongos','candidiasis','hongo vaginal','micosis','caplin'],
    categoria: 'Antimicótico sistémico',
    uso_principal: 'Candidiasis vaginal, candidiasis oral, micosis sistémicas',
    dosis_adulto: 'Candidiasis vaginal: 150 mg dosis única. Oral: 100-200 mg/día.',
    dosis_nino: '3-6 mg/kg/día (consultar médico)',
    contraindicaciones: 'Alergia, embarazo (primer trimestre). Muchas interacciones medicamentosas.',
    efectos_secundarios: 'Náuseas, dolor abdominal, dolor de cabeza.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '16-240 C$ (según presentación: 2 cápsulas 16-21.50C$, 10-12 cápsulas 71.50-240C$)',
    embarazo: 'Categoría D — Evitar en primer trimestre'
  },
  {
    id: 54,
    nombre_es: 'Clotrimazol',
    nombre_en: 'Clotrimazole',
    nombres_comerciales: ['Canesten','Lotrimin','Gyne-Lotrimin','Clotrimazol MK','Clodersol','Clotriplex','Gencloben'],
    sinonimos: ['canesten','lotrimin','antimicotico','hongos en la piel','pie de atleta','candidiasis vaginal','hongo','clodersol','clotriplex','gencloben'],
    categoria: 'Antimicótico tópico',
    uso_principal: 'Candidiasis vaginal, pie de atleta, tiña, hongos en la piel',
    dosis_adulto: 'Crema: 2-3 veces al día por 2-4 semanas. Óvulo vaginal: 1 óvulo 500 mg dosis única.',
    dosis_nino: 'Crema: 2-3 veces al día según indicación',
    contraindicaciones: 'Alergia al clotrimazol.',
    efectos_secundarios: 'Ardor o irritación leve en el sitio de aplicación.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '16.50-85.50 C$ (según presentación: crema 16.50-40C$, óvulos 33-85.50C$)',
    embarazo: 'Categoría B — Crema segura'
  },
  {
    id: 85,
    nombre_es: 'Miconazol',
    nombre_en: 'Miconazole',
    nombres_comerciales: ['Monistat','Miconazol MK','Daktarin','Gyno-Daktarin'],
    sinonimos: ['monistat','daktarin','gyno-daktarin','para hongos vaginales','candidiasis','hongo en la piel'],
    categoria: 'Antimicótico tópico y vaginal',
    uso_principal: 'Candidiasis vaginal, hongos en la piel (tiña, pie de atleta), candidiasis oral',
    dosis_adulto: 'Vaginal: 200 mg óvulo por 3 días o 100 mg por 7 días. Tópica: crema 2% dos veces al día.',
    dosis_nino: 'Tópica bajo supervisión médica',
    contraindicaciones: 'Alergia al miconazol.',
    efectos_secundarios: 'Ardor o irritación leve local.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '46.50 C$ (crema vaginal con aplicador)',
    embarazo: 'Categoría C — Consultar médico, uso tópico generalmente aceptado'
  },
  {
    id: 86,
    nombre_es: 'Nistatina',
    nombre_en: 'Nystatin',
    nombres_comerciales: ['Mycostatin','Nistatina MK','Nilstat'],
    sinonimos: ['mycostatin','nilstat','para hongos bucales','candidiasis oral','algodoncillo','muguet'],
    categoria: 'Antimicótico (tópico oral y vaginal)',
    uso_principal: 'Candidiasis oral (algodoncillo), candidiasis vaginal, candidiasis cutánea',
    dosis_adulto: 'Oral: 500,000 UI enjuague y trague 4 veces al día. Vaginal: 100,000 UI óvulo por 14 días.',
    dosis_nino: 'Oral: 100,000 UI cuatro veces al día en la boca (neonatos y lactantes)',
    contraindicaciones: 'Alergia a nistatina.',
    efectos_secundarios: 'Sabor desagradable, náuseas con dosis altas.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '36.50-45 C$ (según presentación)',
    embarazo: 'Categoría B — Segura en uso tópico'
  },
  {
    id: 87,
    nombre_es: 'Terbinafina',
    nombre_en: 'Terbinafine',
    nombres_comerciales: ['Lamisil','Terbinafina MK','Fungimed','Fungil'],
    sinonimos: ['lamisil','fungimed','para hongos en unas','onicomicosis','tina','pie de atleta','hongos','fungil'],
    categoria: 'Antimicótico (tópico y oral)',
    uso_principal: 'Hongos en uñas (onicomicosis), pie de atleta, tiña',
    dosis_adulto: 'Oral: 250 mg una vez al día por 6 semanas (uñas manos) o 12 semanas (uñas pies). Tópica: 1% dos veces al día por 1-2 semanas.',
    dosis_nino: 'Oral solo bajo supervisión médica',
    contraindicaciones: 'Enfermedad hepática grave. Alergia a terbinafina.',
    efectos_secundarios: 'Náuseas, dolor abdominal, rash (oral). Ardor local (tópico).',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '37.50-78.50 C$ (según presentación tópica)',
    embarazo: 'Categoría B — Crema generalmente segura; oral consultar médico'
  },
  {
    id: 88,
    nombre_es: 'Ketoconazol',
    nombre_en: 'Ketoconazole',
    nombres_comerciales: ['Nizoral','Ketoconazol MK','Ketoderm','Ketogin','Ketosol'],
    sinonimos: ['nizoral','ketoderm','para la caspa','hongo cuero cabelludo','seborreico','hongos','ketogin','ketosol'],
    categoria: 'Antimicótico tópico',
    uso_principal: 'Caspa, dermatitis seborreica, tiña del cuero cabelludo, hongos en la piel',
    dosis_adulto: 'Champú 2%: aplicar 2 veces por semana por 4 semanas. Crema 2%: una vez al día por 2-4 semanas.',
    dosis_nino: 'Bajo supervisión médica',
    contraindicaciones: 'Alergia al ketoconazol. Evitar contacto con ojos.',
    efectos_secundarios: 'Irritación local, resequedad del cuero cabelludo.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '34-110 C$ (según presentación: crema 34-45C$, champú 110C$)',
    embarazo: 'Categoría C — Uso tópico con precaución'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 11 — CORTICOIDES
  // ════════════════════════════════════════════════════════
  {
    id: 37,
    nombre_es: 'Dexametasona',
    nombre_en: 'Dexamethasone',
    nombres_comerciales: ['Decadron','Oradexon','Dexametasona MK','Dexona','Dexacort'],
    sinonimos: ['decadron','corticoide','cortisona','para la inflamacion','para la alergia grave','dexona','dexacort'],
    categoria: 'Corticosteroide potente',
    uso_principal: 'Inflamación severa, reacciones alérgicas graves, edema cerebral, crup',
    dosis_adulto: '0.5-24 mg/día según indicación médica',
    dosis_nino: 'Solo bajo supervisión médica',
    contraindicaciones: 'Infecciones fúngicas sistémicas. Precaución en diabetes, HTA, úlcera.',
    efectos_secundarios: 'Con uso prolongado: aumento de peso, diabetes, osteoporosis, inmunosupresión.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '31-176.50 C$ (según presentación: tabletas 31-117.50C$, inyectable 75-91.50C$, óvulos 176.50C$)',
    embarazo: 'Categoría C — Usar solo si beneficio supera el riesgo'
  },
  {
    id: 38,
    nombre_es: 'Prednisona',
    nombre_en: 'Prednisone',
    nombres_comerciales: ['Deltasone','Meticorten','Prednisona MK'],
    sinonimos: ['meticorten','cortisona oral','prednisona','para alergia severa','para artritis'],
    categoria: 'Corticosteroide oral',
    uso_principal: 'Enfermedades autoinmunes, alergias graves, asma severo, inflamación crónica',
    dosis_adulto: '5-60 mg/día según condición (tomar con comida)',
    dosis_nino: '0.5-2 mg/kg/día (consultar médico)',
    contraindicaciones: 'Infecciones no tratadas, úlcera péptica activa. No suspender bruscamente.',
    efectos_secundarios: 'Aumento de peso, hipertensión, diabetes, osteoporosis con uso crónico.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '90-322 C$ (según presentación)',
    embarazo: 'Categoría C — Consultar médico'
  },
  {
    id: 101,
    nombre_es: 'Prednisolona',
    nombre_en: 'Prednisolone',
    nombres_comerciales: ['Prelone','Pediapred','Prednisolona MK'],
    sinonimos: ['prelone','pediapred','corticoide jarabe','cortisona jarabe para nino','para asma nino','inflamacion pediatrica'],
    categoria: 'Corticosteroide oral (jarabe y tabletas)',
    uso_principal: 'Crisis asmática en niños, alergias graves, crup laríngeo, inflamación severa pediátrica',
    dosis_adulto: '5-60 mg/día según condición',
    dosis_nino: '1-2 mg/kg/día (MÁX 40 mg). Jarabe ideal para niños.',
    contraindicaciones: 'Infecciones no tratadas, úlcera péptica activa. No suspender bruscamente.',
    efectos_secundarios: 'Con uso prolongado: aumento de peso, hiperglucemia, inmunosupresión.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '144.50-263.50 C$ (jarabe)',
    embarazo: 'Categoría C — Consultar médico'
  },
  {
    id: 99,
    nombre_es: 'Betametasona crema',
    nombre_en: 'Betamethasone cream',
    nombres_comerciales: ['Diprolene','Betnovate','Betametasona MK 0.1%','Arcocort','Betacrim'],
    sinonimos: ['betnovate','diprolene','crema para picazon fuerte','corticoide topico potente','dermatitis severa','psoriasis','arcocort','betacrim'],
    categoria: 'Corticosteroide tópico potente',
    uso_principal: 'Dermatitis atópica, psoriasis, eccema severo, inflamación cutánea moderada a grave',
    dosis_adulto: 'Fina capa 1-2 veces al día. MÁX 2-4 semanas. NO en cara ni pliegues.',
    dosis_nino: 'Extrema precaución. Dosis mínima, tiempo breve.',
    contraindicaciones: 'Infecciones cutáneas no tratadas, acné. NO en cara, axilas, ingle sin indicación.',
    efectos_secundarios: 'Con uso prolongado: atrofia de piel, estrías, despigmentación.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '41.50-101 C$ (según presentación)',
    embarazo: 'Categoría C — Uso mínimo y breve'
  },
  {
    id: 55,
    nombre_es: 'Hidrocortisona crema',
    nombre_en: 'Hydrocortisone cream',
    nombres_comerciales: ['Cortaid','Hytone','Hidrocortisona MK 1%','Corgentisol'],
    sinonimos: ['cortaid','crema cortisona','para la picazon','eczema','dermatitis','alergia en la piel','corgentisol'],
    categoria: 'Corticosteroide tópico leve',
    uso_principal: 'Eccema, dermatitis, picazón, erupciones cutáneas inflamatorias leves',
    dosis_adulto: 'Fina capa 2-3 veces al día. No usar más de 2 semanas sin indicación médica.',
    dosis_nino: 'Usar con precaución. Dosis mínima efectiva.',
    contraindicaciones: 'Infecciones cutáneas por virus, hongos o bacterias sin antibiótico. Evitar en cara y pliegues en niños.',
    efectos_secundarios: 'Con uso prolongado: adelgazamiento de la piel, estrías.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '35.50-47.50 C$ (tubo)',
    embarazo: 'Categoría C — Usar solo si es necesario, mínima cantidad'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 12 — VITAMINAS Y SUPLEMENTOS
  // ════════════════════════════════════════════════════════
  {
    id: 51,
    nombre_es: 'Vitamina C',
    nombre_en: 'Ascorbic Acid',
    nombres_comerciales: ['Redoxon','Ce-Vita','Celin','Vitamina C MK','Cebion'],
    sinonimos: ['vitamina c','acido ascorbico','redoxon','ce vita','para las defensas','efervescente','cebion'],
    categoria: 'Vitamina / Suplemento',
    uso_principal: 'Prevención y tratamiento del escorbuto, refuerzo del sistema inmune, antioxidante',
    dosis_adulto: '500-1000 mg una vez al día',
    dosis_nino: '250 mg una vez al día',
    contraindicaciones: 'Cálculos renales de oxalato con dosis altas. En general muy segura.',
    efectos_secundarios: 'Diarrea con dosis muy altas (más de 2 g al día).',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '100-1000 C$ (según presentación: gotas 100C$, tabletas 793-1000C$, efervescente 118C$)',
    embarazo: 'Categoría A — Segura y recomendada'
  },
  {
    id: 52,
    nombre_es: 'Vitamina B12',
    nombre_en: 'Cyanocobalamin',
    nombres_comerciales: ['Bedoyecta','Neurobion','Cianocobalamina MK','B12','Vitalgia','Nervisel','Dexa Vitalgia'],
    sinonimos: ['b12','cianocobalamina','bedoyecta','neurobion','para la anemia','para los nervios','vitamina nervios','vitalgia','nervisel','dexa vitalgia'],
    categoria: 'Vitamina B12 / Antianémico',
    uso_principal: 'Anemia megaloblástica, neuropatía periférica, deficiencia en vegetarianos y ancianos',
    dosis_adulto: '1000 mcg al día (oral) o 1000 mcg IM semanal (inyectable)',
    dosis_nino: 'Según deficiencia (consultar médico)',
    contraindicaciones: 'Alergia a cobalaminas. En general muy segura.',
    efectos_secundarios: 'Rarísimos efectos adversos.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '16.50-400 C$ (según presentación: ampolla 16.50-62C$, tabletas 222-400C$)',
    embarazo: 'Categoría A — Segura y recomendada'
  },
  {
    id: 139,
    nombre_es: 'Complejo B',
    nombre_en: 'B Complex',
    nombres_comerciales: ['Neurobion','Vitalgia','Bedoyecta','Dolo-Neurobion'],
    sinonimos: ['complejo b','vitaminas b','neurobion','vitalgia','nervios','dolo neurobion'],
    categoria: 'Vitamina B / Suplemento',
    uso_principal: 'Deficiencia de vitaminas B, neuropatía, apoyo energético',
    dosis_adulto: '1 tableta al día O 1 ampolla IM semanal',
    dosis_nino: 'Consultar médico pediátrico',
    contraindicaciones: 'Alergia a componentes',
    efectos_secundarios: 'Orina amarilla brillante (normal)',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '41-1595 C$ (según presentación)',
    embarazo: 'Categoría A — Seguro y recomendado'
  },
  {
    id: 140,
    nombre_es: 'Hierro + Ácido Fólico',
    nombre_en: 'Iron + Folic Acid',
    nombres_comerciales: ['Fer-In-Sol','Folamil Ferro','Intrafer','Gotas Intrafer'],
    sinonimos: ['hierro','acido folico','anemia','embarazo','ferro','intrafer'],
    categoria: 'Suplemento prenatal / Antianémico',
    uso_principal: 'Anemia ferropénica, suplemento prenatal',
    dosis_adulto: '1 tableta al día',
    dosis_nino: 'Según peso (consultar médico)',
    contraindicaciones: 'Hemocromatosis, anemia no ferropénica',
    efectos_secundarios: 'Heces negras, estreñimiento, náuseas',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '142-419 C$ (según presentación)',
    embarazo: 'Categoría A — RECOMENDADO'
  },
  {
    id: 53,
    nombre_es: 'Calcio Carbonato',
    nombre_en: 'Calcium Carbonate',
    nombres_comerciales: ['Caltrate','Os-Cal','Calcibon','Calcium Sandoz','Blodin Calcio'],
    sinonimos: ['calcio','para los huesos','osteoporosis','calcibon','caltrate','antiacido','blodin calcio'],
    categoria: 'Suplemento de calcio / Antiacido',
    uso_principal: 'Suplemento de calcio, osteoporosis, antiácido para acidez estomacal',
    dosis_adulto: 'Antiacido: 500-1500 mg según necesidad. Suplemento: 500-1000 mg dos veces al día.',
    dosis_nino: 'Según edad (consultar médico)',
    contraindicaciones: 'Hipercalcemia, cálculos renales de calcio. No tomar con antibióticos (tetraciclinas, quinolonas).',
    efectos_secundarios: 'Estreñimiento, gases, flatulencia.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '143-202 C$ (según presentación)',
    embarazo: 'Categoría A — Recomendado en embarazo'
  },
  {
    id: 119,
    nombre_es: 'Vitamina A',
    nombre_en: 'Vitamin A / Retinol',
    nombres_comerciales: ['Arovit','Vitamina A MK','Vit ADK'],
    sinonimos: ['vitamina a','retinol','arovit','para la vista','deficiencia vitamina a','ceguera nocturna','vit adk'],
    categoria: 'Vitamina liposoluble',
    uso_principal: 'Deficiencia de vitamina A, ceguera nocturna, salud ocular, inmunidad',
    dosis_adulto: '5000-50000 UI según deficiencia. No exceder 10000 UI/día en uso prolongado.',
    dosis_nino: 'Programa de suplementación MINSA según edad',
    contraindicaciones: 'Hipervitaminosis A (tóxica en exceso). Embarazo: NO exceder 10000 UI/día.',
    efectos_secundarios: 'Con sobredosis: dolor de cabeza, vómitos, daño hepático.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '136-401.50 C$ (según presentación)',
    embarazo: 'Categoría A (dosis baja) — NO exceder 10000 UI/día en embarazo'
  },
  {
    id: 120,
    nombre_es: 'Vitamina E',
    nombre_en: 'Vitamin E / Tocopherol',
    nombres_comerciales: ['Ephynal','Vitamina E MK','Evion'],
    sinonimos: ['vitamina e','tocoferol','ephynal','evion','antioxidante','para la piel','capsula vitamina'],
    categoria: 'Vitamina liposoluble / Antioxidante',
    uso_principal: 'Deficiencia de vitamina E, antioxidante, salud cardiovascular',
    dosis_adulto: '200-400 UI una vez al día',
    dosis_nino: 'Según deficiencia (consultar médico)',
    contraindicaciones: 'Anticoagulantes (aumenta efecto). Evitar dosis >1000 UI/día.',
    efectos_secundarios: 'Con dosis altas: náuseas, diarrea, riesgo de sangrado.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '215 C$ (60 cápsulas)',
    embarazo: 'Categoría A — Segura en dosis normales'
  },
  {
    id: 96,
    nombre_es: 'Multivitamínico',
    nombre_en: 'Multivitamin',
    nombres_comerciales: ['Centrum','Supradyn','Pharmaton','Multibionta','Complejo B','Vit asym','Macrovitam','Lemovit'],
    sinonimos: ['centrum','supradyn','pharmaton','complejo b','vitaminas','multivitaminas','suplemento vitaminas','vitaminas complejo','vitasym','macrovitam','lemovit'],
    categoria: 'Suplemento vitamínico / Multimineral',
    uso_principal: 'Suplementación vitamínica general, prevención de deficiencias, apoyo al sistema inmune',
    dosis_adulto: '1 tableta al día con comida',
    dosis_nino: 'Formulas infantiles: 1 tableta masticable al día (según edad)',
    contraindicaciones: 'Evitar dosis múltiples. Hipervitaminosis con sobredosis de vitaminas A y D.',
    efectos_secundarios: 'Náuseas si se toma en ayunas. Orina amarilla brillante (vitamina B2, normal).',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '50-443 C$ (según presentación)',
    embarazo: 'Categoría A — Recomendado (formulas prenatales específicas)'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 13 — ANTIGRIPALES Y COMBINADOS
  // ════════════════════════════════════════════════════════
  {
    id: 141,
    nombre_es: 'Paracetamol + Cafeína',
    nombre_en: 'Paracetamol + Caffeine',
    nombres_comerciales: ['Tabcin','Dolartrin','Panadol Extra'],
    sinonimos: ['tabcin','dolartrin','antigripal','dolor cabeza','fiebre'],
    categoria: 'Analgésico combinado',
    uso_principal: 'Dolor de cabeza, fiebre, síntomas gripales',
    dosis_adulto: '2 tabletas cada 6-8 horas (MÁX 8 al día)',
    dosis_nino: 'Consultar según edad',
    contraindicaciones: 'Enfermedad hepática, alergia',
    efectos_secundarios: 'Náuseas, insomnio (por cafeína)',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '55-475 C$ (según presentación)',
    embarazo: 'Categoría B — Consultar médico'
  },
  {
    id: 142,
    nombre_es: 'Paracetamol + Clorfeniramina + Fenilefrina',
    nombre_en: 'Paracetamol + Chlorpheniramine + Phenylephrine',
    nombres_comerciales: ['Tabcin Gripe y Tos','Virogrip','Frenadol'],
    sinonimos: ['gripe y tos','antigripal','resfriado','congestion','virogrip'],
    categoria: 'Antigripal combinado',
    uso_principal: 'Síntomas de gripe: fiebre, congestión, tos',
    dosis_adulto: '1 tableta/cápula cada 6-8 horas',
    dosis_nino: 'Formulación pediátrica según edad',
    contraindicaciones: 'Hipertensión no controlada, glaucoma',
    efectos_secundarios: 'Somnolencia, boca seca, mareos',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '78-526 C$ (según presentación)',
    embarazo: 'Categoría C — Consultar médico'
  },
  {
    id: 83,
    nombre_es: 'Dimenhidrinato',
    nombre_en: 'Dimenhydrinate',
    nombres_comerciales: ['Dramamine','Dimenhidrinato MK','Vertirosan'],
    sinonimos: ['dramamine','vertirosan','para el mareo','mareo en carro','mareo en bus','vomitos de viaje','nauseas viaje'],
    categoria: 'Antivomitivo / Antimareo',
    uso_principal: 'Mareo por movimiento (carro, barco, avión), náuseas y vómitos, vértigo',
    dosis_adulto: '50-100 mg cada 4-6 horas. Tomar 30 min antes de viajar.',
    dosis_nino: 'Mayores de 2 años: 1-1.5 mg/kg cada 6-8 horas.',
    contraindicaciones: 'Glaucoma, asma, retención urinaria. No conducir (causa sueño).',
    efectos_secundarios: 'Somnolencia, boca seca, visión borrosa. Causa sueño.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '10-25 C$ (tabletas)',
    embarazo: 'Categoría B — Consultar médico'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 15 — PRODUCTOS TÓPICOS Y DESINFECTANTES
  // ════════════════════════════════════════════════════════
  {
    id: 89,
    nombre_es: 'Iodopovidona',
    nombre_en: 'Povidone-Iodine',
    nombres_comerciales: ['Betadine','Isodine','Iodopovidona MK','Yodalin','Yodo Blanco'],
    sinonimos: ['betadine','isodine','yodalin','yodo','antiseptico','para heridas','para desinfectar','yodo blanco'],
    categoria: 'Antiséptico tópico',
    uso_principal: 'Desinfección de heridas, quemaduras, cortes, preparación quirúrgica de la piel',
    dosis_adulto: 'Aplicar directamente en la herida o zona a desinfectar. Dejar secar.',
    dosis_nino: 'Usar con precaución en neonatos.',
    contraindicaciones: 'Alergia al yodo, hipotiroidismo. No usar en heridas profundas sin indicación médica.',
    efectos_secundarios: 'Irritación o quemadura en piel sensible. Tiñe la piel de café/marrón (temporal).',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '35.50-65 C$ (según presentación)',
    embarazo: 'Categoría D — Evitar en embarazo y lactancia'
  },
  {
    id: 153,
    nombre_es: 'Yodo Povidona',
    nombre_en: 'Povidone-Iodine',
    nombres_comerciales: ['Betadine','Isodine','Yodo MK'],
    sinonimos: ['yodo','povidona','betadine','isodine','desinfectante','heridas'],
    categoria: 'Antiséptico tópico',
    uso_principal: 'Desinfección de heridas, cortes, preparación quirúrgica',
    dosis_adulto: 'Aplicar directamente en herida, dejar secar',
    dosis_nino: 'Usar con precaución en neonatos',
    contraindicaciones: 'Alergia al yodo, hipotiroidismo',
    efectos_secundarios: 'Irritación, tinción marrón temporal',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '35.50-65 C$ (según presentación)',
    embarazo: 'Categoría D — Evitar en embarazo y lactancia'
  },
  {
    id: 154,
    nombre_es: 'Alcohol 70%',
    nombre_en: 'Alcohol 70%',
    nombres_comerciales: ['Alcohol MK','Alcohol medicinal','Dermalcol'],
    sinonimos: ['alcohol','alcohol 70','desinfectante','antiséptico','dermalcol'],
    categoria: 'Antiséptico / Desinfectante',
    uso_principal: 'Desinfección de piel, superficies, instrumental',
    dosis_adulto: 'Aplicar tópicamente según necesidad',
    dosis_nino: 'Supervisión adulta requerida',
    contraindicaciones: 'Heridas abiertas profundas, ojos',
    efectos_secundarios: 'Sequedad de piel, irritación',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '17-204 C$ (según presentación: 2oz-32oz)',
    embarazo: 'Categoría A — Seguro en uso tópico'
  },
  {
    id: 143,
    nombre_es: 'Óxido de Zinc',
    nombre_en: 'Zinc Oxide',
    nombres_comerciales: ['Pasta al Agua','Hipoglos','Zepol'],
    sinonimos: ['oxido de zinc','pasta al agua','zepol','pañal','rozadura'],
    categoria: 'Protector cutáneo',
    uso_principal: 'Dermatitis del pañal, rozaduras, protección de piel',
    dosis_adulto: 'Aplicar capa generosa en zona afectada',
    dosis_nino: 'Aplicar en cada cambio de pañal',
    contraindicaciones: 'Alergia a componentes',
    efectos_secundarios: 'Ninguno significativo',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '18.50-183 C$ (según presentación)',
    embarazo: 'Categoría A — Totalmente seguro'
  },
  {
    id: 144,
    nombre_es: 'Alcohol + Alcanfor + Mentol',
    nombre_en: 'Alcohol + Camphor + Menthol',
    nombres_comerciales: ['Vick Vaporub','Manzatin','Zepol'],
    sinonimos: ['vick','manzatin','zepol','para el pecho','tos','congestion'],
    categoria: 'Descongestionante tópico',
    uso_principal: 'Congestión nasal, tos, alivio respiratorio',
    dosis_adulto: 'Aplicar en pecho y cuello 2-3 veces al día',
    dosis_nino: 'Mayores de 2 años, evitar cara',
    contraindicaciones: 'Menores de 2 años, heridas abiertas',
    efectos_secundarios: 'Irritación local leve',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '39.50-562 C$ (según presentación)',
    embarazo: 'Categoría C — Uso tópico limitado'
  },
  {
    id: 118,
    nombre_es: 'Calamina loción',
    nombre_en: 'Calamine Lotion',
    nombres_comerciales: ['Calamina MK','Caladermina'],
    sinonimos: ['calamina','para picazon','para varicela','para quemadura de sol','urticaria topica','ronchas','sarpullido','caladermina'],
    categoria: 'Astringente / Antiprurítico tópico',
    uso_principal: 'Picazón por varicela, urticaria, quemaduras leves de sol, sarpullidos',
    dosis_adulto: 'Aplicar sobre zona afectada limpia y seca. Dejar secar. Repetir según necesidad.',
    dosis_nino: 'Seguro desde lactantes. Muy usado en varicela pediátrica.',
    contraindicaciones: 'Alergia a los componentes. No aplicar en heridas abiertas.',
    efectos_secundarios: 'Ninguno significativo.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '38-49 C$ (loción 120 mL)',
    embarazo: 'Categoría A — Totalmente segura en uso tópico'
  },
  {
    id: 100,
    nombre_es: 'Mupirocina',
    nombre_en: 'Mupirocin',
    nombres_comerciales: ['Bactroban','Mupiral','Mupirocina MK','Mupirocina Selectpharma'],
    sinonimos: ['bactroban','mupiral','antibiotico topico','para impetigo','infeccion de piel','herida infectada','mupirocina selectpharma'],
    categoria: 'Antibiótico tópico (anti-Staphylococcus)',
    uso_principal: 'Impétigo, infecciones cutáneas por Staphylococcus aureus, heridas infectadas superficiales',
    dosis_adulto: 'Aplicar 3 veces al día por 5-10 días',
    dosis_nino: 'Igual que adulto (mayores de 2 meses)',
    contraindicaciones: 'Alergia a mupirocina.',
    efectos_secundarios: 'Ardor o picazón leve local.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '103.50-204 C$ (ungüento 15-20 g)',
    embarazo: 'Categoría B — Segura en uso tópico'
  },
  {
    id: 93,
    nombre_es: 'Bacitracina',
    nombre_en: 'Bacitracin',
    nombres_comerciales: ['Bacitracina MK','Bacitracin Plus','Neosporin','Triple Antibiotico'],
    sinonimos: ['bacitracina','neosporin','pomada antibiotica','para heridas','para cortadas','antibiotico topico','triple antibiotico'],
    categoria: 'Antibiótico tópico',
    uso_principal: 'Prevención de infecciones en heridas menores, cortes, quemaduras superficiales',
    dosis_adulto: 'Aplicar fina capa en la herida 1-3 veces al día y cubrir con vendaje',
    dosis_nino: 'Igual que adulto. Seguro en niños.',
    contraindicaciones: 'Alergia a bacitracina o neomicina. Heridas profundas o mordeduras de animales requieren evaluación médica.',
    efectos_secundarios: 'Erupción alérgica (raro), irritación local.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '20-72.50 C$ (tubo de pomada)',
    embarazo: 'Categoría C — Uso tópico generalmente aceptado'
  },
  {
    id: 157,
    nombre_es: 'Lidocaína',
    nombre_en: 'Lidocaine',
    nombres_comerciales: ['Lidocaína MK','Xylocaine','Panesia'],
    sinonimos: ['lidocaina','anestesico','dolor local','panesia'],
    categoria: 'Anestésico local',
    uso_principal: 'Anestesia local, dolor superficial, procedimientos menores',
    dosis_adulto: '2-5% tópico o inyectable según procedimiento',
    dosis_nino: 'Según peso y procedimiento',
    contraindicaciones: 'Alergia a anestésicos amida, bloqueo cardíaco',
    efectos_secundarios: 'Ardor temporal, reacciones alérgicas',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '36.50-54 C$ (según presentación)',
    embarazo: 'Categoría B — Generalmente seguro'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 16 — ANTIÁCIDOS Y PROTECTORES GÁSTRICOS
  // ════════════════════════════════════════════════════════
  {
    id: 155,
    nombre_es: 'Hidróxido de Aluminio + Hidróxido de Magnesio',
    nombre_en: 'Aluminum Hydroxide + Magnesium Hydroxide',
    nombres_comerciales: ['Alumin Plus','Alumin Simple','Melox'],
    sinonimos: ['alumin','antiacido','acidez','estomago','gastritis','melox'],
    categoria: 'Antiácido',
    uso_principal: 'Acidez estomacal, gastritis, reflujo leve',
    dosis_adulto: '10-20 mL después de comidas y al acostarse',
    dosis_nino: '5-10 mL según edad',
    contraindicaciones: 'Insuficiencia renal grave',
    efectos_secundarios: 'Estreñimiento (aluminio), diarrea (magnesio)',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '37.50-195 C$ (según presentación)',
    embarazo: 'Categoría B — Generalmente seguro'
  },
  {
    id: 75,
    nombre_es: 'Simeticona',
    nombre_en: 'Simethicone',
    nombres_comerciales: ['Gas-X','Luftal','Simeticona MK','Mylanta Gas','Baros'],
    sinonimos: ['gas-x','luftal','baros','para los gases','flatulencia','hinchazon de estomago','colicos gases'],
    categoria: 'Antiflatulento / Antiespumante',
    uso_principal: 'Gases, flatulencia, hinchazón abdominal, cólicos por gases en bebés',
    dosis_adulto: '40-125 mg después de comidas y al acostarse',
    dosis_nino: 'Bebés y niños: 20-40 mg después de cada comida y al acostarse',
    contraindicaciones: 'Alergia a simeticona. Generalmente muy segura.',
    efectos_secundarios: 'Ninguno significativo. Es químicamente inerte.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '15-58.50 C$ (tabletas masticables o gotas)',
    embarazo: 'Categoría C — Generalmente segura, consultar médico'
  },
  {
    id: 74,
    nombre_es: 'Famotidina',
    nombre_en: 'Famotidine',
    nombres_comerciales: ['Pepcid','Famotidina MK','Pepcidine'],
    sinonimos: ['pepcid','pepcidine','para la acidez','antiulceroso','gastritis','reflujo'],
    categoria: 'Antiulceroso (antagonista H2)',
    uso_principal: 'Acidez, gastritis, reflujo gastroesofágico, úlcera gástrica',
    dosis_adulto: '20 mg dos veces al día o 40 mg en la noche',
    dosis_nino: '0.5 mg/kg dos veces al día (consultar médico)',
    contraindicaciones: 'Alergia a famotidina o antihistamínicos H2.',
    efectos_secundarios: 'Dolor de cabeza, mareos, diarrea o estreñimiento. Generalmente bien tolerado.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '20-50 C$ (tabletas)',
    embarazo: 'Categoría B — Consultar médico'
  },
  {
    id: 113,
    nombre_es: 'Pantoprazol',
    nombre_en: 'Pantoprazole',
    nombres_comerciales: ['Protonix','Pantocal','Pantoprazol MK'],
    sinonimos: ['protonix','pantocal','para la gastritis','para el reflujo','ibp','alternativa omeprazol'],
    categoria: 'Inhibidor de Bomba de Protones (IBP)',
    uso_principal: 'Gastritis, reflujo gastroesofágico, úlcera. Alternativa al omeprazol con menos interacciones.',
    dosis_adulto: '40 mg una vez al día, 30 min antes del desayuno',
    dosis_nino: 'Bajo supervisión médica',
    contraindicaciones: 'Alergia a IBP.',
    efectos_secundarios: 'Dolor de cabeza, diarrea, náuseas. Bien tolerado.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '119-177 C$ (14-100 tabletas)',
    embarazo: 'Categoría B — Generalmente seguro'
  },
  {
    id: 81,
    nombre_es: 'Subsalicilato de Bismuto',
    nombre_en: 'Bismuth Subsalicylate',
    nombres_comerciales: ['Pepto-Bismol','Bismuto MK'],
    sinonimos: ['pepto bismol','bismuto','para el estomago','nauseas','diarrea','malestar estomacal'],
    categoria: 'Antidiarreico / Antiemético / Antiacido',
    uso_principal: 'Diarrea leve, náuseas, indigestión, malestar estomacal, diarrea del viajero',
    dosis_adulto: '525 mg cada 30-60 min según necesidad. MÁX 8 dosis al día.',
    dosis_nino: 'Mayores de 12 años: dosis adulto. NO en menores de 12 años (riesgo síndrome de Reye).',
    contraindicaciones: 'Menores de 12 años, alergia a salicilatos, anticoagulantes, úlcera activa.',
    efectos_secundarios: 'Heces y lengua negra (NORMAL), estreñimiento, tinnitus con dosis altas.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '80.50-145 C$ (según presentación)',
    embarazo: 'Categoría C — Evitar en tercer trimestre'
  },
  {
    id: 82,
    nombre_es: 'Bisacodilo',
    nombre_en: 'Bisacodyl',
    nombres_comerciales: ['Dulcolax','Bisacodilo MK','Laxoberon','Laxifen'],
    sinonimos: ['dulcolax','laxoberon','laxante','para el estrenimiento','constipacion','laxifen'],
    categoria: 'Laxante estimulante',
    uso_principal: 'Estreñimiento ocasional, preparación para exámenes médicos',
    dosis_adulto: '5-10 mg oral en la noche (efecto en 6-12 h) o 10 mg supositorios (efecto en 15-60 min)',
    dosis_nino: 'Mayores de 6 años: 5 mg oral. Mayores de 10 años: dosis adulto.',
    contraindicaciones: 'Dolor abdominal agudo desconocido, náuseas, vómitos, íleo. No uso crónico.',
    efectos_secundarios: 'Calambres abdominales, diarrea, náuseas. No usar más de 7 días seguidos.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '15-260 C$ (según presentación)',
    embarazo: 'Categoría C — Usar con precaución'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 17 — GINECOLOGÍA / ANTICONCEPCIÓN
  // ════════════════════════════════════════════════════════
  {
    id: 58,
    nombre_es: 'Anticonceptivo oral combinado',
    nombre_en: 'Combined Oral Contraceptive',
    nombres_comerciales: ['Microgynon','Nordette','Levofem','Yasmin','Belara','Segura Plus','Norgylen'],
    sinonimos: ['pastillas anticonceptivas','pastillas para no embarazarse','microgynon','nordette','levofem','yasmin','planificacion familiar','segura plus','norgylen'],
    categoria: 'Anticonceptivo hormonal oral',
    uso_principal: 'Anticoncepción, regulación del ciclo menstrual, síndrome de ovario poliquístico',
    dosis_adulto: '1 tableta al día, comenzar el primer día de la menstruación',
    dosis_nino: 'Solo para adolescentes con menstruación, bajo supervisión médica',
    contraindicaciones: 'Fumadoras mayores de 35 años, trombosis, migraña con aura, hepatitis, embarazo.',
    efectos_secundarios: 'Náuseas (primeras semanas), manchado intermenstrual, cambios de humor.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '33-108 C$ (ciclo mensual)',
    embarazo: 'Categoría X — No usar en embarazo'
  },
  {
    id: 59,
    nombre_es: 'Anticonceptivo de emergencia',
    nombre_en: 'Emergency Contraception',
    nombres_comerciales: ['Postinor','Plan B','Levonorgestrel MK','NorLevo'],
    sinonimos: ['pastilla del dia siguiente','postinor','plan b','anticoncepcion de emergencia','levonorgestrel'],
    categoria: 'Anticoncepción de emergencia',
    uso_principal: 'Prevención de embarazo después de relación sexual sin protección (máx 72 horas)',
    dosis_adulto: '1.5 mg (una tableta) lo antes posible, dentro de las 72 horas',
    dosis_nino: 'Solo para adolescentes con menstruación',
    contraindicaciones: 'No es abortivo. No usar como método regular. Embarazo confirmado.',
    efectos_secundarios: 'Náuseas, vómitos, sangrado irregular, dolor de cabeza.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '80-150 C$ (tableta)',
    embarazo: 'No aplica (no es abortivo)'
  },
  {
    id: 159,
    nombre_es: 'Anticonceptivo Oral',
    nombre_en: 'Oral Contraceptive',
    nombres_comerciales: ['Microgynon','Nordette','Segura Plus'],
    sinonimos: ['pastillas','anticonceptivo','microgynon','nordette','planificacion'],
    categoria: 'Anticonceptivo hormonal',
    uso_principal: 'Prevención de embarazo, regulación menstrual',
    dosis_adulto: '1 tableta diaria por 21-28 días según marca',
    dosis_nino: 'Solo adolescentes con menstruación',
    contraindicaciones: 'Embarazo, trombosis, migraña con aura, fumadoras >35',
    efectos_secundarios: 'Náuseas, manchado, cambios de humor',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '33-108 C$ (ciclo mensual)',
    embarazo: 'Categoría X — NO usar en embarazo'
  },
  {
    id: 160,
    nombre_es: 'Condones',
    nombre_en: 'Condoms',
    nombres_comerciales: ['Vive','Prudence','Durex'],
    sinonimos: ['condones','preservativo','vive','prudence','proteccion'],
    categoria: 'Barrera anticonceptiva / ITS',
    uso_principal: 'Prevención de embarazo y enfermedades de transmisión sexual',
    dosis_adulto: '1 unidad por relación sexual',
    dosis_nino: 'No aplica',
    contraindicaciones: 'Alergia al látex (usar poliuretano)',
    efectos_secundarios: 'Ninguno, posible irritación por látex',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '45-768 C$ (según presentación)',
    embarazo: 'No aplica — Método de barrera'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 18 — MATERIAL MÉDICO Y DESCARTABLES
  // ════════════════════════════════════════════════════════
  {
    id: 165,
    nombre_es: 'Jeringas Descartables',
    nombre_en: 'Disposable Syringes',
    nombres_comerciales: ['Jeringa MK','Descartables'],
    sinonimos: ['jeringa','inyeccion','descartable','3ml','5ml','10ml'],
    categoria: 'Material médico descartable',
    uso_principal: 'Administración de medicamentos inyectables',
    dosis_adulto: 'Según volumen necesario (3ml, 5ml, 10ml)',
    dosis_nino: 'Según peso y medicamento',
    contraindicaciones: 'No reutilizar',
    efectos_secundarios: 'Ninguno si se usa correctamente',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '201-365 C$ (caja x100)',
    embarazo: 'No aplica'
  },
  {
    id: 166,
    nombre_es: 'Algodón Estéril',
    nombre_en: 'Sterile Cotton',
    nombres_comerciales: ['Algodón MK','Algodón estéril'],
    sinonimos: ['algodon','esteril','curacion','heridas','limpieza'],
    categoria: 'Material médico descartable',
    uso_principal: 'Curaciones, limpieza de heridas, aplicación de medicamentos',
    dosis_adulto: 'Según necesidad',
    dosis_nino: 'Según necesidad',
    contraindicaciones: 'Ninguna',
    efectos_secundarios: 'Ninguno',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '7.50-243.25 C$ (según presentación)',
    embarazo: 'No aplica'
  },
  {
    id: 167,
    nombre_es: 'Gasas Estériles',
    nombre_en: 'Sterile Gauze',
    nombres_comerciales: ['Gasa MK','Gasas estériles'],
    sinonimos: ['gasas','esteril','curacion','heridas','venda'],
    categoria: 'Material médico descartable',
    uso_principal: 'Curaciones, protección de heridas',
    dosis_adulto: 'Según tamaño de herida',
    dosis_nino: 'Según tamaño de herida',
    contraindicaciones: 'Ninguna',
    efectos_secundarios: 'Ninguno',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '213 C$ (caja x100)',
    embarazo: 'No aplica'
  },
  {
    id: 168,
    nombre_es: 'Guantes de Látex',
    nombre_en: 'Latex Gloves',
    nombres_comerciales: ['Guantes MK','Guantes látex'],
    sinonimos: ['guantes','latex','proteccion','curacion','examen'],
    categoria: 'Material médico descartable / Protección',
    uso_principal: 'Protección en curaciones, exámenes, manipulación',
    dosis_adulto: '1 par por procedimiento',
    dosis_nino: 'No aplica',
    contraindicaciones: 'Alergia al látex',
    efectos_secundarios: 'Reacción alérgica en sensibles',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '12.50-240 C$ (según presentación)',
    embarazo: 'No aplica'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 19 — PRUEBAS DIAGNÓSTICAS RÁPIDAS
  // ════════════════════════════════════════════════════════
  {
    id: 169,
    nombre_es: 'Prueba de Embarazo',
    nombre_en: 'Pregnancy Test',
    nombres_comerciales: ['Prueba Embarazo','Clearblue','Response'],
    sinonimos: ['embarazo','prueba','test','response','cassette'],
    categoria: 'Prueba diagnóstica rápida',
    uso_principal: 'Detección de embarazo (hCG en orina)',
    dosis_adulto: '1 prueba, preferiblemente con primera orina',
    dosis_nino: 'No aplica',
    contraindicaciones: 'Ninguna',
    efectos_secundarios: 'Ninguno',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '15-27 C$',
    embarazo: 'No aplica — Para detectar embarazo'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 20 — PRODUCTOS PARA DIABÉTICOS
  // ════════════════════════════════════════════════════════
  {
    id: 170,
    nombre_es: 'Tiras Reactivas para Glucómetro',
    nombre_en: 'Glucose Test Strips',
    nombres_comerciales: ['WellSensor','Accu-Chek','OneTouch'],
    sinonimos: ['tiras','glucometro','azucar','diabetes','wellsensor'],
    categoria: 'Insumo para monitoreo de glucosa',
    uso_principal: 'Medición de glucosa en sangre para diabéticos',
    dosis_adulto: '1 tira por medición según indicación médica',
    dosis_nino: 'Según protocolo médico',
    contraindicaciones: 'Ninguna',
    efectos_secundarios: 'Ninguno',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '470-539 C$ (25-50 tiras)',
    embarazo: 'No aplica — Para monitoreo'
  },
  {
    id: 171,
    nombre_es: 'Glucómetro',
    nombre_en: 'Glucometer',
    nombres_comerciales: ['WellSensor','Accu-Chek','OneTouch'],
    sinonimos: ['glucometro','azucar','diabetes','medidor'],
    categoria: 'Dispositivo médico',
    uso_principal: 'Medición de glucosa en sangre',
    dosis_adulto: 'Según necesidad (varias veces al día)',
    dosis_nino: 'Según protocolo médico',
    contraindicaciones: 'Ninguna',
    efectos_secundarios: 'Ninguno',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '740 C$ (kit completo)',
    embarazo: 'No aplica — Para monitoreo'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 21 — PRODUCTOS PARA HIPERTENSOS
  // ════════════════════════════════════════════════════════
  {
    id: 172,
    nombre_es: 'Tensiómetro',
    nombre_en: 'Blood Pressure Monitor',
    nombres_comerciales: ['Tensiómetro MK','Omron','Beurer'],
    sinonimos: ['tensiometro','presion','arterial','omron','medidor'],
    categoria: 'Dispositivo médico',
    uso_principal: 'Medición de presión arterial',
    dosis_adulto: 'Según indicación médica (1-3 veces al día)',
    dosis_nino: 'Con manguito pediátrico',
    contraindicaciones: 'Ninguna',
    efectos_secundarios: 'Ninguno',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '520.50 C$ (kit con estetoscopio)',
    embarazo: 'No aplica — Para monitoreo'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 22 — PRODUCTOS DE HIGIENE FEMENINA
  // ════════════════════════════════════════════════════════
  {
    id: 173,
    nombre_es: 'Toallas Sanitarias',
    nombre_en: 'Sanitary Pads',
    nombres_comerciales: ['Kotex','Saba','Always'],
    sinonimos: ['toallas','sanitarias','kotex','saba','menstruacion'],
    categoria: 'Higiene femenina',
    uso_principal: 'Absorción de flujo menstrual',
    dosis_adulto: 'Cambiar cada 4-6 horas',
    dosis_nino: 'No aplica (adolescentes con menstruación)',
    contraindicaciones: 'Ninguna',
    efectos_secundarios: 'Posible irritación (cambiar frecuentemente)',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '24.75-48.50 C$ (según presentación)',
    embarazo: 'No aplica'
  },
  {
    id: 174,
    nombre_es: 'Protectores Diarios',
    nombre_en: 'Panty Liners',
    nombres_comerciales: ['Kotex','Saba','Always'],
    sinonimos: ['protectores','diarios','kotex','saba','higiene'],
    categoria: 'Higiene femenina',
    uso_principal: 'Protección diaria, flujo ligero',
    dosis_adulto: 'Cambiar según necesidad',
    dosis_nino: 'No aplica',
    contraindicaciones: 'Ninguna',
    efectos_secundarios: 'Ninguno',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '24-32 C$ (15 unidades)',
    embarazo: 'No aplica'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 23 — CUIDADO DE BEBÉS
  // ════════════════════════════════════════════════════════
  {
    id: 175,
    nombre_es: 'Pañales para Adulto',
    nombre_en: 'Adult Diapers',
    nombres_comerciales: ['Cotidian','Tena','Always Discreet'],
    sinonimos: ['pañales','adulto','incontinencia','cotidian'],
    categoria: 'Cuidado de incontinencia',
    uso_principal: 'Incontinencia urinaria/fecal en adultos',
    dosis_adulto: 'Cambiar según necesidad',
    dosis_nino: 'No aplica',
    contraindicaciones: 'Ninguna',
    efectos_secundarios: 'Posible irritación (cambiar frecuentemente)',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '196.50 C$ (10 unidades)',
    embarazo: 'No aplica'
  },
  {
    id: 176,
    nombre_es: 'Toallitas Húmedas',
    nombre_en: 'Wet Wipes',
    nombres_comerciales: ['Huggies','Baby Astros','Pampers'],
    sinonimos: ['toallitas','humedas','huggies','bebe','limpieza'],
    categoria: 'Higiene de bebé',
    uso_principal: 'Limpieza de bebé, cambio de pañal',
    dosis_adulto: 'Según necesidad',
    dosis_nino: 'Según necesidad',
    contraindicaciones: 'Alergia a componentes',
    efectos_secundarios: 'Posible irritación en piel sensible',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '43-69 C$ (según presentación)',
    embarazo: 'No aplica'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 24 — NEBULIZACIÓN Y RESPIRATORIO
  // ════════════════════════════════════════════════════════
  {
    id: 177,
    nombre_es: 'Nebulizador',
    nombre_en: 'Nebulizer',
    nombres_comerciales: ['Medimax','Omron','Philips'],
    sinonimos: ['nebulizador','asma','bronquitis','respiratorio','medimax'],
    categoria: 'Dispositivo médico',
    uso_principal: 'Administración de medicamentos inhalados',
    dosis_adulto: 'Según prescripción médica',
    dosis_nino: 'Según prescripción médica',
    contraindicaciones: 'Ninguna',
    efectos_secundarios: 'Ninguno',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '880 C$',
    embarazo: 'No aplica — Dispositivo'
  },
  {
    id: 178,
    nombre_es: 'Mascarilla para Nebulizar',
    nombre_en: 'Nebulizer Mask',
    nombres_comerciales: ['Mascarilla Nebulizador','Allpro','Viamed'],
    sinonimos: ['mascarilla','nebulizador','asma','respiratorio'],
    categoria: 'Accesorio médico',
    uso_principal: 'Administración de medicamentos inhalados',
    dosis_adulto: 'Adulto o pediátrica según edad',
    dosis_nino: 'Pediátrica para niños',
    contraindicaciones: 'Ninguna',
    efectos_secundarios: 'Ninguno',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '50 C$',
    embarazo: 'No aplica'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 25 — TERMÓMETROS
  // ════════════════════════════════════════════════════════
  {
    id: 179,
    nombre_es: 'Termómetro Digital',
    nombre_en: 'Digital Thermometer',
    nombres_comerciales: ['Termómetro Wellpro','Omron','Beurer'],
    sinonimos: ['termometro','digital','fiebre','temperatura','wellpro'],
    categoria: 'Dispositivo médico',
    uso_principal: 'Medición de temperatura corporal',
    dosis_adulto: 'Según necesidad',
    dosis_nino: 'Según necesidad',
    contraindicaciones: 'Ninguna',
    efectos_secundarios: 'Ninguno',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '105-151 C$',
    embarazo: 'No aplica — Dispositivo'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 26 — PRODUCTOS PEDIÁTRICOS ESPECÍFICOS
  // ════════════════════════════════════════════════════════
  {
    id: 158,
    nombre_es: 'Paracetamol Pediátrico',
    nombre_en: 'Pediatric Paracetamol',
    nombres_comerciales: ['Tempra Niños','Panadol Niños','Acetaminofén jarabe'],
    sinonimos: ['paracetamol niño','acetaminofen jarabe','fiebre niño','tempra'],
    categoria: 'Analgésico/Antipirético pediátrico',
    uso_principal: 'Fiebre y dolor en niños',
    dosis_adulto: 'No aplica',
    dosis_nino: '10-15 mg/kg cada 6 horas (MÁX 5 dosis/24h)',
    contraindicaciones: 'Enfermedad hepática, alergia',
    efectos_secundarios: 'Raro: daño hepático con sobredosis',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '25-64 C$ (según presentación)',
    embarazo: 'No aplica (uso pediátrico)'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 27 — INFUSIONES Y TÉS MEDICINALES
  // ════════════════════════════════════════════════════════
  {
    id: 181,
    nombre_es: 'Té de Manzanilla',
    nombre_en: 'Chamomile Tea',
    nombres_comerciales: ['Manzate','Té Manzanilla'],
    sinonimos: ['manzanilla','te','digestion','calmante','dormir'],
    categoria: 'Infusión herbal',
    uso_principal: 'Digestión, cólicos, relajación, dormir',
    dosis_adulto: '1-2 tazas al día',
    dosis_nino: 'Seguro en todas las edades',
    contraindicaciones: 'Alergia a asteráceas',
    efectos_secundarios: 'Ninguno significativo',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '48-170 C$ (según presentación)',
    embarazo: 'Categoría A — Seguro en moderación'
  },
  {
    id: 182,
    nombre_es: 'Té de Jengibre',
    nombre_en: 'Ginger Tea',
    nombres_comerciales: ['Té Jengibre/Limón','Manzate Jengibre'],
    sinonimos: ['jengibre','te','nauseas','digestion','gripe'],
    categoria: 'Infusión herbal',
    uso_principal: 'Náuseas, digestión, gripe, antiinflamatorio',
    dosis_adulto: '1-3 tazas al día',
    dosis_nino: 'Consultar según edad',
    contraindicaciones: 'Anticoagulantes, úlcera activa',
    efectos_secundarios: 'Acidez en dosis altas',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '68.50-79 C$',
    embarazo: 'Categoría A — Seguro en moderación'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 28 — PRODUCTOS DE HIGIENE Y CUIDADO
  // ════════════════════════════════════════════════════════
  {
    id: 162,
    nombre_es: 'Jabón Medicinal',
    nombre_en: 'Medicinal Soap',
    nombres_comerciales: ['Jabón Avena','Jabón Azufre','Jabón Neutro','Grissi'],
    sinonimos: ['jabon','avena','azufre','piel','acne','grissi'],
    categoria: 'Higiene / Cuidado de piel',
    uso_principal: 'Limpieza de piel, acné, dermatitis',
    dosis_adulto: 'Usar 1-2 veces al día en ducha',
    dosis_nino: 'Seguro para todas las edades',
    contraindicaciones: 'Alergia a componentes',
    efectos_secundarios: 'Sequedad de piel (usar hidratante)',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '31.50-43.50 C$',
    embarazo: 'Categoría A — Seguro'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 30 — NEUROLÓGICOS / PSIQUIATRÍA ADICIONAL
  // ════════════════════════════════════════════════════════
  {
    id: 111,
    nombre_es: 'Gabapentina',
    nombre_en: 'Gabapentin',
    nombres_comerciales: ['Neurontin','Gabarin','Gabex Plus','Gabapentina MK'],
    sinonimos: ['neurontin','gabarin','para dolor de nervios','neuropatia','dolor neuropatico','fibromialgia','nervio ciatico','gabex plus'],
    categoria: 'Anticonvulsivante / Analgésico neuropático',
    uso_principal: 'Dolor neuropático (neuropatía diabética, ciática, neuralgia posherpética), epilepsia, fibromialgia',
    dosis_adulto: '300-1200 mg tres veces al día (iniciar con 300 mg/noche, titular lentamente)',
    dosis_nino: '10-15 mg/kg/día dividido tres veces (epilepsia, bajo supervisión)',
    contraindicaciones: 'Alergia. Ajustar dosis en insuficiencia renal.',
    efectos_secundarios: 'Somnolencia, mareos, aumento de peso. Iniciar con dosis baja.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '85-473 C$ (según dosis)',
    embarazo: 'Categoría C — Consultar médico'
  },
  {
    id: 28,
    nombre_es: 'Diazepam',
    nombre_en: 'Diazepam',
    nombres_comerciales: ['Valium','Ansiolin','Diazepam MK'],
    sinonimos: ['valium','para los nervios','ansiedad','calmante','tranquilizante','convulsiones'],
    categoria: 'Benzodiazepina / Ansiolítico',
    uso_principal: 'Ansiedad grave, convulsiones, espasmos musculares, abstinencia alcohólica',
    dosis_adulto: '2-10 mg 2-4 veces al día (según indicación médica)',
    dosis_nino: 'Solo bajo supervisión médica estricta',
    contraindicaciones: 'Insuficiencia respiratoria grave, apnea del sueño. Dependencia con uso prolongado.',
    efectos_secundarios: 'Somnolencia, mareos, dependencia física. No conducir.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '5-20 C$ (tabletas)',
    embarazo: 'Categoría D — Evitar, especialmente primer trimestre'
  },
  {
    id: 31,
    nombre_es: 'Fluoxetina',
    nombre_en: 'Fluoxetine',
    nombres_comerciales: ['Prozac','Fluoxac','Fontex','Fluoxetina MK'],
    sinonimos: ['prozac','antidepresivo','para la depresion','isrs','para la ansiedad'],
    categoria: 'Antidepresivo ISRS',
    uso_principal: 'Depresión, trastorno obsesivo-compulsivo, trastorno de pánico, bulimia',
    dosis_adulto: '20-60 mg una vez al día (mañana)',
    dosis_nino: 'Solo bajo supervisión psiquiátrica',
    contraindicaciones: 'No combinar con inhibidores de MAO. Precaución en epilepsia.',
    efectos_secundarios: 'Náuseas (primeras semanas), insomnio, disfunción sexual. Efecto tarda 2-4 semanas.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '30-80 C$ (cápsulas)',
    embarazo: 'Categoría C — Consultar médico'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 31 — ENDOCRINOLOGÍA ADICIONAL
  // ════════════════════════════════════════════════════════
  {
    id: 34,
    nombre_es: 'Glibenclamida',
    nombre_en: 'Glibenclamide',
    nombres_comerciales: ['Daonil','Euglucon','Glibenclamida MK'],
    sinonimos: ['daonil','euglucon','para la diabetes','hipoglucemiante','antidiabetico'],
    categoria: 'Hipoglucemiante oral (Sulfonilurea)',
    uso_principal: 'Diabetes tipo 2 cuando dieta y metformina no son suficientes',
    dosis_adulto: '2.5-15 mg al día con el desayuno (iniciar con dosis baja)',
    dosis_nino: 'No usar en diabetes tipo 1 ni en niños',
    contraindicaciones: 'Diabetes tipo 1, insuficiencia renal o hepática grave, embarazo.',
    efectos_secundarios: 'Hipoglucemia si no come. Aumento de peso.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '35.50-56.50 C$ (100 tabletas)',
    embarazo: 'Categoría C — Contraindicado, usar insulina en embarazo'
  },
  {
    id: 35,
    nombre_es: 'Insulina NPH',
    nombre_en: 'NPH Insulin / Isophane Insulin',
    nombres_comerciales: ['Insulina Lilly NPH','Insulatard','Humulin N'],
    sinonimos: ['insulina','insulina nph','para la diabetes','insulina lenta','inyeccion para diabetes'],
    categoria: 'Insulina de acción intermedia',
    uso_principal: 'Diabetes tipo 1, diabetes tipo 2 mal controlada, diabetes en embarazo',
    dosis_adulto: 'Individualizada según glucemia (prescripción médica obligatoria)',
    dosis_nino: 'Solo bajo supervisión médica pediátrica',
    contraindicaciones: 'Hipoglucemia activa. Técnica de inyección y dosis individualizadas.',
    efectos_secundarios: 'Hipoglucemia (azúcar baja — mareos, sudor, temblor), lipodistrofia.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '120-250 C$ (frasco/vial)',
    embarazo: 'Categoría B — Primera elección en embarazo diabético'
  },
  {
    id: 36,
    nombre_es: 'Levotiroxina',
    nombre_en: 'Levothyroxine',
    nombres_comerciales: ['Eutirox','Synthroid','Levotiroxina MK'],
    sinonimos: ['eutirox','synthroid','tiroides','hipotiroidismo','hormona tiroidea','t4'],
    categoria: 'Hormona tiroidea',
    uso_principal: 'Hipotiroidismo, bocio, tras extirpación de tiroides',
    dosis_adulto: '25-200 mcg una vez al día (en ayunas, 30 min antes del desayuno)',
    dosis_nino: 'Según peso y edad (consultar médico)',
    contraindicaciones: 'Tirotoxicosis no tratada. Iniciar con dosis baja en ancianos y cardiopatía.',
    efectos_secundarios: 'Con dosis excesiva: palpitaciones, nerviosismo, pérdida de peso, insomnio.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '20-60 C$ (tabletas)',
    embarazo: 'Categoría A — Necesaria y segura en embarazo'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 32 — DERMATOLOGÍA ADICIONAL
  // ════════════════════════════════════════════════════════
  {
    id: 90,
    nombre_es: 'Ácido Salicílico',
    nombre_en: 'Salicylic Acid',
    nombres_comerciales: ['Verutex','Acido salicilico MK','Keralyt','Saliderm'],
    sinonimos: ['acido salicilico','para las verrugas','para los callos','verrugas','callosidades','queratolitico'],
    categoria: 'Queratolítico tópico',
    uso_principal: 'Verrugas, callos, durezas, psoriasis, seborrea, acné (concentraciones bajas)',
    dosis_adulto: 'Verrugas/callos: aplicar solución 17-40% directamente en la lesión una vez al día.',
    dosis_nino: 'Consultar médico. Evitar en niños pequeños en áreas extensas.',
    contraindicaciones: 'Heridas abiertas, infecciones. No aplicar en piel sana alrededor de la lesión.',
    efectos_secundarios: 'Irritación local, descamación de la piel tratada.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '15-40 C$ (solución o crema)',
    embarazo: 'Categoría C — Uso tópico limitado con precaución'
  },
  {
    id: 91,
    nombre_es: 'Minoxidil',
    nombre_en: 'Minoxidil',
    nombres_comerciales: ['Rogaine','Regaine','Minoxidil MK','Loniten topico'],
    sinonimos: ['rogaine','regaine','para la calvicie','para el cabello','alopecia','caida del cabello'],
    categoria: 'Estimulante capilar tópico',
    uso_principal: 'Alopecia androgenética (calvicie común en hombres y mujeres)',
    dosis_adulto: '1 mL (2% o 5%) aplicar en cuero cabelludo dos veces al día. Resultado en 3-6 meses.',
    dosis_nino: 'No recomendado en menores de 18 años',
    contraindicaciones: 'Alergia. No usar si hay infección o irritación en el cuero cabelludo.',
    efectos_secundarios: 'Irritación local, prurito, crecimiento de vello en cara (mujeres con 5%).',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '100-250 C$ (frasco)',
    embarazo: 'Categoría C — Contraindicado durante embarazo'
  },
  {
    id: 124,
    nombre_es: 'Finasteride',
    nombre_en: 'Finasteride',
    nombres_comerciales: ['Proscar','Propecia','Finasteride MK'],
    sinonimos: ['proscar','propecia','para la prostata','para la calvicie','alopecia masculina','hiperplasia prostatica'],
    categoria: 'Inhibidor 5-alfa reductasa',
    uso_principal: 'Hiperplasia prostática benigna (5 mg), alopecia androgenética masculina (1 mg)',
    dosis_adulto: 'Próstata: 5 mg/día. Calvicie: 1 mg/día. Efecto en 3-6 meses.',
    dosis_nino: 'NO usar en menores de 18 años ni en mujeres.',
    contraindicaciones: 'Mujeres (especialmente embarazadas — malformaciones fetales). Menores de 18 años.',
    efectos_secundarios: 'Disfunción sexual (~2%), ginecomastia (raro).',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '577 C$ (100 tabletas)',
    embarazo: 'Categoría X — PROHIBIDO en mujeres embarazadas (ni tocar el comprimido)'
  },
  {
    id: 92,
    nombre_es: 'Lágrimas Artificiales',
    nombre_en: 'Artificial Tears',
    nombres_comerciales: ['Systane','Refresh Tears','Lagrimas Artificiales MK','Visine Tears'],
    sinonimos: ['systane','refresh tears','para los ojos secos','sequedad ocular','ardor de ojos','ojos rojos secos'],
    categoria: 'Lubricante ocular',
    uso_principal: 'Ojos secos, irritación ocular por viento, polvo, humo o uso de pantallas',
    dosis_adulto: '1-2 gotas en cada ojo según necesidad',
    dosis_nino: 'Seguro en todas las edades bajo supervisión',
    contraindicaciones: 'Alergia a los componentes. No usar lentes de contacto blandos al aplicar (excepto fórmulas especiales).',
    efectos_secundarios: 'Visión borrosa transitoria inmediatamente después de aplicar (normal).',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '40-120 C$ (frasco gotero)',
    embarazo: 'Categoría A — Seguras durante embarazo'
  },
  {
    id: 95,
    nombre_es: 'Suero Fisiológico Nasal',
    nombre_en: 'Nasal Saline Solution',
    nombres_comerciales: ['Sterimar','Fisiomer','Salinase','Suero nasal MK','Nasal Mist'],
    sinonimos: ['sterimar','fisiomer','salinase','lavado nasal','para la nariz','solucion salina nasal','nariz tapada'],
    categoria: 'Descongestionante nasal (solución salina)',
    uso_principal: 'Congestión nasal, limpieza nasal, rinitis, resfriado, alergias nasales, niños con moco',
    dosis_adulto: '1-2 atomizaciones por fosa nasal según necesidad. Sin límite de uso.',
    dosis_nino: 'Seguro desde recién nacidos. Aplicar antes de amamantar o comer.',
    contraindicaciones: 'Ninguna. Es simplemente agua con sal al 0.9%.',
    efectos_secundarios: 'Ninguno. Totalmente seguro.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '40-100 C$ (atomizador)',
    embarazo: 'Categoría A — Totalmente seguro'
  },
  {
    id: 123,
    nombre_es: 'Ketotifeno',
    nombre_en: 'Ketotifen',
    nombres_comerciales: ['Zaditor','Ketomax','Ketofen','Ketotifeno MK'],
    sinonimos: ['zaditor','ketomax','ketofen','para ojos alergicos','conjuntivitis alergica','ojos rojos por alergia'],
    categoria: 'Antialérgico ocular y sistémico',
    uso_principal: 'Conjuntivitis alérgica (gotas), prevención de asma alérgica (oral)',
    dosis_adulto: 'Gotas: 1 gota en cada ojo dos veces al día. Oral: 1 mg dos veces al día.',
    dosis_nino: 'Mayores de 3 años: igual que adulto',
    contraindicaciones: 'Alergia al ketotifeno.',
    efectos_secundarios: 'Oral: somnolencia, aumento de peso. Gotas: ardor leve transitorio.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '51 C$ (tabletas 50), 168 C$ (solución oftálmica)',
    embarazo: 'Categoría C — Consultar médico'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 33 — ANALGESIA ADICIONAL
  // ════════════════════════════════════════════════════════
  {
    id: 71,
    nombre_es: 'Ácido Mefenámico',
    nombre_en: 'Mefenamic Acid',
    nombres_comerciales: ['Ponstel','Ponstan','Acido mefenamico MK'],
    sinonimos: ['ponstan','ponstel','para los colicos menstruales','dolor menstrual','dismenorrea'],
    categoria: 'AINE (analgésico y antiinflamatorio)',
    uso_principal: 'Cólicos menstruales (dismenorrea), dolor leve a moderado, fiebre',
    dosis_adulto: '500 mg tres veces al día con comida. MÁX 7 días.',
    dosis_nino: 'Mayores de 12 años: misma dosis que adulto',
    contraindicaciones: 'Úlcera péptica, insuficiencia renal o hepática, embarazo. SIEMPRE con comida.',
    efectos_secundarios: 'Malestar gastrointestinal, diarrea, náuseas. Tomar con comida.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '15-35 C$ (cápsulas)',
    embarazo: 'Categoría C — Contraindicado en 3er trimestre'
  },
  {
    id: 72,
    nombre_es: 'Naproxeno',
    nombre_en: 'Naproxen',
    nombres_comerciales: ['Aleve','Naprosyn','Naproxeno MK','Flanax'],
    sinonimos: ['aleve','naprosyn','flanax','para el dolor','antiinflamatorio','dolor muscular','artritis'],
    categoria: 'AINE (analgésico antiinflamatorio de larga duración)',
    uso_principal: 'Dolor muscular, artritis, cólicos menstruales, dolor dental, fiebre',
    dosis_adulto: '250-500 mg dos veces al día con comida. Duración larga (12 horas).',
    dosis_nino: 'Mayores de 12 años: 250 mg dos veces al día',
    contraindicaciones: 'Úlcera, insuficiencia renal o cardíaca, embarazo avanzado. SIEMPRE con comida.',
    efectos_secundarios: 'Malestar gástrico, retención de líquidos. Tomar con comida.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '10-30 C$ (tabletas)',
    embarazo: 'Categoría C — Contraindicado en 3er trimestre'
  },
  {
    id: 73,
    nombre_es: 'Ergotamina',
    nombre_en: 'Ergotamine',
    nombres_comerciales: ['Cafergot','Ergotamina MK','Ergoton'],
    sinonimos: ['cafergot','ergotamina','para la migrana','jaqueca fuerte','migrena'],
    categoria: 'Antimigrañoso / Vasoconstrictor',
    uso_principal: 'Tratamiento del ataque agudo de migraña o jaqueca intensa',
    dosis_adulto: '1-2 mg al inicio del ataque. MÁX 6 mg por ataque y 10 mg por semana.',
    dosis_nino: 'No recomendado en menores de 12 años',
    contraindicaciones: 'Hipertensión, enfermedad coronaria, vasculopatía periférica, embarazo, sepsis.',
    efectos_secundarios: 'Náuseas, vómitos, hormigueo en extremidades. No usar frecuentemente.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '20-60 C$ (tabletas)',
    embarazo: 'Categoría X — CONTRAINDICADO'
  },
  {
    id: 42,
    nombre_es: 'Alopurinol',
    nombre_en: 'Allopurinol',
    nombres_comerciales: ['Zyloric','Zyloprim','Alopurinol MK'],
    sinonimos: ['zyloric','para la gota','acido urico alto','hiperuricemia','gota'],
    categoria: 'Antigotoso',
    uso_principal: 'Gota crónica, hiperuricemia, prevención de ataques de gota',
    dosis_adulto: '100-300 mg una vez al día (con mucha agua)',
    dosis_nino: 'Solo bajo supervisión médica',
    contraindicaciones: 'Ataque agudo de gota activo (no iniciar durante crisis). Alergia.',
    efectos_secundarios: 'Sarpullido (suspender si aparece), náuseas, crisis de gota al inicio.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '173.50 C$ (100 tabletas)',
    embarazo: 'Categoría C — Consultar médico'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 34 — HEMATOLOGÍA
  // ════════════════════════════════════════════════════════
  {
    id: 26,
    nombre_es: 'Sulfato Ferroso',
    nombre_en: 'Ferrous Sulfate',
    nombres_comerciales: ['Fer-In-Sol','Ferodan','Hierro MK','Sulfato ferroso'],
    sinonimos: ['hierro','para la anemia','ferodan','sulfato de hierro','anemia ferropenica'],
    categoria: 'Antianémico / Suplemento de hierro',
    uso_principal: 'Anemia ferropénica, embarazo, lactancia, pérdida de sangre',
    dosis_adulto: '300 mg (60 mg hierro elemental) 1-3 veces al día, con jugo de naranja',
    dosis_nino: '3-6 mg/kg/día de hierro elemental',
    contraindicaciones: 'Hemocromatosis, anemia no ferropénica. No tomar con leche o té.',
    efectos_secundarios: 'Heces negras (normal), estreñimiento, náuseas. Tomar con jugo de naranja.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '10-25 C$ (tabletas o jarabe)',
    embarazo: 'Categoría A — Recomendado en embarazo'
  },
  {
    id: 27,
    nombre_es: 'Warfarina',
    nombre_en: 'Warfarin',
    nombres_comerciales: ['Coumadin','Warfarina MK'],
    sinonimos: ['coumadin','anticoagulante','para la trombosis','para los coagulos'],
    categoria: 'Anticoagulante oral',
    uso_principal: 'Trombosis venosa profunda, fibrilación auricular, válvulas cardíacas artificiales',
    dosis_adulto: '2-10 mg al día (ajustar según INR — examen de sangre)',
    dosis_nino: 'Solo bajo supervisión hematológica',
    contraindicaciones: 'Sangrado activo, embarazo, hipertensión no controlada. MUCHAS interacciones.',
    efectos_secundarios: 'Sangrado (principal riesgo). Evitar cambios bruscos de dieta con vitamina K.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '20-50 C$ (tabletas)',
    embarazo: 'Categoría X — CONTRAINDICADO'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 35 — NEUROLOGÍA / PSIQUIATRÍA ADICIONAL
  // ════════════════════════════════════════════════════════
  {
    id: 29,
    nombre_es: 'Carbamazepina',
    nombre_en: 'Carbamazepine',
    nombres_comerciales: ['Tegretol','Carbatrol','Carbamazepina MK'],
    sinonimos: ['tegretol','para la epilepsia','antiepiletico','convulsiones','neuralgia'],
    categoria: 'Anticonvulsivante / Antiepiléptico',
    uso_principal: 'Epilepsia, neuralgia del trigémino, trastorno bipolar',
    dosis_adulto: '200-400 mg dos veces al día',
    dosis_nino: '10-20 mg/kg/día dividido en 2-3 dosis',
    contraindicaciones: 'Bloqueo AV, alergia. Muchas interacciones medicamentosas.',
    efectos_secundarios: 'Mareos, visión doble, náuseas, sarpullido (suspender si aparece).',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '20-60 C$ (tabletas)',
    embarazo: 'Categoría D — Riesgo de malformaciones fetales'
  },
  {
    id: 30,
    nombre_es: 'Ácido Valproico',
    nombre_en: 'Valproic Acid',
    nombres_comerciales: ['Depakote','Valcote','Acido valproico MK','Epival'],
    sinonimos: ['depakote','valcote','para la epilepsia','antiepiletico','para el bipolar'],
    categoria: 'Anticonvulsivante / Estabilizador del ánimo',
    uso_principal: 'Epilepsia, trastorno bipolar, prevención de migraña',
    dosis_adulto: '250-500 mg dos o tres veces al día',
    dosis_nino: '15-30 mg/kg/día dividido en 2-3 dosis',
    contraindicaciones: 'Enfermedad hepática, embarazo (alto riesgo), alergia.',
    efectos_secundarios: 'Aumento de peso, caída de cabello, temblor, daño hepático.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '40-100 C$ (tabletas)',
    embarazo: 'Categoría D — Riesgo alto de defectos del tubo neural'
  },
  {
    id: 32,
    nombre_es: 'Amitriptilina',
    nombre_en: 'Amitriptyline',
    nombres_comerciales: ['Triptizol','Amitriptilina MK','Laroxyl'],
    sinonimos: ['triptizol','antidepresivo','para el dolor cronico','neuropatia','para dormir'],
    categoria: 'Antidepresivo tricíclico',
    uso_principal: 'Depresión, dolor neuropático crónico, fibromialgia, migraña (prevención)',
    dosis_adulto: '25-150 mg al día (iniciar con 25 mg en la noche)',
    dosis_nino: 'Solo bajo supervisión médica',
    contraindicaciones: 'Infarto reciente, glaucoma, retención urinaria, arritmias. No con IMAO.',
    efectos_secundarios: 'Somnolencia, boca seca, estreñimiento, aumento de peso.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '10-30 C$ (tabletas)',
    embarazo: 'Categoría C — Consultar médico'
  },
  {
    id: 33,
    nombre_es: 'Haloperidol',
    nombre_en: 'Haloperidol',
    nombres_comerciales: ['Haldol','Serenase','Haloperidol MK'],
    sinonimos: ['haldol','antipsicotico','para la psicosis','para la agitacion'],
    categoria: 'Antipsicótico típico',
    uso_principal: 'Esquizofrenia, psicosis aguda, agitación severa, delirio',
    dosis_adulto: '0.5-5 mg dos o tres veces al día',
    dosis_nino: 'Solo bajo supervisión psiquiátrica',
    contraindicaciones: 'Parkinson, coma, depresión grave del SNC.',
    efectos_secundarios: 'Rigidez muscular, temblor, somnolencia, movimientos involuntarios.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '10-30 C$ (tabletas)',
    embarazo: 'Categoría C — Consultar médico'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 36 — GINECOLOGÍA / OBSTETRICIA
  // ════════════════════════════════════════════════════════
  {
    id: 60,
    nombre_es: 'Oxitocina',
    nombre_en: 'Oxytocin',
    nombres_comerciales: ['Pitocin','Syntocinon','Oxitocina MK'],
    sinonimos: ['pitocin','syntocinon','para el parto','inductor del parto','para el sangrado postparto'],
    categoria: 'Uterotónico / Hormona',
    uso_principal: 'Inducción del trabajo de parto, prevención de hemorragia postparto',
    dosis_adulto: 'Administración hospitalaria exclusiva (IV o IM según protocolo)',
    dosis_nino: 'No aplica',
    contraindicaciones: 'Uso exclusivamente hospitalario bajo supervisión médica. Desproporción cefalopélvica.',
    efectos_secundarios: 'Contracciones intensas, hipotensión, intoxicación hídrica con dosis altas.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '30-80 C$ (ampolla)',
    embarazo: 'Uso hospitalario exclusivo'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 37 — ALERGIAS ADICIONALES
  // ════════════════════════════════════════════════════════
  {
    id: 61,
    nombre_es: 'Difenhidramina',
    nombre_en: 'Diphenhydramine',
    nombres_comerciales: ['Benadryl','Difenhidramina MK','Nytol','Unisom'],
    sinonimos: ['benadryl','para la alergia','para dormir','antihistaminico','picazon','urticaria','nytol'],
    categoria: 'Antihistamínico (1ra generación / sedante)',
    uso_principal: 'Alergias, urticaria, picazón, ayuda para dormir, náuseas por movimiento',
    dosis_adulto: '25-50 mg cada 6-8 horas. Causa mucho sueño — no conducir.',
    dosis_nino: 'Mayores de 2 años: 1 mg/kg cada 6 horas (consultar médico).',
    contraindicaciones: 'Glaucoma, retención urinaria, asma. Menores de 2 años. No conducir.',
    efectos_secundarios: 'Somnolencia intensa, boca seca, visión borrosa, confusión en ancianos.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '15-117.50 C$ (según presentación)',
    embarazo: 'Categoría B — Consultar médico'
  },
  {
    id: 62,
    nombre_es: 'Fexofenadina',
    nombre_en: 'Fexofenadine',
    nombres_comerciales: ['Allegra','Fexofenadina MK','Telfast'],
    sinonimos: ['allegra','telfast','para la alergia','antihistaminico sin sueno','alergia nasal','sin somnolencia'],
    categoria: 'Antihistamínico (2da generación, NO causa sueño)',
    uso_principal: 'Rinitis alérgica, urticaria crónica. NO causa somnolencia.',
    dosis_adulto: '120-180 mg una vez al día',
    dosis_nino: 'Mayores de 6 años: 30 mg dos veces al día (consultar médico)',
    contraindicaciones: 'Alergia a fexofenadina. No tomar con jugo de naranja o toronja.',
    efectos_secundarios: 'Dolor de cabeza, náuseas. Generalmente muy bien tolerado.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '30-70 C$ (tabletas)',
    embarazo: 'Categoría C — Consultar médico'
  },
  {
    id: 63,
    nombre_es: 'Cetirizina',
    nombre_en: 'Cetirizine',
    nombres_comerciales: ['Zyrtec','Cetirizina MK','Reactine','Alerlisin'],
    sinonimos: ['zyrtec','reactine','alerlisin','para la alergia','antihistaminico','rinitis','urticaria'],
    categoria: 'Antihistamínico (2da generación, leve somnolencia)',
    uso_principal: 'Rinitis alérgica, urticaria, ojos llorosos, estornudos. Puede causar algo de sueño.',
    dosis_adulto: '10 mg una vez al día (preferible en la noche)',
    dosis_nino: '5 mg una vez al día (mayores de 2 años)',
    contraindicaciones: 'Alergia a cetirizina o hidroxizina. Precaución en insuficiencia renal.',
    efectos_secundarios: 'Somnolencia leve, boca seca. Mejor tolerado que clorfeniramina.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '15-97 C$ (según presentación)',
    embarazo: 'Categoría B — Consultar médico'
  },
  {
    id: 97,
    nombre_es: 'Desloratadina',
    nombre_en: 'Desloratadine',
    nombres_comerciales: ['Clarinex','Aerius','Desloratadina MK','Larien'],
    sinonimos: ['clarinex','aerius','larien','para la alergia','antihistaminico sin sueno','alergia nasal','estornudos'],
    categoria: 'Antihistamínico (3ra generación, NO causa sueño)',
    uso_principal: 'Rinitis alérgica, urticaria crónica, alergias en general. NO causa somnolencia.',
    dosis_adulto: '5 mg una vez al día',
    dosis_nino: 'Jarabe: 1-5 años 1.25 mg/día; 6-11 años 2.5 mg/día',
    contraindicaciones: 'Alergia a desloratadina o loratadina.',
    efectos_secundarios: 'Dolor de cabeza leve. Muy bien tolerado.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '67.50-294.50 C$ (según presentación)',
    embarazo: 'Categoría C — Consultar médico'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 38 — RESPIRATORIO ADICIONAL
  // ════════════════════════════════════════════════════════
  {
    id: 64,
    nombre_es: 'Ambroxol',
    nombre_en: 'Ambroxol',
    nombres_comerciales: ['Mucosolvan','Ambroxol MK','Mucoflux','Bisolvon'],
    sinonimos: ['mucosolvan','mucoflux','bisolvon','para la tos con flema','expectorante','mucolitico','flema'],
    categoria: 'Mucolítico / Expectorante',
    uso_principal: 'Tos productiva con flema, bronquitis, EPOC, infecciones respiratorias con moco',
    dosis_adulto: '30 mg tres veces al día (tableta) o 15 mL jarabe tres veces al día',
    dosis_nino: 'Jarabe: hasta 2 años 2.5 mL dos veces al día; 2-5 años 2.5 mL tres veces; 5-12 años 5 mL tres veces',
    contraindicaciones: 'Alergia al ambroxol. No usar en menores de 2 años sin indicación médica.',
    efectos_secundarios: 'Náuseas, diarrea leve, boca seca. Generalmente bien tolerado.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '20-55 C$ (según presentación)',
    embarazo: 'Categoría B — Evitar en primer trimestre'
  },
  {
    id: 65,
    nombre_es: 'Bromhexina',
    nombre_en: 'Bromhexine',
    nombres_comerciales: ['Bisolvon','Bromhexina MK','Broncleer'],
    sinonimos: ['bisolvon','broncleer','mucolitico','para la flema','tos con flema','expectorante'],
    categoria: 'Mucolítico',
    uso_principal: 'Tos con secreciones espesas, bronquitis, sinusitis con congestión',
    dosis_adulto: '8 mg tres veces al día',
    dosis_nino: 'Jarabe: 4 mg tres veces al día (2-12 años)',
    contraindicaciones: 'Alergia a bromhexina. Precaución en úlcera péptica.',
    efectos_secundarios: 'Náuseas, malestar gastrointestinal leve.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '15-35 C$ (tabletas o jarabe)',
    embarazo: 'Categoría C — Evitar en primer trimestre'
  },
  {
    id: 180,
    nombre_es: 'Guaifenesina',
    nombre_en: 'Guaifenesin',
    nombres_comerciales: ['Robitussin','Guaifenesina MK','Humibid'],
    sinonimos: ['robitussin','expectorante','para la tos seca','para aflojar la flema','guayacolato'],
    categoria: 'Expectorante',
    uso_principal: 'Aflojar y expulsar el moco en tos seca o con poca flema, resfriado, bronquitis',
    dosis_adulto: '200-400 mg cada 4-6 horas. Tomar con mucha agua.',
    dosis_nino: 'Jarabe: según peso (consultar indicación del producto)',
    contraindicaciones: 'Alergia. Tos persistente (más de 1 semana) requiere evaluación médica.',
    efectos_secundarios: 'Náuseas, vómitos si se toma en ayunas. Beber mucha agua.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '15-40 C$ (tabletas o jarabe)',
    embarazo: 'Categoría C — Consultar médico'
  },
  {
    id: 67,
    nombre_es: 'Dextrometorfano',
    nombre_en: 'Dextromethorphan',
    nombres_comerciales: ['Robitussin DM','Dextrometorfano MK','Vick 44','DM'],
    sinonimos: ['vick 44','dm','para la tos seca','antitusivo','supresor de tos','tos sin flema'],
    categoria: 'Antitusivo (supresor de tos)',
    uso_principal: 'Tos seca irritativa que no produce flema, tos nocturna molesta',
    dosis_adulto: '15-30 mg cada 6-8 horas. NO usar si hay flema.',
    dosis_nino: 'Mayores de 6 años: 7.5-15 mg cada 6-8 horas. NO en menores de 2 años.',
    contraindicaciones: 'Tos con flema, asma, no combinar con antidepresivos IMAO. Menores de 2 años.',
    efectos_secundarios: 'Náuseas, mareo, somnolencia leve.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '20-45 C$ (tabletas o jarabe)',
    embarazo: 'Categoría C — Consultar médico'
  },
  {
    id: 68,
    nombre_es: 'Oximetazolina',
    nombre_en: 'Oxymetazoline',
    nombres_comerciales: ['Afrin','Nasivin','Oximetazolina MK','Vicks Sinex'],
    sinonimos: ['afrin','nasivin','para la nariz tapada','descongestionante nasal','spray nasal'],
    categoria: 'Descongestionante nasal tópico',
    uso_principal: 'Congestión nasal por resfriado, rinitis alérgica, sinusitis. Alivio rápido.',
    dosis_adulto: '2-3 gotas o 1-2 atomizaciones en cada fosa nasal, 2 veces al día. MÁX 5 días.',
    dosis_nino: 'Mayores de 6 años con formulación pediátrica. NO en menores de 6 años.',
    contraindicaciones: 'No usar más de 5 días (efecto rebote). Hipertensión, glaucoma. Menores de 6 años.',
    efectos_secundarios: 'Ardor nasal, congestión de rebote si se usa más de 5 días.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '30-60 C$ (atomizador)',
    embarazo: 'Categoría C — Evitar si es posible'
  },
  {
    id: 69,
    nombre_es: 'Xilometazolina',
    nombre_en: 'Xylometazoline',
    nombres_comerciales: ['Otrivine','Xilometazolina MK','Olynth'],
    sinonimos: ['otrivine','olynth','para la nariz tapada','spray nasal','congestion nasal'],
    categoria: 'Descongestionante nasal tópico',
    uso_principal: 'Congestión nasal aguda por resfriado o alergia. Alivio rápido de la obstrucción nasal.',
    dosis_adulto: '1-2 atomizaciones por fosa nasal 2-3 veces al día. MÁX 7 días. Solo mayores de 12 años.',
    dosis_nino: 'Formulación pediátrica 0.05% para 2-12 años. NO en menores de 2 años.',
    contraindicaciones: 'No más de 7 días. Hipertensión, glaucoma. Menores de 2 años.',
    efectos_secundarios: 'Ardor, picazón nasal, congestión de rebote con uso prolongado.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '25-55 C$ (atomizador)',
    embarazo: 'Categoría C — Evitar'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 39 — URINARIO / RENAL
  // ════════════════════════════════════════════════════════
  {
    id: 70,
    nombre_es: 'Fenazopiridina',
    nombre_en: 'Phenazopyridine',
    nombres_comerciales: ['Pyridium','Fenazopiridina MK','Uristat'],
    sinonimos: ['pyridium','uristat','para el ardor al orinar','dolor al orinar','infeccion urinaria ardor'],
    categoria: 'Analgésico urinario',
    uso_principal: 'Alivio del ardor, dolor y urgencia urinaria (NO trata la infección — solo alivia el síntoma)',
    dosis_adulto: '200 mg tres veces al día después de comidas. MÁX 2 días.',
    dosis_nino: 'Consultar médico',
    contraindicaciones: 'Insuficiencia renal, hepática. ADVERTENCIA: tiñe la orina de naranja/rojo (es normal).',
    efectos_secundarios: 'Orina anaranjada/roja (NORMAL, no alarmarse), náuseas. Puede manchar ropa.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '20-50 C$ (tabletas)',
    embarazo: 'Categoría B — Consultar médico'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 40 — ENZIMAS DIGESTIVAS
  // ════════════════════════════════════════════════════════
  {
    id: 84,
    nombre_es: 'Pancreatina',
    nombre_en: 'Pancreatin / Pancrelipase',
    nombres_comerciales: ['Pankreatan','Creon','Pancreatina MK','Nutrizym'],
    sinonimos: ['pankreatan','creon','enzimas digestivas','para la digestion','mala digestion','dispepsia'],
    categoria: 'Enzima digestiva',
    uso_principal: 'Insuficiencia pancreática exocrina, mala digestión de grasas, heces grasosas',
    dosis_adulto: '1-3 cápsulas con cada comida principal',
    dosis_nino: 'Bajo supervisión médica',
    contraindicaciones: 'Alergia a proteínas de porcino. Pancreatitis aguda.',
    efectos_secundarios: 'Molestia abdominal, náuseas, diarrea con dosis altas.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '50-120 C$ (cápsulas)',
    embarazo: 'Categoría C — Consultar médico'
  },
  {
    id: 76,
    nombre_es: 'Carbón Activado',
    nombre_en: 'Activated Charcoal',
    nombres_comerciales: ['Carbon activado MK','Norit','Carbophos'],
    sinonimos: ['carbon activado','para los gases','intoxicacion','diarrea con gases','norit'],
    categoria: 'Antiflatulento / Adsorbente gastrointestinal',
    uso_principal: 'Gases intestinales, flatulencia, coadyuvante en intoxicaciones (solo bajo supervisión médica)',
    dosis_adulto: '520 mg tres veces al día entre comidas',
    dosis_nino: 'Solo bajo supervisión médica para intoxicaciones',
    contraindicaciones: 'Obstrucción intestinal. Para intoxicaciones: solo bajo supervisión médica.',
    efectos_secundarios: 'Heces negras (normal), estreñimiento.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '10-25 C$ (tabletas o cápsulas)',
    embarazo: 'Categoría C — Consultar médico'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 41 — ANTIMALÁRICOS
  // ════════════════════════════════════════════════════════
  {
    id: 50,
    nombre_es: 'Cloroquina',
    nombre_en: 'Chloroquine',
    nombres_comerciales: ['Aralen','Cloroquina MK'],
    sinonimos: ['aralen','para el paludismo','malaria','antimalarico'],
    categoria: 'Antimalárico',
    uso_principal: 'Prevención y tratamiento de malaria por Plasmodium vivax',
    dosis_adulto: 'Tratamiento: 600 mg inicio, 300 mg a las 6h, 300 mg/día por 2 días más.',
    dosis_nino: '10 mg/kg inicio, 5 mg/kg a las 6h (consultar médico)',
    contraindicaciones: 'Alergia, retinopatía, epilepsia. Resistencia en algunas áreas geográficas.',
    efectos_secundarios: 'Náuseas, visión borrosa con uso prolongado, prurito (picazón).',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '20-50 C$ (tabletas)',
    embarazo: 'Categoría C — Uso permitido para malaria en embarazo'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 42 — DIABETES Y METABOLISMO AVANZADO
  // ════════════════════════════════════════════════════════
  {
    id: 301,
    nombre_es: 'Metformina',
    nombre_en: 'Metformin',
    nombres_comerciales: ['Glucophage','Dianben','Metformina MK','Glafornil'],
    sinonimos: ['glucophage','dianben','para la azucar','diabetes tipo 2','resistencia a la insulina','glafornil'],
    categoria: 'Hipoglucemiante oral (Biguanida)',
    uso_principal: 'Tratamiento de primera línea para Diabetes Tipo 2, resistencia a la insulina, Síndrome de Ovario Poliquístico (SOP).',
    dosis_adulto: '500-1000 mg 1 o 2 veces al día junto con las comidas (MÁX 2000-2550 mg/día).',
    dosis_nino: 'Aprobado en >10 años (bajo estricta supervisión endocrinológica).',
    contraindicaciones: 'Insuficiencia renal grave (TFG < 30), acidosis metabólica, alcoholismo, insuficiencia cardíaca aguda.',
    efectos_secundarios: 'Diarrea, náuseas, dolor abdominal (suele mejorar tomándola con comida y tras unas semanas). Riesgo raro de acidosis láctica.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '30-180 C$ (según presentación y liberación prolongada XR)',
    embarazo: 'Categoría B — Generalmente segura, aunque la insulina es el estándar en embarazo.'
  },
  {
    id: 302,
    nombre_es: 'Dapagliflozina',
    nombre_en: 'Dapagliflozin',
    nombres_comerciales: ['Forxiga','Dapavel','Dapagliflozina MK'],
    sinonimos: ['forxiga','para la diabetes y corazon','inhibidor sglt2','para proteger el riñon'],
    categoria: 'Hipoglucemiante (Inhibidor SGLT2)',
    uso_principal: 'Diabetes Tipo 2, Insuficiencia cardíaca crónica, Enfermedad renal crónica. Actúa eliminando azúcar por la orina.',
    dosis_adulto: '10 mg una vez al día.',
    dosis_nino: 'No recomendado en menores de 18 años.',
    contraindicaciones: 'Diabetes tipo 1 (riesgo de cetoacidosis), diálisis. Infecciones urinarias recurrentes graves.',
    efectos_secundarios: 'Infecciones urinarias o por hongos (candidiasis), deshidratación, orina frecuente.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '900-1500 C$ (28 tabletas)',
    embarazo: 'Categoría C — Evitar en 2do y 3er trimestre.'
  },
  {
    id: 303,
    nombre_es: 'Semaglutida',
    nombre_en: 'Semaglutide',
    nombres_comerciales: ['Ozempic','Rybelsus','Wegovy'],
    sinonimos: ['ozempic','rybelsus','wegovy','inyeccion para bajar de peso','inyeccion diabetes semanal','glp-1'],
    categoria: 'Agonista del receptor GLP-1',
    uso_principal: 'Diabetes Tipo 2, control de peso (obesidad clínica) y reducción de riesgo cardiovascular.',
    dosis_adulto: 'Subcutánea: 0.25 mg a 1 mg semanal (iniciar gradual). Oral (Rybelsus): 3 mg a 14 mg diarios en ayunas.',
    dosis_nino: 'Wegovy aprobado en adolescentes específicos; Ozempic solo adultos.',
    contraindicaciones: 'Antecedentes familiares de carcinoma medular de tiroides, neoplasia endocrina múltiple.',
    efectos_secundarios: 'Náuseas severas al inicio, vómitos, diarrea, dolor abdominal, pérdida de apetito rápida.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '6,000-12,000 C$ (pluma mensual o caja)',
    embarazo: 'Categoría C — Suspender al menos 2 meses antes de planear embarazo.'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 43 — CARDIOVASCULAR MODERNO (LÍPIDOS / ANTICOAGULANTES)
  // ════════════════════════════════════════════════════════
  {
    id: 304,
    nombre_es: 'Rosuvastatina',
    nombre_en: 'Rosuvastatin',
    nombres_comerciales: ['Crestor','Rovartal','Rosuvastatina MK'],
    sinonimos: ['crestor','estatina potente','para el colesterol alto','bajar colesterol malo'],
    categoria: 'Hipolipemiante (Estatina de alta intensidad)',
    uso_principal: 'Reducción agresiva de colesterol LDL, triglicéridos y prevención de eventos cardiovasculares.',
    dosis_adulto: '10-40 mg una vez al día (se puede tomar a cualquier hora, a diferencia de otras estatinas).',
    dosis_nino: 'Uso pediátrico muy restringido (hipercolesterolemia familiar).',
    contraindicaciones: 'Enfermedad hepática activa, embarazo, lactancia.',
    efectos_secundarios: 'Dolor muscular (mialgia), fatiga, elevación de enzimas hepáticas.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '250-700 C$ (30 tabletas)',
    embarazo: 'Categoría X — CONTRAINDICADO.'
  },
  {
    id: 305,
    nombre_es: 'Rivaroxaban',
    nombre_en: 'Rivaroxaban',
    nombres_comerciales: ['Xarelto','Rivaroxaban MK'],
    sinonimos: ['xarelto','anticoagulante nuevo','para trombosis','noac','para la sangre espesa'],
    categoria: 'Anticoagulante oral directo (DOAC)',
    uso_principal: 'Prevención de ACV en fibrilación auricular, tratamiento de trombosis venosa profunda y embolia pulmonar.',
    dosis_adulto: '15-20 mg una vez al día CON la comida (imprescindible para absorción).',
    dosis_nino: 'Solo bajo protocolo especializado.',
    contraindicaciones: 'Sangrado activo grave, insuficiencia hepática con coagulopatía, insuficiencia renal muy grave.',
    efectos_secundarios: 'Sangrado prolongado, moretones fáciles. No requiere controles de sangre (INR) como la warfarina.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '1,800-2,500 C$ (28 tabletas)',
    embarazo: 'Categoría C — Evitar por riesgo de hemorragia y toxicidad fetal.'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 44 — NEUROLOGÍA Y PSIQUIATRÍA DE PRIMERA LÍNEA
  // ════════════════════════════════════════════════════════
  {
    id: 306,
    nombre_es: 'Escitalopram',
    nombre_en: 'Escitalopram',
    nombres_comerciales: ['Lexapro','Dexapron','Meridian','Escitalopram MK'],
    sinonimos: ['lexapro','dexapron','para la ansiedad','para la depresion','isrs moderno'],
    categoria: 'Antidepresivo / Ansiolítico (ISRS)',
    uso_principal: 'Trastorno depresivo mayor, trastorno de ansiedad generalizada, trastorno de pánico.',
    dosis_adulto: '10-20 mg una vez al día. Iniciar con dosis de 5 mg en ansiedad para evitar agitación inicial.',
    dosis_nino: 'Aprobado >12 años bajo supervisión psiquiátrica estricta.',
    contraindicaciones: 'Uso concurrente de IMAO, prolongación del intervalo QT (corazón).',
    efectos_secundarios: 'Náuseas temporales, somnolencia o insomnio, disfunción sexual (retraso en eyaculación/anorgasmia). Efecto máximo tarda 4 semanas.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '180-600 C$ (30 tabletas)',
    embarazo: 'Categoría C — Consultar psiquiatra y obstetra.'
  },
  {
    id: 307,
    nombre_es: 'Pregabalina',
    nombre_en: 'Pregabalin',
    nombres_comerciales: ['Lyrica','Martesia','Pregabalina MK'],
    sinonimos: ['lyrica','martesia','para el nervio ciatico','dolor de nervios','neuropatia diabetica','fibromialgia'],
    categoria: 'Anticonvulsivante / Analgésico neuropático / Ansiolítico',
    uso_principal: 'Dolor neuropático periférico y central, fibromialgia, trastorno de ansiedad generalizada.',
    dosis_adulto: '75-300 mg dos veces al día. Dosis máxima 600 mg/día. (Se debe iniciar gradualmente).',
    dosis_nino: 'No recomendado en <18 años para indicaciones comunes.',
    contraindicaciones: 'Alergia. Ajustar dosis en falla renal.',
    efectos_secundarios: 'Mareos, somnolencia, aumento de peso, edema periférico (hinchazón de pies).',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '250-900 C$ (según concentración)',
    embarazo: 'Categoría C — Evitar a menos que sea estrictamente necesario.'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 45 — GASTROENTEROLOGÍA MODERNA Y RESPIRATORIO
  // ════════════════════════════════════════════════════════
  {
    id: 308,
    nombre_es: 'Esomeprazol',
    nombre_en: 'Esomeprazole',
    nombres_comerciales: ['Nexium','Esomeprazol MK','Racper'],
    sinonimos: ['nexium','para la gastritis fuerte','reflujo severo','ibp de ultima generacion'],
    categoria: 'Inhibidor de Bomba de Protones (IBP)',
    uso_principal: 'Reflujo gastroesofágico (ERGE), esofagitis erosiva, erradicación de Helicobacter pylori (en combo).',
    dosis_adulto: '20-40 mg al día, 30 minutos antes de la primera comida.',
    dosis_nino: 'Niños mayores de 1 año bajo supervisión.',
    contraindicaciones: 'Alergia. No administrar simultáneamente con atazanavir o nelfinavir.',
    efectos_secundarios: 'Dolor de cabeza, diarrea. Uso crónico (>1 año) asociado a mala absorción de calcio, magnesio y B12.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '400-800 C$ (caja 14-28 tabletas)',
    embarazo: 'Categoría C — Consultar médico.'
  },
  {
    id: 309,
    nombre_es: 'Montelukast',
    nombre_en: 'Montelukast',
    nombres_comerciales: ['Singulair','Montelukast MK','Inmuno-Bronc'],
    sinonimos: ['singulair','para el asma alergica','prevencion de asma','antialergico respiratorio'],
    categoria: 'Antagonista de receptores de leucotrienos',
    uso_principal: 'Profilaxis y tratamiento crónico del asma, rinitis alérgica estacional y perenne.',
    dosis_adulto: '10 mg una vez al día por la noche.',
    dosis_nino: '6 meses a 5 años: 4 mg. 6 a 14 años: 5 mg (tabletas masticables o granulado).',
    contraindicaciones: 'Ataques agudos de asma (no es de rescate).',
    efectos_secundarios: 'Dolor de cabeza. ADVERTENCIA: Puede causar cambios de humor o alteraciones psiquiátricas (ansiedad, pesadillas).',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '400-900 C$ (caja de 30)',
    embarazo: 'Categoría B — Generalmente seguro bajo indicación.'
  },
  {
    id: 310,
    nombre_es: 'Fosfomicina',
    nombre_en: 'Fosfomycin',
    nombres_comerciales: ['Monurol','Fosfocina'],
    sinonimos: ['monurol','sobre para la orina','infeccion urinaria dosis unica','para mal de orin rapido'],
    categoria: 'Antibiótico urinario',
    uso_principal: 'Infección del tracto urinario no complicada (cistitis aguda) en mujeres.',
    dosis_adulto: '3 gramos (1 sobre) en dosis ÚNICA, disuelto en agua, tomado preferiblemente antes de acostarse tras vaciar la vejiga.',
    dosis_nino: 'No recomendado en <12 años rutinariamente.',
    contraindicaciones: 'Insuficiencia renal grave.',
    efectos_secundarios: 'Diarrea, dolor de cabeza, náuseas (suelen ser leves y autolimitados).',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '300-500 C$ (1 sobre)',
    embarazo: 'Categoría B — Seguro y comúnmente usado en embarazo.'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 46 — PSIQUIATRÍA Y NEUROLOGÍA AVANZADA
  // ════════════════════════════════════════════════════════
  {
    id: 401,
    nombre_es: 'Sertralina',
    nombre_en: 'Sertraline',
    nombres_comerciales: ['Zoloft','Altruline','Sertralina MK','Serolux'],
    sinonimos: ['zoloft','altruline','para la depresion','para la ansiedad','isrs','serolux'],
    categoria: 'Antidepresivo (ISRS)',
    uso_principal: 'Depresión mayor, trastorno de pánico, ansiedad social, trastorno obsesivo-compulsivo (TOC).',
    dosis_adulto: '50-100 mg una vez al día (preferiblemente en la mañana).',
    dosis_nino: 'Aprobado en TOC pediátrico (>6 años) bajo estricta supervisión.',
    contraindicaciones: 'Uso concurrente de IMAO o pimozida. Trastorno bipolar no tratado (riesgo de manía).',
    efectos_secundarios: 'Insomnio o somnolencia, náuseas, disfunción sexual, temblor leve.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '200-500 C$ (30 tabletas)',
    embarazo: 'Categoría C — Considerar riesgo/beneficio con psiquiatra.'
  },
  {
    id: 402,
    nombre_es: 'Duloxetina',
    nombre_en: 'Duloxetine',
    nombres_comerciales: ['Cymbalta','Duxetin','Duloxetina MK'],
    sinonimos: ['cymbalta','duxetin','antidepresivo dolor','para fibromialgia','para neuropatia y depresion'],
    categoria: 'Antidepresivo dual (IRSN) / Analgésico',
    uso_principal: 'Depresión mayor, dolor neuropático diabético, fibromialgia, dolor musculoesquelético crónico.',
    dosis_adulto: '30-60 mg una vez al día.',
    dosis_nino: 'Solo bajo supervisión psiquiátrica.',
    contraindicaciones: 'Glaucoma de ángulo cerrado no controlado, enfermedad hepática severa.',
    efectos_secundarios: 'Náuseas severas al inicio, sudoración excesiva, boca seca, estreñimiento.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '450-800 C$ (28 cápsulas)',
    embarazo: 'Categoría C — Consultar médico.'
  },
  {
    id: 403,
    nombre_es: 'Quetiapina',
    nombre_en: 'Quetiapine',
    nombres_comerciales: ['Seroquel','Quetiazic','Quetiapina MK','Norsic'],
    sinonimos: ['seroquel','quetiazic','para dormir fuerte','antipsicotico','para esquizofrenia','para bipolaridad','norsic'],
    categoria: 'Antipsicótico atípico',
    uso_principal: 'Esquizofrenia, trastorno bipolar. En dosis bajas (25-50mg) se usa off-label para insomnio severo o ansiedad resistente.',
    dosis_adulto: 'Insomnio: 25-50 mg noche. Psiquiatría: 300-800 mg diarios.',
    dosis_nino: 'No recomendado rutinariamente.',
    contraindicaciones: 'Demencia con psicosis en ancianos (riesgo CV elevado).',
    efectos_secundarios: 'Somnolencia severa, aumento de peso, riesgo de diabetes tipo 2 con uso crónico, mareos al pararse.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '300-900 C$ (según concentración)',
    embarazo: 'Categoría C — Solo si es estrictamente necesario.'
  },
  {
    id: 404,
    nombre_es: 'Zolpidem',
    nombre_en: 'Zolpidem',
    nombres_comerciales: ['Stilnox','Somno','Zolpidem MK','Nocte'],
    sinonimos: ['stilnox','somno','pastilla para dormir','insomnio fuerte','inductor del sueno','nocte'],
    categoria: 'Hipnótico no benzodiazepínico',
    uso_principal: 'Tratamiento a corto plazo del insomnio (dificultad para iniciar el sueño).',
    dosis_adulto: '5-10 mg justo antes de acostarse. No exceder 4 semanas.',
    dosis_nino: 'CONTRAINDICADO.',
    contraindicaciones: 'Apnea del sueño, miastenia gravis, insuficiencia hepática grave. NUNCA mezclar con alcohol.',
    efectos_secundarios: 'Amnesia anterógrada, sonambulismo (comer o caminar dormido sin recordarlo), mareo matutino.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '250-600 C$ (30 tabletas)',
    embarazo: 'Categoría C — Evitar por depresión respiratoria neonatal.'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 47 — CARDIOLOGÍA AVANZADA
  // ════════════════════════════════════════════════════════
  {
    id: 405,
    nombre_es: 'Apixabán',
    nombre_en: 'Apixaban',
    nombres_comerciales: ['Eliquis'],
    sinonimos: ['eliquis','anticoagulante seguro','para arritmia','para trombosis','sangre liquida'],
    categoria: 'Anticoagulante oral directo (DOAC)',
    uso_principal: 'Prevención de embolia y ACV en fibrilación auricular. Tratamiento de Trombosis Venosa Profunda (TVP) y Tromboembolismo Pulmonar (TEP).',
    dosis_adulto: '2.5 a 5 mg dos veces al día.',
    dosis_nino: 'No recomendado.',
    contraindicaciones: 'Sangrado activo, insuficiencia hepática severa, uso de válvulas cardíacas mecánicas.',
    efectos_secundarios: 'Sangrado (pero con menor riesgo gastrointestinal que Rivaroxaban), anemia.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '2,000-3,500 C$ (60 tabletas)',
    embarazo: 'Categoría C — Evitar.'
  },
  {
    id: 406,
    nombre_es: 'Valsartán',
    nombre_en: 'Valsartan',
    nombres_comerciales: ['Diovan','Valsartan MK','Valaplex'],
    sinonimos: ['diovan','valaplex','para la presion','antihipertensivo moderno','ara2'],
    categoria: 'Antihipertensivo (ARA II)',
    uso_principal: 'Hipertensión arterial, insuficiencia cardíaca, post-infarto de miocardio.',
    dosis_adulto: '80-160 mg una vez al día o dividido en dos dosis.',
    dosis_nino: 'Aprobado en >6 años bajo supervisión.',
    contraindicaciones: 'Embarazo, falla hepática grave, uso combinado con Aliskireno en diabéticos.',
    efectos_secundarios: 'Mareo, hiperpotasemia, hipotensión. Excelente tolerancia gástrica.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '200-500 C$ (30 tabletas)',
    embarazo: 'Categoría D — CONTRAINDICADO.'
  },
  {
    id: 407,
    nombre_es: 'Bisoprolol',
    nombre_en: 'Bisoprolol',
    nombres_comerciales: ['Concor','Ziac','Bisoprolol MK','Corbis'],
    sinonimos: ['concor','corbis','para la taquicardia','para el corazon','betabloqueador cardioselectivo'],
    categoria: 'Antihipertensivo / Betabloqueador Cardioselectivo',
    uso_principal: 'Insuficiencia cardíaca crónica estable, hipertensión, cardiopatía isquémica.',
    dosis_adulto: '2.5 - 10 mg una vez al día por la mañana.',
    dosis_nino: 'No recomendado.',
    contraindicaciones: 'Bradicardia severa, asma grave (aunque es más seguro que el propranolol), bloqueo AV.',
    efectos_secundarios: 'Fatiga, extremidades frías, bradicardia, cansancio al hacer ejercicio.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '300-600 C$ (30 tabletas)',
    embarazo: 'Categoría C — Usar con precaución extrema.'
  },
  {
    id: 408,
    nombre_es: 'Espironolactona',
    nombre_en: 'Spironolactone',
    nombres_comerciales: ['Aldactone','Espironolactona MK'],
    sinonimos: ['aldactone','diuretico ahorrador de potasio','para la cirrosis','liquido en el abdomen','para el corazon'],
    categoria: 'Diurético ahorrador de potasio',
    uso_principal: 'Insuficiencia cardíaca severa, ascitis por cirrosis hepática, hiperaldosteronismo, acné hormonal (off-label).',
    dosis_adulto: '25-100 mg al día.',
    dosis_nino: 'Solo bajo estricta supervisión.',
    contraindicaciones: 'Insuficiencia renal aguda, hiperpotasemia (potasio alto en sangre).',
    efectos_secundarios: 'Crecimiento de pechos en hombres (ginecomastia), irregularidad menstrual, potasio elevado.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '150-300 C$ (30 tabletas)',
    embarazo: 'Categoría C — Evitar por potencial de feminización de fetos masculinos.'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 48 — UROLOGÍA Y DIGESTIVO AVANZADO
  // ════════════════════════════════════════════════════════
  {
    id: 409,
    nombre_es: 'Tamsulosina',
    nombre_en: 'Tamsulosin',
    nombres_comerciales: ['Flomax','Secotex','Tamsulosina MK','Aclosan'],
    sinonimos: ['flomax','secotex','para la prostata','dificultad para orinar hombres','crecimiento de prostata','aclosan'],
    categoria: 'Bloqueador Alfa-1 (Urológico)',
    uso_principal: 'Hiperplasia prostática benigna (HPB), facilita la expulsión de cálculos renales (off-label).',
    dosis_adulto: '0.4 mg una vez al día, 30 minutos después de la misma comida.',
    dosis_nino: 'CONTRAINDICADO.',
    contraindicaciones: 'Antecedentes de hipotensión ortostática, falla hepática grave.',
    efectos_secundarios: 'Mareo al pararse rápidamente, eyaculación retrógrada (semen va hacia vejiga), rinitis.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '400-800 C$ (30 cápsulas)',
    embarazo: 'Categoría B — Pero solo se usa en hombres.'
  },
  {
    id: 410,
    nombre_es: 'Trimebutina',
    nombre_en: 'Trimebutine',
    nombres_comerciales: ['Debridat','Colipan','Trimebutina MK','Libertrim'],
    sinonimos: ['debridat','colipan','libertrim','para el colon irritable','colon inflamado','espamos estomacales','dolor de colon'],
    categoria: 'Antiespasmódico / Regulador de la motilidad',
    uso_principal: 'Síndrome de Intestino Irritable (SII), cólicos abdominales, dolor por colitis.',
    dosis_adulto: '200 mg tres veces al día, 15 min antes de las comidas.',
    dosis_nino: 'Suspensión pediátrica según peso bajo indicación médica.',
    contraindicaciones: 'Alergia al componente.',
    efectos_secundarios: 'Boca seca, ligera somnolencia o dolor de cabeza (muy raros y leves).',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '180-350 C$ (30 tabletas)',
    embarazo: 'Categoría C — Evitar en primer trimestre.'
  },
  {
    id: 411,
    nombre_es: 'Domperidona',
    nombre_en: 'Domperidone',
    nombres_comerciales: ['Motilium','Domperidona MK','Domperix'],
    sinonimos: ['motilium','domperix','para los vomitos','digestion lenta','reflujo ninos','gases y pesadez'],
    categoria: 'Antiemético / Procinético',
    uso_principal: 'Alivio de náuseas y vómitos, pesadez estomacal, dispepsia.',
    dosis_adulto: '10 mg tres veces al día antes de comer. MÁX 30 mg/día por 1 semana.',
    dosis_nino: '0.25 mg/kg por dosis (solo casos estrictos, alto riesgo cardíaco).',
    contraindicaciones: 'Hemorragia gastrointestinal, tumores pituitarios, arritmias cardíacas o uso con fluconazol/macrólidos.',
    efectos_secundarios: 'Aumento de prolactina (secreción de leche), riesgo de arritmias cardíacas en dosis altas.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '150-300 C$ (30 tabletas)',
    embarazo: 'Categoría C — No recomendada.'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 49 — DERMATOLOGÍA Y ALERGIAS NUEVA GENERACIÓN
  // ════════════════════════════════════════════════════════
  {
    id: 412,
    nombre_es: 'Levocetirizina',
    nombre_en: 'Levocetirizine',
    nombres_comerciales: ['Xyzal','Degaler','Levocetirizina MK'],
    sinonimos: ['xyzal','degaler','para la alergia fuerte','picazon severa','antihistaminico moderno','rinitis cronica'],
    categoria: 'Antihistamínico (3ra generación)',
    uso_principal: 'Rinitis alérgica severa, urticaria crónica idiopática.',
    dosis_adulto: '5 mg una vez al día en la noche.',
    dosis_nino: 'Gotas/Jarabe para >6 meses (dosis exacta por pediatra).',
    contraindicaciones: 'Enfermedad renal terminal (diálisis).',
    efectos_secundarios: 'Ligera somnolencia (menor que cetirizina), boca seca, fatiga.',
    disponible_nicaragua: true,
    requiere_receta: false,
    precio_aproximado: '200-450 C$ (caja 10-30 tabletas)',
    embarazo: 'Categoría B — Seguro bajo supervisión.'
  },
  {
    id: 413,
    nombre_es: 'Isotretinoína',
    nombre_en: 'Isotretinoin',
    nombres_comerciales: ['Roaccutan','Tretiheal','Isotretinoina MK','Acnemin'],
    sinonimos: ['roaccutan','tretiheal','pastilla para acne severo','cura del acne','acnemin'],
    categoria: 'Retinoide oral',
    uso_principal: 'Acné noduloquístico severo, acné resistente a antibióticos y cremas.',
    dosis_adulto: '0.5 - 1 mg/kg/día por 4 a 6 meses (Cálculo estricto por dermatólogo).',
    dosis_nino: 'No recomendado antes de la pubertad.',
    contraindicaciones: 'EMBARAZO ABSOLUTAMENTE PROHIBIDO (Produce malformaciones gravísimas), falla hepática.',
    efectos_secundarios: 'Resequedad extrema de labios, piel y ojos. Dolor articular, elevación de colesterol/triglicéridos.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '1,200-2,500 C$ (30 cápsulas)',
    embarazo: 'Categoría X — TOTALMENTE PROHIBIDO. Exige anticoncepción doble.'
  },
  // ════════════════════════════════════════════════════════
  //  GRUPO 50 — ANTIBIÓTICOS AVANZADOS Y DIABETES MODERNAS
  // ════════════════════════════════════════════════════════
  {
    id: 414,
    nombre_es: 'Cefuroxima',
    nombre_en: 'Cefuroxime',
    nombres_comerciales: ['Zinnat','Cefur','Cefuroxima MK','Xorimax'],
    sinonimos: ['zinnat','cefur','xorimax','antibiotico 2da generacion','para infeccion fuerte','neumonia','sinusitis fuerte'],
    categoria: 'Antibiótico Cefalosporina (2da generación)',
    uso_principal: 'Infecciones respiratorias bajas (neumonía), otitis media, enfermedad de Lyme, infecciones de piel graves.',
    dosis_adulto: '250-500 mg cada 12 horas por 7-10 días.',
    dosis_nino: '15 mg/kg dos veces al día.',
    contraindicaciones: 'Alergia severa a penicilinas o cefalosporinas.',
    efectos_secundarios: 'Diarrea (común), náuseas, sobreinfección por hongos vaginales.',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '300-800 C$ (según caja y marca)',
    embarazo: 'Categoría B — Seguro en caso necesario.'
  },
  {
    id: 415,
    nombre_es: 'Vildagliptina',
    nombre_en: 'Vildagliptin',
    nombres_comerciales: ['Galvus','Galvus Met','Vildagliptina MK'],
    sinonimos: ['galvus','inhibidor dpp4','para la diabetes moderna','azucar en sangre','galvus met'],
    categoria: 'Hipoglucemiante (Inhibidor de DPP-4)',
    uso_principal: 'Diabetes Tipo 2, muy útil para evitar hipoglucemias y porque no produce aumento de peso.',
    dosis_adulto: '50 mg una o dos veces al día (frecuentemente combinada con metformina).',
    dosis_nino: 'No recomendado.',
    contraindicaciones: 'Insuficiencia hepática, insuficiencia cardíaca descompensada.',
    efectos_secundarios: 'Mareos, dolor de cabeza. Muy rara vez pancreatitis (dolor abdominal severo).',
    disponible_nicaragua: true,
    requiere_receta: true,
    precio_aproximado: '800-1,500 C$ (28 tabletas)',
    embarazo: 'Categoría C — Evitar.'
  }
];

// ═══════════════════════════════════════════════════════════════
//  🤒 SÍNTOMAS — SINÓNIMOS INCLUIDOS
// ═══════════════════════════════════════════════════════════════
export const SINTOMAS = [
  {
    id: 1,
    nombre: 'Cefalea (Dolor de cabeza)',
    categoria: 'Dolor',
    sinonimos: ['cefalea','migrana','jaqueca','dolor cabeza','cabeza me duele','me duele la cabeza','dolor en la cabeza'],
    descripcion: 'Cefalea primaria (tensional, migrañosa) o secundaria. Requiere evaluación para descartar signos de alarma neurológica (banderas rojas).',
    causas_comunes: ['Cefalea tensional','Migraña','Crisis hipertensiva','Deshidratación sistémica','Trastornos del sueño','Alteraciones refractivas (visión)'],
    cuidados_casa: [
      'Reposo en decúbito en un ambiente con baja estimulación lumínica y acústica (aislamiento sensorial por fotofobia/fonofobia).',
      'Aplicación de termoterapia fría localizada (crioterapia) en región frontal o bitemporal.',
      'Asegurar un aporte hídrico adecuado mediante ingesta de soluciones isotónicas.',
      'Evitar la exposición a pantallas y dispositivos electrónicos (reducción de estrés ocular).',
      'Administración de analgésicos de primera línea (Paracetamol/AINEs) respetando la posología máxima diaria.'
    ],
    cuando_consultar: [
      'EMERGENCIA: Cefalea súbita en estallido o "en trueno" (el peor dolor de su vida).',
      'Asociada a signos meníngeos: rigidez de nuca, fiebre alta no explicada, o confusión mental.',
      'Presencia de focalidad neurológica (debilidad en un miembro, asimetría facial, dificultad del habla).',
      'Cefalea de reciente comienzo en pacientes mayores de 50 años o con antecedentes oncológicos.',
      'Empeoramiento progresivo o refractario a la analgesia habitual tras 72 horas.'
    ],
    urgencia_default: 'BAJA',
    requiere_atencion: false
  },
  {
    id: 2,
    nombre: 'Síndrome Febril (Fiebre)',
    categoria: 'Temperatura',
    sinonimos: ['temperatura','calentura','fiebre alta','febrilis','me siento caliente','tengo fiebre','febril'],
    descripcion: 'Respuesta termorreguladora sistémica mediada por pirógenos, generalmente secundaria a procesos infecciosos o inflamatorios. Temperatura > 38.0 °C.',
    causas_comunes: ['Procesos infecciosos virales (VRS, Influenza, COVID-19)','Infecciones bacterianas (faringoamigdalitis, ITU)','Gastroenteritis aguda','Reacciones post-vacunales'],
    cuidados_casa: [
      'Vigilancia estricta de la curva térmica mediante termometría objetiva.',
      'Mantener un estado óptimo de hidratación oral para compensar las pérdidas insensibles.',
      'Aplicación de medios físicos (compresas con agua tibia en zonas de grandes vasos: cuello, axilas, ingles).',
      'Uso de antipiréticos pautados (Paracetamol/Ibuprofeno) si hay disconfort significativo, evitando la automedicación excesiva.',
      'Utilizar prendas de vestir ligeras y mantener un ambiente ventilado.'
    ],
    cuando_consultar: [
      'Temperatura sostenida > 39.5 °C resistente al tratamiento antipirético.',
      'Fiebre de evolución superior a 72 horas sin foco infeccioso claro.',
      'Aparición de exantemas (manchas en piel) purpúricos o petequiales que no desaparecen a la vitropresión.',
      'En lactantes menores de 3 meses de edad (requiere evaluación pediátrica inmediata).'
    ],
    urgencia_default: 'MEDIA',
    requiere_atencion: false
  },
  {
    id: 3,
    nombre: 'Náuseas y Emesis (Vómitos)',
    categoria: 'Digestivo',
    sinonimos: ['nausea','asco','ganas de vomitar','me dan ganas de vomitar','mareo estomacal','malestar estomago'],
    descripcion: 'Sensación inminente de expulsión del contenido gástrico, a menudo acompañada de síntomas autonómicos (diaforesis, palidez). Riesgo principal: deshidratación.',
    causas_comunes: ['Gastroenteritis aguda infecciosa','Intoxicación alimentaria','Cinetosis (mareo por movimiento)','Gestación (hiperemesis temprana)','Efecto adverso farmacológico'],
    cuidados_casa: [
      'Reposo gástrico inicial seguido de tolerancia oral fraccionada (líquidos en volúmenes pequeños cada 15-20 minutos).',
      'Dieta blanda y astringente al recuperar la tolerancia, evitando lípidos y agentes irritantes.',
      'Hidratación con Sales de Rehidratación Oral (SRO) para reposición electrolítica.',
      'Posición en sedestación o decúbito lateral para prevenir broncoaspiración si ocurre el vómito.'
    ],
    cuando_consultar: [
      'Incapacidad para tolerar la vía oral por más de 12-24 horas.',
      'Hematemesis (vómito con sangre fresca) o vómitos con aspecto de "posos de café".',
      'Signos clínicos de deshidratación severa: oliguria, sequedad de mucosas, letargia o taquicardia.',
      'Asociado a dolor abdominal agudo intenso, rigidez abdominal o fiebre alta.'
    ],
    urgencia_default: 'BAJA',
    requiere_atencion: false
  },
  {
    id: 4,
    nombre: 'Astenia / Fatiga',
    categoria: 'General',
    sinonimos: ['fatiga','debilidad','agotamiento','me siento cansado','sin energia','extenuado','sin fuerzas'],
    descripcion: 'Sensación subjetiva de falta de energía y agotamiento que no se alivia con el descanso. Puede ser un síntoma de múltiples patologías subyacentes.',
    causas_comunes: ['Síndrome de fatiga crónica', 'Anemia ferropénica o megaloblástica', 'Hipotiroidismo', 'Trastornos del sueño (apnea)', 'Depresión o ansiedad', 'Infecciones crónicas (ej. mononucleosis)'],
    cuidados_casa: [
      'Priorizar la higiene del sueño: establecer un horario regular, evitar estimulantes y pantallas antes de dormir.',
      'Asegurar una dieta nutricionalmente densa, rica en hierro, vitamina B12 y folatos.',
      'Implementar actividad física de bajo impacto de forma gradual (ej. caminatas diarias).',
      'Técnicas de manejo del estrés como meditación, mindfulness o yoga.',
      'Mantener una hidratación adecuada a lo largo del día.'
    ],
    cuando_consultar: [
      'Fatiga de más de 2-4 semanas de evolución que no mejora con medidas generales.',
      'Asociada a pérdida de peso no intencionada, fiebre persistente o sudoración nocturna.',
      'Acompañada de disnea (falta de aire), palpitaciones o dolor torácico.',
      'Si interfiere significativamente con las actividades de la vida diaria (laborales, sociales).',
      'Aparición de palidez cutánea, edemas o signos neurológicos.'
    ],
    urgencia_default: 'BAJA',
    requiere_atencion: false
  },
  {
    id: 5,
    nombre: 'Odinofagia / Faringitis (Dolor de garganta)',
    categoria: 'Respiratorio',
    sinonimos: ['garganta','dolor garganta','me duele la garganta','faringitis','amigdalitis','garganta irritada','rasquera en la garganta'],
    descripcion: 'Dolor o irritación en la faringe, a menudo exacerbado por la deglución. Causa principal son infecciones virales, pero se debe descartar faringoamigdalitis bacteriana.',
    causas_comunes: ['Faringitis viral (resfriado común, influenza)', 'Faringoamigdalitis estreptocócica (bacteriana)', 'Mononucleosis infecciosa', 'Reflujo faringolaríngeo', 'Irritantes ambientales (humo, aire seco)'],
    cuidados_casa: [
      'Realizar gargarismos con soluciones salinas tibias (1/2 cucharadita de sal en 250 ml de agua).',
      'Mantener una hidratación adecuada con líquidos tibios (infusiones, caldos).',
      'Uso de analgésicos/antiinflamatorios sistémicos (Paracetamol, Ibuprofeno).',
      'Reposo vocal relativo para disminuir la irritación mecánica.',
      'Evitar la exposición a irritantes como el humo del tabaco.'
    ],
    cuando_consultar: [
      'Dolor de garganta de alta intensidad que impide la deglución de saliva o líquidos.',
      'Presencia de exudado purulento (placas de pus) en amígdalas o fiebre > 38.5°C por más de 48h.',
      'Asociado a dificultad respiratoria (estridor) o trismo (dificultad para abrir la boca).',
      'Adenopatías cervicales (ganglios) dolorosas y de gran tamaño.',
      'Ausencia de mejoría tras 5-7 días de tratamiento sintomático.'
    ],
    urgencia_default: 'BAJA',
    requiere_atencion: false
  },
  {
    id: 6,
    nombre: 'Tos (Seca o Productiva)',
    categoria: 'Respiratorio',
    sinonimos: ['tosiendo','tos seca','tos con flema','tos persistente','no puedo dejar de toser','tos fuerte'],
    descripcion: 'Reflejo defensivo para despejar las vías respiratorias. Se clasifica en seca (irritativa) o productiva (con expectoración). Su cronicidad y características son claves diagnósticas.',
    causas_comunes: ['Infecciones virales de vía aérea superior', 'Bronquitis aguda', 'Neumonía', 'Asma / EPOC', 'Reflujo gastroesofágico (ERGE)', 'Efecto adverso de fármacos (IECA)'],
    cuidados_casa: [
      'Aumentar la ingesta de líquidos para fluidificar secreciones.',
      'Uso de humidificadores o vaporizadores para humedecer el ambiente.',
      'Para tos seca irritativa, se pueden usar antitusígenos de venta libre (Dextrometorfano) por periodos cortos.',
      'Para tos productiva, se pueden usar mucolíticos (Ambroxol) para facilitar la expectoración.',
      'Miel (en mayores de 1 año) ha demostrado ser efectiva para la tos nocturna.'
    ],
    cuando_consultar: [
      'Tos de más de 3 semanas de evolución (tos crónica).',
      'Hemoptisis (expectoración con sangre).',
      'Asociada a disnea (dificultad para respirar), sibilancias o dolor torácico pleurítico.',
      'Expectoración purulenta (amarilla/verdosa) persistente con fiebre.',
      'Tos en "ladrido de perro" en niños (sugestivo de crup).'
    ],
    urgencia_default: 'BAJA',
    requiere_atencion: false
  },
  {
    id: 7,
    nombre: 'Dolor Abdominal (Abdomen Agudo)',
    categoria: 'Digestivo',
    sinonimos: ['dolor de barriga','dolor de estomago','dolor estomacal','dolor abdomen','colicos','me duele el estomago','me duele la barriga'],
    descripcion: 'Cuadro clínico caracterizado por dolor en la región abdominal, de inicio súbito o insidioso. Puede corresponder a patología médica o requerir intervención quirúrgica de urgencia.',
    causas_comunes: ['Gastroenteritis aguda','Dispepsia o enfermedad acidopéptica','Meteorismo (acumulación de gases)','Apendicitis aguda','Cólico biliar o colecistitis','Dismenorrea'],
    cuidados_casa: [
      'Reposo físico e ingesta fraccionada de líquidos claros isotónicos.',
      'Evitar la administración de analgésicos potentes o antiespasmódicos no recetados que puedan enmascarar un cuadro quirúrgico (apendicitis).',
      'Dieta de fácil digestión, exenta de irritantes gástricos, lácteos y grasas saturadas.',
      'Aplicación de termoterapia local moderada, EXCEPTO si se sospecha proceso infeccioso/inflamatorio agudo con fiebre.'
    ],
    cuando_consultar: [
      'EMERGENCIA: Dolor abdominal severo, súbito, con abdomen en "tabla" o intolerancia al tacto (signo de rebote positivo).',
      'Migración del dolor hacia la fosa ilíaca derecha (posible cuadro apendicular).',
      'Asociado a vómitos fecaloideos o biliares persistentes, hematemesis o melena.',
      'Incapacidad absoluta para la expulsión de heces y flatos por más de 24 horas (íleo u obstrucción intestinal).'
    ],
    urgencia_default: 'MEDIA',
    requiere_atencion: false
  },
  {
    id: 8,
    nombre: 'Gastroenteritis / Cuadro Diarreico Agudo',
    categoria: 'Digestivo',
    sinonimos: ['evacuaciones liquidas','heces liquidas','soltura','vientre suelto','deposiciones frecuentes','colitis'],
    descripcion: 'Aumento en la frecuencia y disminución en la consistencia de las deposiciones. La complicación más crítica a monitorizar es la deshidratación y los desequilibrios hidroelectrolíticos.',
    causas_comunes: ['Infección viral entérica (Rotavirus, Norovirus)','Toxiinfección alimentaria bacteriana','Parasitosis intestinal (Amebiasis, Giardiasis)','Efecto adverso a antibioticoterapia'],
    cuidados_casa: [
      'Terapia de rehidratación oral (TRO) temprana y continua usando Sales de Rehidratación Oral (SRO) tras cada deposición líquida.',
      'Implementar dieta astringente (arroz, compota de manzana, pan tostado) una vez restaurada la tolerancia oral.',
      'Restricción temporal de lactosa, bebidas azucaradas hiperosmolares, cafeína y grasas.',
      'Higiene de manos estricta para evitar cadenas de transmisión feco-oral.',
      'NO utilizar fármacos inhibidores de la motilidad (Loperamida) sin indicación médica, especialmente si hay fiebre o disentería.'
    ],
    cuando_consultar: [
      'Persistencia del cuadro por más de 48 horas sin tendencia a la mejoría.',
      'Presencia de disentería (heces con sangre macroscópica o moco purulento).',
      'Aparición de signos clínicos de deshidratación grave (oliguria, enoftalmos, pliegue cutáneo positivo, alteración del sensorio).',
      'Pacientes pediátricos, geriátricos o inmunocomprometidos con alta tasa de pérdidas hídricas.'
    ],
    urgencia_default: 'BAJA',
    requiere_atencion: false
  },
  {
    id: 9,
    nombre: 'Síndrome Gripal / Influenza',
    categoria: 'Respiratorio',
    sinonimos: ['influenza','resfriado','catarro','congestion nasal','rinitis','moqueo','nariz tapada','nariz mocosa','congestionado'],
    descripcion: 'Infección viral aguda del tracto respiratorio, caracterizada por inicio súbito de fiebre, mialgias, cefalea y malestar general, además de síntomas respiratorios.',
    causas_comunes: ['Virus Influenza tipo A y B', 'Otros virus respiratorios (Parainfluenza, Adenovirus, VRS)'],
    cuidados_casa: [
      'Reposo relativo y aislamiento para evitar la propagación.',
      'Hidratación oral intensiva con agua, caldos y soluciones isotónicas.',
      'Tratamiento sintomático con antipiréticos/analgésicos (Paracetamol, Ibuprofeno).',
      'Vigilancia de signos de alarma, especialmente en poblaciones de riesgo.'
    ],
    cuando_consultar: [
      'Disnea (dificultad para respirar) o taquipnea (respiración rápida).',
      'Dolor torácico persistente o sensación de opresión.',
      'Confusión mental, mareo severo o letargia.',
      'Fiebre alta (>39°C) que no responde a antipiréticos o persiste más de 3-4 días.',
      'En grupos de alto riesgo: embarazadas, ancianos, niños pequeños, inmunocomprometidos, pacientes con comorbilidades (cardíacas, pulmonares).'
    ],
    urgencia_default: 'BAJA',
    requiere_atencion: false
  },
  {
    id: 10,
    nombre: 'Reacción Alérgica Sistémica',
    categoria: 'Inmunológico',
    sinonimos: ['alergias','reaccion alergica','urticaria','picazon','ronchas','sarpullido','estornudos','ojos llorosos','ojos rojos'],
    descripcion: 'Respuesta inmunitaria exagerada a un alérgeno, que puede manifestarse con síntomas cutáneos (urticaria), respiratorios (rinitis, asma) o sistémicos (anafilaxia).',
    causas_comunes: ['Alimentos (frutos secos, mariscos)', 'Medicamentos (penicilinas, AINEs)', 'Picaduras de himenópteros (abejas, avispas)', 'Látex', 'Aeroalérgenos (polen, ácaros)'],
    cuidados_casa: [
      'Identificación y evitación estricta del alérgeno sospechoso.',
      'Para reacciones cutáneas leves (urticaria localizada), administrar antihistamínicos orales no sedantes (Loratadina, Cetirizina).',
      'Aplicación de compresas frías en áreas de prurito intenso.'
    ],
    cuando_consultar: [
      'EMERGENCIA (Anafilaxia): Dificultad respiratoria, sibilancias, hinchazón de lengua o garganta, mareo severo o pérdida de conciencia.',
      'Urticaria generalizada que se extiende rápidamente por todo el cuerpo.',
      'Asociado a vómitos, diarrea o dolor abdominal intenso.',
      'Si la reacción ocurre tras la administración de un nuevo medicamento.'
    ],
    urgencia_default: 'BAJA',
    requiere_atencion: false
  },
  {
    id: 11,
    nombre: 'Lumbalgia / Dolor de Espalda',
    categoria: 'Dolor',
    sinonimos: ['dolor espalda','lumbalgia','dolor lumbar','me duele la espalda','espalda baja','dolor de cintura','rigidez espalda'],
    descripcion: 'Dolor localizado en la región lumbar, de origen musculoesquelético en la mayoría de los casos (lumbalgia mecánica). Es crucial descartar "banderas rojas" que sugieran patología grave.',
    causas_comunes: ['Distensión muscular o esguince ligamentoso', 'Enfermedad discal degenerativa', 'Hernia de disco', 'Estenosis espinal', 'Malas posturas o sobreesfuerzo'],
    cuidados_casa: [
      'Evitar el reposo absoluto. Mantenerse activo dentro de los límites del dolor.',
      'Aplicación de termoterapia (calor local) para relajar la musculatura.',
      'Analgésicos/AINEs (Ibuprofeno, Naproxeno) por un ciclo corto (3-5 días), siempre con comida.',
      'Ejercicios de estiramiento suave para la zona lumbar y los isquiotibiales.'
    ],
    cuando_consultar: [
      'Dolor irradiado por debajo de la rodilla, especialmente si se asocia a debilidad o pérdida de sensibilidad en la pierna (ciática compresiva).',
      'Disfunción de esfínteres (incontinencia urinaria o fecal) o "anestesia en silla de montar" (EMERGENCIA: Síndrome de cauda equina).',
      'Dolor que no mejora con reposo o empeora por la noche.',
      'Asociado a fiebre, pérdida de peso inexplicable o antecedentes de cáncer.',
      'Tras un traumatismo significativo (caída, accidente).'
    ],
    urgencia_default: 'BAJA',
    requiere_atencion: false
  },
  {
    id: 12,
    nombre: 'Mareo / Vértigo',
    categoria: 'Neurológico',
    sinonimos: ['vertigo','me siento mareado','sensacion de giro','inestabilidad','perdida de equilibrio','cabeza que da vueltas'],
    descripcion: 'Término inespecífico que puede describir presíncope (sensación de desmayo), desequilibrio, o vértigo (ilusión de movimiento rotatorio). La caracterización del síntoma es fundamental.',
    causas_comunes: ['Vértigo posicional paroxístico benigno (VPPB)', 'Hipotensión ortostática', 'Laberintitis / Neuronitis vestibular', 'Enfermedad de Ménière', 'Causas centrales (ACV, migraña vestibular)'],
    cuidados_casa: [
      'Durante un episodio agudo, acostarse en una superficie firme y evitar movimientos bruscos de la cabeza.',
      'Mantener una buena hidratación y evitar cambios posturales rápidos (levantarse lentamente).',
      'Evitar la conducción de vehículos o el manejo de maquinaria pesada.'
    ],
    cuando_consultar: [
      'Vértigo de inicio súbito y severo, especialmente si se acompaña de cefalea intensa, visión doble, dificultad para hablar o debilidad en una extremidad (signos de ACV).',
      'Asociado a dolor torácico, palpitaciones o pérdida de conciencia (síncope).',
      'Si se acompaña de hipoacusia (pérdida de audición) o acúfenos (zumbidos) de inicio súbito.',
      'Si el mareo es persistente y limita las actividades diarias.'
    ],
    urgencia_default: 'MEDIA',
    requiere_atencion: false
  },
  {
    id: 13,
    nombre: 'Dolor de pecho',
    categoria: 'Cardiovascular',
    sinonimos: ['dolor en el pecho','presion en el pecho','pecho apretado','angina','infarto','me duele el corazon','punzadas en el pecho'],
    descripcion: 'El dolor de pecho puede ir desde problemas musculares o reflujo hasta emergencias graves como un infarto cardíaco.',
    causas_comunes: ['Ataque cardíaco (infarto)','Angina de pecho','Reflujo gastroesofágico','Costocondritis (dolor muscular/costal)','Ataque de pánico o ansiedad'],
    cuidados_casa: [
      'Si es un dolor muscular (empeora al tocar o moverse), reposo y analgésicos suaves.',
      'Si está relacionado con acidez (quemazón que sube tras comer), antiácidos o posición erguida.',
      'Mantener la calma y aflojar ropa ajustada.',
      'NUNCA ignorar un dolor de pecho opresivo.'
    ],
    cuando_consultar: [
      'EMERGENCIA: Dolor que se siente como presión intensa, pesadez o que el pecho está siendo aplastado.',
      'EMERGENCIA: El dolor se irradia al brazo izquierdo, mandíbula, cuello o espalda.',
      'EMERGENCIA: Acompañado de dificultad para respirar, sudoración fría, mareo o náuseas.',
      'El dolor dura más de unos minutos o empeora con la actividad física.'
    ],
    urgencia_default: 'ALTA',
    requiere_atencion: true
  },
  {
    id: 14,
    nombre: 'Dificultad para respirar',
    categoria: 'Respiratorio',
    sinonimos: ['falta de aire','disnea','no puedo respirar','me ahogo','respiracion rapida','pecho apretado para respirar'],
    descripcion: 'Sentir que no entra suficiente aire a los pulmones. Puede ser crónico o presentarse de forma aguda.',
    causas_comunes: ['Asma o EPOC exacerbado','Infecciones respiratorias graves (Neumonía, COVID-19)','Problemas cardíacos','Ataque de pánico','Reacción alérgica grave (anafilaxia)'],
    cuidados_casa: [
      'Si tiene asma o EPOC diagnosticado, usar su inhalador de rescate (ej. Salbutamol).',
      'Sentarse en posición erguida e intentar respirar lentamente (respiración con labios fruncidos).',
      'Si es ansiedad, buscar un lugar tranquilo y concentrarse en exhalar lento.',
      'Aflojar prendas alrededor del cuello y pecho.'
    ],
    cuando_consultar: [
      'EMERGENCIA: Comienzo súbito de asfixia severa.',
      'EMERGENCIA: Labios, rostro o uñas se tornan azulados o grises (cianosis).',
      'EMERGENCIA: Acompañado de dolor opresivo en el pecho o hinchazón de cara/garganta.',
      'Si requiere usar músculos del cuello y pecho intensamente para respirar.'
    ],
    urgencia_default: 'ALTA',
    requiere_atencion: true
  },
  {
    id: 15,
    nombre: 'Ansiedad o Ataque de Pánico',
    categoria: 'Salud Mental',
    sinonimos: ['panico','nervios','mucha ansiedad','desesperacion','siento que me voy a morir','taquicardia por nervios'],
    descripcion: 'Episodios de miedo o temor intenso que desencadenan reacciones físicas severas cuando no hay peligro real.',
    causas_comunes: ['Estrés crónico o trauma','Trastorno de ansiedad generalizada','Trastorno de pánico','Consumo excesivo de cafeína o estimulantes'],
    cuidados_casa: [
      'Técnicas de respiración (ej. regla 4-7-8: inhalar 4s, sostener 7s, exhalar 8s).',
      'Enfoque sensorial (técnica 5-4-3-2-1 para conectar con el entorno).',
      'Evitar estimulantes, cafeína y alcohol.',
      'Beber agua a sorbos pequeños y descansar en un lugar seguro.'
    ],
    cuando_consultar: [
      'Es la primera vez que ocurre (los síntomas son idénticos a los de un infarto y deben descartarse problemas físicos).',
      'Los ataques son frecuentes y afectan su vida laboral o personal.',
      'Siente miedo constante a tener un nuevo ataque de pánico.',
      'Se acompaña de pensamientos de hacerse daño a sí mismo.'
    ],
    urgencia_default: 'MEDIA',
    requiere_atencion: false
  },
  {
    id: 16,
    nombre: 'Ardor al orinar',
    categoria: 'Urinario',
    sinonimos: ['mal de orin','disuria','ardor al hacer pipi','dolor al orinar','infeccion urinaria','ganas de orinar a cada rato'],
    descripcion: 'Dolor, ardor o molestia generalizada al momento de orinar. Suele indicar inflamación o infección del tracto urinario.',
    causas_comunes: ['Infección del tracto urinario (ITU / Cistitis)','Infecciones de transmisión sexual (ITS)','Cálculos renales (piedras)','Irritación por productos de higiene íntima'],
    cuidados_casa: [
      'Beber abundante agua pura para ayudar a limpiar las vías urinarias.',
      'Evitar temporalmente café, alcohol, cítricos y alimentos muy picantes.',
      'Si se receta, analgésicos urinarios (Fenazopiridina) pueden aliviar el ardor temporalmente.',
      'No aguantar las ganas de orinar.'
    ],
    cuando_consultar: [
      'Fiebre, escalofríos, náuseas o vómitos (podría indicar infección renal).',
      'Dolor intenso en la espalda baja o un costado.',
      'Sangre visible en la orina.',
      'Si los síntomas no mejoran en 24 horas o es un hombre/embarazada (requiere cultivo).'
    ],
    urgencia_default: 'MEDIA',
    requiere_atencion: false
  },
  {
    id: 17,
    nombre: 'Sarpullido o Erupción',
    categoria: 'Dermatología',
    sinonimos: ['ronchas','rash','erupcion cutanea','manchas rojas','brote en la piel','alergia en la piel'],
    descripcion: 'Cambios en el color, textura o apariencia de la piel, a menudo asociados a picazón, inflamación o descamación.',
    causas_comunes: ['Reacciones alérgicas (medicamentos, alimentos, plantas)','Infecciones virales (ej. varicela, sarampión) o fúngicas','Dermatitis por contacto','Calor o sudor (sudamina)'],
    cuidados_casa: [
      'Evitar rascarse para no causar infección bacteriana secundaria.',
      'Lavar la zona con agua fresca y jabón neutro, sin frotar bruscamente.',
      'Aplicar compresas frías, calamina o cremas hidratantes sin perfume.',
      'Para picazón fuerte, puede usar un antihistamínico oral de venta libre (Loratadina o Cetirizina).'
    ],
    cuando_consultar: [
      'EMERGENCIA: Sarpullido acompañado de dificultad para respirar, hinchazón de rostro o lengua (anafilaxia).',
      'El sarpullido cubre todo el cuerpo de manera súbita.',
      'Presencia de fiebre alta, dolor articular o malestar general extremo.',
      'Las ronchas se convierten en ampollas grandes o supuran pus.',
      'Se ve rojo oscuro/púrpura y NO desaparece al presionarlo con un vaso de vidrio.'
    ],
    urgencia_default: 'BAJA',
    requiere_atencion: false
  },
  // ════════════════════════════════════════════════════════
  //  SÍNTOMAS CRÍTICOS Y NEUROLÓGICOS (NUEVOS v9.0)
  // ════════════════════════════════════════════════════════
  {
    id: 18,
    nombre: 'Debilidad en un lado del cuerpo / Rostro caído (ACV)',
    categoria: 'Neurológico',
    sinonimos: ['derrame cerebral','acv','ictus','cara torcida','brazo dormido','no puedo hablar bien','paralisis mitad del cuerpo','lengua trabada'],
    descripcion: 'Pérdida súbita de fuerza, sensibilidad o control en la cara, brazo o pierna, usualmente de un solo lado. Es el signo cardinal de un Derrame Cerebral (ACV).',
    causas_comunes: ['Accidente Cerebrovascular Isquémico (coágulo)','Accidente Cerebrovascular Hemorrágico (derrame)','Ataque Isquémico Transitorio (AIT)'],
    cuidados_casa: [
      'NO dar aspirina ni ningún medicamento por boca.',
      'NO dar de comer ni beber (riesgo de asfixia).',
      'Anotar la hora EXACTA en que iniciaron los síntomas.',
      'Acostar a la persona con la cabeza ligeramente elevada.'
    ],
    cuando_consultar: [
      'EMERGENCIA ABSOLUTA: Llamar a una ambulancia o ir al hospital INMEDIATAMENTE.',
      'Usa la prueba FAST: Face (Cara caída), Arms (Brazo débil), Speech (Habla rara), Time (Tiempo de actuar).',
      'Cada minuto cuenta para salvar el cerebro.'
    ],
    urgencia_default: 'ALTA',
    requiere_atencion: true
  },
  {
    id: 19,
    nombre: 'Palpitaciones o Taquicardia',
    categoria: 'Cardiovascular',
    sinonimos: ['el corazon me late muy rapido','corazon acelerado','brincos en el pecho','arritmia','pulsaciones fuertes','siento el corazon en la garganta'],
    descripcion: 'Sensación de que el corazón late muy rápido, fuerte, o de manera irregular.',
    causas_comunes: ['Ansiedad / Estrés','Consumo alto de cafeína o energizantes','Arritmias cardíacas (Fibrilación auricular)','Hipertiroidismo','Fiebre o Deshidratación'],
    cuidados_casa: [
      'Siéntate, respira profundo y trata de relajarte.',
      'Bebe un vaso de agua fría.',
      'Realiza maniobras de Valsalva (tapar nariz, boca y hacer fuerza como para inflar un globo).',
      'Evita café, tabaco, alcohol y descongestionantes nasales.'
    ],
    cuando_consultar: [
      'Acompañado de dolor en el pecho, falta de aire o mareos.',
      'Pérdida del conocimiento (desmayo).',
      'Si las palpitaciones duran más de unos minutos o son un problema nuevo.',
      'Si tienes antecedentes de enfermedad del corazón.'
    ],
    urgencia_default: 'MEDIA',
    requiere_atencion: false
  },
  {
    id: 20,
    nombre: 'Heces con sangre o heces negras (Sangrado Digestivo)',
    categoria: 'Digestivo',
    sinonimos: ['sangre al defecar','heces oscuras','melena','pupú con sangre','sangrado rectal','caca negra como alquitran'],
    descripcion: 'Presencia de sangre roja viva al ir al baño, o evacuaciones de color negro pegajoso y muy maloliente, indicativo de sangre digerida.',
    causas_comunes: ['Hemorroides o fisuras anales (sangre roja viva al limpiarse)','Úlcera gástrica sangrante (heces negras)','Uso crónico de Ibuprofeno/Aspirina','Tumores o pólipos intestinales','Varices esofágicas'],
    cuidados_casa: [
      'Suspender inmediatamente medicamentos como Aspirina, Ibuprofeno o Naproxeno.',
      'Evitar esfuerzos físicos pesados.',
      'Si tomaste Bismuto (Pepto-Bismol) o Hierro, las heces negras son normales y no indican sangrado.'
    ],
    cuando_consultar: [
      'EMERGENCIA: Heces negras abundantes, pegajosas como alquitrán (Melena).',
      'EMERGENCIA: Vómitos con sangre o con aspecto de "borra de café".',
      'Acompañado de mareos al pararse, palidez extrema, sudoración fría o debilidad severa.',
      'El sangrado rectal es continuo o en forma de coágulos.'
    ],
    urgencia_default: 'ALTA',
    requiere_atencion: true
  },
  {
    id: 21,
    nombre: 'Síncope o Desmayo',
    categoria: 'Neurológico',
    sinonimos: ['desmayo','perdida de conocimiento','se cayo redondo','sincope','me fui a negro','se desvanecio','lipotimia'],
    descripcion: 'Pérdida temporal del conocimiento y postura, con recuperación rápida, causada por una disminución del flujo de sangre al cerebro.',
    causas_comunes: ['Reacción vasovagal (ver sangre, dolor, calor extremo)','Deshidratación','Bajón rápido de azúcar o presión arterial','Arritmias cardíacas graves','Ponerse de pie muy rápido'],
    cuidados_casa: [
      'Acostar a la persona y levantarle las piernas sobre el nivel del corazón.',
      'Aflojar prendas apretadas en cuello y cintura.',
      'Si ya despertó, NO levantarlo de inmediato. Que permanezca acostado 10-15 minutos.',
      'Darle líquidos azucarados solo si está TOTALMENTE consciente.'
    ],
    cuando_consultar: [
      'EMERGENCIA: Si no recupera el conocimiento después de 1-2 minutos.',
      'Si el desmayo ocurrió mientras hacía ejercicio o deporte.',
      'Si tiene antecedentes del corazón, o hubo dolor de pecho/palpitaciones antes de caer.',
      'Si al caer sufrió un golpe fuerte en la cabeza o hay convulsiones.'
    ],
    urgencia_default: 'ALTA',
    requiere_atencion: true
  },
  {
    id: 22,
    nombre: 'Convulsiones',
    categoria: 'Neurológico',
    sinonimos: ['ataque epileptico','convulsionando','temblor incontrolable del cuerpo','se esta trabando','echando espuma por la boca'],
    descripcion: 'Episodio de actividad eléctrica anormal en el cerebro que causa movimientos espasmódicos incontrolables, pérdida del conocimiento y a veces incontinencia.',
    causas_comunes: ['Epilepsia conocida','Fiebre muy alta en niños (convulsiones febriles)','Infección cerebral (meningitis)','Traumatismo craneal severo','Abstinencia de alcohol/drogas'],
    cuidados_casa: [
      'NO meter nada en la boca (ni cucharas, ni dedos, no se va a tragar la lengua).',
      'Proteger la cabeza de la persona poniendo algo suave debajo (almohada, chaqueta).',
      'Aflojar la ropa alrededor del cuello y retirar objetos peligrosos del área.',
      'Voltear a la persona de lado una vez que paren los temblores para que pueda respirar bien.',
      'Tomar el tiempo de la crisis.'
    ],
    cuando_consultar: [
      'EMERGENCIA: La convulsión dura más de 5 minutos.',
      'EMERGENCIA: Es la primera vez que la persona sufre una convulsión en su vida.',
      'Viene una crisis tras otra sin recuperar la conciencia entre ellas.',
      'La persona está embarazada, tiene diabetes o se golpeó gravemente.'
    ],
    urgencia_default: 'ALTA',
    requiere_atencion: true
  },
  {
    id: 23,
    nombre: 'Pérdida de Visión Repentina',
    categoria: 'Oftalmológico',
    sinonimos: ['deje de ver de un ojo','vision borrosa de la nada','ceguera temporal','mancha negra en el ojo','luces y sombras repentinas','cortina negra en el ojo'],
    descripcion: 'Pérdida brusca y sin dolor de la visión en uno o ambos ojos, o aparición de una "cortina negra" que tapa parte del campo visual.',
    causas_comunes: ['Desprendimiento de retina','Derrame cerebral (ACV) visual','Migraña con aura (luces en zigzag que pasan en 30 min)','Neuropatía isquémica óptica','Glaucoma agudo (con dolor severo)'],
    cuidados_casa: [
      'Evitar frotarse el ojo.',
      'No manejar ni operar maquinaria.',
      'Si se acompaña de dolor de cabeza pulsátil que ya has tenido antes (migraña), espera 30 minutos recostado en la oscuridad.'
    ],
    cuando_consultar: [
      'EMERGENCIA: Es un síntoma crítico. Si la pérdida de visión no se recupera en minutos, debes ir al servicio de urgencias u oftalmología INMEDIATAMENTE.',
      'Sensación de ver una "cortina" o "telaraña" fija cayendo sobre el ojo (riesgo de desprendimiento de retina).',
      'Acompañado de debilidad, dificultad para hablar o desequilibrio (Riesgo de ACV).'
    ],
    urgencia_default: 'ALTA',
    requiere_atencion: true
  },
  {
    id: 24,
    nombre: 'Dolor de oído intenso',
    categoria: 'Otorrino',
    sinonimos: ['otalgia','me duele el oido','punzadas en la oreja','oido tapado con dolor','infeccion de oido','zumbido con dolor'],
    descripcion: 'Dolor severo, pulsátil o agudo dentro del canal auditivo. Es muy común en niños pero también afecta a adultos.',
    causas_comunes: ['Otitis media aguda (infección bacteriana)','Otitis externa (oído de nadador)','Tapón de cerumen impactado','Problemas en la articulación de la mandíbula (ATM)','Cambios de presión (vuelos)'],
    cuidados_casa: [
      'Tomar Ibuprofeno o Paracetamol para controlar el dolor fuerte.',
      'Aplicar un paño tibio sobre la oreja externa.',
      'Masticar chicle o bostezar si el dolor fue causado por un viaje en avión.',
      'NO introducir hisopos (cotonetes), llaves ni ningún objeto en el oído.',
      'NO aplicar gotas caseras de aceite o ajo si no sabe si el tímpano está perforado.'
    ],
    cuando_consultar: [
      'Sale pus, sangre o un líquido maloliente del oído (tímpano perforado).',
      'El dolor es insoportable o viene acompañado de fiebre alta, mareos extremos o pérdida de audición.',
      'Hinchazón o enrojecimiento severo DETRÁS de la oreja (riesgo de mastoiditis).',
      'En niños menores de 6 meses con llanto incontrolable.'
    ],
    urgencia_default: 'MEDIA',
    requiere_atencion: false
  },
  // ════════════════════════════════════════════════════════
  //  SÍNTOMAS ADICIONALES Y ESPECIALIDADES (NUEVOS v10.0)
  // ════════════════════════════════════════════════════════
  {
    id: 25,
    nombre: 'Traumatismo Craneoencefálico (Golpe en la cabeza)',
    categoria: 'Neurológico',
    sinonimos: ['golpe en la cabeza','caida de cabeza','chichon','trauma craneal','tec','herida en el cuero cabelludo'],
    descripcion: 'Impacto directo sobre el cráneo. Varía desde un traumatismo leve (contusión simple) hasta lesiones intracraneales severas con riesgo vital.',
    causas_comunes: ['Caídas accidentales','Accidentes de tránsito','Golpes contusos en deportes','Agresiones físicas'],
    cuidados_casa: [
      'Reposo absoluto con la cabeza ligeramente elevada a 30 grados.',
      'Aplicación de crioterapia (hielo) local envuelto en un paño sobre el área del impacto por 15-20 minutos para reducir el edema subcutáneo.',
      'Observación neurológica estrecha por un familiar durante las primeras 24-48 horas, despertando al paciente cada 3 horas para verificar respuesta.',
      'Administración exclusiva de Paracetamol para el dolor. EVITAR AINEs (Ibuprofeno/Aspirina) por riesgo de sangrado.'
    ],
    cuando_consultar: [
      'EMERGENCIA: Pérdida del estado de conciencia, sin importar su duración.',
      'EMERGENCIA: Vómitos recurrentes o en "proyectil" sin náuseas previas.',
      'Presencia de anisocoria (pupilas de distinto tamaño), visión doble o alteraciones del habla.',
      'Amnesia del evento, confusión severa, agresividad inusual o somnolencia profunda.',
      'Salida de líquido claro o sangre por los oídos o la nariz (rinorrea/otorrea).'
    ],
    urgencia_default: 'ALTA',
    requiere_atencion: true
  },
  {
    id: 26,
    nombre: 'Cólico Nefrítico (Dolor agudo en espalda/flanco)',
    categoria: 'Urología',
    sinonimos: ['dolor de rinon','colico renal','piedra en el rinon','calculo renal','dolor en el flanco','dolor lumbar intenso'],
    descripcion: 'Dolor paroxístico, de intensidad severa e intermitente, usualmente localizado en la región lumbar o fosa renal, con irradiación hacia el abdomen anterior o genitales.',
    causas_comunes: ['Litiasis renal (Cálculos/Piedras en el riñón)','Infección severa del tracto urinario superior (Pielonefritis)','Obstrucción ureteral aguda'],
    cuidados_casa: [
      'Reposo físico en posición antiálgica (la que genere menor disconfort, usualmente posición fetal).',
      'Aplicación de termoterapia (calor local) en la región lumbar afectada para ayudar a relajar la musculatura ureteral.',
      'Aumento prudente de la ingesta hídrica (solo si el paciente no presenta náuseas ni vómitos activos).',
      'Uso de analgésicos/antiespasmódicos pautados si ya cuenta con diagnóstico médico previo.'
    ],
    cuando_consultar: [
      'Dolor incapacitante refractario a la analgesia ambulatoria.',
      'Presencia de hematuria macroscópica (orina de color francamente rojo o sanguinolento).',
      'Asociado a síndrome febril alto y escalofríos (sugestivo de pionefrosis o sepsis urinaria, requiere ATB IV).',
      'Anuria (ausencia total de emisión de orina) prolongada.'
    ],
    urgencia_default: 'ALTA',
    requiere_atencion: true
  },
  {
    id: 27,
    nombre: 'Hemorragia Nasal (Epistaxis)',
    categoria: 'Otorrinolaringología',
    sinonimos: ['sangrado de nariz','epistaxis','sangre por la nariz','hemorragia nasal'],
    descripcion: 'Pérdida de sangre proveniente de las fosas nasales, usualmente secundaria a la ruptura del plexo vascular de Kiesselbach (zona anterior).',
    causas_comunes: ['Traumatismo digital (rascado)','Resequedad de la mucosa nasal','Crisis hipertensivas','Rinitis alérgica severa','Uso de anticoagulantes'],
    cuidados_casa: [
      'Mantener la calma. Sentarse con la cabeza INCLINADA HACIA ADELANTE (no hacia atrás, para evitar tragar sangre y vomitar).',
      'Ejercer compresión digital firme y continua en la porción blanda (cartilaginosa) de la nariz por 10 a 15 minutos exactos sin soltar.',
      'Aplicar compresas frías en el dorso nasal o nuca para inducir vasoconstricción.',
      'Una vez cedido el sangrado, evitar sonarse la nariz, realizar esfuerzos físicos o consumir bebidas muy calientes por 24 horas.'
    ],
    cuando_consultar: [
      'Sangrado activo profuso que no cede tras 20-30 minutos de compresión digital correcta.',
      'Epistaxis en pacientes sometidos a terapia anticoagulante (Warfarina, Rivaroxaban).',
      'Sangrado masivo con coágulos que fluye predominantemente hacia la garganta (epistaxis posterior).',
      'Acompañado de palidez extrema, sudoración, mareos severos o palpitaciones (compromiso hemodinámico).'
    ],
    urgencia_default: 'MEDIA',
    requiere_atencion: false
  },
  {
    id: 28,
    nombre: 'Quemadura Térmica Localizada',
    categoria: 'Dermatología',
    sinonimos: ['quemada','quemadura con agua hirviendo','quemadura de sol fuerte','ardor por fuego','ampolla por quemadura'],
    descripcion: 'Lesión de los tejidos tegumentarios inducida por transferencia aguda de energía térmica (fuego, líquidos hirvientes, objetos calientes o fricción).',
    causas_comunes: ['Accidentes domésticos con líquidos hirviendo (escaldadura)','Contacto con superficies calientes (planchas, escapes)','Fuego directo','Exposición solar extrema'],
    cuidados_casa: [
      'ENFRIAMIENTO INMEDIATO: Irrigar la zona con abundante agua corriente a temperatura ambiente durante 15 a 20 minutos ininterrumpidos.',
      'Retirar ropa, joyas o anillos cercanos al área antes de que inicie el edema (hinchazón), salvo que la ropa esté adherida a la piel.',
      'Cubrir la lesión con un apósito estéril, gasa o paño limpio y seco sin apretar.',
      'NO aplicar remedios caseros (pasta dental, aceites, mostaza, café) ya que favorecen la infección y profundizan el daño celular.',
      'NO romper ni puncionar las ampollas (flictenas) formadas.'
    ],
    cuando_consultar: [
      'EMERGENCIA: Quemaduras que comprometan la vía aérea (rostro, cuello), genitales o articulaciones mayores.',
      'Si la quemadura es circunferencial (rodea completamente un brazo, pierna o el torso).',
      'Quemaduras de tercer grado (piel de aspecto blanco coriáceo, acartonado o carbonizado, usualmente indoloras).',
      'Si la extensión afecta un área mayor a la palma de la mano del paciente (especialmente en niños y ancianos).'
    ],
    urgencia_default: 'MEDIA',
    requiere_atencion: true
  },
  {
    id: 29,
    nombre: 'Sangrado Transvaginal Anormal',
    categoria: 'Ginecología',
    sinonimos: ['hemorragia vaginal','sangrado ginecologico','regla muy abundante','sangrado en embarazo','sangre fuera del periodo'],
    descripcion: 'Cualquier pérdida hemática a través de la vagina que difiera del patrón menstrual fisiológico habitual, o que ocurra durante cualquier etapa de la gestación.',
    causas_comunes: ['Alteraciones hormonales (SOP, perimenopausia)','Miomatosis uterina','Amenaza de aborto / Complicaciones obstétricas','Efecto adverso a anticonceptivos'],
    cuidados_casa: [
      'Reposo pélvico absoluto (abstención de relaciones sexuales).',
      'Reposo físico relativo en decúbito para monitorización del flujo.',
      'Utilizar exclusivamente toallas sanitarias externas (NO tampones ni copas menstruales) para permitir la cuantificación objetiva del sangrado.',
      'Monitoreo clínico del paciente buscando signos de hipotensión (mareo al ponerse en pie, palidez).'
    ],
    cuando_consultar: [
      'EMERGENCIA: Cualquier sangrado transvaginal en una paciente gestante o con sospecha de embarazo.',
      'Sangrado activo y profuso que satura completamente más de una toalla sanitaria o apósito por hora, durante 2 horas consecutivas.',
      'Expulsión de coágulos de gran tamaño (mayores a 3-4 centímetros).',
      'Acompañado de dolor pélvico lancinante, fiebre, mal olor o lipotimia (desmayo).'
    ],
    urgencia_default: 'ALTA',
    requiere_atencion: true
  },
  {
    id: 30,
    nombre: 'Conjuntivitis Aguda / Ojo Rojo',
    categoria: 'Oftalmología',
    sinonimos: ['ojo rojo','infeccion en el ojo','conjuntivitis','secrecion ocular','lagañas','ojo pegado','picazon en el ojo'],
    descripcion: 'Proceso inflamatorio o infeccioso de la conjuntiva bulbar y tarsal. Se presenta con hiperemia (enrojecimiento), sensación de cuerpo extraño y secreción.',
    causas_comunes: ['Conjuntivitis bacteriana (secreción purulenta espesa)','Conjuntivitis viral (secreción acuosa, usualmente bilateral)','Conjuntivitis alérgica (prurito intenso)','Exposición a irritantes químicos o polvo'],
    cuidados_casa: [
      'Lavado ocular frecuente con solución salina estéril o lágrimas artificiales libres de preservantes.',
      'Aplicación de compresas frías limpias sobre los párpados cerrados para mitigar la inflamación y el edema.',
      'Higiene estricta: lavado de manos continuo y uso de toallas de papel desechables para evitar el contagio al otro ojo o a terceros.',
      'NO frotar el globo ocular ni automedicarse con colirios que contengan corticosteroides (puede agravar severamente úlceras virales).'
    ],
    cuando_consultar: [
      'Asociado a dolor ocular severo y profundo (no solo sensación de arenilla superficial).',
      'Pérdida súbita o disminución de la agudeza visual (visión borrosa que no mejora con el parpadeo).',
      'Fotofobia intensa (intolerancia extrema a la luz).',
      'Presencia de asimetría pupilar (una pupila más dilatada que la otra) o antecedente de traumatismo/impacto en el ojo.'
    ],
    urgencia_default: 'BAJA',
    requiere_atencion: false
  },
  {
    id: 31,
    nombre: 'Insomnio',
    categoria: 'Salud Mental / Neurológico',
    sinonimos: ['no puedo dormir', 'dificultad para dormir', 'despertarse en la noche', 'sueño no reparador', 'problemas de sueño'],
    descripcion: 'Dificultad persistente para iniciar el sueño, mantenerlo, o la sensación de que el sueño no es reparador, resultando en un deterioro del funcionamiento diurno.',
    causas_comunes: ['Mala higiene del sueño', 'Estrés, ansiedad o depresión', 'Dolor crónico', 'Consumo de estimulantes (cafeína, nicotina)', 'Trastornos médicos (apnea del sueño, síndrome de piernas inquietas)'],
    cuidados_casa: [
      'Establecer una rutina de sueño regular, acostándose y levantándose a la misma hora todos los días, incluso fines de semana.',
      'Optimizar el ambiente del dormitorio: oscuro, silencioso y fresco.',
      'Evitar cafeína, alcohol y comidas pesadas al menos 4-6 horas antes de acostarse.',
      'Limitar el uso de pantallas (teléfonos, tabletas, TV) al menos una hora antes de dormir.',
      'Realizar actividades relajantes antes de dormir, como leer un libro, meditar o tomar un baño tibio.'
    ],
    cuando_consultar: [
      'El insomnio dura más de 3-4 semanas y afecta significativamente su calidad de vida, trabajo o seguridad.',
      'Se acompaña de síntomas de depresión o ansiedad severa.',
      'Su pareja reporta que usted ronca fuertemente, deja de respirar o se mueve mucho durante la noche (sospecha de apnea del sueño).',
      'Si depende de alcohol o medicamentos no recetados para poder dormir.'
    ],
    urgencia_default: 'BAJA',
    requiere_atencion: false
  },
  {
    id: 32,
    nombre: 'Dolor Articular / Artralgia',
    categoria: 'Musculoesquelético / Reumatología',
    sinonimos: ['dolor de articulaciones', 'me duelen las coyunturas', 'artritis', 'dolor en rodillas', 'dolor en manos', 'artralgia'],
    descripcion: 'Dolor localizado en una o más articulaciones. Puede ser inflamatorio (con hinchazón, calor y enrojecimiento) o no inflamatorio. Su patrón es clave para el diagnóstico.',
    causas_comunes: ['Osteoartritis (desgaste)', 'Artritis reumatoide (autoinmune)', 'Gota (depósito de cristales)', 'Lesiones traumáticas (esguinces)', 'Infecciones virales (Chikungunya, Dengue)'],
    cuidados_casa: [
      'Reposo relativo de la articulación afectada durante las fases agudas.',
      'Aplicación de frío (crioterapia) en las primeras 48h de una lesión aguda para reducir la inflamación.',
      'Aplicación de calor (termoterapia) para dolores crónicos musculares o rigidez.',
      'Uso de analgésicos/AINEs de venta libre (Paracetamol, Ibuprofeno) por ciclos cortos.'
    ],
    cuando_consultar: [
      'Dolor articular asociado a hinchazón, enrojecimiento y calor intenso en la articulación (signos de artritis séptica o gota).',
      'Dolor que se acompaña de fiebre, malestar general o erupción cutánea.',
      'Incapacidad para mover la articulación o soportar peso sobre ella.',
      'Rigidez matutina que dura más de 30 minutos (sugestivo de artritis inflamatoria).',
      'Dolor que afecta múltiples articulaciones de forma simétrica (ej. ambas manos).'
    ],
    urgencia_default: 'MEDIA',
    requiere_atencion: false
  },
  {
    id: 33,
    nombre: 'Estreñimiento / Constipación',
    categoria: 'Digestivo',
    sinonimos: ['no puedo evacuar', 'estreñido', 'constipacion', 'dificultad para defecar', 'heces duras', 'no voy al baño'],
    descripcion: 'Disminución en la frecuencia de las deposiciones (típicamente < 3 por semana) o dificultad para evacuar, con heces duras y esfuerzo excesivo.',
    causas_comunes: ['Baja ingesta de fibra y líquidos', 'Sedentarismo', 'Efecto secundario de medicamentos (opioides, antidepresivos)', 'Hipotiroidismo', 'Síndrome de Intestino Irritable (SII-C)'],
    cuidados_casa: [
      'Aumentar gradualmente la ingesta de fibra dietética (frutas, verduras, legumbres, cereales integrales) hasta 25-30 gramos/día.',
      'Asegurar una ingesta hídrica adecuada (al menos 2 litros de agua al día).',
      'Realizar actividad física regular para estimular la motilidad intestinal.',
      'Establecer un hábito defecatorio, intentando ir al baño a la misma hora cada día.'
    ],
    cuando_consultar: [
      'Estreñimiento de inicio reciente y persistente, especialmente en mayores de 50 años.',
      'Asociado a sangrado rectal, heces negras (melena) o pérdida de peso inexplicable.',
      'Acompañado de dolor abdominal severo y distensión.',
      'Si no hay mejoría tras 2-3 semanas de cambios en la dieta y estilo de vida.',
      'Alternancia de estreñimiento con episodios de diarrea.'
    ],
    urgencia_default: 'BAJA',
    requiere_atencion: false
  },
  {
    id: 34,
    nombre: 'Urticaria / Ronchas',
    categoria: 'Dermatología / Alergias',
    sinonimos: ['ronchas', 'habones', 'picazon intensa', 'brote en la piel', 'alergia cutanea'],
    descripcion: 'Aparición de habones (ronchas) eritematosos, edematosos y pruriginosos en la piel. Las lesiones son evanescentes, es decir, aparecen y desaparecen en menos de 24 horas.',
    causas_comunes: ['Reacción alérgica a alimentos o medicamentos', 'Infecciones virales', 'Estrés', 'Urticaria física (por frío, presión, sol)', 'Urticaria crónica idiopática'],
    cuidados_casa: [
      'Administración de antihistamínicos orales no sedantes (Loratadina, Cetirizina, Fexofenadina).',
      'Aplicación de compresas frías o loción de calamina para aliviar el prurito.',
      'Evitar rascarse para no provocar lesiones secundarias.',
      'Evitar factores desencadenantes conocidos (calor, alcohol, AINEs).'
    ],
    cuando_consultar: [
      'EMERGENCIA: Si la urticaria se acompaña de angioedema (hinchazón de labios, párpados, lengua) o dificultad para respirar (anafilaxia).',
      'Si las lesiones individuales persisten en el mismo lugar por más de 24 horas (sospecha de vasculitis urticarial).',
      'Si se asocia a fiebre, dolor articular o malestar general.',
      'Si la urticaria es recurrente o dura más de 6 semanas (urticaria crónica).'
    ],
    urgencia_default: 'MEDIA',
    requiere_atencion: false
  },
  {
    id: 35,
    nombre: 'Pérdida de Peso Inexplicable',
    categoria: 'General / Endocrinología / Oncología',
    sinonimos: ['adelgazar sin querer', 'perder peso sin dieta', 'bajar de peso rapido', 'estoy muy flaco'],
    descripcion: 'Pérdida de peso no intencionada, clínicamente significativa (generalmente >5% del peso corporal en 6-12 meses), que no puede ser explicada por cambios en la dieta o actividad física.',
    causas_comunes: ['Neoplasias (cáncer)', 'Hipertiroidismo', 'Diabetes mellitus no controlada', 'Enfermedades malabsortivas (celiaquía)', 'Infecciones crónicas (VIH, tuberculosis)', 'Depresión severa'],
    cuidados_casa: [
      'Llevar un registro detallado de la ingesta de alimentos y del peso corporal semanalmente.',
      'Asegurar una ingesta calórica y proteica adecuada.',
      'No iniciar suplementos sin una evaluación médica previa.'
    ],
    cuando_consultar: [
      'TODA pérdida de peso inexplicable y significativa requiere una evaluación médica completa para descartar patologías graves.',
      'Si se acompaña de otros síntomas de alarma como fatiga extrema, sudoración nocturna, fiebre, cambios en el hábito intestinal o sangrados.',
      'Si hay presencia de masas o ganglios palpables.'
    ],
    urgencia_default: 'ALTA',
    requiere_atencion: true
  },
  {
    id: 36,
    nombre: 'Sudoración Nocturna (Diaforesis)',
    categoria: 'General / Infeccioso / Oncología',
    sinonimos: ['sudar de noche', 'diaforesis nocturna', 'pijama mojada', 'sudores frios de noche'],
    descripcion: 'Episodios recurrentes de sudoración excesiva durante el sueño, tan intensos que pueden empapar la ropa de cama y requerir un cambio. Es un síntoma constitucional importante.',
    causas_comunes: ['Linfoma u otras neoplasias', 'Tuberculosis', 'Infección por VIH', 'Menopausia', 'Hipertiroidismo', 'Efecto secundario de medicamentos (antidepresivos)'],
    cuidados_casa: [
      'Mantener el dormitorio fresco y bien ventilado.',
      'Usar ropa de cama y pijamas de materiales transpirables como el algodón.',
      'Evitar el consumo de alcohol, cafeína y comidas picantes antes de acostarse.'
    ],
    cuando_consultar: [
      'TODA sudoración nocturna persistente y sin causa obvia (como un ambiente caluroso) debe ser evaluada por un médico.',
      'Si se acompaña de fiebre, pérdida de peso inexplicable o fatiga persistente (Síntomas B).',
      'Si hay presencia de ganglios linfáticos inflamados (adenopatías).',
      'Si es de inicio reciente y no está relacionada con la menopausia.'
    ],
    urgencia_default: 'ALTA',
    requiere_atencion: true
    },
    {
      id: 37,
      nombre: 'Fiebre con Dolor Articular/Muscular (Sospecha de Arbovirosis)',
      categoria: 'Infeccioso / Tropical',
      sinonimos: ['dengue', 'chikungunya', 'zika', 'fiebre rompehuesos', 'dolor de huesos con fiebre', 'dolor detras de los ojos', 'brote con fiebre'],
      descripcion: 'Cuadro febril agudo típico de zonas endémicas, transmitido por el mosquito Aedes aegypti. Se caracteriza por fiebre alta, cefalea severa, dolor retroocular y mialgias/artralgias incapacitantes.',
      causas_comunes: ['Dengue', 'Chikungunya', 'Zika', 'Otras infecciones virales sistémicas'],
      cuidados_casa: [
        'Reposo absoluto en cama y uso de mosquitero para evitar la propagación a familiares.',
        'Hidratación agresiva con Sales de Rehidratación Oral (SRO) o suero, mínimo 2 a 3 litros al día.',
        'Controlar la fiebre ÚNICAMENTE con Paracetamol y medios físicos (paños de agua tibia).',
        'ESTRICTAMENTE PROHIBIDO el uso de AINEs (Ibuprofeno, Aspirina, Naproxeno, Diclofenaco) o inyecciones intramusculares por alto riesgo de hemorragia.'
      ],
      cuando_consultar: [
        'Aparición de SIGNOS DE ALARMA (suelen ocurrir cuando baja la fiebre): dolor abdominal intenso y continuo.',
        'Vómitos persistentes o imposibilidad de retener líquidos.',
        'Sangrado de encías, nariz, vómitos con sangre o heces oscuras.',
        'Somnolencia extrema, letargo o irritabilidad.',
        'Dificultad para respirar o acumulación de líquidos.'
      ],
      urgencia_default: 'ALTA',
      requiere_atencion: true
    },
    {
      id: 38,
      nombre: 'Odontalgia (Dolor de Muela / Diente)',
      categoria: 'Odontología',
      sinonimos: ['dolor de muela', 'dolor de diente', 'caries', 'hinchazon en la cara', 'absceso dental', 'muela picada', 'flemón'],
      descripcion: 'Dolor agudo originado en las estructuras dentales o tejidos de soporte (periodonto), generalmente debido a la inflamación o infección de la pulpa dental.',
      causas_comunes: ['Caries dental profunda (pulpitis irreversible)', 'Absceso periapical', 'Enfermedad periodontal', 'Bruxismo (rechinar de dientes)', 'Impactación de alimentos'],
      cuidados_casa: [
        'Mantener una higiene bucal estricta utilizando hilo dental suavemente para remover restos de comida impactados.',
        'Enjuagues bucales con agua tibia y sal (1/2 cucharadita de sal en un vaso de agua) cada 4 horas.',
        'Aplicar compresas frías en la mejilla externa si hay hinchazón; NUNCA aplicar calor externo ni colocar aspirina directamente sobre la encía.',
        'Uso de analgésicos sistémicos de venta libre (Ibuprofeno o Paracetamol) para control del dolor.'
      ],
      cuando_consultar: [
        'Inflamación visible en el rostro, mandíbula o cuello (celulitis facial, potencial urgencia).',
        'Dolor intenso que impide dormir o no cede con analgésicos.',
        'Presencia de fiebre, malestar general o dificultad para abrir la boca (trismo).',
        'Drenaje de pus o mal sabor constante en la boca.'
      ],
      urgencia_default: 'MEDIA',
      requiere_atencion: false
    },
    {
      id: 39,
      nombre: 'Pirosis / Reflujo Gastroesofágico',
      categoria: 'Digestivo',
      sinonimos: ['acidez', 'agruras', 'reflujo', 'quemazon en el pecho', 'fuego en el estomago', 'eructos acidos', 'gastritis'],
      descripcion: 'Sensación de ardor o quemazón retroesternal (detrás del esternón) que suele ascender hacia el cuello o garganta, causada por el retorno del ácido estomacal al esófago.',
      causas_comunes: ['Enfermedad por Reflujo Gastroesofágico (ERGE)', 'Gastritis erosiva', 'Hernia de hiato', 'Transgresiones dietéticas (picantes, grasas, café, alcohol)'],
      cuidados_casa: [
        'Evitar comidas copiosas, especialmente 2 a 3 horas antes de acostarse.',
        'Elevar la cabecera de la cama unos 15-20 cm usando tacos bajo las patas de la cama (no solo almohadas).',
        'Identificar y evitar alimentos desencadenantes (cítricos, menta, chocolate, tomate, grasas fritas).',
        'Uso ocasional de antiácidos neutralizantes (Magaldrato, Hidróxido de aluminio) o IBP (Omeprazol) de venta libre por tiempo limitado.'
      ],
      cuando_consultar: [
        'Síntomas persistentes (más de 2 veces por semana) a pesar de cambios en la dieta y uso de antiácidos.',
        'Dificultad o dolor al tragar los alimentos (disfagia u odinofagia).',
        'Sensación de que la comida se atasca en el pecho.',
        'Pérdida de peso inexplicable, vómitos persistentes o presencia de sangre en heces/vómito.',
        'Si el dolor se irradia a mandíbula o brazo (descartar dolor cardíaco).'
      ],
      urgencia_default: 'BAJA',
      requiere_atencion: false
    },
    {
      id: 40,
      nombre: 'Crisis Hipertensiva (Presión Arterial Elevada)',
      categoria: 'Cardiovascular',
      sinonimos: ['presion alta', 'hipertension', 'subidon de presion', 'zumbido en los oidos por presion', 'dolor de cabeza por presion'],
      descripcion: 'Elevación aguda de la presión arterial (usualmente Sistólica > 180 mmHg y/o Diastólica > 110 mmHg). Requiere diferenciar entre "urgencia" (sin daño a órganos) y "emergencia" (con daño orgánico).',
      causas_comunes: ['Abandono del tratamiento antihipertensivo', 'Consumo excesivo de sodio (sal)', 'Ansiedad severa o crisis de pánico', 'Uso de fármacos (AINEs, descongestionantes nasales)', 'Patologías renales agudas'],
      cuidados_casa: [
        'Mantener la calma, sentarse y reposar en un ambiente tranquilo y oscuro por 15-30 minutos.',
        'Si el paciente olvidó su dosis habitual del medicamento para la presión, administrarla según su prescripción.',
        'No utilizar medicamentos sublinguales (como Nifedipina) sin supervisión médica, ya que pueden causar caídas bruscas y peligrosas de la presión.',
        'Re-evaluar la presión arterial tras 30 minutos de reposo absoluto.'
      ],
      cuando_consultar: [
        'EMERGENCIA: Presión arterial > 180/110 acompañada de dolor de pecho opresivo, falta de aire o asfixia.',
        'EMERGENCIA: Presencia de confusión mental, dificultad para hablar, debilidad en la cara/brazos o pérdida de visión (signos de ACV).',
        'Dolor de cabeza extremadamente severo (el peor de su vida), náuseas o vómitos.',
        'Epistaxis (sangrado nasal) masiva que no cede.'
      ],
      urgencia_default: 'ALTA',
      requiere_atencion: true
    },
    {
      id: 41,
      nombre: 'Síndrome Prostático / Retención Urinaria',
      categoria: 'Urología',
      sinonimos: ['problemas de prostata', 'no puedo orinar', 'chorro debil', 'goteo al orinar', 'me levanto mucho a orinar', 'dolor bajo vientre hombres'],
      descripcion: 'Conjunto de síntomas del tracto urinario inferior (STUI) comúnmente asociados al agrandamiento de la glándula prostática en hombres mayores de 50 años.',
      causas_comunes: ['Hiperplasia Prostática Benigna (HPB)', 'Prostatitis (infección/inflamación)', 'Infección del tracto urinario', 'Uso de medicamentos (antihistamínicos, descongestionantes)'],
      cuidados_casa: [
        'Reducir la ingesta de líquidos 2-3 horas antes de ir a dormir para disminuir la nicturia.',
        'Evitar el consumo de alcohol y cafeína, ya que irritan la vejiga y actúan como diuréticos.',
        'Realizar el "doble vaciado" (orinar, esperar unos minutos y volver a intentar vaciar la vejiga).',
        'Evitar estrictamente los medicamentos descongestionantes (antigripales con pseudoefedrina) porque pueden bloquear completamente la uretra.'
      ],
      cuando_consultar: [
        'EMERGENCIA: Incapacidad total para orinar (retención urinaria aguda) acompañada de dolor intenso en el bajo vientre (globo vesical).',
        'Sangre visible en la orina (hematuria).',
        'Dolor urente al orinar acompañado de fiebre alta, escalofríos y dolor lumbar.',
        'Pérdida del control de la orina (incontinencia por rebosamiento).'
      ],
      urgencia_default: 'MEDIA',
      requiere_atencion: false
    },
    {
      id: 42,
      nombre: 'Vaginitis / Flujo Vaginal Anormal',
      categoria: 'Ginecología',
      sinonimos: ['flujo anormal', 'picazon vaginal', 'mal olor intimo', 'secrecion blanca', 'ardor vaginal', 'infeccion vaginal'],
      descripcion: 'Inflamación o infección de la mucosa vaginal, manifestada típicamente por cambios en el volumen, color u olor del flujo vaginal, a menudo con prurito y ardor.',
      causas_comunes: ['Vaginosis bacteriana (flujo grisáceo, olor a pescado)', 'Candidiasis vulvovaginal (hongo, flujo blanco grumoso tipo requesón, mucha picazón)', 'Tricomoniasis (ITS, flujo amarillento-verdoso espumoso)', 'Irritación química (jabones perfumados, duchas vaginales)'],
      cuidados_casa: [
        'Evitar totalmente las duchas vaginales, ya que destruyen la flora bacteriana protectora (lactobacilos).',
        'Usar ropa interior 100% de algodón y evitar prendas extremadamente ajustadas para reducir la humedad.',
        'Lavar el área vulvar solo con agua tibia o un jabón neutro suave sin perfumes. No limpiar dentro de la vagina.',
        'Si hay sospecha clara de Candidiasis previa diagnosticada, se pueden usar cremas/óvulos antimicóticos de venta libre (Clotrimazol, Miconazol).'
      ],
      cuando_consultar: [
        'Flujo acompañado de fiebre, escalofríos o dolor pélvico bajo intenso (sospecha de Enfermedad Pélvica Inflamatoria).',
        'Úlceras, ampollas o llagas dolorosas en la zona genital (sospecha de herpes).',
        'Si los síntomas no mejoran tras uso de tratamientos de venta libre o si el problema es recurrente (>4 veces al año).',
        'Pacientes gestantes (cualquier flujo anormal requiere evaluación para evitar complicaciones obstétricas).'
      ],
      urgencia_default: 'BAJA',
      requiere_atencion: false
    },
    {
      id: 43,
      nombre: 'Enfermedad Hemorroidal',
      categoria: 'Gastroenterología / Proctología',
      sinonimos: ['hemorroides', 'almorranas', 'sangrado rectal leve', 'bolita en el ano', 'ardor al defecar', 'picazon anal', 'sangre en el papel'],
      descripcion: 'Dilatación e inflamación de los plexos venosos en el canal anal y recto inferior, que pueden ser internas o externas, causando dolor, prurito y sangrado rojo brillante.',
      causas_comunes: ['Estreñimiento crónico (esfuerzo al defecar)', 'Embarazo', 'Sedentarismo prolongado', 'Dieta baja en fibra', 'Levantamiento de objetos pesados'],
      cuidados_casa: [
        'Aumentar masivamente la ingesta de fibra (frutas, verduras, salvado) y agua (2-3 litros diarios) para ablandar las heces.',
        'Realizar baños de asiento con agua tibia (sumergir la zona pélvica 10-15 minutos) 2 o 3 veces al día para reducir el espasmo esfinteriano.',
        'Evitar el papel higiénico seco; utilizar toallitas húmedas sin alcohol o lavar con agua tras la defecación.',
        'No permanecer sentado en el inodoro por más de 5 minutos, ni forzar la evacuación.'
      ],
      cuando_consultar: [
        'Sangrado rectal oscuro, abundante o heces color alquitrán (melena - indica sangrado digestivo alto).',
        'Aparición de un bulto perianal súbito, duro, violáceo y extremadamente doloroso (trombosis hemorroidal).',
        'Pérdida de peso inexplicable o cambios permanentes en el hábito intestinal (descartar patología oncológica).',
        'Mareos, palidez o debilidad severa asociados al sangrado.'
      ],
      urgencia_default: 'BAJA',
      requiere_atencion: false
    },
    {
      id: 44,
      nombre: 'Herpes Zóster (Culebrilla)',
      categoria: 'Dermatología / Infeccioso',
      sinonimos: ['culebrilla', 'herpes zoster', 'fuego en el cuerpo', 'sarpullido doloroso en una linea', 'dolor de nervio con ronchas', 'ardor en la piel'],
      descripcion: 'Reactivación del virus de la varicela-zóster en un ganglio nervioso, manifestándose como una erupción vesicular dolorosa agrupada en el trayecto de un nervio (dermatoma), sin cruzar la línea media del cuerpo.',
      causas_comunes: ['Inmunosupresión temporal (estrés severo, edad avanzada)', 'Infección por VIH', 'Pacientes oncológicos', 'Uso de corticosteroides crónicos'],
      cuidados_casa: [
        'Mantener la erupción limpia y seca para prevenir sobreinfecciones bacterianas.',
        'Aplicar compresas frías, húmedas o loción de calamina para aliviar el ardor local.',
        'Evitar el contacto físico directo de las lesiones activas (ampollas) con mujeres embarazadas, recién nacidos o personas que nunca tuvieron varicela.',
        'Tomar analgésicos sistémicos (Paracetamol o AINEs) para manejar el dolor agudo.'
      ],
      cuando_consultar: [
        'Idealmente consultar en las primeras 72 horas desde el inicio de las ampollas para iniciar terapia antiviral (Aciclovir), lo que reduce el riesgo de dolor crónico (neuralgia posherpética).',
        'La erupción afecta la cara, especialmente cerca del ojo o la punta de la nariz (riesgo de ceguera - urgencia oftalmológica).',
        'El dolor es insoportable y no responde a analgésicos comunes.',
        'Las ampollas se llenan de pus espeso o provocan fiebre alta.'
      ],
      urgencia_default: 'MEDIA',
      requiere_atencion: false
    },
    {
      id: 45,
      nombre: 'Micosis Superficial (Tiña / Pie de Atleta)',
      categoria: 'Dermatología',
      sinonimos: ['hongos en la piel', 'pie de atleta', 'tinea', 'tiña', 'manchas rojas redondas que pican', 'caspa corporal', 'descamacion en los pies', 'empeines'],
      descripcion: 'Infección fúngica superficial que afecta la capa córnea de la piel, cabello o uñas. Clínicamente presenta lesiones anulares (en forma de anillo) descamativas, bordes activos y prurito.',
      causas_comunes: ['Humedad excesiva y falta de secado', 'Contagio por contacto en gimnasios, piscinas o duchas compartidas', 'Uso prolongado de calzado cerrado sintético', 'Contacto con mascotas infectadas'],
      cuidados_casa: [
        'Mantener el área afectada estrictamente limpia y seca. Secar muy bien entre los dedos de los pies tras el baño.',
        'Usar calcetines 100% de algodón y cambiarlos diariamente; preferir calzado abierto o de cuero transpirable.',
        'Aplicar cremas antimicóticas de venta libre (Clotrimazol, Miconazol, Terbinafina) 2 veces al día, y continuar aplicándola por 1-2 semanas DESPUÉS de que desaparezca la lesión.',
        'No compartir toallas, zapatos ni ropa personal.'
      ],
      cuando_consultar: [
        'Infección que afecta el cuero cabelludo (tiña capitis) o múltiples uñas (onicomicosis extensa), pues requieren antimicóticos orales sistémicos.',
        'Las lesiones están muy inflamadas, rojas, calientes o drenan pus (infección bacteriana secundaria).',
        'Falta de mejoría tras 2 a 4 semanas de tratamiento antimicótico tópico constante.',
        'Pacientes con diabetes o inmunosupresión con infecciones en los pies.'
      ],
      urgencia_default: 'BAJA',
      requiere_atencion: false
    },
    {
      id: 46,
      nombre: 'Aftas / Úlceras Bucales',
      categoria: 'Estomatología',
      sinonimos: ['llagas en la boca', 'aftas', 'fuego en la boca', 'ulceras bucales', 'blanquitos en la lengua', 'boca lastimada'],
      descripcion: 'Pequeñas úlceras dolorosas, blanquecinas o amarillentas con un halo rojo, que aparecen en la mucosa oral (interior de mejillas, labios, lengua o encías). No son contagiosas.',
      causas_comunes: ['Traumatismo mecánico (mordeduras, cepillado brusco, ortodoncia)', 'Estrés emocional agudo', 'Déficit vitamínico (B12, Hierro, Ácido fólico)', 'Cambios hormonales', 'Alergias o sensibilidad a alimentos (cítricos, piña, picantes)'],
      cuidados_casa: [
        'Evitar alimentos ácidos, picantes, salados y muy crujientes que puedan irritar la herida.',
        'Realizar enjuagues bucales suaves con agua tibia y sal, o bicarbonato de sodio.',
        'Mantener una higiene bucal impecable, usando un cepillo de cerdas muy suaves.',
        'Se pueden usar geles protectores orales o anestésicos locales tópicos de venta libre (Benzocaína) para aliviar el dolor al comer.'
      ],
      cuando_consultar: [
        'Úlceras excepcionalmente grandes, que se propagan o que duran más de 3 semanas sin curar.',
        'Dificultad extrema para beber líquidos que ponga en riesgo la hidratación.',
        'Aparición de aftas recurrentes muy frecuentes asociadas a dolor abdominal o pérdida de peso (descartar enfermedad celíaca o de Crohn).',
        'Presencia de fiebre alta u otras ampollas en la piel del cuerpo.'
      ],
      urgencia_default: 'BAJA',
      requiere_atencion: false
    },
    {
      id: 47,
      nombre: 'Esguince / Torcedura Articular',
      categoria: 'Traumatología',
      sinonimos: ['esguince', 'torcedura', 'me doble el tobillo', 'dolor de articulacion tras golpe', 'pie doblado', 'luxacion leve', 'falseo del pie'],
      descripcion: 'Lesión traumática de los ligamentos de una articulación, caracterizada por dolor, edema, equimosis (moretón) y limitación de la movilidad funcional. El tobillo es la articulación más frecuentemente afectada.',
      causas_comunes: ['Traumatismo indirecto (torsión o giro brusco de la articulación)', 'Práctica deportiva', 'Caminar sobre superficies irregulares con calzado inadecuado'],
      cuidados_casa: [
        'Aplicar el protocolo R.I.C.E.:',
        'R (Rest - Reposo): Evitar apoyar peso sobre la articulación afectada.',
        'I (Ice - Hielo): Aplicar hielo envuelto en tela por 15-20 minutos cada 2-3 horas durante los primeros dos días.',
        'C (Compression - Compresión): Usar un vendaje elástico compresivo, sin que quede tan apretado que corte la circulación.',
        'E (Elevation - Elevación): Mantener la extremidad elevada por encima del nivel del corazón para reducir el edema.',
        'Tomar analgésicos o AINEs (Ibuprofeno, Diclofenaco) para dolor e inflamación.'
      ],
      cuando_consultar: [
        'Incapacidad absoluta para soportar peso sobre la pierna inmediatamente después de la lesión y en el servicio de urgencias (sospecha de fractura ósea).',
        'Deformidad visual evidente de la articulación, huesos que se ven fuera de lugar.',
        'Adormecimiento, frío, palidez o coloración morada profunda en la extremidad por debajo de la lesión.',
        'El dolor y la hinchazón empeoran dramáticamente a pesar del reposo y el hielo.'
      ],
      urgencia_default: 'MEDIA',
      requiere_atencion: false
    },
    {
      id: 48,
      nombre: 'Espasmo Muscular (Calambre)',
      categoria: 'Musculoesquelético',
      sinonimos: ['calambre', 'tiron muscular', 'musculo engarrotado', 'espasmo doloroso', 'se me subio el musculo', 'charley horse'],
      descripcion: 'Contracción muscular involuntaria, dolorosa y transitoria (generalmente segundos a minutos). Muy frecuente en pantorrillas (gemelos) y pie durante la noche o la actividad física.',
      causas_comunes: ['Fatiga y sobrecarga muscular por ejercicio intenso', 'Deshidratación y pérdida de electrolitos (Sodio, Potasio, Magnesio)', 'Permanecer en una misma posición por tiempo prolongado', 'Embarazo', 'Uso de medicamentos diuréticos'],
      cuidados_casa: [
        'Estirar pasiva y suavemente el músculo acalambrado y frotarlo para relajar la contracción.',
        'Si el calambre es en la pantorrilla, poner el peso sobre esa pierna o tirar de la punta del pie hacia la espinilla.',
        'Aplicar calor en el músculo tenso, o hielo si persiste dolorimiento posterior.',
        'Rehidratarse agresivamente con agua y bebidas ricas en electrolitos (agua de coco, plátano, SRO).'
      ],
      cuando_consultar: [
        'Calambres que causan un dolor insoportable, severo y que no ceden tras los estiramientos.',
        'Asociados con hinchazón, enrojecimiento extremo o cambios en la piel de la pierna.',
        'Presencia de debilidad muscular severa después de que el calambre pasa.',
        'Ocurren con alta frecuencia y sin un factor desencadenante obvio.'
      ],
      urgencia_default: 'BAJA',
      requiere_atencion: false
    },
    {
      id: 49,
      nombre: 'Artritis Gotosa (Ataque de Gota)',
      categoria: 'Reumatología',
      sinonimos: ['gota', 'ataque de gota', 'dolor intenso en el dedo gordo del pie', 'articulacion roja y muy dolorosa', 'podagra', 'acido urico alto con dolor'],
      descripcion: 'Artritis inflamatoria aguda, producida por la precipitación de cristales de ácido úrico en el espacio articular. Típicamente afecta la primera articulación metatarsofalángica (dedo gordo del pie), conocida como podagra.',
      causas_comunes: ['Hiperuricemia crónica (ácido úrico elevado en sangre)', 'Excesos dietéticos (carnes rojas, mariscos, vísceras)', 'Consumo elevado de alcohol (especialmente cerveza)', 'Deshidratación', 'Uso de diuréticos tiazídicos'],
      cuidados_casa: [
        'Reposo absoluto de la articulación afectada, dejándola descubierta (incluso el peso de una sábana puede ser intolerable).',
        'Aplicación cuidadosa de frío local para mitigar la inflamación aguda.',
        'Hidratación agresiva (mínimo 3 litros de agua al día) para facilitar la excreción renal de ácido úrico.',
        'Uso temprano de antiinflamatorios (AINEs como Naproxeno o Indometacina). NO tomar Aspirina ya que puede alterar la excreción de ácido úrico.',
        'NO iniciar terapia reductora de ácido úrico (Alopurinol) en medio de un ataque agudo si no se tomaba previamente (puede empeorar la crisis).'
      ],
      cuando_consultar: [
        'Es el primer episodio (requiere diagnóstico diferencial con Artritis Séptica, que es una urgencia vital).',
        'Acompañado de fiebre alta o escalofríos.',
        'El dolor no se controla tras 24-48 horas de uso de AINEs o se propaga a múltiples articulaciones.',
        'Si hay evidencia de lesión o herida cerca de la articulación roja y caliente.'
      ],
      urgencia_default: 'MEDIA',
      requiere_atencion: false
    },
    {
      id: 50,
      nombre: 'Neuropatía Periférica (Hormigueo y Ardor)',
      categoria: 'Neurológico',
      sinonimos: ['hormigueo en los pies', 'ardor en los pies', 'entumecimiento de manos', 'piquetes en las piernas', 'neuropatia diabetica', 'adormecimiento', 'siento agujas'],
      descripcion: 'Daño al sistema nervioso periférico que se manifiesta con alteraciones sensitivas (parestesias, disestesias), dolor de tipo quemante o eléctrico, y ocasionalmente déficit motor, típicamente de progresión distal a proximal ("en guante y calcetín").',
      causas_comunes: ['Diabetes Mellitus crónica (Neuropatía diabética)', 'Déficit de Vitamina B12', 'Alcoholismo crónico', 'Compresión nerviosa (Síndrome del túnel carpiano)', 'Enfermedades renales crónicas'],
      cuidados_casa: [
        'Inspección visual diaria y rigurosa de los pies en busca de úlceras o heridas no sentidas (crucial en diabéticos).',
        'Uso de calzado cómodo, cerrado, de la talla correcta, y calcetines sin costuras apretadas.',
        'Control estricto de la patología de base (monitoreo glucémico impecable en diabetes).',
        'Evitar la aplicación de calor directo en los pies (bolsas de agua caliente), ya que la disminución de sensibilidad aumenta el riesgo de quemaduras graves.'
      ],
      cuando_consultar: [
        'Debilidad muscular progresiva que dificulte caminar o sostener objetos (tropiezos frecuentes).',
        'Hormigueo o debilidad que aparece de forma súbita, especialmente si afecta un solo lado del cuerpo (descartar ACV).',
        'Aparición de úlceras, llagas o enrojecimiento en pies o manos que no cicatrizan.',
        'Pérdida de control de esfínteres (vejiga/intestino) asociada a los síntomas periféricos.'
      ],
      urgencia_default: 'BAJA',
      requiere_atencion: false
    },
    {
      id: 51,
      nombre: 'Episodio Depresivo / Tristeza Profunda',
      categoria: 'Salud Mental',
      sinonimos: ['depresion', 'tristeza extrema', 'ganas de llorar todo el dia', 'falta de motivacion', 'apatia', 'no quiero levantarme de la cama', 'angustia existencial'],
      descripcion: 'Trastorno del estado de ánimo caracterizado por anhedonia (incapacidad para sentir placer), tristeza persistente, abulia, alteraciones del sueño y del apetito, afectando severamente la funcionalidad diaria.',
      causas_comunes: ['Trastorno depresivo mayor', 'Duelo no resuelto o pérdidas significativas', 'Trastornos de la glándula tiroides (hipotiroidismo)', 'Estrés psicosocial crónico', 'Efecto secundario de ciertos medicamentos o sustancias'],
      cuidados_casa: [
        'Evitar el aislamiento extremo; procurar mantener contacto con al menos un familiar o persona de confianza.',
        'Intentar mantener rutinas básicas (higiene personal, alimentación en horarios fijos), estructurando el día en metas pequeñas y manejables.',
        'Evitar totalmente el consumo de alcohol y drogas recreativas, ya que actúan como depresores del sistema nervioso.',
        'Realizar actividad física suave (caminar al sol) para estimular la liberación natural de endorfinas.'
      ],
      cuando_consultar: [
        'EMERGENCIA: Presencia de pensamientos suicidas, planes detallados de autolesión o expresiones de que "la vida no vale la pena".',
        'Los síntomas persisten por más de 2 semanas y paralizan las actividades laborales, académicas o familiares.',
        'Presencia de alucinaciones (escuchar voces) o delirios (creencias irreales paranoides).',
        'Pérdida total del apetito que compromete el estado nutricional.'
      ],
      urgencia_default: 'MEDIA',
      requiere_atencion: false
    },
    {
      id: 52,
      nombre: 'Rinosinusitis Aguda (Dolor facial y Congestión)',
      categoria: 'Otorrinolaringología',
      sinonimos: ['sinusitis', 'moco verde', 'dolor en la frente y mejillas', 'nariz tupida con dolor', 'pesadez en la cara al agacharse'],
      descripcion: 'Inflamación de la mucosa de los senos paranasales, comúnmente posterior a una infección viral del tracto respiratorio superior, que puede sobreinfectarse bacterianamente. Clínicamente presenta rinorrea purulenta, congestión y dolor/presión facial.',
      causas_comunes: ['Infecciones virales (resfriado común prolongado)', 'Rinitis alérgica no controlada', 'Infección bacteriana secundaria', 'Anomalías anatómicas (desviación del tabique)'],
      cuidados_casa: [
        'Irrigaciones nasales abundantes y frecuentes con solución salina estéril (Suero Fisiológico) para facilitar el drenaje mecánico del moco.',
        'Uso de vaporizaciones (inhalación de vapor de agua tibia) para humidificar la vía aérea.',
        'Analgésicos y antiinflamatorios sistémicos (Ibuprofeno, Paracetamol) para el dolor y la inflamación facial.',
        'Uso de descongestionantes nasales tópicos (Oximetazolina) por un máximo estricto de 3 a 5 días para evitar efecto rebote (rinitis medicamentosa).'
      ],
      cuando_consultar: [
        'EMERGENCIA: Hinchazón, enrojecimiento o dolor intenso ALREDEDOR de uno de los ojos (riesgo de celulitis periorbitaria/orbitaria).',
        'Síntomas que duran más de 10-14 días sin mejoría (sugestivo de infección bacteriana que requiere antibióticos).',
        'Aparición de fiebre alta (>39°C), confusión mental, rigidez de cuello o dolor de cabeza insoportable.',
        'Visión doble, visión borrosa o cambios bruscos en la agudeza visual.'
      ],
      urgencia_default: 'BAJA',
      requiere_atencion: false
    },
    {
      id: 53,
      nombre: 'Insuficiencia Venosa Crónica (Várices y Piernas Pesadas)',
      categoria: 'Cardiovascular / Angiología',
      sinonimos: ['varices', 'venas saltadas', 'piernas pesadas', 'hinchazon de tobillos en la tarde', 'arañitas vasculares', 'dolor de piernas al estar de pie'],
      descripcion: 'Deficiencia en el retorno venoso de las extremidades inferiores hacia el corazón, provocando estasis venosa. Se manifiesta con sensación de pesadez, edema perimaleolar vespertino, dolor sordo y tortuosidad venosa.',
      causas_comunes: ['Fallo de las válvulas venosas', 'Bipedestación o sedestación prolongada (trabajos de pie o sentados)', 'Embarazo', 'Obesidad', 'Factores genéticos'],
      cuidados_casa: [
        'Elevación de los miembros inferiores por encima del nivel del corazón durante 20-30 minutos, varias veces al día y al dormir.',
        'Uso de medias o calcetines de compresión graduada (deben colocarse a primera hora de la mañana, antes de bajarse de la cama).',
        'Evitar permanecer de pie o sentado en la misma postura por tiempos prolongados; realizar ejercicios de flexo-extensión de los tobillos regularmente.',
        'Evitar exposición directa al calor intenso en las piernas (estufas, baños muy calientes) ya que provoca vasodilatación.'
      ],
      cuando_consultar: [
        'EMERGENCIA: Hinchazón súbita, dolorosa, enrojecida y caliente de una SOLA pierna (riesgo alto de Trombosis Venosa Profunda - TVP).',
        'Aparición de una úlcera o llaga abierta cerca de los tobillos que no cicatriza.',
        'Si un bulto varicoso sangra espontáneamente tras un roce leve o trauma.',
        'Endurecimiento progresivo y oscurecimiento severo de la piel de las pantorrillas (lipodermatoesclerosis).'
      ],
      urgencia_default: 'BAJA',
      requiere_atencion: false
    },
    {
      id: 54,
      nombre: 'Dermatitis de Contacto / Alergia Tópica',
      categoria: 'Dermatología',
      sinonimos: ['alergia en la piel', 'sarpullido por toque', 'irritacion por jabon', 'piel roja con comezon', 'ampollitas de alergia', 'dermatitis'],
      descripcion: 'Reacción inflamatoria cutánea provocada por el contacto directo con un agente exógeno, ya sea por mecanismo irritativo (daño químico) o alérgico (inmunológico). Se caracteriza por eritema, edema, vesículas, costras y prurito intenso.',
      causas_comunes: ['Níquel (bisutería, hebillas)', 'Cosméticos, perfumes y desodorantes', 'Plantas tóxicas', 'Detergentes o productos de limpieza', 'Medicamentos tópicos'],
      cuidados_casa: [
        'Identificar y retirar/lavar inmediatamente el agente causal si es conocido.',
        'Lavar la zona afectada con agua y un jabón neutro muy suave para eliminar restos del alérgeno/irritante.',
        'Aplicar compresas frías y cremas emolientes (hidratantes sin perfumes) o calamina para aliviar la picazón.',
        'Uso de antihistamínicos orales (Loratadina, Cetirizina) para el control sintomático del prurito nocturno.',
        'Para brotes leves, puede aplicarse crema de Hidrocortisona al 1% de venta libre por no más de 5-7 días.'
      ],
      cuando_consultar: [
        'La erupción es severa, afecta la cara, los genitales o involucra una gran superficie corporal (>20%).',
        'Las vesículas o ampollas presentan secreción purulenta, costras amarillas (melicéricas) o dolor creciente (sobreinfección bacteriana).',
        'Ausencia de mejoría significativa tras 1-2 semanas de evitar el contacto con el presunto alérgeno.',
        'Afectación de las mucosas (interior de la boca, ojos).'
      ],
      urgencia_default: 'BAJA',
      requiere_atencion: false
    },
    {
      id: 55,
      nombre: 'Síndrome de Ojo Seco / Irritación Ocular',
      categoria: 'Oftalmología',
      sinonimos: ['ojo seco', 'ardor de ojos', 'sensacion de arena en el ojo', 'ojos cansados', 'picazon en los ojos por pantallas', 'fatiga visual'],
      descripcion: 'Trastorno de la película lagrimal debido a la deficiencia en la producción de lágrimas o al aumento de la evaporación de las mismas. Genera inflamación de la superficie ocular, hiperemia, ardor, sensación de cuerpo extraño y fluctuación de la visión.',
      causas_comunes: ['Uso prolongado de pantallas digitales (disminuye la frecuencia de parpadeo)', 'Ambientes con aire acondicionado o ventiladores directos', 'Uso de lentes de contacto', 'Envejecimiento (especialmente en menopausia)', 'Efecto secundario de antihistamínicos o antidepresivos'],
      cuidados_casa: [
        'Uso frecuente de lubricantes oculares (lágrimas artificiales), preferiblemente formulaciones sin preservantes si se usan más de 4 veces al día.',
        'Aplicar la regla "20-20-20" al usar pantallas: cada 20 minutos, mirar un objeto a 20 pies (6 metros) durante al menos 20 segundos.',
        'Evitar que el aire de ventiladores o del aire acondicionado dé directamente en el rostro.',
        'Uso de gafas de sol envolventes en exteriores para proteger los ojos del viento y el polvo.',
        'Parpadear conscientemente con mayor frecuencia durante actividades que requieran fijación visual.'
      ],
      cuando_consultar: [
        'Dolor ocular profundo, severo o acompañado de enrojecimiento intenso (ojo rojo agudo, descartar uveítis o glaucoma).',
        'Pérdida de visión, visión borrosa que no mejora tras parpadear o usar lágrimas artificiales.',
        'Presencia de secreción ocular abundante, purulenta o matutina que sella los párpados.',
        'No hay alivio de los síntomas a pesar del uso regular de lágrimas artificiales tras varias semanas.'
      ],
      urgencia_default: 'BAJA',
      requiere_atencion: false
    },
    {
      id: 56,
      nombre: 'Cólico Biliar / Colecistitis (Dolor de Vesícula)',
      categoria: 'Digestivo',
      sinonimos: ['dolor de vesicula', 'piedras en la vesicula', 'colico biliar', 'dolor bajo la costilla derecha', 'barro biliar', 'dolor de costado derecho'],
      descripcion: 'Dolor agudo en el cuadrante superior derecho del abdomen o epigastrio, que frecuentemente se irradia a la espalda o escápula derecha, típicamente posprandial (después de comer grasas).',
      causas_comunes: ['Colelitiasis (piedras en la vesícula)', 'Colecistitis aguda (inflamación de la vesícula)', 'Lodo biliar'],
      cuidados_casa: [
        'Suspensión absoluta de la ingesta de grasas, lácteos enteros y frituras.',
        'Dieta estricta de líquidos claros y carbohidratos simples (arroz, manzana, pan tostado).',
        'Uso de antiespasmódicos de venta libre si el paciente ya tiene un diagnóstico previo y conocido.',
        'Evitar analgésicos fuertes que puedan enmascarar el dolor de un cuadro quirúrgico en evolución.'
      ],
      cuando_consultar: [
        'Dolor continuo que dura más de 4-6 horas y no cede con antiespasmódicos o posiciones de reposo.',
        'Acompañado de fiebre alta y escalofríos (indica infección grave, colangitis o colecistitis aguda).',
        'Presencia de ictericia (coloración amarillenta progresiva en los ojos o la piel).',
        'Vómitos incoercibles (que no se pueden detener) o incapacidad para beber agua.'
      ],
      urgencia_default: 'ALTA',
      requiere_atencion: true
    },
    {
      id: 57,
      nombre: 'Hipoglucemia (Nivel de Azúcar Muy Bajo)',
      categoria: 'Endocrinología',
      sinonimos: ['bajon de azucar', 'hipoglucemia', 'desmayo por diabetes', 'azucar baja', 'sudadera por azucar', 'temblor por hambre', 'debilidad por falta de comida'],
      descripcion: 'Nivel anormalmente bajo de glucosa en sangre (generalmente < 70 mg/dL), lo que priva al cerebro de su principal fuente de energía. Presenta síntomas autonómicos y neuroglucopénicos rápidos.',
      causas_comunes: ['Exceso de insulina o medicamentos antidiabéticos (como Glibenclamida)', 'Saltarse comidas o ayuno prolongado', 'Ejercicio extenuante sin aporte calórico previo', 'Consumo de alcohol en exceso sin ingerir alimentos'],
      cuidados_casa: [
        'Aplicar la regla de los 15: ingerir 15 gramos de carbohidratos de absorción rápida (1/2 vaso de jugo o refresco no dietético, 3 cucharaditas de azúcar o miel, o caramelos masticables).',
        'Esperar 15 minutos exactos y, si es posible, medir la glucosa. Si sigue baja o los síntomas no ceden, repetir la dosis de 15 gramos.',
        'Una vez que los síntomas mejoren, consumir un snack con carbohidratos complejos y proteínas (ej. galletas con queso o medio sándwich) para evitar una recaída a las pocas horas.',
        'NO dar alimentos sólidos ni líquidos si la persona está inconsciente o muy confundida (riesgo mortal de asfixia o broncoaspiración).'
      ],
      cuando_consultar: [
        'EMERGENCIA: Pérdida del conocimiento o aparición de convulsiones (requiere glucagón intramuscular urgente o glucosa intravenosa hospitalaria).',
        'Incapacidad del paciente para tragar de forma segura.',
        'Los síntomas no mejoran después de haber aplicado la "regla de los 15" en tres ocasiones consecutivas.',
        'Confusión mental severa o comportamiento agresivo inusual que no se resuelve tras ingerir azúcar.'
      ],
      urgencia_default: 'ALTA',
      requiere_atencion: true
    },
    {
      id: 58,
      nombre: 'Neumonía Adquirida en la Comunidad',
      categoria: 'Respiratorio / Infeccioso',
      sinonimos: ['pulmonia', 'neumonia', 'infeccion en los pulmones', 'dolor al respirar hondo', 'flema con sangre', 'tos con fiebre alta persistente'],
      descripcion: 'Infección aguda del parénquima pulmonar (alvéolos), que produce ocupación por líquido o pus, limitando severamente el intercambio de oxígeno. Se manifiesta con tos profunda, fiebre alta y disnea.',
      causas_comunes: ['Infección bacteriana (Streptococcus pneumoniae, Mycoplasma)', 'Infección viral aguda (Influenza, SARS-CoV-2, VSR)', 'Aspiración de contenido gástrico (frecuente en pacientes de la tercera edad)'],
      cuidados_casa: [
        'Evitar cualquier esfuerzo físico; mantener reposo absoluto en cama en posición semisentada (a 45 grados) para facilitar la expansión torácica y la respiración.',
        'Hidratación agresiva oral para ayudar a fluidificar las secreciones pulmonares y facilitar la expectoración del pus/moco.',
        'Uso de antipiréticos (Paracetamol) para el control de la fiebre.',
        'NO utilizar antitusígenos (supresores de la tos como el Dextrometorfano) bajo ningún concepto, ya que el pulmón requiere expulsar las secreciones infectadas mediante la tos.'
      ],
      cuando_consultar: [
        'EMERGENCIA: Dificultad extrema para respirar, respiración muy rápida (>30 por minuto) o cianosis (coloración gris/azulada en labios o uñas).',
        'EMERGENCIA: Aparición de confusión, desorientación o somnolencia profunda (signo de falta de oxígeno cerebral, muy peligroso en mayores de 65 años).',
        'Dolor torácico tipo "punzada" intenso, que agrava como un cuchillo cada vez que se intenta tomar aire profundo (dolor pleurítico).',
        'Tos persistente con expectoración herrumbrosa (color óxido), verdosa oscura o manchada de sangre fresca.'
      ],
      urgencia_default: 'ALTA',
      requiere_atencion: true
    },
    {
      id: 59,
      nombre: 'Pielonefritis Aguda (Infección Renal)',
      categoria: 'Urología / Infeccioso',
      sinonimos: ['infeccion en los riñones', 'dolor de riñon con fiebre', 'pielonefritis', 'infeccion de orina grave', 'mal de orin con calentura', 'escalofrios y dolor de espalda'],
      descripcion: 'Infección bacteriana profunda y potencialmente peligrosa del tracto urinario superior (riñones y pelvis renal), generalmente ascendente desde una cistitis no resuelta.',
      causas_comunes: ['Cistitis (infección de vejiga) no tratada', 'Bacterias entéricas (E. coli es responsable de >80% de los casos)', 'Obstrucción del flujo de orina (por cálculos o agrandamiento de próstata)'],
      cuidados_casa: [
        'Esta patología NO se puede manejar únicamente con cuidados caseros; requiere de inicio inmediato de antibióticos sistémicos.',
        'Mantener una ingesta hídrica máxima (mínimo 2.5 a 3 litros de agua diarios) para forzar la diuresis.',
        'Controlar la temperatura con Paracetamol, pero EVITAR los AINEs (Ibuprofeno, Diclofenaco) ya que pueden empeorar la función de los riñones ya inflamados e infectados.',
        'Aplicar compresas calientes secas en la zona lumbar baja para ayudar a relajar la musculatura y mitigar el dolor irradiado.'
      ],
      cuando_consultar: [
        'Vómitos persistentes que impiden que el paciente retenga líquidos o las pastillas de los antibióticos recetados.',
        'Fiebre en picos alta (sobre 39°C) con escalofríos intensos e incontrolables (tiritona, que puede indicar paso de bacterias a la sangre).',
        'Caída de la presión arterial, mareo severo al ponerse de pie, o palidez extrema (signos de choque séptico).',
        'Orina claramente teñida de sangre roja (hematuria macroscópica masiva).'
      ],
      urgencia_default: 'ALTA',
      requiere_atencion: true
    },
    {
      id: 60,
      nombre: 'Glaucoma Agudo de Ángulo Cerrado',
      categoria: 'Oftalmología',
      sinonimos: ['dolor insoportable en el ojo', 'glaucoma agudo', 'ojo rojo como tomate', 'veo halos alrededor de las luces', 'pupila dilatada y ojo duro', 'presion en el ojo estalla'],
      descripcion: 'Aumento súbito, extremadamente severo del nivel de la presión intraocular debido a un bloqueo total del drenaje de fluidos en el ojo. Es una de las verdaderas urgencias oftalmológicas que puede causar ceguera irreversible en horas.',
      causas_comunes: ['Bloqueo anatómico brusco del ángulo iridocorneal', 'Uso de fármacos midriáticos (que dilatan la pupila) en personas predispuestas', 'Reacción cruzada con antidepresivos o antihistamínicos sistémicos'],
      cuidados_casa: [
        'NO EXISTEN cuidados en casa efectivos ni seguros para esta condición. Es una emergencia hospitalaria absoluta.',
        'Mantener al paciente en completo reposo, sin frotarse el ojo bajo ninguna circunstancia.',
        'Evitar ambientes oscuros o cerrar los ojos apretadamente; mantenerse en una habitación muy bien iluminada (la luz ayuda a contraer la pupila, lo que puede abrir milimétricamente la vía de drenaje).',
        'No administrar gotas caseras, ni colirios genéricos.'
      ],
      cuando_consultar: [
        'EMERGENCIA ABSOLUTA: Dolor ocular profundo y dolor de cabeza frontal/cefálico tan atroz que provoca náuseas intensas y vómitos repetidos.',
        'Visión borrosa repentina y percepción de "halos con colores del arcoíris" alrededor de fuentes de luz.',
        'El globo ocular afectado está excesivamente rojo y al tocarlo suavemente a través del párpado cerrado se palpa extremadamente duro, como una canica (comparado con el otro ojo sano).',
        'Pupila semi-dilatada que no se contrae ni responde cuando se le enfoca una luz directa.'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 61,
      nombre: 'Torsión Testicular',
      categoria: 'Urología',
      sinonimos: ['dolor repentino en los testiculos', 'hinchazon de testiculo', 'torsion testicular', 'se me torcio el testiculo', 'testiculo subido', 'dolor insoportable en los huevos'],
      descripcion: 'Rotación del testículo y estrangulación de su cordón espermático, lo que interrumpe abruptamente el flujo de sangre arterial. Isquemia que causa dolor atroz y resulta en la muerte (necrosis) del testículo si no se interviene quirúrgicamente en menos de 6 horas.',
      causas_comunes: ['Anomalía congénita (deformidad en badajo de campana) que permite la rotación libre del testículo', 'Traumatismo genital previo reciente', 'Esfuerzo o actividad física intensa súbita', 'Mayor incidencia durante el pico de crecimiento en la pubertad'],
      cuidados_casa: [
        'EL TIEMPO ES TEJIDO. No se deben aplicar remedios caseros, hielo o cremas para intentar aliviar un dolor que sugiera esta condición.',
        'Suspender inmediatamente cualquier ingesta de alimentos y líquidos (ya que el paciente probablemente requerirá cirugía general con anestesia en las próximas horas).',
        'Evitar manipular o intentar "desenroscar" manualmente el testículo por personal no entrenado, lo cual puede agravar la lesión isquémica.'
      ],
      cuando_consultar: [
        'EMERGENCIA ABSOLUTA: Dolor escrotal y testicular súbito, extremadamente agudo e incapacitante, que a menudo despierta al paciente de madrugada.',
        'El testículo afectado se retrae (se ve más alto en el escroto que el sano), está sumamente duro y puede adoptar una posición transversal anómala.',
        'Presencia de náuseas, vómitos, taquicardia o palidez causados por la intensidad visceral del dolor.',
        'Falta de alivio del dolor al elevar suavemente el escroto (signo de Prehn negativo), lo cual es crítico para diferenciar de otras patologías menos urgentes.'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 62,
      nombre: 'Crisis de Asma / Broncoespasmo Severo',
      categoria: 'Respiratorio',
      sinonimos: ['ataque de asma', 'pecho cerrado', 'silbido en el pecho intenso', 'asfixia asmatica', 'crisis asmatica', 'broncoespasmo agudo'],
      descripcion: 'Episodio de empeoramiento agudo y rápidamente progresivo de la inflamación pulmonar y constricción del músculo liso de las vías respiratorias. Reduce drásticamente el flujo de aire, causando fatiga de músculos respiratorios.',
      causas_comunes: ['Exposición masiva a aeroalérgenos (ácaros, caspa de animales, polen, hongos)', 'Infecciones virales respiratorias (desencadenante #1 en niños)', 'Exposición a aire muy frío o ejercicio físico extremo', 'Abandono del tratamiento preventivo con corticoides inhalados diarios'],
      cuidados_casa: [
        'Mantener la calma total (la ansiedad exacerba el espasmo); colocar al paciente sentado derecho, levemente inclinado hacia adelante para maximizar la mecánica ventilatoria.',
        'Utilizar el inhalador de RESCATE (ej. Salbutamol / Albuterol) utilizando una cámara espaciadora: 2 a 4 pulsaciones consecutivas, repitiendo cada 20 minutos durante la primera hora.',
        'Aflojar inmediatamente prendas apretadas en cuello, cintura y tórax.',
        'Evacuar o alejar al paciente de cualquier desencadenante ambiental sospechoso (humo, olores químicos fuertes, animales).'
      ],
      cuando_consultar: [
        'EMERGENCIA: Si no hay una mejoría evidente tras completar el primer protocolo de rescate de 1 hora con el inhalador.',
        'El paciente es incapaz de completar una sola frase sin tener que detenerse para recuperar el aliento (habla entrecortada o por sílabas).',
        'Uso evidente de musculatura accesoria: la piel se hunde profundamente entre las costillas y en el hueco del cuello (tiraje severo) con cada respiración.',
        'Cambios en la coloración (cianosis peri-bucal o distal) o estado mental (somnolencia, agitación o silencio auscultatorio, es decir, ya ni siquiera se oyen silbidos porque el aire no pasa).'
      ],
      urgencia_default: 'ALTA',
      requiere_atencion: true
    },
    {
      id: 63,
      nombre: 'Celulitis Infecciosa / Erisipela',
      categoria: 'Dermatología / Infeccioso',
      sinonimos: ['infeccion en la pierna', 'pierna roja y caliente', 'celulitis bacteriana', 'erisipela', 'piel roja inflamada', 'pierna hinchada con fiebre', 'cuero rojo infectado'],
      descripcion: 'Infección bacteriana grave, aguda y expansiva de las capas dérmicas profundas de la piel y tejido celular subcutáneo. Cursa clásicamente con una extensa placa roja (eritematosa), brillante, caliente, muy hinchada y dolorosa.',
      causas_comunes: ['Infección por cepas patógenas de Streptococcus pyogenes o Staphylococcus aureus', 'Ruptura de la barrera cutánea (picaduras de insectos rasgadas, cortes, heridas quirúrgicas, úlceras o incluso hongos interdigitales en los pies)', 'Pacientes con linfedema, insuficiencia venosa crónica o diabetes mal controlada'],
      cuidados_casa: [
        'Esta infección exige invariablemente tratamiento antibiótico médico, el manejo casero es solo complementario.',
        'Elevación rigurosa de la extremidad afectada por encima del nivel anatómico del corazón para ayudar al drenaje veno-linfático, lo cual reduce significativamente el edema y el dolor opresivo.',
        'Controlar la fiebre con antipiréticos (Paracetamol) y analgésicos sistémicos.',
        'NO aplicar cremas caseras, hielo directo o calor directo a la placa infectada. Mantener la piel limpia y seca.'
      ],
      cuando_consultar: [
        'Requiere evaluación médica temprana (en las primeras 12 a 24 horas del inicio) para iniciar antibióticos orales antes de que la infección invada el torrente sanguíneo.',
        'La placa eritematosa (zona roja) avanza rápidamente de tamaño (se aconseja delinear los bordes con un bolígrafo para medir la progresión en horas).',
        'Presencia de fiebre altísima con escalofríos, mareos severos al pararse, o latidos muy acelerados (signos de sepsis).',
        'La aparición de ampollas llenas de sangre, dolor extremadamente desproporcionado, o piel que se torna color negro/violáceo (Sospecha crítica de Fascitis Necrotizante, una emergencia quirúrgica a vida o muerte).'
      ],
      urgencia_default: 'ALTA',
      requiere_atencion: true
    },
    {
      id: 64,
      nombre: 'Tromboembolismo Pulmonar (TEP)',
      categoria: 'Respiratorio / Cardiovascular',
      sinonimos: ['coagulo en el pulmon', 'trombo en el pulmon', 'tep', 'falta de aire subita', 'dolor al respirar hondo repentino', 'infarto pulmonar'],
      descripcion: 'Obstrucción repentina e impactante de las arterias pulmonares, usualmente debido a un coágulo grande de sangre (trombo) que se ha desprendido y viajado desde las venas profundas de las piernas hasta los pulmones. Resulta en isquemia letal y sobrecarga inmediata del corazón.',
      causas_comunes: ['Trombosis Venosa Profunda (TVP) activa o previa en piernas', 'Inmovilización extrema prolongada (vuelos intercontinentales sin pararse, postración hospitalaria, yesos ortopédicos)', 'Tratamientos hormonales (anticonceptivos combinados) o embarazo', 'Pacientes con cáncer activo o cirugías mayores recientes'],
      cuidados_casa: [
        'ESTA ES UNA EMERGENCIA EXTREMADAMENTE GRAVE. No hay ningún tratamiento o cuidado que se deba intentar en casa.',
        'Mantener a la persona en reposo absoluto, sentada o recostada.',
        'NO PERMITIRLE CAMINAR, NI HACER EL MÁS MÍNIMO ESFUERZO. El esfuerzo físico dispara la demanda de oxígeno en un cuerpo que no lo puede suplir, llevando a paro cardíaco inmediato.',
        'Llamar al servicio de emergencias (ambulancia) de inmediato.'
      ],
      cuando_consultar: [
        'EMERGENCIA VITAL (Llamar 128 o acudir a Hospital inmediatamente).',
        'Aparición fulminante y sorpresiva de asfixia (disnea grave) sin motivo aparente, incluso estando en reposo.',
        'Dolor de pecho de características pleuríticas, es decir, una punzada muy intensa que empeora con el menor intento de tos o de tomar aire.',
        'Tos nueva asociada a expectoración repentina de sangre roja fresca (hemoptisis).',
        'Síncope (desmayo brusco) asociado a palpitaciones o si una de las pantorrillas del paciente está repentinamente gruesa, enrojecida y muy dolorosa.'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 65,
      nombre: 'Cetoacidosis Diabética (Complicación Crítica)',
      categoria: 'Endocrinología',
      sinonimos: ['azucar por las nubes', 'coma diabetico', 'cetoacidosis', 'cad', 'respiracion rapida por diabetes', 'aliento a manzana podrida', 'intoxicacion por azucar altisima'],
      descripcion: 'Descompensación metabólica severa, potencialmente letal, secundaria al déficit de insulina circulante (muy común en Diabetes Tipo 1). Ante la falta de insulina celular, el cuerpo metaboliza masivamente ácidos grasos, liberando compuestos tóxicos y muy ácidos (cuerpos cetónicos) en el torrente sanguíneo.',
      causas_comunes: ['Falta de aplicación u olvido prolongado de las dosis de insulina pautadas', 'Infección aguda subyacente que dispara los requerimientos de insulina (neumonía, infección urinaria, sepsis)', 'Debut no diagnosticado de Diabetes Tipo 1 (frecuente en jóvenes)', 'Uso de fármacos hiperglucemiantes potentes (corticoides a dosis altas)'],
      cuidados_casa: [
        'ESTADO PRE-COMA. Requiere manejo de Cuidados Intensivos (reanimación hídrica IV masiva, insulina continua, electrolitos como potasio).',
        'Si el paciente está 100% consciente, alerta y sin vómitos, puede ingerir abundante agua pura mientras es transportado de urgencia, para diluir la hiperglucemia.',
        'Monitorizar inmediatamente la glucemia capilar si se tiene glucómetro, y el nivel de cetonas urinarias si disponen de reactivos en casa.'
      ],
      cuando_consultar: [
        'EMERGENCIA VITAL: Vómitos intratables y dolor abdominal difuso (confundido muchas veces con apendicitis) en cualquier paciente diabético conocido.',
        'Alteración franca del patrón respiratorio: Respiraciones muy rápidas, profundas, ansiosas y trabajosas (Respiración de Kussmaul).',
        'Presencia de aliento muy peculiar, con olor dulce parecido a la fruta fermentada, manzana podrida o acetona/quitaesmalte.',
        'Signos de deshidratación celular extrema (lengua seca y áspera como lija, piel acartonada, ojos profundamente hundidos).',
        'Cualquier grado de alteración del estado de conciencia, desde confusión y letargo, hasta somnolencia profunda y coma diabético.'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 66,
      nombre: 'Úlcera Péptica Complicada (Sangrado o Perforación)',
      categoria: 'Digestivo',
      sinonimos: ['ulcera reventada', 'sangrado del estomago', 'hoyo en el estomago', 'dolor de estomago punzante mortal', 'vomito negro como petroleo', 'melena severa'],
      descripcion: 'Erosión grave, aguda y profunda en la mucosa del estómago o duodeno. Ha penetrado ya sea vasos sanguíneos arteriales grandes (causando hemorragia digestiva masiva) o ha erosionado toda la pared del órgano (causando perforación y peritonitis química fatal).',
      causas_comunes: ['Uso indiscriminado y crónico de analgésicos tipo AINEs (Ibuprofeno, Diclofenaco, Naproxeno) y Aspirina', 'Infección gástrica erosiva crónica por Helicobacter pylori no erradicada', 'Consumo masivo de alcohol combinado con tabaco', 'Tumores gástricos sangrantes'],
      cuidados_casa: [
        'Reposo gástrico absoluto: NADA POR LA BOCA, ni siquiera un sorbo de agua, jugos, ni pastillas de ningún tipo, hasta ser evaluado en un quirófano.',
        'Suspender permanentemente y de manera inmediata el consumo de cualquier AINE o Aspirina.',
        'Evitar el uso de "remedios caseros" como leche, bicarbonato, limón o antiácidos. Si existe una perforación gástrica, introducir fluidos al peritoneo causará un choque séptico casi irrecuperable.',
        'Trasladar en posición reclinada.'
      ],
      cuando_consultar: [
        'EMERGENCIA ABSOLUTA: Dolor abdominal superior o medio de inicio súbito, inaguantable, descrito a menudo como "una puñalada que atraviesa hacia la espalda".',
        'Abdomen extremadamente rígido "en tabla de madera", donde el paciente no tolera el más leve roce ni movimiento (Signos de irritación peritoneal).',
        'Vómitos muy abundantes de sangre fresca o con un aspecto negro/marrón granuloso (vómito en borra de café/posos de café).',
        'Heces sumamente pegajosas, de color negro brillante y con un olor fétido intenso característico (Melena), especialmente si se acompañan de desmayo (síncope) o sudor frío.'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 67,
      nombre: 'Neuralgia del Trigémino',
      categoria: 'Neurológico',
      sinonimos: ['dolor electrico en la cara', 'tic doloroso', 'calambre en la cara', 'choque electrico en la mandibula', 'neuralgia facial', 'dolor lancinante de ojo o cachete'],
      descripcion: 'Trastorno neuropático crónico severo del quinto par craneal (nervio trigémino). Produce cuadros paroxísticos de dolor facial insoportable, repentino y fulgurante, descrito usualmente como el equivalente a un choque de alto voltaje directo en la piel del rostro.',
      causas_comunes: ['Compresión vascular del nervio (un vaso sanguíneo latiendo y presionando el nervio craneal en la base del cerebro)', 'Esclerosis Múltiple (daño de mielina)', 'Degeneración nerviosa secundaria a la edad o trauma orofacial previo'],
      cuidados_casa: [
        'Identificar y evitar religiosamente las zonas o acciones "gatillo" (comer o masticar alimentos duros, cepillarse los dientes vigorosamente, afeitarse o exponer el rostro al viento muy frío y directo).',
        'Comprender que los analgésicos comunes de venta libre (Aspirina, Ibuprofeno, Acetaminofén) son completamente ineficaces y su abuso buscando alivio solo causará daño renal o gástrico.',
        'Consumir líquidos tibios y alimentos suaves si la masticación es el gatillo principal.',
        'Aplicar protección de la zona sensitiva.'
      ],
      cuando_consultar: [
        'El dolor alcanza un umbral tan severo que imposibilita al paciente para beber líquidos, ingerir alimentos, hablar o realizar su higiene básica, poniendo en riesgo agudo su nutrición e hidratación.',
        'Pérdida de la eficacia (taquifilaxia) a los fármacos neuromoduladores de rescate recetados (ej. Carbamazepina, Gabapentina o Pregabalina).',
        'Aparición nueva de entumecimiento permanente en la cara, caída del párpado o debilidad muscular facial (signos de que puede existir un tumor u otra lesión comprimiendo permanentemente el nervio).'
      ],
      urgencia_default: 'MEDIA',
      requiere_atencion: false
    },
    {
      id: 68,
      nombre: 'Sepsis / Infección Generalizada',
      categoria: 'Infeccioso / General',
      sinonimos: ['septicemia', 'infeccion en la sangre', 'sepsis', 'infeccion general', 'presion muy baja por infeccion', 'fiebre incontrolable con confusion', 'choque septico'],
      descripcion: 'Síndrome letal resultante de una respuesta inmunitaria extrema y desregulada a una infección, donde el cuerpo termina dañando sus propios tejidos y órganos. Evoluciona rápidamente a un colapso circulatorio (choque séptico) y fallo multiorgánico.',
      causas_comunes: ['Neumonías bacterianas comunitarias no tratadas o ignoradas', 'Infecciones urinarias severas en pacientes mayores o sondados', 'Procesos infecciosos intraabdominales agudos (Apendicitis perforada, Peritonitis)', 'Infecciones invasivas en heridas quirúrgicas extensas o catéteres intravenosos'],
      cuidados_casa: [
        'CONDICIÓN 100% INTRATABLE EN EL HOGAR. Todo intento de manejar la sepsis con remedios caseros aumenta exponencialmente el riesgo de muerte en cuestión de horas.',
        'El único cuidado válido es el reconocimiento hipertemprano de la triada de peligro (Alteración mental + Respiración rápida + Hipotensión) y el traslado inmediato a urgencias.'
      ],
      cuando_consultar: [
        'EMERGENCIA VITAL ABSOLUTA: Un paciente (especialmente niños pequeños o ancianos) con una infección conocida que súbitamente desarrolla comportamiento confuso, somnolencia extrema, letargo profundo o delirio incomprensible.',
        'La respiración se vuelve sumamente rápida (frecuencia respiratoria superior a 22 respiraciones por minuto) y superficial.',
        'Piel con signos de muy mala perfusión: fría, sudorosa, extremadamente pálida, o con la aparición de un patrón azulado/rojizo en red (moteado lívido de la piel).',
        'Caída profunda de la orina (paciente que no logra orinar nada en más de 12 a 18 horas).',
        'Tiritona severa, incontrolable, con fiebres muy altas o, paradójicamente y aún más grave, temperaturas corporales excesivamente bajas (Hipotermia < 36°C en un cuadro infeccioso).'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 69,
      nombre: 'Retención Aguda de Orina (Globo Vesical)',
      categoria: 'Urología',
      sinonimos: ['no puedo mear', 'globo vesical', 'vejiga reventada', 'retencion de orina severa', 'dolor en el bajo vientre por orina retenida', 'atasco urinario'],
      descripcion: 'Es la imposibilidad súbita, abrupta y extremadamente dolorosa de vaciar la vejiga, provocando un estiramiento forzado de las paredes vesicales y riesgo de reflujo urinario hacia los riñones.',
      causas_comunes: ['Agrandamiento de la próstata (Hiperplasia Prostática Benigna) en el varón adulto mayor', 'Consumo inadvertido de fármacos de venta libre (Antihistamínicos para alergia, Antigripales con pseudoefedrina, o fármacos antiespasmódicos potentes)', 'Obstrucción mecánica por coágulos post-cirugía urológica o cálculos uretrales', 'Compresión o daño neurológico de la columna lumbar (síndrome de cauda equina)'],
      cuidados_casa: [
        'BAJO NINGÚN CONCEPTO intente forzar al paciente a beber más líquidos para "estimular" la orina, esto aumentará exponencialmente la distensión y el dolor insoportable de la vejiga.',
        'Intente relajar la zona aplicando compresas moderadamente calientes o baños de asiento tibios sobre la pelvis inferior.',
        'Abandone y prohíba todo uso de pastillas antigripales o medicamentos para alergias que provocan retención urinaria.'
      ],
      cuando_consultar: [
        'EMERGENCIA UROLÓGICA: Cuando el paciente reporta dolor infraumbilical agudo asociado a más de 6-8 horas de incapacidad absoluta para orinar a pesar de tener un deseo (urgencia) desesperado.',
        'Si se logra palpar visual y físicamente un bulto redondeado, duro y tenso (tamaño de un melón) justo por debajo del ombligo (Globo vesical agudo).',
        'Asociación del cuadro con sudoración fría excesiva, picos de presión arterial alta, y agitación incontrolable por el propio dolor expansivo.',
        'Debe ser ingresado por emergencias de manera inmediata para la descompresión instrumental (cateterismo o paso de Sonda Foley) por personal médico.'
      ],
      urgencia_default: 'ALTA',
      requiere_atencion: true
    },
    {
      id: 70,
      nombre: 'Meningitis / Encefalitis Aguda',
      categoria: 'Neurológico / Infeccioso',
      sinonimos: ['meningitis', 'infeccion en el cerebro', 'fiebre altisima con cuello duro', 'inflamacion del cerebro y medula', 'dolor de cabeza que ciega con fiebre', 'fiebre y fotofobia extrema'],
      descripcion: 'Enfermedad infecciosa invasiva y de desarrollo rapidísimo que inflama las cubiertas protectoras del cerebro y médula espinal (Meninges) o el parénquima cerebral mismo (Encefalitis). Es una causa clásica de daño neurológico mortal si el diagnóstico se demora horas.',
      causas_comunes: ['Bacterias muy agresivas (Streptococcus pneumoniae, Neisseria meningitidis o Meningococo)', 'Virus neurotropos (Virus del Herpes Simple, Enterovirus)', 'Hongos invasivos (especialmente en pacientes con inmunodepresión o VIH no controlado)'],
      cuidados_casa: [
        'ENFERMEDAD QUE AMENAZA LA VIDA EN HORAS. El tiempo de retraso en la casa para dar tratamientos de fiebre aumentará directamente las probabilidades de muerte o discapacidad permanente.'
      ],
      cuando_consultar: [
        'EMERGENCIA ABSOLUTA DE SALUD PÚBLICA: Cuadro febril de aparición brutal, acompañado de un dolor de cabeza opresivo y explosivo, distinto a cualquier migraña conocida.',
        'Signo de Rigidez de Nuca evidente: El paciente presenta dolor y espasmo que imposibilitan física y completamente flexionar el cuello (es decir, tratar de pegar el mentón/barbilla contra su propio tórax).',
        'Aparición rápida de brotes en la piel como pequeñas manchas purpúricas o rojo oscuro (Petequias o Púrpura) que, al presionarlas con un cristal transparente o dedo, NO palidecen ni desaparecen (sugiere Meningococo masivo en sangre).',
        'Intolerancia visual dramática e invalidante frente a cualquier fuente de luz (Fotofobia severa) acompañada de confusión mental y somnolencia.',
        'Bebés pequeños y lactantes: Mollera (fontanela anterior) muy abultada y dura, llanto chillón, agudo e incesante, o aparición de fiebre inexplicable con total rechazo a la succión.'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 71,
      nombre: 'Choque Anafiláctico (Anafilaxia Sistémica)',
      categoria: 'Inmunología / Alergia',
      sinonimos: ['alergia mortal y fulminante', 'choque alergico', 'anafilaxia', 'garganta cerrada de golpe por alergia', 'asfixia aguda por alergia', 'hinchazon de cara y cuello subita'],
      descripcion: 'Es el grado más severo, peligroso y multisistémico de una reacción alérgica, desatada en segundos o escasos minutos posteriores a la exposición. Genera vasodilatación masiva (caída de la presión arterial letal) y edema laríngeo que cierra la vía aérea impidiendo respirar.',
      causas_comunes: ['Toxinas por picaduras/mordeduras (abejas, avispas, hormigas de fuego)', 'Alérgenos alimentarios altamente reactivos (cacahuates, frutos secos, mariscos, huevo, lácteos en algunos individuos)', 'Fármacos administrados IV o VO (Alergia conocida a Penicilinas, contrastes de yodo para rayos X, AINEs)'],
      cuidados_casa: [
        'Si el paciente cuenta con prescripción y porta su autoinyector de adrenalina (Epinefrina, EpiPen, Jext), DEBE ADMINISTRARSE INMEDIATAMENTE en la porción lateral y anterior (cara externa) del muslo sin demora. No existe ninguna contraindicación absoluta para usar adrenalina si se sospecha anafilaxia.',
        'Colocar rápidamente al paciente recostado sobre su espalda (decúbito supino) y elevar ambas piernas en alto, esto forzará mecánicamente que el flujo de sangre retorne al corazón y el cerebro para prevenir un paro (Posición de Trendelenburg modificado).',
        'Si el paciente está vomitando profusamente, tiene un colapso respiratorio evidente o está desmayado, colocarlo acostado firmemente sobre su lado izquierdo (posición de seguridad) para evitar la muerte por broncoaspiración del vómito.',
        'NUNCA ASUMA QUE LOS ANTIHISTAMÍNICOS (como la Loratadina, Dexclorfeniramina) o corticoides orales van a ser suficientes para frenar la anafilaxia. Tardan más de 40 minutos en actuar, tiempo que puede resultar en paro cardiorrespiratorio.'
      ],
      cuando_consultar: [
        'EMERGENCIA EXTREMA Y PRIORITARIA (Notificar de inmediato al 128 o trasladar a emergencias).',
        'Inicio agudo de dificultad asfixiante para ingresar aire, silbidos ásperos en el pecho o sensación real de estrangulamiento de la vía aérea.',
        'Percepción angustiante de la presencia de un "nudo o bulto gigante en la garganta" con imposibilidad completa de tragar la propia saliva, y voz apagada o ronca (edema glótico).',
        'Hinchazón deformante, veloz e impresionante de los labios, la totalidad del rostro, la lengua y los párpados.',
        'Síncope instantáneo, caída redonda, palidez blanca/grisácea de todo el cuerpo, pulso rapidísimo e imperceptible (indicativos del inicio del colapso vascular periférico).'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 72,
      nombre: 'Obstrucción Intestinal Completa / Íleo Paralítico',
      categoria: 'Digestivo',
      sinonimos: ['tripas trabadas y cruzadas', 'obstruccion intestinal severa', 'no echo gases ni defeco nada', 'intestino cerrado', 'vomito negro con olor a caca fecal', 'ileo', 'abdomen inflado como tambor a tension'],
      descripcion: 'Interrupción o bloqueo crítico que impide que el contenido digestivo, los líquidos y los gases avancen de manera normal a través del tubo intestinal. Puede deberse a un impedimento anatómico (mecánico) o un fallo en los nervios del intestino (parálisis o íleo), induciendo dilatación extrema y peligro de necrosis o perforación intestinal de las vísceras.',
      causas_comunes: ['Múltiples adherencias, cicatrices internas o "bridas" formadas tras cirugías abdominales mayores antiguas (cesáreas pasadas, apendicectomías)', 'Atrapamiento e isquemia dentro de un saco de hernia externa estrangulada (ej. hernia umbilical o inguinal que no se reduce)', 'Crecimientos o neoplasias malignas que taponan la luz del colon (Cáncer colorrectal de progresión tardía)', 'Oclusión crónica y masiva por heces resecas (Fecaloma masivo en el recto de pacientes seniles)'],
      cuidados_casa: [
        'SUSPENSIÓN INCONDICIONAL Y ESTRICTA de la vía oral: Está formal y críticamente contraindicado forzar o alentar al paciente a consumir ningún tipo de sólido ni líquido, ya que todo se regurgitará e incrementará el riesgo gravísimo de broncoaspiración (ingresar fluido gástrico a los pulmones al vomitar).',
        'PROHIBICIÓN TOTAL DE AUTOMEDICACIÓN LAXANTE (Ciruelas, Sen, Bisacodilo) o ENEMAS DE LIMPIEZA EXTREMOS caseros sin antes contar con luz verde médica. Si hay una obstrucción completa rígida, el purgante causará un aumento brutal de presión dentro del segmento obstruido y reventará la pared del colon, provocando peritonitis generalizada fatal.',
        'Tampoco administrar analgésicos narcóticos o narcóticos opioides, puesto que frenan aún más el movimiento normal peristáltico del intestino.'
      ],
      cuando_consultar: [
        'URGENCIA MÉDICA Y POTENCIALMENTE QUIRÚRGICA INMINENTE.',
        'Cese abrupto y total del paso de deposiciones y, característicamente, la imposibilidad de expulsar gases intestinales (flatos) durante un periodo continuo de 24 a 48 horas o más.',
        'Instauración de dolor abdominal intermitente sumamente intenso, "tipo retorcijón" o calambre severo, que con el paso de las horas comienza a hacerse constante y progresivamente insoportable.',
        'El abdomen presenta una distensión grosera; a la simple inspección visual, la pared del abdomen luce altamente tensa y "redondeada como un globo o tambor", a veces permitiendo la visualización de los propios bucles del intestino peleando debajo de la piel por vencer la obstrucción.',
        'Aparición de vómitos recurrentes y biliosos que en las etapas más avanzadas y críticas asumen un franco color pardo-marrón muy fétido con características fecales (Vómito Fecaloideo), indicativo indiscutible de obstrucción baja avanzada.'
      ],
      urgencia_default: 'ALTA',
      requiere_atencion: true
    },
    {
      id: 73,
      nombre: 'Apendicitis Aguda',
      categoria: 'Cirugía / Digestivo',
      sinonimos: ['dolor en la ingle derecha', 'apendice', 'dolor agudo lado derecho', 'punzadas lado derecho bajo', 'apendicitis'],
      descripcion: 'Inflamación aguda del apéndice cecal. Constituye la urgencia quirúrgica abdominal más frecuente. Inicia como dolor mal definido alrededor del ombligo que posteriormente migra y se focaliza intensamente en la fosa ilíaca derecha.',
      causas_comunes: ['Obstrucción de la luz apendicular por fecalitos', 'Hiperplasia linfoide (en niños y jóvenes)', 'Parásitos intestinales', 'Cuerpos extraños ingeridos'],
      cuidados_casa: [
        'PROHIBICIÓN ABSOLUTA de ingerir analgésicos (Ibuprofeno, Paracetamol), antiespasmódicos o antibióticos, ya que enmascaran la progresión del dolor y retrasan el diagnóstico vital.',
        'Suspender inmediatamente la vía oral (no comer ni beber nada de líquidos) en preparación para una inminente intervención quirúrgica y anestesia general.',
        'NO aplicar calor local en el abdomen, esto promueve la vasodilatación y acelera el riesgo de que el apéndice reviente (perforación).'
      ],
      cuando_consultar: [
        'EMERGENCIA QUIRÚRGICA: Dolor constante que migra hacia la parte inferior derecha del abdomen, haciéndose insoportable al caminar o saltar.',
        'Dolor agudísimo al soltar bruscamente la presión ejercida por una mano sobre el abdomen (Signo de Blumberg o de rebote positivo).',
        'Acompañado de náuseas, vómitos, fiebre de bajo grado (37.8-38.5°C) y pérdida absoluta del apetito.',
        'El paciente prefiere mantenerse acostado con las piernas encogidas hacia el pecho (posición fetal antálgica).'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 74,
      nombre: 'Preeclampsia / Eclampsia (Hipertensión en Embarazo)',
      categoria: 'Obstetricia',
      sinonimos: ['presion alta en embarazo', 'preeclampsia', 'eclampsia', 'dolor de cabeza embarazada', 'zumbido de oidos en embarazo', 'veo lucecitas embarazada'],
      descripcion: 'Trastorno hipertensivo gravísimo del embarazo (generalmente a partir de la semana 20 de gestación) caracterizado por hipertensión arterial severa, daño orgánico (falla renal/hepática) y alto riesgo de convulsiones maternas (Eclampsia) o muerte fetal.',
      causas_comunes: ['Disfunción placentaria vascular endémica', 'Primer embarazo (Nuliparidad)', 'Obesidad o hipertensión crónica previa', 'Embarazos múltiples (gemelares)'],
      cuidados_casa: [
        'NO HAY TRATAMIENTO EN CASA. Es la principal causa de mortalidad materna en Nicaragua y requiere atención hospitalaria inmediata.',
        'Mantener a la paciente gestante en completo reposo, preferiblemente acostada sobre su lado izquierdo (decúbito lateral izquierdo) para mejorar el flujo de sangre a la placenta.',
        'Medir inmediatamente la presión arterial si se cuenta con tensiómetro. Una cifra mayor a 140/90 mmHg ya es señal de alarma, y >160/110 mmHg es una emergencia crítica.'
      ],
      cuando_consultar: [
        'EMERGENCIA OBSTÉTRICA ABSOLUTA (Código Rojo): Presencia de dolor de cabeza muy fuerte en la frente o nuca que no se quita.',
        'Aparición de zumbido de oídos (tinnitus) o visión de "lucecitas/chispas" brillantes o visión borrosa (fotopsias).',
        'Dolor intenso en "la boca del estómago" (epigastrio) o debajo de las costillas del lado derecho (sugiere daño en el hígado / Síndrome HELLP).',
        'Hinchazón repentina y masiva de la cara, manos y piernas (edema generalizado).',
        'Aparición de convulsiones o temblores (Eclampsia).'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 75,
      nombre: 'Hemorragia Postparto Tardía',
      categoria: 'Obstetricia / Ginecología',
      sinonimos: ['sangrado despues de dar a luz', 'hemorragia postparto', 'se me vino un sangrado fuerte recien parida', 'coagulos gigantes despues del parto', 'debilidad por sangrado de parto'],
      descripcion: 'Sangrado vaginal excesivo (>500-1000 mL) que ocurre entre 24 horas y hasta 12 semanas después del parto. Pone a la madre en riesgo extremo de choque hipovolémico y muerte por desangramiento.',
      causas_comunes: ['Retención de restos placentarios en el útero', 'Falta de contracción del útero (Atonía uterina secundaria)', 'Infección del útero (Endometritis)', 'Desgarros no suturados o que se han re-abierto'],
      cuidados_casa: [
        'ESTA CONDICIÓN MATA RÁPIDO SI SE IGNORA. Llamar a emergencias inmediatamente.',
        'Acostar a la madre en posición completamente plana, y elevarle las piernas por encima del nivel del pecho para forzar la sangre hacia el cerebro y el corazón.',
        'NO darle a tomar remedios caseros, ni comida, ni agua si está confundida o muy débil (riesgo de asfixia o necesidad de cirugía).',
        'Si hay personal capacitado o si el médico lo indicó por teléfono, masajear firmemente el abdomen inferior (el vientre) para ayudar al útero a contraerse.'
      ],
      cuando_consultar: [
        'EMERGENCIA OBSTÉTRICA VITAL: Sangrado rojo brillante, fresco y abundante (empapar más de una toalla nocturna o pañal de tela en una hora).',
        'Expulsión de coágulos de sangre más grandes que un limón o una pelota de golf.',
        'Signos de que se está quedando sin sangre: la paciente se pone pálida o gris, fría, sudorosa, tiene mareos severos, taquicardia o pierde la conciencia.',
        'El sangrado se acompaña de fiebre, escalofríos y flujo vaginal con un olor extremadamente fétido a podrido (infección).'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 76,
      nombre: 'Mastitis Puerperal (Infección de Seno)',
      categoria: 'Obstetricia / Ginecología',
      sinonimos: ['pecho rojo en lactancia', 'seno caliente y duro', 'mastitis', 'infeccion en la chiche', 'dolor al dar pecho con fiebre', 'pecho empedrado infectado'],
      descripcion: 'Inflamación e infección del tejido mamario, usualmente secundaria a la acumulación y estancamiento de leche (congestión), lo que permite que las bacterias (generalmente Staphylococcus) entren por las grietas del pezón.',
      causas_comunes: ['Mala técnica de agarre del bebé al amamantar', 'Vaciado incompleto del pecho', 'Grietas o heridas en el pezón', 'Destete abrupto o uso de sostenes excesivamente apretados'],
      cuidados_casa: [
        'LO MÁS IMPORTANTE: ¡NO dejar de dar de mamar! Debe continuar amamantando del pecho afectado o usar un extractor; el vaciado constante es el tratamiento clave y la leche NO está envenenada para el bebé.',
        'Aplicar compresas tibias o húmedas sobre el seno antes de amamantar para facilitar la salida de la leche.',
        'Aplicar compresas frías DESPUÉS de amamantar para reducir la hinchazón y el dolor.',
        'Masajear suavemente el bulto duro en dirección al pezón mientras el bebé succiona.',
        'Tomar Paracetamol o Ibuprofeno para el dolor y la fiebre, ambos son seguros durante la lactancia.'
      ],
      cuando_consultar: [
        'Aparición de fiebre alta (>38.5°C), escalofríos intensos y malestar de cuerpo "como si le fuera a dar gripe".',
        'El seno presenta una mancha en forma de cuña que está intensamente roja, dura, caliente y muy dolorosa al tacto.',
        'Los síntomas no mejoran o empeoran dramáticamente tras 24 horas de intentar vaciar el pecho y masajearlo.',
        'Aparición de un bulto que se siente lleno de líquido, con piel brillante o secreción de pus evidente por el pezón (sospecha de Absceso Mamario).'
      ],
      urgencia_default: 'ALTA',
      requiere_atencion: true
    },
    {
      id: 77,
      nombre: 'Bronquiolitis Pediátrica',
      categoria: 'Pediatría / Respiratorio',
      sinonimos: ['bebe ahogado', 'silbido de pecho en bebe', 'bronquiolitis', 'moco y asfixia en bebe', 'respiracion rapida en niño', 'hundimiento de costillas bebe', 'vrs'],
      descripcion: 'Infección viral aguda y severa de las vías respiratorias bajas (bronquiolos) en lactantes y niños menores de 2 años. Provoca inflamación, moco abundante y broncoespasmo que dificulta gravemente la entrada de oxígeno.',
      causas_comunes: ['Virus Sincitial Respiratorio (VRS) - causa del 80% de los casos', 'Rinovirus, Adenovirus, Parainfluenza', 'Complicación de un resfriado común previo'],
      cuidados_casa: [
        'Lavados nasales frecuentes con Suero Fisiológico y aspiración de secreciones antes de alimentar o dormir al bebé, ya que los lactantes respiran casi exclusivamente por la nariz.',
        'Mantener al bebé muy bien hidratado; ofrecer leche materna, fórmula o líquidos en cantidades pequeñas y de manera muy frecuente.',
        'Mantener al niño en posición semi-sentada (ángulo de 30-40 grados) para facilitar la mecánica de su respiración.',
        'Control estricto de la fiebre con Paracetamol pediátrico.',
        'NO dar jarabes para la tos de adultos, antihistamínicos ni descongestionantes, están contraindicados y son peligrosos.'
      ],
      cuando_consultar: [
        'EMERGENCIA PEDIÁTRICA: El bebé respira extremadamente rápido (más de 60 respiraciones por minuto) de forma constante.',
        'Signos claros de dificultad respiratoria: aleteo nasal (las fosas nasales se abren exageradamente) o "tirajes" (la piel se hunde entre y debajo de las costillas y cuello con cada respiración).',
        'El bebé está letárgico, no quiere despertar, no juega o rechaza totalmente tomar pecho o biberón por su ahogo.',
        'Cianosis: Coloración morada, azulada o grisácea alrededor de los labios, en la lengua o en las uñas.',
        'Pausas respiratorias largas (Apnea) donde el bebé deja de respirar por varios segundos.'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 78,
      nombre: 'Crup (Laringotraqueítis Aguda)',
      categoria: 'Pediatría / Respiratorio',
      sinonimos: ['tos de perro', 'tos perruna', 'crup', 'estridor', 'ronquera aguda en nino', 'nino ahogado de noche', 'tos de foca'],
      descripcion: 'Enfermedad respiratoria aguda predominantemente infantil caracterizada por inflamación de la laringe, la tráquea y cuerdas vocales. Típicamente ataca de noche y produce una tos muy peculiar ("metálica").',
      causas_comunes: ['Virus Parainfluenza', 'Infecciones virales respiratorias comunes invernales'],
      cuidados_casa: [
        'Mantener la máxima calma posible; la ansiedad y el llanto del niño empeoran enormemente el espasmo de la garganta y la asfixia.',
        'Llevar al niño al baño, cerrar la puerta, abrir la ducha con agua muy caliente para crear un ambiente lleno de vapor y que el niño respire ese vapor por 10-15 minutos (Humidificación).',
        'Alternativa: Si la noche es fría, sacar al niño bien abrigado a respirar el aire frío del exterior por unos minutos (el frío disminuye el edema de la vía aérea de inmediato).',
        'Controlar la fiebre con Paracetamol para evitar taquicardia.'
      ],
      cuando_consultar: [
        'EMERGENCIA PEDIÁTRICA: Se escucha un sonido áspero, rudo y agudo cada vez que el niño TOMA AIRE (esto se llama "Estridor Inspiratorio" e indica que la vía se está cerrando por completo).',
        'El niño no puede hablar ni llorar por la falta de aire, o babea excesivamente porque le duele tragar.',
        'Signos de ahogo severo: hundimiento del pecho o cuello al respirar (tirajes), palidez o coloración azulada de labios.',
        'Si tras aplicar vapor y aire frío durante 20 minutos el cuadro no mejora en absoluto.'
      ],
      urgencia_default: 'ALTA',
      requiere_atencion: true
    },
    {
      id: 79,
      nombre: 'Deshidratación Severa Infantil',
      categoria: 'Pediatría',
      sinonimos: ['nino deshidratado', 'mollerita hundida', 'llanto sin lagrimas', 'no orina el bebe', 'ojos hundidos bebe', 'letargo diarrea'],
      descripcion: 'Pérdida crítica de agua y electrolitos corporales en un lactante o niño pequeño, casi siempre como consecuencia de un cuadro severo de gastroenteritis (vómitos y diarrea continuos).',
      causas_comunes: ['Gastroenteritis aguda (Rotavirus, bacteriana)', 'Vómitos incoercibles', 'Fiebre muy alta sin reposición de líquidos', 'Exposición a calor extremo'],
      cuidados_casa: [
        'NO HAY CUIDADOS CASEROS SEGUROS PARA LA DESHIDRATACIÓN SEVERA. Todo intento oral puede fallar y el niño morirá si no recibe reanimación.',
        'Para casos MODERADOS ANTES de llegar a ser severos: administrar Sales de Rehidratación Oral (SRO) en pequeñas cucharaditas (5 ml) cada minuto constante.',
        'Continuar ofreciendo el pecho si es lactante, no suspender la lactancia bajo ningún concepto.',
        'Nunca dar al niño bebidas deportivas, jugos artificiales, té o agua pura a borbotones (agravan la diarrea y el desequilibrio de sales).'
      ],
      cuando_consultar: [
        'EMERGENCIA PEDIÁTRICA VITAL: El bebé tiene la fontanela ("mollera") en la cabeza profundamente hundida.',
        'Ausencia de lágrimas al llorar y ojos muy secos, hundidos y sin brillo (enoftalmos).',
        'Pañales secos: El niño no ha orinado nada en las últimas 6 a 8 horas (pañal completamente seco).',
        'La boca y la lengua están ásperas, pegajosas y como lija.',
        'El nivel de conciencia se deteriora: el bebé no responde a estímulos, está letárgico, como si estuviera "desmayado" o no pudiera despertar.'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 80,
      nombre: 'Intoxicación por Órganofosforados (Pesticidas)',
      categoria: 'Toxicología / Emergencias',
      sinonimos: ['envenenado por veneno de monte', 'intoxicacion por pesticida', 'olor a ajo sudor', 'babaza por veneno', 'intoxicado con gramoxone', 'sindrome colinergico'],
      descripcion: 'Envenenamiento agudo y letal por la exposición (inhalada, cutánea o ingerida) a pesticidas/insecticidas agrícolas muy comunes en Nicaragua (ej. Malatión, Paratión). Provoca una crisis parasimpática (síndrome colinérgico).',
      causas_comunes: ['Accidente laboral en campo agrícola por fumigación sin protección', 'Intento autolítico (suicidio) por ingestión intencional', 'Contaminación accidental de alimentos o agua en zonas rurales'],
      cuidados_casa: [
        'PROTEGERSE A SÍ MISMO: El rescatador debe usar guantes de goma o bolsas plásticas antes de tocar al paciente, ya que el veneno se absorbe rápidamente a través de la piel.',
        'Remover INMEDIATAMENTE toda la ropa contaminada del paciente y lavarle la piel y el cabello copiosamente con abundante agua y jabón.',
        'Si el veneno fue ingerido (tragado) recientemente y el paciente está 100% CONSCIENTE, no inducir el vómito si no se está seguro de qué químico fue, priorizar el traslado.',
        'No dar a beber leche, aceite ni ningún remedio casero, ya que pueden acelerar la absorción del tóxico en el intestino.'
      ],
      cuando_consultar: [
        'EMERGENCIA TOXICOLÓGICA CRÍTICA: Trasladar de urgencia a un hospital, si es posible llevando la etiqueta o el frasco del producto venenoso.',
        'El paciente produce cantidades industriales de fluidos: lagrimeo, sudoración empapante, orina y diarrea incontrolable, y baba/saliva excesiva que obstruye la garganta (Broncorrea).',
        'Pupilas puntiformes (extremadamente pequeñas, del tamaño del ojo de una aguja).',
        'Músculos que tiemblan de forma involuntaria bajo la piel (Fasciculaciones), seguidos de debilidad total o convulsiones.',
        'Dificultad respiratoria extrema y ritmo cardíaco muy lento.'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 81,
      nombre: 'Ofidismo (Mordedura de Serpiente Venenosa)',
      categoria: 'Toxicología / Emergencias',
      sinonimos: ['mordedura de culebra', 'mordido por barba amarilla', 'picadura de serpiente', 'ofidismo', 'mordedura de cascabel', 'sangrado por mordida'],
      descripcion: 'Envenenamiento causado por la mordedura de serpientes viperidas (Barba Amarilla/Terciopelo, Cascabel, Tamagás) o elapidas (Coral). Produce daño masivo a los tejidos (necrosis) y alteraciones mortales en la coagulación sanguínea.',
      causas_comunes: ['Encuentro accidental durante labores agrícolas en zonas rurales', 'Caminar de noche o entre maleza sin botas ni protección', 'Manipular serpientes (incluso si parecen muertas)'],
      cuidados_casa: [
        'ESTRICTAMENTE PROHIBIDO: NO hacer cortes en cruz sobre los colmillos, NO succionar el veneno con la boca, NO quemar la herida, NO poner hielo.',
        'PROHIBIDO EL TORNIQUETE: No amarrar cuerdas, cordones o fajas por encima de la mordida. Esto concentrará el veneno destruyendo la extremidad hasta causar amputación.',
        'Mantener a la persona en completo reposo y calma (el pánico acelera los latidos y distribuye el veneno más rápido).',
        'Lavar la herida suavemente con agua y jabón, retirar anillos, pulseras o relojes inmediatamente antes de que el miembro se hinche, e inmovilizar el brazo o pierna mordido a nivel del corazón.',
        'Trasladar rápidamente. Si es seguro, tomar una foto de la serpiente, pero no arriesgarse a capturarla.'
      ],
      cuando_consultar: [
        'EMERGENCIA VITAL: TODA MORDEDURA de serpiente desconocida o venenosa requiere suero antiofídico hospitalario.',
        'Hinchazón extremadamente rápida de la pierna o el brazo que sube visiblemente cada pocos minutos.',
        'Dolor fulgurante y aparición de ampollas gigantes, a menudo con sangre adentro (Flictenas hemorrágicas) en la zona mordida.',
        'Aparición de sangrado espontáneo por las encías, la nariz, en la orina o en heridas previas (falla total de la coagulación).',
        'Visión doble, párpados caídos o dificultad para tragar (típico de veneno neurotóxico, como la serpiente Coral o de Cascabel).'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 82,
      nombre: 'Artritis Séptica (Infección Articular)',
      categoria: 'Traumatología / Infeccioso',
      sinonimos: ['articulacion infectada', 'rodilla inflamada con fiebre', 'artritis septica', 'pus en la rodilla', 'dolor insoportable coyuntura fiebre', 'hinchazon extrema articulacion'],
      descripcion: 'Infección bacteriana directa, altamente destructiva y rápidamente progresiva dentro de la cavidad de una articulación (usualmente rodilla o cadera). Si no se drena quirúrgicamente y se trata con antibióticos en horas, destruye el cartílago dejando daño irreversible.',
      causas_comunes: ['Bacterias (Staphylococcus aureus) que llegan por la sangre desde otra infección', 'Traumatismo penetrante directo en la articulación (pisotear un clavo, espina)', 'Inoculación accidental post-inyección articular'],
      cuidados_casa: [
        'NO HAY TRATAMIENTO EN CASA. Se requiere ingreso hospitalario urgente para aspiración (artrocentesis) y lavado quirúrgico.',
        'Inmovilizar absolutamente la extremidad en la posición en la que el paciente sienta menos dolor.',
        'NO aplicar cremas, hielo ni calor vigoroso intentando aliviar; no intente masajear la zona bajo ninguna circunstancia.',
        'Suspender el consumo de analgésicos en casa para no ocultar la fiebre y la gravedad ante la evaluación médica inminente.'
      ],
      cuando_consultar: [
        'EMERGENCIA ORTOPÉDICA: Dolor articular que aparece de forma súbita, siendo tan atroz que el paciente no soporta que ni siquiera le toquen o muevan la pierna un milímetro.',
        'La articulación afectada está visiblemente enorme, tensa, enrojecida y excepcionalmente caliente al tacto comparada con el lado sano.',
        'Incapacidad total, absoluta y súbita para apoyar peso sobre la pierna o mover el brazo.',
        'Acompañado de un cuadro de fiebre alta en picos y escalofríos intensos.'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 83,
      nombre: 'Trauma Ocular / Abrasión Corneal',
      categoria: 'Oftalmología / Trauma',
      sinonimos: ['golpe en el ojo', 'ojo rayado', 'basura en el ojo que no sale', 'quimico en el ojo', 'ojo rojo por golpe', 'rasguno en el ojo', 'trauma ocular'],
      descripcion: 'Lesión traumática en la estructura del globo ocular, que puede ir desde un raspón superficial en la córnea (abrasión) hasta un estallido del ojo, cuerpos extraños clavados o quemaduras químicas.',
      causas_comunes: ['Impactos directos (pelotas, puñetazos, ramas)', 'Cuerpos extraños (virutas de metal al soldar sin gafas, arena, aserrín)', 'Salpicadura accidental de sustancias químicas (ácido de batería, lejía, cloro, detergentes)', 'Arañazos con uñas o papel'],
      cuidados_casa: [
        'QUEMADURAS QUÍMICAS: Constituyen la única emergencia ocular en la que se debe actuar ANTES de ir al médico. Lavar el ojo inmediatamente, a chorro continuo con abundante agua limpia o suero durante 15-20 minutos seguidos, manteniendo el ojo forzadamente abierto.',
        'PARA GOLPES O CUERPOS EXTRAÑOS: NO frotar el ojo bajo ninguna circunstancia, ya que un cuerpo extraño incrustado rayará y destruirá la córnea.',
        'NO intente extraer ningún objeto que parezca estar clavado en el ojo con pinzas o algodón.',
        'Colocar un protector rígido sobre el ojo (como la base de un vaso de plástico cortado) apoyado en el hueso sin presionar el globo, y acudir al hospital.'
      ],
      cuando_consultar: [
        'EMERGENCIA VITAL PARA LA VISIÓN: Toda salpicadura de sustancia química corrosiva tras el lavado copioso.',
        'Todo traumatismo que produzca un dolor ocular profundo, sensación de punzada constante y fotofobia extrema (no tolera la luz).',
        'Cambio en la forma de la pupila (se ve como una "gota" o lágrima apuntando hacia una herida en lugar de ser redonda).',
        'Sangre acumulada de forma visible por detrás de la parte transparente del ojo (Hifema).',
        'Pérdida de la visión o visión doble inmediata tras el golpe.'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 84,
      nombre: 'Peritonitis Aguda',
      categoria: 'Cirugía / Digestivo',
      sinonimos: ['abdomen duro', 'infeccion en todo el estomago', 'peritonitis', 'dolor de estomago mortal', 'abdomen de madera', 'panza tiesa por infeccion'],
      descripcion: 'Inflamación gravísima y generalizada del peritoneo (la membrana que recubre todos los órganos abdominales). Generalmente ocurre cuando un órgano infectado se rompe, derramando pus, heces o ácido gástrico en la cavidad estéril del abdomen.',
      causas_comunes: ['Apendicitis aguda que se revienta (perforada)', 'Úlcera gástrica perforada', 'Diverticulitis perforada', 'Traumatismo abdominal penetrante (arma blanca, disparo) o contuso grave (accidente)'],
      cuidados_casa: [
        'ES UNA CONDICIÓN MORTAL SIN CIRUGÍA INMEDIATA. No existen remedios caseros.',
        'NADA por la boca. No permitir al paciente beber agua, comer o tomar pastillas analgésicas o tés. Cualquier líquido introducido se fugará por el órgano roto hacia el peritoneo y empeorará la peritonitis.',
        'Mantener al paciente en completo reposo, preferiblemente con las rodillas dobladas (posición antálgica) mientras llega la ambulancia.'
      ],
      cuando_consultar: [
        'EMERGENCIA QUIRÚRGICA INMINENTE: Dolor abdominal continuo, expansivo y atroz que abarca todo el abdomen.',
        'El abdomen se siente rígido e implacable como una "tabla de madera" a la simple palpación, y el paciente no puede relajar los músculos del vientre.',
        'El dolor es tan intenso que el paciente rechaza moverse en lo absoluto, pues toser, estornudar o el simple traqueteo del carro en el camino al hospital le causa un dolor desgarrador.',
        'Acompañado de fiebre altísima, pulso acelerado, piel fría, sudorosa y vómitos fecaloideos o biliares (signos de choque).'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 85,
      nombre: 'Infarto de Miocardio Atípico (Mujeres y Diabéticos)',
      categoria: 'Cardiovascular',
      sinonimos: ['infarto oculto', 'ataque al corazon en mujer', 'infarto sin dolor de pecho', 'infarto diabetico', 'falta de aire extrema de la nada', 'fatiga mortal repentina'],
      descripcion: 'Oclusión de una arteria coronaria que provoca la muerte del músculo cardíaco, pero que se presenta SIN el clásico dolor de pecho aplastante, confundiendo al paciente. Es sumamente frecuente y peligroso en mujeres, ancianos y diabéticos.',
      causas_comunes: ['Aterosclerosis coronaria', 'Diabetes crónica de larga data que causa daño a los nervios del corazón (Neuropatía autonómica)', 'Hipertensión descontrolada'],
      cuidados_casa: [
        'Si el paciente sospecha un infarto y ya tiene recetado Nitroglicerina, debe tomar su dosis. Si no, y no tiene alergia, Masticar media aspirina de adulto (o 2 aspirinas para niño/cardio) puede ganar tiempo crucial.',
        'Detener INMEDIATAMENTE toda actividad física, sentar a la persona y aflojar ropas.',
        'Trasladar rápidamente al hospital más cercano preferiblemente en ambulancia.'
      ],
      cuando_consultar: [
        'EMERGENCIA VITAL: Súbita e inexplicable falta de aire (asfixia) que ocurre estando en reposo, o fatiga tan extrema que el paciente siente que va a colapsar si da un paso más.',
        'Aparición de dolor sordo o ardor en la "boca del estómago" (epigastrio) que no cede con antiácidos y se confunde con indigestión.',
        'Sudoración fría profusa y pegajosa sin motivo aparente (diaforesis fría).',
        'Dolor inusual que se irradia a la espalda, entre los omóplatos, hacia el cuello o a la mandíbula inferior, a veces acompañado de náuseas o mareo inminente.'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 86,
      nombre: 'Edema Agudo de Pulmón',
      categoria: 'Cardiovascular / Respiratorio',
      sinonimos: ['pulmones llenos de agua', 'ahogo total', 'falla cardiaca aguda', 'no puedo respirar acostado', 'asfixia y tos rosada', 'insuficiencia cardiaca severa'],
      descripcion: 'Acumulación masiva y súbita de líquido (agua) en los alvéolos de los pulmones, impidiendo la oxigenación. Usualmente originado porque el corazón ha perdido abruptamente la fuerza para bombear sangre, haciendo que la presión de las venas regrese agua a los pulmones.',
      causas_comunes: ['Fallo cardíaco descompensado (Insuficiencia Cardíaca Congestiva)', 'Infarto agudo de miocardio extenso', 'Crisis hipertensiva crítica', 'Sobrecarga masiva de líquidos (falla renal)'],
      cuidados_casa: [
        '¡MANTENER AL PACIENTE SENTADO CON LAS PIERNAS COLGANDO HACIA ABAJO! Nunca acostarlo; la posición horizontal hará que el líquido inunde completamente los pulmones y el paciente morirá ahogado en minutos.',
        'Intentar mantener al paciente tranquilo, ya que el pánico extremo por asfixia empeora la demanda de oxígeno.',
        'Llamar de emergencia a una ambulancia equipada con oxígeno. Si es posible el traslado por medios propios, hacerlo con el paciente sentado en 90 grados.'
      ],
      cuando_consultar: [
        'EMERGENCIA VITAL INMINENTE: Aparición brutal y fulminante de dificultad respiratoria y asfixia, que es mucho peor cuando el paciente intenta acostarse (Ortopnea severa).',
        'Respiración muy ruidosa, con sonidos de "hervor" o burbujeo que se escuchan a distancia, como si el pecho fuera una tetera hirviendo.',
        'Tos persistente y desesperada que empieza a producir flema espumosa de color rosado o teñida de sangre.',
        'El paciente presenta un nivel de pánico y agitación extremo, con la piel cianótica (morada), sudando a mares y sintiendo que se muere de ahogo.'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 87,
      nombre: 'Estado Epiléptico (Status Epilepticus)',
      categoria: 'Neurológico',
      sinonimos: ['ataque epileptico que no para', 'convulsiones seguidas', 'status epileptico', 'se quedo trabado en la convulsion', 'ataque cerebral infinito'],
      descripcion: 'Emergencia neurológica crítica en la que una convulsión dura más de 5 minutos, o cuando un paciente sufre múltiples convulsiones consecutivas sin recuperar la conciencia entre ellas. El daño cerebral irreversible o la muerte pueden ocurrir por hipoxia y exceso de actividad eléctrica.',
      causas_comunes: ['Abandono de la medicación antiepiléptica', 'Trauma craneal severo', 'Infección del sistema nervioso central (Meningitis/Encefalitis)', 'Alteraciones metabólicas graves (Sodio o glucosa bajos)'],
      cuidados_casa: [
        '¡LLAMAR A UNA AMBULANCIA! El status epilepticus solo se detiene con medicamentos intravenosos potentes (Diazepam/Midazolam) administrados por médicos.',
        'Girar a la persona de lado inmediatamente (Posición de seguridad) para evitar que aspire su propia saliva o vómito.',
        'Proteger la cabeza poniéndola sobre algo blando, retirar objetos cercanos con los que pueda golpearse.',
        'NO meter cucharas, trapos ni los propios dedos en la boca del paciente bajo ninguna circunstancia. NO intentar amarrarlo o someter sus movimientos con fuerza.'
      ],
      cuando_consultar: [
        'EMERGENCIA VITAL: Una convulsión espasmódica tónico-clónica que ha superado el umbral crítico de los 5 minutos de duración.',
        'El paciente termina de convulsionar, no despierta, y al cabo de unos minutos vuelve a iniciar un nuevo cuadro convulsivo.',
        'Coloración gris o morada profunda de todo el rostro y los labios debido a la falla respiratoria sostenida durante las contracciones.',
        'Fiebre extremadamente alta acompañando el cuadro de convulsiones continuas.'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 88,
      nombre: 'Sangrado Digestivo Bajo (Hematoquecia)',
      categoria: 'Gastroenterología',
      sinonimos: ['sangrado rectal masivo', 'cagando sangre viva', 'hematoquecia', 'hemorragia por el ano', 'excremento con charco de sangre', 'coagulos por el recto'],
      descripcion: 'Pérdida de sangre roja viva o marrón granate, a menudo en forma de coágulos, a través del recto (ano). Generalmente se origina en el colon, el recto o el ano, y en casos severos puede provocar descompensación cardiovascular.',
      causas_comunes: ['Hemorroides internas o externas sangrantes (causa benigna común)', 'Diverticulosis colónica (sangrado súbito masivo indoloro)', 'Enfermedad Inflamatoria Intestinal (Crohn/Colitis ulcerosa)', 'Cáncer colorrectal', 'Angiodisplasias'],
      cuidados_casa: [
        'Suspender cualquier fármaco AINE (Aspirina, Ibuprofeno, Diclofenaco) ya que perpetúan los sangrados.',
        'El paciente debe guardar reposo estricto, preferiblemente acostado para mantener la presión arterial y evitar desmayos.',
        'Si el sangrado es solo unas gotas en el papel higiénico tras esfuerzo al defecar (sugerente de hemorroides), usar baños de asiento y dieta alta en fibra.',
        'No intentar utilizar remedios ni enemas caseros.'
      ],
      cuando_consultar: [
        'EMERGENCIA VITAL: Evacuación abundante e incontrolable de sangre roja rutilante (pura) o grandes coágulos de sangre, que llena el inodoro de color rojo oscuro.',
        'El sangrado se acompaña de signos de choque: mareo severo al ponerse de pie, visión borrosa, sudoración fría, palidez de cera, o pulso rapidísimo.',
        'El paciente presenta pérdida de conciencia (síncope) mientras defeca o justo después.',
        'Ocurre junto con un dolor abdominal tipo cólico insoportable y debilidad generalizada, o es un paciente de la tercera edad.'
      ],
      urgencia_default: 'ALTA',
      requiere_atencion: true
    },
    {
      id: 89,
      nombre: 'Fractura Ósea Abierta (Expuesta)',
      categoria: 'Traumatología',
      sinonimos: ['hueso de fuera', 'fractura expuesta', 'hueso roto con herida', 'quebradura abierta', 'fractura grave con sangrado'],
      descripcion: 'Rotura completa de un hueso en la que los fragmentos óseos astillados atraviesan la piel, comunicando el foco de la fractura con el medio exterior. Constituye una urgencia quirúrgica inmediata por el altísimo riesgo de infección severa en el hueso (osteomielitis).',
      causas_comunes: ['Accidentes de tránsito de alta energía (especialmente motocicletas)', 'Caídas desde grandes alturas', 'Traumatismos industriales o deportivos severos'],
      cuidados_casa: [
        'NO INTENTAR ACOMODAR NI METER EL HUESO DE VUELTA DENTRO DE LA PIEL. Esto desgarrará nervios y arterias, e introducirá bacterias profundamente.',
        'Cubrir inmediatamente la herida y el hueso asomado con apósitos gruesos de gasa estéril o telas lo más limpias posibles para evitar que la contaminación empeore.',
        'Aplicar presión firme alrededor de los bordes de la herida (nunca directamente sobre el hueso) si hay un sangrado arterial activo.',
        'Inmovilizar el miembro afectado usando tablas o cartones duros amarrados en la posición en la que quedó tras el accidente, para que no se mueva durante el traslado.'
      ],
      cuando_consultar: [
        'EMERGENCIA QUIRÚRGICA: El hueso es visible a través de la piel, sin importar qué tan pequeño sea el fragmento asomado.',
        'Hemorragia abundante en pulsos (arterial) proveniente de la herida de la fractura.',
        'El miembro por debajo de la fractura (pie o mano) está pálido, frío, no tiene pulso o el paciente no lo siente en absoluto (compresión neurovascular grave).',
        'Acudir al hospital para recibir lavado quirúrgico urgente, reducción traumatológica y esquema de antibióticos potentes intravenosos y vacuna antitetánica.'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 90,
      nombre: 'Quemadura Eléctrica Severa',
      categoria: 'Emergencias',
      sinonimos: ['electrocutado', 'descarga electrica', 'le agarro la corriente', 'quemadura por rayo', 'pegado a los alambres'],
      descripcion: 'Lesión provocada por el paso de corriente eléctrica a través del cuerpo humano. Además de las quemaduras profundas en los puntos de contacto, el daño letal suele ser interno (músculos, nervios, órganos) y puede inducir fibrilación ventricular (paro cardíaco).',
      causas_comunes: ['Contacto con cables de alta tensión sin protección', 'Artefactos eléctricos defectuosos o mojados', 'Impacto por rayo (fulguración)'],
      cuidados_casa: [
        'SEGURIDAD PRIMERO: NUNCA TOCAR a la víctima si sigue en contacto con la fuente de electricidad. Primero desconectar el disyuntor principal o interruptor (bajar los breques).',
        'Si no es posible cortar la electricidad, usar un objeto SECO y NO CONDUCTOR (madera, plástico, palo de escoba grueso) para separar a la persona del cable.',
        'Si la persona no respira y no tiene pulso una vez asegurada la zona, iniciar RCP (Reanimación Cardiopulmonar) ininterrumpidamente hasta que llegue la ayuda.',
        'Cubrir las quemaduras térmicas visibles (punto de entrada y salida) con gasas secas y limpias sin aplicar ungüentos.'
      ],
      cuando_consultar: [
        'EMERGENCIA VITAL: TODA persona electrocutada por corriente de alto voltaje debe ir a un hospital para monitoreo cardíaco, incluso si se siente perfectamente bien (las arritmias letales pueden aparecer horas después).',
        'Pérdida de conciencia temporal, confusión, amnesia o parálisis tras el choque.',
        'Presencia de orina de color rojo oscuro o marrón (mioglobinuria, indica que el músculo interno se coció y sus toxinas están destruyendo los riñones).',
        'Falta de pulso, ritmo cardíaco irregular o dolor de pecho severo.'
      ],
      urgencia_default: 'EMERGENCIA',
      requiere_atencion: true
    },
    {
      id: 91,
      nombre: 'Picadura de Alacrán (Escorpionismo Severo)',
      categoria: 'Toxicología / Emergencias',
      sinonimos: ['picadura de alacran', 'picado de escorpion', 'veneno de alacran', 'ardor y adormecimiento por piquete', 'alacran'],
      descripcion: 'Envenenamiento ocasionado por la inoculación de toxinas de un escorpión (alacrán) del género Centruroides (comunes en Nicaragua). Las toxinas afectan directamente el sistema nervioso. La gravedad varía, pero en niños puede ser letal.',
      causas_comunes: ['Meter pies o manos en zapatos, ropa o madera almacenada donde se ocultan', 'Trabajos en áreas rurales cálidas o en patios con escombros'],
      cuidados_casa: [
        'Mantener a la persona y especialmente al niño en reposo y bajo estricta observación (el veneno es transportado más rápido si hay actividad física).',
        'Lavar el sitio de la picadura con agua y jabón y aplicar compresas frías localizadas para mitigar el dolor ardiente extremo.',
        'NO hacer cortes ni succionar. NO aplicar amoniaco, ni lejía en la herida.',
        'Intentar guardar el alacrán (si es seguro) para su identificación por médicos.',
        'Administrar Paracetamol para el dolor inicial en adultos.'
      ],
      cuando_consultar: [
        'EMERGENCIA PEDIÁTRICA ABSOLUTA: Todo niño menor de 5 años picado por un alacrán debe ir al hospital DE INMEDIATO para observar y aplicar suero antiescorpiónico si es necesario.',
        'Si el paciente presenta sensación extraña en la garganta (como un nudo o cabello atorado), dificultad severa para tragar, o babaza/salivación excesiva.',
        'Movimientos descontrolados o "brincos" rápidos de los ojos (nistagmo).',
        'Adormecimiento (hormigueo) que se extiende lejos del sitio de la picadura, calambres musculares generalizados, o dificultad para respirar.',
        'Crisis hipertensiva severa o vómitos incontrolables tras el piquete.'
      ],
      urgencia_default: 'ALTA',
      requiere_atencion: true
    }
  ];

// ═══════════════════════════════════════════════════════════════
//  🚑 EMERGENCIAS
// ═══════════════════════════════════════════════════════════════
export const EMERGENCIAS = [
  { nombre: 'Emergencias Nacionales (Bomberos)',   numero: '128',       descripcion: 'Línea de emergencias gratuita 24h — Nicaragua',              disponible: true },
  { nombre: 'Policía Nacional',                    numero: '118',       descripcion: 'Emergencias policiales',                                      disponible: true },
  { nombre: 'Cruz Roja Nicaragüense — Granada',    numero: '2552-5555', descripcion: 'Ambulancias y primeros auxilios en Granada',                  disponible: true },
  { nombre: 'Hospital Amistad Japón Nicaragua',    numero: '2552-7050', descripcion: 'Hospital Departamental — urgencias 24h gratuitas',            disponible: true },
  { nombre: 'Hospital SERMESA Granada',            numero: '2552-4444', descripcion: 'Hospital privado — urgencias INSS y particular',              disponible: true },
  { nombre: 'SILAIS Granada',                      numero: '2552-0450', descripcion: 'Sistema Local de Atención Integral en Salud Granada',         disponible: true }
];

// ═══════════════════════════════════════════════════════════════
//  📍 BARRIOS DE GRANADA
// ═══════════════════════════════════════════════════════════════
export const BARRIOS_GRANADA = [
  'Centro','Parque Central','Barrio San Antonio','Barrio El Calvario',
  'Barrio Simeón Rivas','Barrio La Antigua','Barrio Guadalupe',
  'Calle La Calzada','Mercado Municipal','Carretera a Masaya',
  'Calle Atravesada','Pista de Jardines','Barrio San José',
  'Reparto San Francisco','Reparto Las Colinas','Gandera','Pueblo Nuevo'
];

// ═══════════════════════════════════════════════════════════════
//  FUNCIONES DE DISTANCIA (CANÓNICA — no duplicar en app.js)
// ═══════════════════════════════════════════════════════════════
export function calcularDistancia(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371000; // metros
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return Math.round(6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// ═══════════════════════════════════════════════════════════════
//  FUNCIONES DE BÚSQUEDA
// ═══════════════════════════════════════════════════════════════
export function obtenerTodosLosCentros() {
  return [...HOSPITALES, ...CLINICAS, ...FARMACIAS, ...LABORATORIOS].filter(c => c.disponible);
}

export function buscarCentrosPorCategoria(categoria: string) {
  return obtenerTodosLosCentros().filter(c => c.categoria === categoria);
}

export function buscarCentrosPorBarrio(barrio: string) {
  return obtenerTodosLosCentros().filter(c =>
    c.barrio?.toLowerCase().includes(barrio.toLowerCase())
  );
}

export function buscarCentrosCercanos(lat: number, lng: number, radioMetros = 2000) {
  return obtenerTodosLosCentros()
    .map(c => ({ ...c, distance: calcularDistancia(lat, lng, c.lat, c.lng) }))
    .filter(c => c.distance <= radioMetros)
    .sort((a, b) => a.distance - b.distance);
}

/**
 * Busca un medicamento por nombre, sinónimos o nombres comerciales.
 * v7.1: incluye búsqueda ampliada en campo `sinonimos` y normaliza tildes.
 */
export function buscarMedicamento(nombre: string) {
  const results = buscarMultiplesMedicamentos(nombre);
  return results.length > 0 ? results[0] : null;
}

/**
 * Busca todos los medicamentos que coincidan con el término.
 */
export function buscarMultiplesMedicamentos(nombre: string) {
  const lower = normalizar(nombre);
  if (lower.length < 3) return [];

  // Create an array of words from the user input for exact matching
  const words = lower.split(/\s+/);

  const results = MEDICAMENTOS.filter(m => {
    const n_es = normalizar(m.nombre_es);
    const n_en = normalizar(m.nombre_en);

    // Check if any normalized medication name, commercial name, or synonym
    // exactly matches a word in the user input, or if the user input
    // contains the entire medication name.

    const isExactMatch = (target: string) => {
       if (!target) return false;
       const targetNormalized = normalizar(target);
       if (targetNormalized.length < 3) return false;

       // check if the user query contains the whole phrase of the drug name.
       // we use word boundaries (\b) which work fine here because normalizar()
       // removes accents and leaves standard latin word characters.

       // Escape special characters in the target phrase
       const escapedTarget = targetNormalized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

       // If the target is short (<= 4 chars) and the user input is a sentence (>3 words),
       // do not match it even if it's a word boundary match.
       // e.g. "tos" shouldn't trigger the drug card if the user writes "tengo tos y me pasaba todo el dia"
       if (targetNormalized.length <= 4 && words.length > 3) {
           return false;
       }

       const regex = new RegExp(`\\b${escapedTarget}\\b`);
       if (regex.test(lower)) return true;

       return false;
     };

    const matchesName = isExactMatch(n_es) ||
                        isExactMatch(n_en) ||
                        m.nombres_comerciales.some(n => isExactMatch(normalizar(n))) ||
                        (m.sinonimos && m.sinonimos.some(s => isExactMatch(normalizar(s))));

    if (matchesName) return true;

    // Also allow searching by general symptom or use case if the query is a direct request
    // like "un medicamento para la tos" -> "tos"
    const isDirectRequest = lower.includes("medicamento para") || lower.includes("pastilla para") || lower.includes("algo para") || lower.includes("jarabe para") || lower.includes("remedio para");
    if (isDirectRequest) {
      // Extract the key symptom by removing the common prefix
      let intent = lower.replace(/.*(medicamento|pastilla|algo|jarabe|remedio) para\s+(el|la|las|los)?\s*/i, "").trim();
      // Remove any trailing noise like "por favor"
      intent = intent.replace(/ por favor.*/, "");

      // Use exact match via \b to prevent matching random partial words in the uses string
      if (intent.length >= 3) {
        const intentEscaped = normalizar(intent).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const usageRegex = new RegExp(`\\b${intentEscaped}\\b`);
        if (usageRegex.test(normalizar(m.uso_principal))) {
           return true;
        }
      }
    }

    return false;
  });

  // Limit to 1 recommendation if it's a generic symptom request, to avoid spam
  // (e.g., matching "tos" might otherwise return 5 different syrups).
  const isGeneric = lower.includes("medicamento para") || lower.includes("pastilla para") || lower.includes("algo para") || lower.includes("jarabe para") || lower.includes("remedio para");
  if (isGeneric && results.length > 0) {
     return [results[0]];
  }

  return results;
}

export function obtenerTodosLosMedicamentos() { return MEDICAMENTOS; }

/**
 * Calcula similitud Levenshtein simplificada (0-1)
 */
function calcularSimilitud(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  
  let distancia = 0;
  const minLen = Math.min(a.length, b.length);
  
  for (let i = 0; i < minLen; i++) {
    if (a[i] !== b[i]) distancia++;
  }
  distancia += Math.abs(a.length - b.length);
  
  return 1 - (distancia / maxLen);
}

/**
 * Extrae palabras clave principales (filtra palabras comunes)
 */
function extraerPalabrasClaves(texto: string): string[] {
  const palabrasComunes = ['tengo','me','siento','me duele','soy','estoy','tengo que','el','la','de','los','las','que','el','y','o','es','está','están','muy','bastante','poco'];
  const palabras = normalizar(texto)
    .split(/\s+/)
    .filter(p => p.length > 2 && !palabrasComunes.includes(p));
  return palabras;
}

/**
 * buscarSintoma — v7: Smart NLP matching con scoring inteligente
 * Mejoras:
 * - Tokenización de palabras clave
 * - Búsqueda por similitud (Levenshtein)
 * - Priorización de matches (exacto > parcial > palabras clave)
 */
export function buscarSintoma(texto: string) {
  const results = buscarMultiplesSintomas(texto);
  return results.length > 0 ? results[0] : null;
}

/**
 * Busca todos los síntomas con scoring inteligente
 */
export function buscarMultiplesSintomas(texto: string) {
  const normalized = normalizar(texto);
  if (normalized.length < 2) return [];
  
  const palabrasClaves = extraerPalabrasClaves(texto);
  
  // Calcular score para cada síntoma
  const scored = SINTOMAS.map(s => {
    const nombreNorm = normalizar(s.nombre);
    let score = 0;
    
    // 1. Coincidencia exacta en nombre (máxima prioridad)
    if (nombreNorm === normalized) {
      score = 100;
    }
    // 2. El nombre completo está en el texto (o viceversa)
    else if (normalized.includes(nombreNorm) || nombreNorm.includes(normalized)) {
      score = 90;
    }
    // 3. Coincidencia en sinónimos exacta
    else if (s.sinonimos && s.sinonimos.some(sin => normalizar(sin) === normalized)) {
      score = 85;
    }
    // 4. Coincidencia en sinónimos parcial
    else if (s.sinonimos && s.sinonimos.some(sin => {
      const sinNorm = normalizar(sin);
      return normalized.includes(sinNorm) || sinNorm.includes(normalized);
    })) {
      score = 80;
    }
    // 5. Coincidencia por palabras clave
    else {
      let palabrasCoincidentes = 0;
      
      // Verificar si las palabras clave coinciden con el nombre
      palabrasClaves.forEach(palabra => {
        if (nombreNorm.includes(palabra)) {
          palabrasCoincidentes++;
        }
        // También verificar sinónimos
        if (s.sinonimos && s.sinonimos.some(sin => normalizar(sin).includes(palabra))) {
          palabrasCoincidentes++;
        }
      });
      
      if (palabrasCoincidentes > 0) {
        score = 50 + (palabrasCoincidentes * 15);
      }
      // 6. Similitud de Levenshtein como último recurso
      else {
        const similitudNombre = calcularSimilitud(normalized, nombreNorm);
        if (similitudNombre > 0.6) {
          score = similitudNombre * 40;
        }
        
        // Verificar similitud con sinónimos
        if (s.sinonimos) {
          const maxSimilitudSin = Math.max(...s.sinonimos.map(sin => 
            calcularSimilitud(normalized, normalizar(sin))
          ));
          if (maxSimilitudSin > 0.6) {
            score = Math.max(score, maxSimilitudSin * 35);
          }
        }
      }
    }
    
    return { sintoma: s, score };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score);
  
  return scored.map(item => item.sintoma);
}

export function obtenerTodosLosSintomas() { return SINTOMAS; }

export function obtenerMedicamentosEmbarazadas() {
  return MEDICAMENTOS.filter(m =>
    m.categoria.includes('Prenatal') ||
    m.categoria.includes('Embarazo') ||
    (m.embarazo && (m.embarazo.includes('Categoría A') || m.embarazo.includes('Categoría B')))
  );
}

export function obtenerEmergencias() {
  return EMERGENCIAS.filter(e => e.disponible);
}

export function obtenerEstadisticasBD() {
  return {
    version: VERSION_BASE_DATOS,
    ultima_actualizacion: ULTIMA_ACTUALIZACION,
    total_centros: obtenerTodosLosCentros().length,
    total_medicamentos: MEDICAMENTOS.length,
    total_sintomas: SINTOMAS.length,
    hospitales: HOSPITALES.length,
    clinicas: CLINICAS.length,
    farmacias: FARMACIAS.length,
    emergencias: EMERGENCIAS.length,
    barrios_cubiertos: BARRIOS_GRANADA.length
  };
}

// ─────────────────────────────────────────────
//  UTILIDAD INTERNA: normalizar texto (sin tildes, minúsculas)
// ─────────────────────────────────────────────
export function normalizar(str: string) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // eliminar diacríticos
    .trim();
}
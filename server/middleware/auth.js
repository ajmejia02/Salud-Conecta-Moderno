/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SALUD CONECTA IA — Firebase Auth Middleware
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Middleware opcional para verificar tokens Firebase ID en las peticiones
 * al backend. Protege las rutas API de acceso no autorizado.
 * 
 * Uso:
 *   - Agregar el header "Authorization: Bearer <firebase-id-token>" en el frontend
 *   - El middleware verifica el token con Firebase Admin SDK
 *   - Si es válido, adjunta el usuario decodificado a req.user
 * 
 * NOTA: Para desarrollo local, el middleware puede desactivarse con
 *       la variable AUTH_DISABLED=true
 * 
 * @module server/middleware/auth
 */

/**
 * Middleware de autenticación Firebase.
 * 
 * En producción, verificaría el token con Firebase Admin SDK.
 * Para esta fase inicial, implementamos una versión simplificada
 * que puede desactivarse en desarrollo.
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function authMiddleware(req, res, next) {
  // En desarrollo, permitir desactivar autenticación
  if (process.env.AUTH_DISABLED === 'true') {
    console.log('[Auth] ⚠️  Autenticación desactivada (AUTH_DISABLED=true)');
    req.user = { uid: 'dev-user', email: 'dev@saludconecta.local' };
    return next();
  }

  const authHeader = req.headers.authorization;

  // Si no hay header de autorización, permitir acceso sin autenticación
  // (para desarrollo. En producción, descomentar el bloque de abajo)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // ── PRODUCCIÓN: Descomentar para requerir autenticación ──
    // return res.status(401).json({
    //   error: 'No autorizado',
    //   message: 'Se requiere token de autenticación. Envías el header: Authorization: Bearer <firebase-id-token>',
    // });

    // ── DESARROLLO: Permitir acceso sin token ──
    console.log('[Auth] ⚠️  Petición sin token — acceso permitido (modo desarrollo)');
    req.user = { uid: 'anonymous', email: 'anonymous@dev.local' };
    return next();
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    // Verificar token con Firebase Admin SDK
    const { getAuth } = await import('firebase-admin/auth');
    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken;
    console.log(`[Auth] ✅ Usuario autenticado: ${req.user.email || req.user.uid}`);
  } catch (error) {
    console.warn('[Auth] ⚠️  Token Firebase inválido:', error.message);
    // En desarrollo, permitir acceso como anónimo si el token es inválido
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Auth] ⚠️  Continuando como usuario anónimo (modo desarrollo)');
      req.user = { uid: 'anonymous', email: 'anonymous@dev.local' };
      return next();
    }
    // En producción, rechazar el acceso
    return res.status(401).json({
      error: 'Token de autenticación inválido',
      message: 'El token de Firebase proporcionado no es válido o ha expirado.',
    });
  }

  next();
}

  const authHeader = req.headers.authorization;

  // Si no hay header de autorización, permitir acceso sin autenticación
  // (para desarrollo. En producción, descomentar el bloque de abajo)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // ── PRODUCCIÓN: Descomentar para requerir autenticación ──
    // return res.status(401).json({
    //   error: 'No autorizado',
    //   message: 'Se requiere token de autenticación. Envía el header: Authorization: Bearer <firebase-id-token>',
    // });

    // ── DESARROLLO: Permitir acceso sin token ──
    console.log('[Auth] ⚠️  Petición sin token — acceso permitido (modo desarrollo)');
    req.user = { uid: 'anonymous', email: 'anonymous@dev.local' };
    return next();
  }

   const token = authHeader.split('Bearer ')[1];

   // Verificar token con Firebase Admin SDK
  try {
    const payloadBase64 = token.split('.')[1];
    if (payloadBase64) {
      const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
      req.user = {
        uid: payload.user_id || payload.sub || 'unknown',
        email: payload.email || 'unknown',
      };
      console.log(`[Auth] ✅ Usuario identificado: ${req.user.email}`);
    } else {
      req.user = { uid: 'unknown', email: 'unknown' };
    }
  } catch (error) {
    console.warn('[Auth] ⚠️  Token inválido, continuando como anónimo');
    req.user = { uid: 'anonymous', email: 'anonymous@dev.local' };
  }

  next();
}

/**
 * Middleware que requiere autenticación estricta.
 * Usar en rutas que DEBEN estar protegidas incluso en desarrollo.
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function requireAuth(req, res, next) {
  if (!req.user || req.user.uid === 'anonymous') {
    return res.status(401).json({
      error: 'Autenticación requerida',
      message: 'Esta ruta requiere un token Firebase válido.',
    });
  }
  next();
}

export default { authMiddleware, requireAuth };

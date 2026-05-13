import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Clinic, OperationType, FirestoreErrorInfo } from '../types';
import { auth } from '../lib/firebase';
import { NICARAGUA_HOSPITALS } from '../data/nicaraguaHospitals';

const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  // Not throwing here to allow fallback data to show
};

const staticClinics: Clinic[] = NICARAGUA_HOSPITALS.map((h, i) => ({
  ...h,
  id: `static-${i}`,
}));

export const getClinics = async (): Promise<Clinic[]> => {
  const path = 'clinics';
  try {
    const q = collection(db, path);
    const snapshot = await getDocs(q);
    const dbClinics = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Clinic));
    
    // Merge static hospitals with DB clinics, avoiding duplicates by name
    const allClinics = [...dbClinics];
    staticClinics.forEach(sc => {
      if (!allClinics.find(ac => ac.name === sc.name)) {
        allClinics.push(sc);
      }
    });
    
    return allClinics;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return staticClinics;
  }
};

export const getClinicsByType = async (type: Clinic['type']): Promise<Clinic[]> => {
  const path = 'clinics';
  try {
    const q = query(collection(db, path), where('type', '==', type));
    const snapshot = await getDocs(q);
    const dbClinics = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Clinic));
    
    const allClinics = [...dbClinics];
    staticClinics.filter(sc => sc.type === type).forEach(sc => {
      if (!allClinics.find(ac => ac.name === sc.name)) {
        allClinics.push(sc);
      }
    });
    
    return allClinics;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return staticClinics.filter(sc => sc.type === type);
  }
};

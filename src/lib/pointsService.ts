/**
 * Points Management Service
 * Handles all points, streaks, rewards, and transaction logic with localStorage persistence
 */

export interface PointsTransaction {
  id: string;
  action: string;
  date: string;
  points: number;
  type: 'gain' | 'redeem';
  timestamp: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  subtitle: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface PointsData {
  totalPoints: number;
  pointsThisMonth: number;
  currentStreak: number;
  maxStreak: number;
  streakDates: { [date: string]: boolean };
  transactions: PointsTransaction[];
  completedChallengesToday: { [date: string]: string[] };
  vitalCompletedToday: boolean;
  lastLoginDate: string | null;
  consecutiveLogins: number;
  bonusesEarned: { [key: string]: boolean };
}

const STORAGE_KEY = 'saludConectaPremios';

const DEFAULT_CHALLENGES: DailyChallenge[] = [
  {
    id: 'challenge-1',
    title: '10000 Pasos Diarios',
    subtitle: '10000 pasos',
    points: 30,
    difficulty: 'medium'
  },
  {
    id: 'challenge-2',
    title: 'Hidratación Completa',
    subtitle: 'Beber 8 vasos de agua',
    points: 20,
    difficulty: 'easy'
  },
  {
    id: 'challenge-3',
    title: 'Sueño Reparador',
    subtitle: 'Dormir entre 7 y 9 horas',
    points: 25,
    difficulty: 'medium'
  },
  {
    id: 'challenge-4',
    title: 'Alimentación Balanceada',
    subtitle: 'Comer 5 porciones de frutas y verduras',
    points: 20,
    difficulty: 'medium'
  },
  {
    id: 'challenge-5',
    title: 'Mindfulness',
    subtitle: '10 minutos de meditación',
    points: 15,
    difficulty: 'easy'
  }
];

export const PointsService = {
  /**
   * Get all points data from localStorage
   */
  getAllData(): PointsData {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return this.getInitialData();
    }
    return JSON.parse(stored);
  },

  /**
   * Get initial/default data structure
   */
  getInitialData(): PointsData {
    return {
      totalPoints: 0,
      pointsThisMonth: 0,
      currentStreak: 0,
      maxStreak: 0,
      streakDates: {},
      transactions: [],
      completedChallengesToday: {},
      vitalCompletedToday: false,
      lastLoginDate: null,
      consecutiveLogins: 0,
      bonusesEarned: {}
    };
  },

  /**
   * Save all points data to localStorage
   */
  saveData(data: PointsData): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  /**
   * Get current total points
   */
  getTotalPoints(): number {
    return this.getAllData().totalPoints;
  },

  /**
   * Get today's date in YYYY-MM-DD format
   */
  getToday(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  },

  /**
   * Get yesterday's date in YYYY-MM-DD format
   */
  getYesterday(): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  },

  /**
   * Add points and create transaction
   */
  addPoints(
    points: number,
    action: string,
    type: 'gain' | 'redeem' = 'gain',
    providedData?: PointsData
  ): PointsTransaction {
    const data = providedData || this.getAllData();
    const today = this.getToday();
    const transaction: PointsTransaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      action,
      date: today,
      points,
      type,
      timestamp: Date.now()
    };

    data.totalPoints += points;
    if (type === 'gain') {
      data.pointsThisMonth += points;
    }
    data.transactions.push(transaction);

    if (!providedData) {
      this.saveData(data);
    }
    return transaction;
  },

  /**
   * Handle daily login - 10 points once per day
   */
  handleDailyLogin(): { earned: boolean; points: number; message: string } {
    const data = this.getAllData();
    const today = this.getToday();

    if (data.lastLoginDate === today) {
      return { earned: false, points: 0, message: 'Ya registraste login hoy' };
    }

    const yesterday = this.getYesterday();
    
    // Check if yesterday was completed (meaning user completed at least 1 challenge yesterday)
    // If not completed, the streak resets to 0. If yes, it maintains it.
    if (!data.streakDates[yesterday]) {
      data.currentStreak = 0;
    }

    data.lastLoginDate = today;
    data.consecutiveLogins = (data.consecutiveLogins || 0) + 1;

    // Add login bonus of 10 points
    this.addPoints(10, `Login Diario Día ${data.consecutiveLogins}`, 'gain', data);

    this.saveData(data);

    return {
      earned: true,
      points: 10,
      message: `¡Bienvenido! +10 pts`
    };
  },

  /**
   * Check for streak bonuses
   */
  checkStreakBonuses(streak: number): { earned: boolean; points: number } {
    const bonusMap: { [key: number]: number } = {
      3: 25,
      7: 50,
      14: 100,
      30: 500
    };

    if (bonusMap[streak]) {
      return { earned: true, points: bonusMap[streak] };
    }

    return { earned: false, points: 0 };
  },

  /**
   * Complete a daily challenge
   */
  completeChallenge(challengeId: string): { success: boolean; message: string; points: number } {
    const data = this.getAllData();
    const today = this.getToday();
    const challenge = DEFAULT_CHALLENGES.find(c => c.id === challengeId);

    if (!challenge) {
      return { success: false, message: 'Desafío no encontrado', points: 0 };
    }

    // Initialize today's completed challenges if needed
    if (!data.completedChallengesToday[today]) {
      data.completedChallengesToday[today] = [];
    }

    // Check if already completed today
    if (data.completedChallengesToday[today].includes(challengeId)) {
      return { success: false, message: 'Ya completaste este desafío hoy', points: 0 };
    }

    // Add challenge to completed list
    data.completedChallengesToday[today].push(challengeId);

    // Add points for the specific challenge
    this.addPoints(challenge.points, challenge.title, 'gain', data);

    let message = `¡Desafío completado! +${challenge.points} pts`;
    let earnedPoints = challenge.points;

    // Mark today as active for streaks ONLY when a challenge is completed
    if (!data.streakDates[today]) {
      data.streakDates[today] = true;
      
      const yesterday = this.getYesterday();
      if (data.streakDates[yesterday]) {
        data.currentStreak += 1;
      } else {
        data.currentStreak = 1;
      }
      data.maxStreak = Math.max(data.maxStreak, data.currentStreak);

      // Check for streak bonuses in real time
      const streakBonus = this.checkStreakBonuses(data.currentStreak);
      if (streakBonus.earned) {
        this.addPoints(
          streakBonus.points,
          `Bono de Racha - ${data.currentStreak} días`,
          'gain',
          data
        );
        earnedPoints += streakBonus.points;
        message += ` | ¡Bono de Racha de ${data.currentStreak} días! +${streakBonus.points} pts`;
      }
    }

    // Check if user completed all 5 daily challenges (Desafío Diario Completo)
    const completedToday = data.completedChallengesToday[today];
    if (completedToday.length === 5) {
      this.addPoints(30, 'Desafío Diario Completo', 'gain', data);
      earnedPoints += 30;
      message += ` | ¡Desafío Diario Completo! +30 pts`;
    }

    this.saveData(data);

    return {
      success: true,
      message,
      points: earnedPoints
    };
  },

  /**
   * Check if the daily challenge bonus is earned today
   */
  isDailyChallengeBonusEarned(): boolean {
    const data = this.getAllData();
    const today = this.getToday();
    return data.transactions.some(
      tx => tx.date === today && tx.action === 'Desafío Diario Completo'
    );
  },

  /**
   * Get completed challenges for today
   */
  getCompletedChallengesForToday(): string[] {
    const data = this.getAllData();
    const today = this.getToday();
    return data.completedChallengesToday[today] || [];
  },

  /**
   * Check if vital was completed today
   */
  isVitalCompletedToday(): boolean {
    const data = this.getAllData();
    const today = this.getToday();
    
    // Check if there's a vital record transaction from today
    return data.transactions.some(
      tx =>
        tx.date === today &&
        (tx.action.includes('Registro de Vitales') || tx.action.includes('Vitales'))
    );
  },

  /**
   * Complete vital registration
   */
  completeVitalRegistration(): { success: boolean; message: string; points: number } {
    if (this.isVitalCompletedToday()) {
      return {
        success: false,
        message: 'Ya completaste registro de vitales hoy',
        points: 0
      };
    }

    const data = this.getAllData();
    this.addPoints(15, 'Registro de Vitales', 'gain', data);
    data.vitalCompletedToday = true;
    
    this.saveData(data);

    return {
      success: true,
      message: '¡Vitales registrados! +15 pts',
      points: 15
    };
  },

  /**
   * Get all transactions
   */
  getTransactions(limit?: number): PointsTransaction[] {
    const data = this.getAllData();
    const transactions = [...data.transactions].reverse();
    return limit ? transactions.slice(0, limit) : transactions;
  },

  /**
   * Redeem a reward
   */
  redeemReward(
    rewardTitle: string,
    rewardPoints: number
  ): { success: boolean; message: string; code?: string } {
    const data = this.getAllData();

    if (data.totalPoints < rewardPoints) {
      return {
        success: false,
        message: `No tienes suficientes puntos. Te faltan ${rewardPoints - data.totalPoints} pts`
      };
    }

    const code = this.generateRedemptionCode();
    this.addPoints(-rewardPoints, rewardTitle, 'redeem', data);
    this.saveData(data);

    return {
      success: true,
      message: 'Recompensa canjeada exitosamente',
      code
    };
  },

  /**
   * Generate unique redemption code
   */
  generateRedemptionCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  },

  /**
   * Get current streak
   */
  getCurrentStreak(): number {
    return this.getAllData().currentStreak;
  },

  /**
   * Get max streak
   */
  getMaxStreak(): number {
    return this.getAllData().maxStreak;
  },

  /**
   * Get this month's points
   */
  getPointsThisMonth(): number {
    return this.getAllData().pointsThisMonth;
  },

  /**
   * Get week days with completion status
   */
  getWeekDays(): Array<{ day: string; completed: boolean; active: boolean }> {
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const today = new Date();
    const weekStart = new Date(today);
    // Find the Monday of the current week (1 for Mon, 2 for Tue... 0 for Sun)
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    weekStart.setDate(diff);

    const data = this.getAllData();

    return days.map((day, index) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + index);
      const dateStr = date.toISOString().split('T')[0];
      const isToday = dateStr === this.getToday();
      const completed = !!data.streakDates[dateStr];
      const isFuture = date > today;

      return {
        day,
        completed: completed && !isFuture,
        active: isToday
      };
    });
  },

  /**
   * Reset daily challenges for new day and handle monthly points reset
   */
  resetDailyIfNeeded(): void {
    const data = this.getAllData();
    const today = this.getToday();

    // Auto-reset vitals completed flag each day
    if (data.lastLoginDate !== today) {
      data.vitalCompletedToday = false;
    }

    // Dynamic month change calculation to reset monthly points
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    if (data.lastLoginDate) {
      const lastParts = data.lastLoginDate.split('-');
      const lastYear = parseInt(lastParts[0]);
      const lastMonth = parseInt(lastParts[1]) - 1; // 0-indexed

      if (lastYear !== currentYear || lastMonth !== currentMonth) {
        data.pointsThisMonth = 0;
      }
    }

    this.saveData(data);
  },

  /**
   * Get all default challenges
   */
  getDailyChallenges(): DailyChallenge[] {
    return DEFAULT_CHALLENGES;
  },

  /**
   * Get total completed challenges today
   */
  getTotalChallengesCompletedToday(): number {
    return this.getCompletedChallengesForToday().length;
  },

  /**
   * Check clinic search usage bonus (weekly)
   */
  getClinicSearchBonus(): { available: boolean; message: string } {
    const data = this.getAllData();
    const today = new Date();
    // Monday of current week
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const weekStart = new Date(today);
    weekStart.setDate(diff);
    const weekStartStr = weekStart.toISOString().split('T')[0];

    const bonusKey = `clinicSearch-${weekStartStr}`;
    const alreadyUsed = data.bonusesEarned[bonusKey];

    return {
      available: !alreadyUsed,
      message: alreadyUsed ? 'Ya usaste este bono esta semana' : 'Bono disponible'
    };
  },

  /**
   * Use clinic search bonus
   */
  useClinicSearchBonus(): { success: boolean; points: number } {
    const data = this.getAllData();
    const today = new Date();
    // Monday of current week
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const weekStart = new Date(today);
    weekStart.setDate(diff);
    const weekStartStr = weekStart.toISOString().split('T')[0];
    const bonusKey = `clinicSearch-${weekStartStr}`;

    if (data.bonusesEarned[bonusKey]) {
      return { success: false, points: 0 };
    }

    data.bonusesEarned[bonusKey] = true;
    this.addPoints(50, 'Uso del Buscador Clínico', 'gain', data);
    this.saveData(data);

    return { success: true, points: 50 };
  }
};

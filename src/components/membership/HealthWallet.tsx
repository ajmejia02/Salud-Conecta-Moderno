import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Star, 
  Activity, 
  History, 
  Video, 
  FlaskConical, 
  Zap, 
  TrendingUp,
  HeartPulse,
  Flame,
  CheckCircle2,
  Search,
  ArrowLeft,
  Settings as SettingsIcon
} from 'lucide-react';
import { PointsService } from '../../lib/pointsService';
import { toastManager } from '../../lib/toastService';
import HistoryModal from './HistoryModal';
import RedemptionConfirmModal from './RedemptionConfirmModal';
import HealthChallenges from './HealthChallenges';

export default function HealthWallet() {
  const [totalPoints, setTotalPoints] = useState(0);
  const [pointsThisMonth, setPointsThisMonth] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [weekDays, setWeekDays] = useState<any[]>([]);
  const [completedChallengesCount, setCompletedChallengesCount] = useState(0);
  const [isVitalCompleted, setIsVitalCompleted] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<'wallet' | 'challenges'>('wallet');
  const [isChallengesBonusEarned, setIsChallengesBonusEarned] = useState(false);
  const [isSearchBonusEarned, setIsSearchBonusEarned] = useState(false);

  const rewards = [
    {
      title: 'Teleconsulta Prioritaria',
      desc: 'Acceso inmediato a un médico general sin tiempo de espera. Válido 24/7.',
      points: 5000,
      icon: Video,
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500&q=80'
    },
    {
      title: 'Análisis de Laboratorio',
      desc: 'Panel completo de biomarcadores avanzados. Incluye perfil lipídico y metabólico.',
      points: 12000,
      icon: FlaskConical,
      img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=500&q=80',
    },
    {
      title: 'Sesión de Fisioterapia',
      desc: '1 hora de evaluación y tratamiento con un especialista certificado en recuperación física.',
      points: 25000,
      icon: HeartPulse,
      img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80',
    }
  ];

  const navigationToConfig = () => {
    window.dispatchEvent(new CustomEvent('changeTab', { detail: 'points-config' }));
  };

  // Initialize on mount
  useEffect(() => {
    PointsService.resetDailyIfNeeded();
    
    // Handle daily login
    const loginResult = PointsService.handleDailyLogin();
    if (loginResult.earned) {
      toastManager.success(loginResult.message);
    }

    updateData();
  }, []);

  const updateData = () => {
    setTotalPoints(PointsService.getTotalPoints());
    setPointsThisMonth(PointsService.getPointsThisMonth());
    setCurrentStreak(PointsService.getCurrentStreak());
    setWeekDays(PointsService.getWeekDays());
    setCompletedChallengesCount(PointsService.getTotalChallengesCompletedToday());
    setIsVitalCompleted(PointsService.isVitalCompletedToday());
    setRecentTransactions(PointsService.getTransactions(3));
    setIsChallengesBonusEarned(PointsService.isDailyChallengeBonusEarned());
    setIsSearchBonusEarned(!PointsService.getClinicSearchBonus().available);
  };

  const handleRewardClick = (reward: any) => {
    setSelectedReward(reward);
    setRedeemModalOpen(true);
  };

  const handleRedeemConfirm = () => {
    updateData();
    setRedeemModalOpen(false);
  };

  const bonuses = useMemo(
    () => [
      {
        title: 'Registro de Vitales',
        sub: isVitalCompleted ? 'COMPLETADO HOY' : 'DIARIO',
        pts: '+15 pts',
        icon: HeartPulse,
        color: 'text-primary',
        canClick: !isVitalCompleted,
        onClick: () => {
          const result = PointsService.completeVitalRegistration();
          if (result.success) {
            toastManager.success(result.message);
            updateData();
          } else {
            toastManager.info(result.message);
          }
        }
      },
      {
        title: 'Desafío Diario Completo',
        sub: isChallengesBonusEarned ? 'COMPLETADO HOY' : `${completedChallengesCount}/5 completado hoy`,
        pts: '+30 pts',
        icon: CheckCircle2,
        color: 'text-primary'
      },
      {
        title: 'Uso del Buscador Clínico',
        sub: isSearchBonusEarned ? 'COMPLETADO HOY' : 'SEMANAL',
        pts: '+50 pts',
        icon: Search,
        color: 'text-primary'
      }
    ],
    [isVitalCompleted, completedChallengesCount, isChallengesBonusEarned, isSearchBonusEarned]
  );

  const formatTransactionTime = (timestamp: number): string => {
    const txDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday = txDate.toDateString() === today.toDateString();
    const isYesterday = txDate.toDateString() === yesterday.toDateString();

    const time = txDate.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    if (isToday) return `HOY ${time}`;
    if (isYesterday) return `AYER ${time}`;
    return time;
  };

  const getTransactionIcon = (action: string) => {
    if (action.includes('Login')) return Activity;
    if (
      action.includes('Pasos') ||
      action.includes('Desafío') ||
      action.includes('Hidratación') ||
      action.includes('Sueño') ||
      action.includes('Alimentación') ||
      action.includes('Mindfulness')
    ) {
      return TrendingUp;
    }
    if (
      action.includes('Teleconsulta') ||
      action.includes('Análisis') ||
      action.includes('Fisioterapia')
    ) {
      return CheckCircle2;
    }
    if (action.includes('Vitales')) return HeartPulse;
    return Activity;
  };

  const showStreakBonus = currentStreak === 7;

  return (
    <>
      <div className="w-full flex-grow flex flex-col gap-10 pb-12 px-4 md:px-0">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('goBack'))}
              className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center hover:bg-surface-container-high transition-all text-on-surface-variant border border-outline-variant/30 shadow-sm"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex flex-col gap-1">
              <h1 className="text-5xl font-display font-black text-primary tracking-tight">
                Puntos de Salud
              </h1>
            </div>
          </div>
          <button
            onClick={navigationToConfig}
            className="p-4 rounded-3xl bg-surface-container-high border border-outline-variant/30 text-on-surface-variant hover:text-primary transition-all shadow-xl group w-fit"
          >
            <SettingsIcon className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </header>

        <p className="text-on-surface-variant font-medium text-lg max-w-2xl -mt-6">
          Recompensas por uso frecuente y hábitos saludables. Mantén tus metas al día y canjea
          beneficios exclusivos.
        </p>

        {/* Sub-navigation Tabs */}
        <div className="flex gap-4 border-b border-outline-variant/20 pb-4">
          <button
            onClick={() => setActiveSubTab('wallet')}
            className={`px-6 py-3 rounded-2xl font-display font-black text-xs uppercase tracking-wider transition-all border ${
              activeSubTab === 'wallet'
                ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/20 scale-105'
                : 'bg-surface-container-high text-on-surface-variant border-outline-variant/40 hover:border-primary/50'
            }`}
          >
            Mi Cartera
          </button>
          <button
            onClick={() => setActiveSubTab('challenges')}
            className={`px-6 py-3 rounded-2xl font-display font-black text-xs uppercase tracking-wider transition-all border flex items-center gap-2 ${
              activeSubTab === 'challenges'
                ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/20 scale-105'
                : 'bg-surface-container-high text-on-surface-variant border-outline-variant/40 hover:border-primary/50'
            }`}
          >
            Retos Diarios
            {completedChallengesCount < 5 && (
              <span className="w-5 h-5 rounded-full bg-secondary text-on-secondary text-[10px] flex items-center justify-center font-bold font-mono">
                {5 - completedChallengesCount}
              </span>
            )}
          </button>
        </div>

        {activeSubTab === 'challenges' ? (
          <HealthChallenges onComplete={updateData} />
        ) : (
          <>
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Primary Balance Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="lg:col-span-8 bg-surface-container-low border border-outline-variant/30 rounded-[40px] p-10 flex flex-col justify-between relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none group-hover:opacity-100 transition-opacity" />
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/10 transition-all duration-1000" />

                <div className="relative z-10 flex flex-col sm:flex-row justify-between lg:items-center gap-10 h-full">
                  <div className="flex flex-col gap-4">
                    <div className="font-display font-black text-[12px] text-on-surface-variant uppercase tracking-[0.3em] mb-2 flex items-center gap-3">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      Balance Actual
                    </div>
                    <motion.div
                      key={totalPoints}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="flex items-baseline gap-4"
                    >
                      <span className="text-7xl font-display font-black text-on-surface tracking-tighter drop-shadow-sm">
                        {totalPoints.toLocaleString()}
                      </span>
                      <span className="text-2xl font-display font-black text-primary opacity-60">pts</span>
                    </motion.div>
                    <motion.div
                      key={pointsThisMonth}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-secondary/10 text-secondary border border-secondary/20 font-display font-black text-[10px] uppercase tracking-widest w-fit shadow-sm"
                    >
                      <TrendingUp className="w-4 h-4" />
                      +{pointsThisMonth} pts este mes
                    </motion.div>
                  </div>

                  <div className="flex flex-col gap-4 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        document.getElementById('recompensas-premium')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-primary text-on-primary px-10 py-5 rounded-[24px] font-display font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                      <Star className="w-5 h-5" />
                      Canjear Puntos
                    </button>
                    <button
                      onClick={() => setHistoryModalOpen(true)}
                      className="bg-surface-container-high/50 border-2 border-primary/20 backdrop-blur-md text-primary px-10 py-5 rounded-[24px] font-display font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary/10 active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                      <History className="w-5 h-5" />
                      Ver Historial
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Daily Streaks Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-4 bg-surface-container-low border-2 border-secondary/30 rounded-[40px] p-10 flex flex-col justify-center relative shadow-2xl overflow-hidden group"
              >
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-secondary/5 rounded-full blur-[60px] pointer-events-none group-hover:scale-150 transition-transform duration-1000" />

                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-display font-black text-on-surface uppercase tracking-tight">
                    Rachas Diarias
                  </h3>
                  <div className="p-3 bg-secondary/20 rounded-2xl text-secondary animate-pulse">
                    <Flame className="w-6 h-6 fill-secondary/20" />
                  </div>
                </div>

                <div className="flex items-end gap-3 mb-10">
                  <motion.span
                    key={currentStreak}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-6xl font-display font-black text-secondary tracking-tighter"
                  >
                    {currentStreak}
                  </motion.span>
                  <span className="text-sm font-display font-black text-on-surface-variant pb-2 uppercase tracking-widest opacity-60">
                    Días seguidos
                  </span>
                </div>

                <div className="flex justify-between items-center gap-2">
                  {weekDays.map((wd, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${
                          wd.active
                            ? 'bg-secondary text-on-secondary shadow-[0_0_20px_rgba(81,223,142,0.4)] scale-110'
                            : wd.completed
                            ? 'bg-secondary/20 border-2 border-secondary/40 text-secondary'
                            : 'bg-surface-container-highest/50 border-2 border-outline-variant/30 text-on-surface-variant opacity-40'
                        }`}
                      >
                        {wd.completed ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <span className="text-xs font-black">{wd.day}</span>
                        )}
                      </div>
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest font-mono ${
                          wd.active ? 'text-secondary' : 'text-on-surface-variant'
                        }`}
                      >
                        {wd.day}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {showStreakBonus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-center bg-secondary/5 py-3 rounded-2xl border border-secondary/10"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest text-secondary">
                      +50 pts bono de racha
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Frequent Use Bonuses */}
              <section className="lg:col-span-6 flex flex-col gap-6">
                <h3 className="text-2xl font-display font-black text-on-surface flex items-center gap-3">
                  <Zap className="w-6 h-6 text-primary" />
                  Bonos de Uso Frecuente
                </h3>
                <div className="space-y-4">
                  {bonuses.map((bonus, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={bonus.onClick}
                      className={`flex items-center justify-between p-6 rounded-[28px] bg-surface-container-low/50 hover:bg-surface-container-high transition-all border border-outline-variant/30 group shadow-lg ${
                        bonus.canClick ? 'cursor-pointer' : ''
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
                          <bonus.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-lg font-display font-black text-on-surface">
                            {bonus.title}
                          </div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 font-mono">
                            {bonus.sub}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-display font-black text-primary bg-primary/5 px-4 py-2 rounded-xl border border-primary/10">
                        {bonus.pts}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Recent History */}
              <section className="lg:col-span-6 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-display font-black text-on-surface flex items-center gap-3">
                    <History className="w-6 h-6 text-on-surface-variant opacity-60" />
                    Historial Reciente
                  </h3>
                  <button
                    onClick={() => setHistoryModalOpen(true)}
                    className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline bg-primary/5 px-4 py-2 rounded-xl"
                  >
                    Ver todo
                  </button>
                </div>
                <div className="bg-surface-container-low border border-outline-variant/30 rounded-[32px] overflow-hidden shadow-2xl divide-y divide-outline-variant/10">
                  {recentTransactions.length === 0 ? (
                    <div className="p-8 text-center text-on-surface-variant">
                      No hay transacciones aún
                    </div>
                  ) : (
                    recentTransactions.map((tx, i) => {
                      const Icon = getTransactionIcon(tx.action);
                      const isGain = tx.type === 'gain';

                      return (
                        <motion.div
                          key={tx.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="p-8 flex items-center justify-between hover:bg-surface-container-high transition-all group"
                        >
                          <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform border border-outline-variant/20 shadow-sm">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-base font-display font-black text-on-surface group-hover:text-primary transition-colors">
                                {tx.action}
                              </span>
                              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 font-mono">
                                {formatTransactionTime(tx.timestamp)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-lg font-display font-black drop-shadow-sm ${
                                isGain ? 'text-secondary' : 'text-error'
                              }`}
                            >
                              {isGain ? '+' : '-'}
                              {Math.abs(tx.points).toLocaleString()} pts
                            </span>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </section>
            </div>

            {/* Redeem Rewards Section */}
            <section id="recompensas-premium" className="flex flex-col gap-8">
              <h2 className="text-4xl font-display font-black text-on-surface tracking-tight">
                Recompensas Premium
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {rewards.map((reward, idx) => {
                  const hasEnoughPoints = totalPoints >= reward.points;
                  const remainingPoints = Math.max(0, reward.points - totalPoints);

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`bg-surface-container-low border border-outline-variant/30 rounded-[40px] overflow-hidden flex flex-col group hover:border-primary/50 transition-all duration-300 shadow-2xl relative ${
                        !hasEnoughPoints ? 'opacity-75' : ''
                      }`}
                    >
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

                      <div className="h-48 w-full bg-surface-container-high relative overflow-hidden">
                        <img
                          src={reward.img}
                          alt={reward.title}
                          className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-1000 grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100"
                        />
                        <div className="absolute top-6 right-6 bg-surface/90 backdrop-blur-xl px-4 py-2 rounded-2xl font-display font-black text-[10px] text-primary flex items-center gap-2 border border-outline-variant/30 shadow-2xl">
                          <Star className="w-3.5 h-3.5 fill-primary" />
                          {reward.points.toLocaleString()} PTS
                        </div>
                      </div>

                      <div className="p-8 flex-1 flex flex-col gap-4">
                        <h4 className="text-2xl font-display font-black text-on-surface group-hover:text-primary transition-colors leading-tight">
                          {reward.title}
                        </h4>
                        <p className="text-xs font-medium text-on-surface-variant leading-relaxed opacity-70 flex-1">
                          {reward.desc}
                        </p>
                        <button
                          onClick={() => handleRewardClick(reward)}
                          className={`w-full mt-6 py-5 rounded-[24px] font-display font-black text-[10px] uppercase tracking-[0.2em] transition-all border shadow-lg ${
                            hasEnoughPoints
                              ? 'bg-primary/5 hover:bg-primary text-primary hover:text-on-primary border-primary/20 cursor-pointer'
                              : 'bg-surface-container-highest text-on-surface-variant border-outline-variant/30 cursor-not-allowed'
                          }`}
                        >
                          {hasEnoughPoints
                            ? 'Canjear Reward'
                            : `Faltan ${remainingPoints.toLocaleString()} pts`}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </div>

      <HistoryModal isOpen={historyModalOpen} onClose={() => setHistoryModalOpen(false)} />
      <RedemptionConfirmModal
        isOpen={redeemModalOpen}
        reward={selectedReward}
        onClose={() => {
          setRedeemModalOpen(false);
          setSelectedReward(null);
        }}
        onConfirm={handleRedeemConfirm}
      />
    </>
  );
}

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Footprints,
  Droplet,
  Moon,
  Apple,
  Brain,
  CheckCircle2,
  Lock,
  Zap
} from 'lucide-react';
import { PointsService } from '../../lib/pointsService';
import { toastManager } from '../../lib/toastService';

const CHALLENGE_ICONS: { [key: string]: any } = {
  'challenge-1': Footprints,
  'challenge-2': Droplet,
  'challenge-3': Moon,
  'challenge-4': Apple,
  'challenge-5': Brain
};

export default function HealthChallenges() {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = () => {
    const allChallenges = PointsService.getDailyChallenges();
    const completed = PointsService.getCompletedChallengesForToday();
    setChallenges(allChallenges);
    setCompletedIds(completed);
  };

  const handleCompleteChallenge = (challengeId: string) => {
    const result = PointsService.completeChallenge(challengeId);

    if (result.success) {
      toastManager.success(result.message);
      setCompletedIds(prev => [...prev, challengeId]);
    } else {
      toastManager.info(result.message);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-secondary/10 text-secondary border-secondary/30';
      case 'medium':
        return 'bg-primary/10 text-primary border-primary/30';
      case 'hard':
        return 'bg-error/10 text-error border-error/30';
      default:
        return 'bg-surface-container/10 text-on-surface-variant border-outline-variant/30';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'FÁCIL';
      case 'medium':
        return 'MEDIA';
      case 'hard':
        return 'DIFÍCIL';
      default:
        return difficulty.toUpperCase();
    }
  };

  const totalCompleted = completedIds.length;
  const totalChallenges = challenges.length;

  return (
    <div className="w-full flex-grow flex flex-col gap-10 pb-12 px-4 md:px-0">
      <header className="flex flex-col gap-6 mt-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-display font-black text-primary tracking-tight">
            Desafíos Diarios
          </h1>
          <p className="text-on-surface-variant font-medium text-lg max-w-2xl">
            Completa los retos para ganar puntos y mantener tu racha activa. Cada día se reinician los desafíos.
          </p>
        </div>

        {/* Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-container-low border border-outline-variant/30 rounded-[24px] p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 mb-2">
                Retos Completados
              </p>
              <p className="text-3xl font-display font-black text-on-surface">
                {totalCompleted}/{totalChallenges}
              </p>
            </div>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-3xl font-display font-black text-primary">
                {Math.round((totalCompleted / totalChallenges) * 100)}%
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface-container-low border border-outline-variant/30 rounded-[24px] p-6"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 mb-2">
              Puntos Hoy
            </p>
            <motion.p
              key={totalCompleted}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-3xl font-display font-black text-secondary"
            >
              +{totalCompleted * 30}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface-container-low border border-outline-variant/30 rounded-[24px] p-6"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 mb-2">
              Próxima Meta
            </p>
            <p className="text-2xl font-display font-black text-on-surface">
              {Math.max(0, totalChallenges - totalCompleted)} retos
            </p>
          </motion.div>
        </div>
      </header>

      {/* Challenges Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {challenges.map((challenge, idx) => {
          const Icon = CHALLENGE_ICONS[challenge.id] || Zap;
          const isCompleted = completedIds.includes(challenge.id);

          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-[32px] border transition-all duration-300 ${
                isCompleted
                  ? 'bg-secondary/5 border-secondary/30'
                  : 'bg-surface-container-low border-outline-variant/30 hover:border-primary/50'
              }`}
            >
              {/* Top accent line */}
              <div
                className={`absolute top-0 inset-x-0 h-1 ${
                  isCompleted
                    ? 'bg-gradient-to-r from-transparent via-secondary to-transparent'
                    : 'bg-gradient-to-r from-transparent via-primary to-transparent'
                }`}
              />

              {/* Decorative background element */}
              <div
                className={`absolute -right-20 -top-20 w-40 h-40 rounded-full blur-[80px] pointer-events-none ${
                  isCompleted ? 'bg-secondary/5' : 'bg-primary/5'
                }`}
              />

              {/* Content */}
              <div className="relative p-8 flex flex-col h-full gap-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
                        isCompleted
                          ? 'bg-secondary/20 text-secondary shadow-lg shadow-secondary/20'
                          : 'bg-primary/10 text-primary group-hover:scale-110'
                      }`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-black text-on-surface mb-1">
                        {challenge.title}
                      </h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                        {challenge.subtitle}
                      </p>
                    </div>
                  </div>

                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="flex-shrink-0"
                    >
                      <CheckCircle2 className="w-6 h-6 text-secondary" />
                    </motion.div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className={`px-4 py-2 rounded-xl border font-display font-black text-[10px] uppercase tracking-widest ${getDifficultyColor(challenge.difficulty)}`}>
                    {getDifficultyLabel(challenge.difficulty)}
                  </div>
                  <div className="text-lg font-display font-black text-secondary bg-secondary/5 px-4 py-2 rounded-xl border border-secondary/20">
                    +{challenge.points} pts
                  </div>
                </div>

                <button
                  onClick={() => handleCompleteChallenge(challenge.id)}
                  disabled={isCompleted}
                  className={`w-full py-4 rounded-[20px] font-display font-black text-[10px] uppercase tracking-[0.2em] transition-all border shadow-lg ${
                    isCompleted
                      ? 'bg-secondary/10 text-secondary border-secondary/30 cursor-default'
                      : 'bg-primary/5 hover:bg-primary text-primary hover:text-on-primary border-primary/20 active:scale-95'
                  }`}
                >
                  {isCompleted ? '✓ Completado' : 'Completar Reto'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Motivational Message */}
      {totalCompleted === totalChallenges && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/30 rounded-[32px] p-8 text-center"
        >
          <h2 className="text-2xl font-display font-black text-secondary mb-2">
            ¡Excelente trabajo! 🎉
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Completaste todos los desafíos hoy. Vuelve mañana para nuevos retos y sigue ganando puntos.
          </p>
        </motion.div>
      )}
    </div>
  );
}
              {ranking.map((user, idx) => (
                <div 
                  key={idx}
                  className={`flex items-center p-4 rounded-2xl border transition-all ${
                    user.current 
                      ? 'bg-primary/5 border-primary/30 relative overflow-hidden' 
                      : 'bg-surface-container/30 border-outline-variant/10 hover:bg-surface-container/50'
                  }`}
                >
                  {user.current && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                  <div className={`w-8 text-center text-xs font-black ${user.rank <= 3 ? 'text-primary' : 'text-on-surface-variant'}`}>{user.rank}</div>
                  <div className="w-11 h-11 rounded-full bg-surface-container overflow-hidden mx-3 flex-shrink-0 flex items-center justify-center border border-outline-variant/10">
                    {user.current ? (
                      <span className="text-[10px] font-black text-primary">{t('challenges.you')}</span>
                    ) : (
                      <User className="w-5 h-5 opacity-40" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className={`text-sm font-bold ${user.current ? 'text-on-surface' : 'text-on-surface-variant'}`}>{user.name}</p>
                    <p className="text-[10px] font-medium text-on-surface-variant opacity-60 uppercase tracking-widest">{t('challenges.level')} {user.level}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-display font-black ${user.current ? 'text-on-surface' : 'text-secondary'}`}>{user.pts}</p>
                    <p className="text-[10px] font-black text-on-surface-variant opacity-40 uppercase">pts</p>
                  </div>
                </div>
              ))}
              
              <div className="h-px bg-outline-variant/10 my-2" />
            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant/10">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 mb-3">
                <span>{t('challenges.next_level')}: Platinum</span>
                <span>{t('challenges.left_pts')}</span>
              </div>
              <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-primary h-full rounded-full" 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

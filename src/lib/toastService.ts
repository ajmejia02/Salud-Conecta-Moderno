/**
 * Toast Notification Service
 */

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

type ToastListener = (toast: Toast) => void;

class ToastManager {
  private listeners: Set<ToastListener> = new Set();
  private toastId = 0;

  subscribe(listener: ToastListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(toast: Toast): void {
    this.listeners.forEach(listener => listener(toast));
  }

  show(message: string, type: ToastType = 'info', duration = 3000): void {
    const toast: Toast = {
      id: `toast-${++this.toastId}`,
      message,
      type,
      duration
    };
    this.notify(toast);
  }

  success(message: string, duration = 3000): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration = 3000): void {
    this.show(message, 'error', duration);
  }

  info(message: string, duration = 3000): void {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration = 3000): void {
    this.show(message, 'warning', duration);
  }
}

export const toastManager = new ToastManager();

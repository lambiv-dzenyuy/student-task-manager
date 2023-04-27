import { Notify } from 'quasar';

export const appNotify = {
  success: (message?: string) => {
    Notify.create({
      message: message ?? 'Operation completed successfully',
      type: 'positive',
      position: 'center'
    });
  },
  error: (message?: string) => {
    Notify.create({
      message: message ?? 'An error ocurred',
      type: 'negative',
      position: 'top-right'
    });
  }
};

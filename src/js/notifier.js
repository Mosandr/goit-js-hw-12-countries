import { error, alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

class Notifier {
  constructor() {}

  onLongListAlert() {
    alert({
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 1000,
    });
  }

  onError() {
    error({
      text: 'Oops! No matches found',
      delay: 1000,
    });
  }
}

export default new Notifier();

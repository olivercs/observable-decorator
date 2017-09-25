export default class EventEmitter {

  constructor() {
    this.channel = {};
  }

  emit(channel, ...args) {

    if (!Array.isArray(this.channel[channel])) {
      this.channel[channel] = [];
    }

    this.channel[channel].forEach(fn => fn(...args));
  }

  on(channel, subscriber) {

    if (!Array.isArray(this.channel[channel])) {
      this.channel[channel] = [];
    }

    this.channel[channel].push(subscriber);
  }

}
import {isPromise} from './utils';
import EventEmitter from './EventEmitter';

function observableMethod(target, name, descriptor, events) {

  const oldValue = descriptor.value;
  const channel = `${target.constructor.name}.${name}`;

  descriptor.value = function () {

    const ret = oldValue.call(this);

    if (isPromise(ret)) {
      ret.then(val => events.emit(channel, val));
    } else {
      events.emit(channel, ret);
    }

    return ret;
  }

  return descriptor;

}

function observableProperty(target, name, descriptor, events) {

  const _name = `_${name}`;
  const channel = `${target.constructor.name}.${name}`;

  return Object.defineProperty(target, name, {
    enumerable: true,
    configurable: true,
    get: () => target[_name],
    set: (val) => {

      target[_name] = val;

      if (isPromise(val)) {
        ret.then(val => events.emit(channel, val));
      } else {
        events.emit(channel, val);
      }

    }
  });

}

function initObservableDecorator(events) {
  return function observable(target, name, descriptor) {

    // generate observable of a method.

    if (descriptor.value) {
      return observableMethod(target, name, descriptor, events);
    }

    // generate observable of a property.

    if (!descriptor.value) {
      return observableProperty(target, name, descriptor, events);
    }

  }
}

export const events =  new EventEmitter();
export const observable = initObservableDecorator(events);
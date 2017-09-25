
import {observable, events} from './index.js';

class Apple {
  
  @observable state = {};
  
  @observable name() {
    return Promise.resolve('apple');
  }
}

const apl = new Apple();

events.on('Apple.name', function(ret) {
  console.log('returning value:', ret);
});

events.on('Apple.state', function(ret) {
  console.log('Setting returning value:', ret);
});

apl.name()
  .then(className => console.log(`this className is: ${className}`));

apl.state = {
  firstName: 'Oliver'
}

apl.state = {
  ...apl.state,
  lastName: 'Castillo'
}
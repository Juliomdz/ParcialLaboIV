import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from './can-component-deactivate.interface';

export const infoGuard: CanDeactivateFn<CanComponentDeactivate> = (component, currentRoute, currentState, nextState) => {

  
  return component.canDeactivate ? component.canDeactivate() : true;
};

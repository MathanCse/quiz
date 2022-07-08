import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  logged = false;
  function() {
    if (logged) {
      Route.transitionTo('question');
    } else {
      Route.transitionTo('not-found');
    }
  }
}

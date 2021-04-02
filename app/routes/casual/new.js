import Route from '@ember/routing/route';

export default class CasualNewRoute extends Route {
    model() {
        return this.store.findAll("player");
    }
}

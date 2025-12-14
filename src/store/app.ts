import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({ name: 'app' })
export default class Settings extends VuexModule {
    public password = '';

    @Mutation
    public setPassword (psw: string): void {
      this.password = psw;
    }
}

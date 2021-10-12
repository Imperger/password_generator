import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({ name: 'settings' })
export default class Settings extends VuexModule {
    public lowercaseAlphabet = true;

    public uppercaseAlphabet = true;

    public digitsAlphabet = true;

    public symbolsAlphabet = false;

    @Mutation
    public switchLowercaseAlphabet (state: boolean): void {
      this.lowercaseAlphabet = state;
    }

    @Mutation
    public switchUppercaseAlphabet (state: boolean): void {
      this.uppercaseAlphabet = state;
    }

    @Mutation
    public switchDigitsAlphabet (state: boolean): void {
      this.digitsAlphabet = state;
    }

    @Mutation
    public switchSymbolsAlphabet (state: boolean): void {
      this.symbolsAlphabet = state;
    }
}

import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

export interface GeneratorTemplate {
  id: number;
  name: string;
  template: string;
  lowercaseAlphabet: boolean;
  uppercaseAlphabet: boolean;
  digitsAlphabet: boolean;
  symbolsAlphabet: boolean;
  passwordLength: number;
}

@Module({ name: 'settings' })
export default class Settings extends VuexModule {
  public currentGeneratorTemplateId = 0;

  public generatorTemplates: GeneratorTemplate[] = [
    {
      id: Date.now(),
      name: 'Strong Password',
      template: '{rnd}',
      lowercaseAlphabet: true,
      uppercaseAlphabet: true,
      digitsAlphabet: true,
      symbolsAlphabet: true,
      passwordLength: 16
    }
  ];

  public get generatorTemplate (): GeneratorTemplate {
    return this.generatorTemplates.find(x => x.id === this.currentGeneratorTemplateId) ??
      this.generatorTemplates[0];
  }

  @Action
  async createTemplate (template: Omit<GeneratorTemplate, 'id'>): Promise<number> {
    const id = Date.now();

    this.context.commit('addTemplate', { id, ...template });

    return id;
  }

  @Mutation
  public addTemplate (template: GeneratorTemplate): void {
    this.generatorTemplates.push({ ...template });
  }

  @Mutation
  public updateTemplate (update: GeneratorTemplate): void {
    const found = this.generatorTemplates.find(x => x.id === update.id);

    if (found) {
      found.name = update.name;
      found.template = update.template;
      found.lowercaseAlphabet = update.lowercaseAlphabet;
      found.uppercaseAlphabet = update.uppercaseAlphabet;
      found.digitsAlphabet = update.digitsAlphabet;
      found.symbolsAlphabet = update.symbolsAlphabet;
      found.passwordLength = update.passwordLength;
    }
  }

  @Mutation
  public removeTemplate (id: number): void {
    const foundIdx = this.generatorTemplates.findIndex(x => x.id === id);

    if (foundIdx === -1) {
      return;
    }

    this.generatorTemplates.splice(foundIdx, 1);

    this.currentGeneratorTemplateId = this.generatorTemplates[0].id;
  }

  @Mutation
  public setActiveTemplate (id: number): void {
    if (this.generatorTemplates.some(x => x.id === id)) {
      this.currentGeneratorTemplateId = id;
    }
  }
}

export interface GeneratorOptions {
    length: number;
    alphabet: string;
}
export class PasswordGenerator {
    private pool: Uint8Array;

    private nextRandom: number;

    public constructor (private readonly poolSize = 16) {
      this.pool = new Uint8Array(this.poolSize);
      this.nextRandom = this.poolSize;
    }

    public generate (options: GeneratorOptions): string {
      let ret = '';

      for (let n = 0; n < options.length; ++n) {
        ret += options.alphabet[this.generateUntilMax(options.alphabet.length)];
      }

      return ret;
    }

    private generateRandomU8 () {
      if (this.nextRandom >= this.poolSize) {
        window.crypto.getRandomValues(this.pool);
        this.nextRandom = 0;
      }

      return this.pool[this.nextRandom++];
    }

    private generateUntilMax (max: number) {
      let rndVal = 0;
      while ((rndVal = this.generateRandomU8()) >= 256 - (256 % max));

      return rndVal % max;
    }
}

export class PasswordGeneratorOptionsFactory {
    private length = 16;

    private alphabet = new Set<string>();

    public addLowercase (): PasswordGeneratorOptionsFactory {
      return this.populateAlphabet(PasswordGeneratorOptionsFactory.lowercase);
    }

    public addUppercase (): PasswordGeneratorOptionsFactory {
      return this.populateAlphabet(PasswordGeneratorOptionsFactory.uppercase);
    }

    public addNumbers (): PasswordGeneratorOptionsFactory {
      return this.populateAlphabet(PasswordGeneratorOptionsFactory.numbers);
    }

    public addSymbols (): PasswordGeneratorOptionsFactory {
      return this.populateAlphabet(PasswordGeneratorOptionsFactory.symbols);
    }

    public addAlphabet (alphabet: string): PasswordGeneratorOptionsFactory {
      return this.populateAlphabet(alphabet);
    }

    public setLength (length: number): PasswordGeneratorOptionsFactory {
      this.length = length;
      return this;
    }

    public options (): GeneratorOptions {
      return { length: this.length, alphabet: [...this.alphabet].join('') };
    }

    private forEach (str: string, cb: (x: string) => void): void {
      for (let n = 0; n < str.length; ++n) {
        cb(str[n]);
      }
    }

    private populateAlphabet (str: string): PasswordGeneratorOptionsFactory {
      this.forEach(str, (ch: string) => this.alphabet.add(ch));
      return this;
    }

    private static readonly lowercase = 'abcdefghijklmnopqrstuvwxyz';

    private static readonly uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    private static readonly numbers = '0123456789';

    private static readonly symbols = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~';
}

import { Component, Vue } from 'vue-property-decorator';

import { Clipboard } from '@/common/clipboard';

const clipboard = new Clipboard();

@Component
export default class ClipboardMixin extends Vue {
    private copyDisabled = true;

    public async created (): Promise<void> {
      this.copyDisabled = !await clipboard.RequestPermission();
    }

    public get clipboardCopyEnabled (): boolean {
      return !this.copyDisabled;
    }

    public clipboardCopy (text: string): Promise<boolean> {
      return clipboard.Copy(text);
    }
}

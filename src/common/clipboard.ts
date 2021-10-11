export class Clipboard {
  public RequestPermission (): Promise<boolean> {
    return navigator.permissions.query({ name: 'clipboard-write' as never })
      .then(result => result.state === 'granted' || result.state === 'prompt')
      .catch(e => false);
  }

  public Copy (text: string): Promise<boolean> {
    return navigator.clipboard.writeText(text)
      .then(x => true)
      .catch(e => false);
  }
}

export class FormatDate {
  public static fullDate (): string {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${y}-${m}-${day}`;
  }

  public static year (): string {
    const d = new Date();

    return d.getFullYear().toString();
  }

  public static month (): string {
    const now = new Date();

    return String(now.getMonth() + 1).padStart(2, '0');
  }

  public static day (): string {
    const now = new Date();

    return String(now.getDate()).padStart(2, '0');
  }

  public static time (): string {
    return new Date().toTimeString().slice(0, 8);
  }

  public static timestamp (): string {
    return Math.floor(Date.now() / 1000).toString();
  }
}

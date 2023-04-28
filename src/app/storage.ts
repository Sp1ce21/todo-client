export class Storage {
  get(item: string) {
    const data = localStorage.getItem(item);

    if (!data) return data;

    if (this.isString(data)) return data;

    return JSON.parse(data);
  }

  set(name: string, data: any) {
    if (this.isString(data)) {
      localStorage.setItem(name, data);
    } else {
      localStorage.setItem(name, JSON.stringify(data));
    }
  }

  remove(name: string) {
    localStorage.removeItem(name);
  }

  private isString(data: any) {
    return typeof data === "string";
  }
}

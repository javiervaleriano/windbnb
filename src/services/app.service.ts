
export class AppService {

  public static async getData<T>(url: string): Promise<T[]> {
    try {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });

      if (!res.ok) throw new Error(res.statusText);

      return (await res.json()) as T[];

    } catch (error) {
      return [];
    }
  }

}
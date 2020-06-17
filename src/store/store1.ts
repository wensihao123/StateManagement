import { Observable } from "../lib/observable";

export interface Part {
  name: string;
  id: number;
  status: "Checked In" | "Checked Out";
}

class Store1 {
  public parts$ = new Observable<Part[]>([])

  public add = (item: Part) => {
    this.parts$.next([...this.parts$.value, item]);
  };

  public delete = (index: number) => {
    this.parts$.next([...this.parts$.value.slice(0, index), ...this.parts$.value.slice(index+1)]);
  };

}

export const store1 = new Store1();

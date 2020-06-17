import { Observable } from "./observable";
import React from "react";

export function useObservable<T>(observable$: Observable<T>) {
  const [, forceRefresh] = React.useState<{}>();

  React.useEffect(() => {
    return observable$.subscribe(() => {
      forceRefresh({});
    });
  }, [observable$]);

  return observable$.value;
}

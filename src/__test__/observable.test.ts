import { Observable } from "../lib/observable";

describe("Test Observalbe", () => {
  const testObservable$ = new Observable(0);
  const mockFunction = jest.fn();
  const unsubscribe = testObservable$.subscribe(
    (value) => mockFunction(value),
    true
  );

  test("observable can react to emit function immediately", () => {
    expect(mockFunction).toHaveBeenCalledWith(0);
  });

  test("observalbe can react to emit when calling next function", () => {
    mockFunction.mockReset();
    testObservable$.next(1);
    expect(mockFunction).toHaveBeenCalledWith(1);
  });

  test("observable can unsubscribe", () => {
    unsubscribe();
    expect(testObservable$.listener.length).toBe(0);
  });
});

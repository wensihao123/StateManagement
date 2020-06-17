import { store1, Part } from "../store/store1";

describe("Test Store1", () => {
  const tempItem: Part = {
    name: 'name',
    id: 123,
    status:  "Checked In",
  };
  const parts = store1.parts$;
  const mockFunction = jest.fn();
  parts.subscribe(mockFunction);

  test("Add item", () => {
    expect(parts.value.length).toBe(0);
    store1.add(tempItem);
    expect(parts.value.length).toBe(1);
    expect(parts.value[0]).toBe(tempItem);
  });

  test("Delete Item", () => {
    expect(parts.value.length).toBe(1);
    store1.delete(0);
    expect(parts.value.length).toBe(0);
  });
});

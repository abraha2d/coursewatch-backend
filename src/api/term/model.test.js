import { Term } from ".";

let term;

beforeEach(async () => {
  term = await Term.create({ college: "test", yyyymm: "test", name: "test" });
});

describe("view", () => {
  it("returns simple view", () => {
    const view = term.view();
    expect(typeof view).toBe("object");
    expect(view.id).toBe(term.id);
    expect(view.college).toBe(term.college);
    expect(view.yyyymm).toBe(term.yyyymm);
    expect(view.name).toBe(term.name);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it("returns full view", () => {
    const view = term.view(true);
    expect(typeof view).toBe("object");
    expect(view.id).toBe(term.id);
    expect(view.college).toBe(term.college);
    expect(view.yyyymm).toBe(term.yyyymm);
    expect(view.name).toBe(term.name);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});

import { College } from ".";

let college;

beforeEach(async () => {
  college = await College.create({ code: "test", name: "test", url: "test" });
});

describe("view", () => {
  it("returns simple view", () => {
    const view = college.view();
    expect(typeof view).toBe("object");
    expect(view.id).toBe(college.id);
    expect(view.code).toBe(college.code);
    expect(view.name).toBe(college.name);
    expect(view.url).toBe(college.url);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it("returns full view", () => {
    const view = college.view(true);
    expect(typeof view).toBe("object");
    expect(view.id).toBe(college.id);
    expect(view.code).toBe(college.code);
    expect(view.name).toBe(college.name);
    expect(view.url).toBe(college.url);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});

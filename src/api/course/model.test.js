import { Course } from ".";
import { User } from "../user";

let user, course;

beforeEach(async () => {
  user = await User.create({ email: "a@a.com", password: "123456" });
  course = await Course.create({ user, crn: "test" });
});

describe("view", () => {
  it("returns simple view", () => {
    const view = course.view();
    expect(typeof view).toBe("object");
    expect(view.id).toBe(course.id);
    expect(typeof view.user).toBe("object");
    expect(view.user.id).toBe(user.id);
    expect(view.crn).toBe(course.crn);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it("returns full view", () => {
    const view = course.view(true);
    expect(typeof view).toBe("object");
    expect(view.id).toBe(course.id);
    expect(typeof view.user).toBe("object");
    expect(view.user.id).toBe(user.id);
    expect(view.crn).toBe(course.crn);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});

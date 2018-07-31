import { Subscription } from ".";
import { User } from "../user";

let user, subscription;

beforeEach(async () => {
  user = await User.create({ email: "a@a.com", password: "123456" });
  subscription = await Subscription.create({ user, course: "test" });
});

describe("view", () => {
  it("returns simple view", () => {
    const view = subscription.view();
    expect(typeof view).toBe("object");
    expect(view.id).toBe(subscription.id);
    expect(typeof view.user).toBe("object");
    expect(view.user.id).toBe(user.id);
    expect(view.course).toBe(subscription.course);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it("returns full view", () => {
    const view = subscription.view(true);
    expect(typeof view).toBe("object");
    expect(view.id).toBe(subscription.id);
    expect(typeof view.user).toBe("object");
    expect(view.user.id).toBe(user.id);
    expect(view.course).toBe(subscription.course);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});

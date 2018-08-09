import { Course } from ".";

let course;

beforeEach(async () => {
  course = await Course.create({
    term: "test",
    crn: "test",
    subject: "test",
    number: "test",
    section: "test",
    title: "test"
  });
});

describe("view", () => {
  it("returns simple view", () => {
    const view = course.view();
    expect(typeof view).toBe("object");
    expect(view.id).toBe(course.id);
    expect(view.term).toBe(course.term);
    expect(view.crn).toBe(course.crn);
    expect(view.subject).toBe(course.subject);
    expect(view.number).toBe(course.number);
    expect(view.section).toBe(course.section);
    expect(view.title).toBe(course.title);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it("returns full view", () => {
    const view = course.view(true);
    expect(typeof view).toBe("object");
    expect(view.id).toBe(course.id);
    expect(view.term).toBe(course.term);
    expect(view.crn).toBe(course.crn);
    expect(view.subject).toBe(course.subject);
    expect(view.number).toBe(course.number);
    expect(view.section).toBe(course.section);
    expect(view.title).toBe(course.title);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});

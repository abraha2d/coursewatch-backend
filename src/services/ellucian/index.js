import rp from "request-promise";
import cheerio from "cheerio";

function processCourse(course) {
  const options = {
    uri: `${course.term.college.url}/bwckschd.p_disp_detail_sched?term_in=${
      course.term.yyyymm
    }&crn_in=${course.crn}`,
    transform: body => cheerio.load(body)
  };

  return rp(options).then($ => {
    const dciSel = "body > div.pagebodydiv > table:nth-child(2) > tbody";
    const tsnSel = `${dciSel} > tr:nth-child(1) > th`;
    const seatSel = `${dciSel} > tr:nth-child(2) > td > table > tbody > tr:nth-child(2)`;
    const capSel = `${seatSel} > td:nth-child(2)`;
    const actSel = `${seatSel} > td:nth-child(3)`;
    const remSel = `${seatSel} > td:nth-child(4)`;

    const tsn = $(tsnSel).text();
    const [title, crn, sn, section] = tsn.split(" - ");
    const [subject, number] = sn.split(" ");

    if (crn !== course.crn) {
      return course;
    }

    const availability = {
      capacity: $(capSel).text(),
      actual: $(actSel).text(),
      remaining: $(remSel).text()
    };

    Object.assign(course, {
      title,
      subject,
      number,
      section,
      availability
    }).save();

    return course;
  });
}

function processCourses(courses) {
  const rPromises = courses.map(course => processCourse(course));
  return Promise.all(rPromises);
}

function processSubscription(subscription) {
  const options = {
    uri: `${
      subscription.course.term.college.url
    }/bwckschd.p_disp_detail_sched?term_in=${
      subscription.course.term.yyyymm
    }&crn_in=${subscription.course.crn}`,
    transform: body => cheerio.load(body)
  };

  return rp(options).then($ => {
    const dciSel = "body > div.pagebodydiv > table:nth-child(2) > tbody";
    const tsnSel = `${dciSel} > tr:nth-child(1) > th`;
    const seatSel = `${dciSel} > tr:nth-child(2) > td > table > tbody > tr:nth-child(2)`;
    const capSel = `${seatSel} > td:nth-child(2)`;
    const actSel = `${seatSel} > td:nth-child(3)`;
    const remSel = `${seatSel} > td:nth-child(4)`;

    const tsn = $(tsnSel).text();
    const [title, crn, sn, section] = tsn.split(" - ");
    const [subject, number] = sn.split(" ");

    if (crn !== subscription.course.crn) {
      return subscription;
    }

    const availability = {
      capacity: $(capSel).text(),
      actual: $(actSel).text(),
      remaining: $(remSel).text()
    };

    Object.assign(subscription.course, {
      title,
      subject,
      number,
      section,
      availability
    }).save();

    return subscription;
  });
}

function processSubscriptions(subscriptions) {
  const rPromises = subscriptions.map(subscription =>
    processSubscription(subscription)
  );
  return Promise.all(rPromises);
}

export {
  processCourse,
  processCourses,
  processSubscription,
  processSubscriptions
};

export default processCourse;

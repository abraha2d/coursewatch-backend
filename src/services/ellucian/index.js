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
  return processCourse(subscription.course).then(() => subscription);
}

function processSubscriptions(subscriptions) {
  const rPromises = subscriptions.map(subscription =>
    processSubscription(subscription)
  );
  return Promise.all(rPromises);
}

function schedulePing(url, timeout) {
  rp(url).then(() => setTimeout(() => schedulePing(url, timeout), timeout));
}

export {
  processCourse,
  processCourses,
  processSubscription,
  processSubscriptions,
  schedulePing
};

export default schedulePing;

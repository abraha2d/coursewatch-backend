import rp from "request-promise";
import cheerio from "cheerio";

import { formatNumber } from "libphonenumber-js";

import { sendMail } from "../sendgrid";
import { sendText } from "../textmagic";

function courseURL(course) {
  const {
    term: {
      college: { url },
      yyyymm
    },
    crn
  } = course;
  return `${url}/bwckschd.p_disp_detail_sched?term_in=${yyyymm}&crn_in=${crn}`;
}

function processCourse(course) {
  const options = {
    uri: courseURL(course),
    transform: body => cheerio.load(body)
  };

  return rp(options)
    .then($ => {
      const dciSel = "body > div.pagebodydiv > table:nth-of-type(1) > tbody";
      const tsnSel = `${dciSel} > tr:nth-of-type(1) > th`;
      const seatSel = `${dciSel} > tr:nth-of-type(2) > td > table:nth-of-type(1) > tbody > tr:nth-of-type(3)`;
      const capSel = `${seatSel} > td:nth-of-type(1)`;
      const actSel = `${seatSel} > td:nth-of-type(2)`;
      const remSel = `${seatSel} > td:nth-of-type(3)`;

      const tsn = $(tsnSel).text();
      if (tsn === "") {
        process.stderr.write(`Invalid CRN (${course.crn}), removing entry...`);
        course.remove();
        return null;
      }

      const [title, crn, sn, section] = tsn.split(" - ");
      const [subject, number] = sn.split(" ");

      if (crn !== course.crn) {
        process.stderr.write(
          `Retrieved CRN (${crn}) doesn't match stored CRN (${course.crn})!`
        );
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
    })
    .catch(error => process.stderr.write(error.toString()));
}

function processCourses(courses) {
  const rPromises = courses.map(course => processCourse(course));
  return Promise.all(rPromises);
}

function processSubscription(subscription) {
  return processCourse(subscription.course).then(course => {
    if (course === undefined) {
      return subscription;
    }
    const { term, crn, subject, number, section, availability } = course;
    if (availability.remaining > 0) {
      process.stdout.write(
        `Notifying ${subscription.user.email} about ${crn}...\n`
      );
      sendMail({
        toEmail: subscription.user.email,
        subject: `[Coursewatch] Alert for CRN ${crn}`,
        content: `Hey ${subscription.user.name},<br><br>
        ${subject} ${number} ${section} has ${
          availability.remaining
        } seats remaining! Go get your course!<br><br>
        - Login to BuzzPort: https://buzzport.gatech.edu/<br>
        - Click this link to jump straight to registration: https://buzzport.gatech.edu/cp/ip/login?sys=sct&url=https://oscar.gatech.edu/pls/bprod/bwskfreg.P_AltPin?term_in=${
          term.yyyymm
        }<br><br>
        Course info: ${courseURL(course)}<br><br>
        - Coursewatch`
      });
      sendText({
        phones: formatNumber(subscription.user.tel, "US", "E.164"),
        text: `Alert for CRN ${crn} (${subject} ${number} ${section}): ${
          availability.remaining
        } seats remaining!`
      });
    }
    return subscription;
  });
}

function processSubscriptions(subscriptions) {
  const rPromises = subscriptions.map(subscription =>
    processSubscription(subscription)
  );
  return Promise.all(rPromises);
}

function schedulePing(url, timeout) {
  rp(url)
    .then(() => setTimeout(() => schedulePing(url, timeout), timeout))
    .catch(() => setTimeout(() => schedulePing(url, timeout), timeout));
}

export {
  processCourse,
  processCourses,
  processSubscription,
  processSubscriptions,
  schedulePing
};

export default schedulePing;

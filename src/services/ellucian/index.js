import rp from "request-promise";
import cheerio from "cheerio";

function scrapeBannerFromSubscription(subscription) {
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
      return subscription.view();
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

    return subscription.view();
  });
}

function scrapeBannerFromSubscriptions(subscriptions) {
  const rPromises = subscriptions.map(subscription =>
    scrapeBannerFromSubscription(subscription)
  );
  return Promise.all(rPromises);
}

export default scrapeBannerFromSubscriptions;

import rp from "request-promise";
import cheerio from "cheerio";

function scrapeBannerSingle(subscription) {
  const payload = {
    availability: {
      capacity: 0,
      actual: 0,
      remaining: 0
    }
  };

  const options = {
    uri: `${
      subscription.course.term.college.url
    }/bwckschd.p_disp_detail_sched?term_in=${
      subscription.course.term.yyyymm
    }&crn_in=${subscription.course.crn}`,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  return rp(options).then($ => {
    const tds = $(
      '[summary="This layout table is used to present the seating numbers."]'
    ).find("td.dddefault");
    payload.availability.capacity = tds[0].children[0].data;
    payload.availability.actual = tds[1].children[0].data;
    payload.availability.remaining = tds[2].children[0].data;
    return {
      ...subscription,
      course: {
        ...subscription.course,
        ...payload
      }
    };
  });
}

function scrapeBanner(subscriptions) {
  const rPromises = subscriptions.map(subscription =>
    scrapeBannerSingle(subscription)
  );
  return Promise.all(rPromises);
}

export default scrapeBanner;

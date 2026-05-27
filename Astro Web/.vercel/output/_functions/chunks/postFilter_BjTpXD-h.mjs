import { c as config } from './config_Bf99gZGu.mjs';

function postFilter({ data }) {
  const isPublishTimePassed = Date.now() > new Date(data.pubDatetime).getTime() - config.posts.scheduledPostMargin;
  return !data.draft && isPublishTimePassed;
}

export { postFilter as p };

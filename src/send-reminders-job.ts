import { job } from 'cron';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

const sendRemindersJob = job('* * * * *', async function () {
  console.log(`cron job - ${new Date().toLocaleString()}`);

  const pageIds: string[] = [];
  let response = await notion.databases.query({
    database_id: `${databaseId}`,
  });
  response.results.forEach((page) => pageIds.push(page.id));
  while (response.has_more) {
    response = await notion.databases.query({
      database_id: `${databaseId}`,
      start_cursor: response.next_cursor!,
    });
    response.results.forEach((page) => pageIds.push(page.id));
  }

  console.log(pageIds);
});

export { sendRemindersJob };

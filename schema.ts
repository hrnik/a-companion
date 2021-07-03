import { createSchema, list } from '@keystone-next/keystone/schema';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-next/fields';
import { document } from '@keystone-next/fields-document';

const Task = list({
  fields: {
    title: text({ isRequired: true, isUnique: true }),
    attempts: relationship({ ref: 'Attempt.task', many: true, isRequired: false }),
  },
});



const Attempt = list({
  fields: {
    date: timestamp({
      isRequired: true
    }),
    status: select({
      options: [
        { label: 'Ok', value: 'ok' },
        { label: 'Good', value: 'good' },
        { label: 'Bad', value: 'bad' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    task: relationship({ ref: 'Task.attempts', many: false, }),
  }
});




export const lists = createSchema({
  User: list({
    ui: {
      listView: {
        initialColumns: ['name'],
      },
    },
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true, isUnique: true }),
      password: password({ isRequired: true }),
    },
  }),
  Task,
  Attempt
});

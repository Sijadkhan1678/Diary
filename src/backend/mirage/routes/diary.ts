import {
  Request,
  Response
} from 'miragejs'
import {
  handleErrors
} from '../server'
import dayjs from 'dayjs'
import {
  User
} from '../../../interfaces/User'
import {
  Diary
} from '../../../interfaces/Diary'
import {
  Entry
} from '../../../interfaces/Entry'



export const create = (schema: any, req: Request): {
  user: User,
  diary: Diary
} | Response => {
  try {
    const {
      title,
      type,
      userId
    } = JSON.parse(req.requestBody) as Partial < Diary >;

    const existUser = schema.users.findBy({
      id: userId
    })
    if (!existUser) {
      handleErrors(null, 'user is not authenticated')
    }
    const now = dayjs().format();
    const diary = existUser.createDiary({
      title,
      type,
      createdAt: now,
      updatedAt: now,
    })

    return {
      user: {
        ...existUser.attrs,

      },
      diary: diary.attrs,
    };

  } catch(error) {

    return handleErrors(error, 'Faild to.create Diary')
  }

}

export const updateDiary = (schema: any, req: Request): Diary | Response => {
  try {
    const diary = schema.diaries.find(req.params.id)

    const data = JSON.parse(req.requestBody) as Partial < Diary >;
    const now = dayjs().format()

    diary.updated({
      ...data,
      updatedAt: now
    })
    return diary.attrs as Diary
  } catch(error) {

    return handleErrors(error, 'Failed to update')
  }
}

export const getDiaries = (schema: any, req: Request): Diary | Response => {
  try {
    const user = schema.user.find(req.params.id)
    return user.diary as Diary
  } catch(error) {

    return handleErrors(error, 'get diaries failed')
  }
}

export const addEntry = (schema: any, req: Request): {
  diary: Diary; entry: Entry
} | Response => {
  try {
    const diary = schema.diaries.find(req.params.id)
    const {
      title,
      content
    } = JSON.parse(req.requestBody) as Partial < Entry >
    const now = dayjs().format();
    const entry = diary.createEntry({
      title,
      content,
      createdAt: now,
      update: now
    })
    diary.update({
      ...diary.attrs,
      updatedAt: now,
    });
    return {
      diary: diary.attrs,
      entry: entry.attrs,
    }
  } catch(error) {

    return handleErrors(error, 'get diaries failed')
  }
}
export const getEntries = (
  schema: any,
  req: Request
): { entries: Entry[] } | Response => {
  try {
    const diary = schema.diaries.find(req.params.id);
    return diary.entry;
  } catch (error) {
    return handleErrors(error, "Failed to get Diary entries.");
  }
};
export const updateEntry = (schema: any, req: Request): Entry | Response => {
  try {
    const entry = schema.entries.find(req.params.id);
    const data = JSON.parse(req.requestBody) as Partial<Entry>;
    const now = dayjs().format();
    entry.update({
      ...data,
      updatedAt: now,
    });
    return entry.attrs as Entry;
  } catch (error) {
    return handleErrors(error, "Failed to update entry.");
  }
};
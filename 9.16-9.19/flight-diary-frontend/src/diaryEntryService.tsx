import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from './Types';

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaryEntries = () => {
  return axios
  .get(baseUrl).then(response => response.data)
}

export const postNewEntry = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then(response => response.data)
}

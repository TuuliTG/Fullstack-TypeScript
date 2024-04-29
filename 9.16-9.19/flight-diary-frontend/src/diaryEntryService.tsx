import axios, { AxiosError } from 'axios';
import { DiaryEntry, NewDiaryEntry } from './types';

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaryEntries = () => {
  return axios
  .get(baseUrl).then(response => response.data)
}

type PostNewEntryResult = DiaryEntry | string;

export const postNewEntry = async (object: NewDiaryEntry): Promise<PostNewEntryResult> => {
  try {
    const response = await axios
    .post<DiaryEntry>(baseUrl, object)
    return response.data
  } catch (error) {
    if (axios.isAxiosError<AxiosError>(error)) {
      console.log(error.status)
      console.error(error.response);
      if (error.response?.data && typeof error.response?.data === 'string') {
        return error.response.data;
      } else {
        return 'Unknown error occurred';
      }
    } else {
      console.error(error);
      return "Something went wrong"
    }
  }
}

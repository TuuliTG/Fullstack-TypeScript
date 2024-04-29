import { DiaryEntry } from "./types";

interface DiaryProps {
  entry: DiaryEntry
}
export const DiaryDetails = (props: DiaryProps) => {
  return (
    <div>
      <b>{props.entry.date}</b>
      <br></br>
      visibility: {props.entry.visibility}
      <br></br>
      weather: {props.entry.weather}
      <br></br>
      Comment: {props.entry.comment}
    </div>
  )
}
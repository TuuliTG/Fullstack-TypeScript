import { DiaryEntry } from "./App";
import { DiaryDetails } from "./DiaryDetails";

interface ListProps {
  entries: DiaryEntry[]
}
export const DiaryEntryList = (props: ListProps) => {
  return (
    <div>
      {props.entries.map(e => (
        <div key={e.id} style={{ padding :"1em 0em" }}> 
          <DiaryDetails entry={e}></DiaryDetails>
        </div>
      ))}
    </div>
  )
}
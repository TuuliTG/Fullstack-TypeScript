import { useEffect, useState } from "react";
import { Header } from "./Header";
import { DiaryEntryList } from "./DiaryEntryList";
import { AddEntryForm } from "./AddEntryForm";
import { DiaryEntry, NewDiaryEntry } from "./Types";
import { getAllDiaryEntries, postNewEntry } from "./diaryEntryService";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  
  
  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setDiaryEntries(data)
    })
  }, [])

  const createNewEntry = (newEntry: NewDiaryEntry) => {
    postNewEntry(newEntry).then(res => {
        setDiaryEntries(diaryEntries.concat(res))  
      })
  };

  return (
      <div>
        <AddEntryForm createNewEntry={createNewEntry}></AddEntryForm>
        <Header name="Diary entries" />
        <DiaryEntryList entries={diaryEntries}></DiaryEntryList>
      </div>
  )
}

export default App

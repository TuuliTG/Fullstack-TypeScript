import { useEffect, useState } from "react";
import { Header } from "./Header";
import { DiaryEntryList } from "./DiaryEntryList";
import { AddEntryForm } from "./AddEntryForm";
import { DiaryEntry, NewDiaryEntry } from "./types";
import { getAllDiaryEntries, postNewEntry } from "./diaryEntryService";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState("")
  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setDiaryEntries(data)
    })
  }, [])

  const createNewEntry = async (newEntry: NewDiaryEntry) => {
    
    const res = await postNewEntry(newEntry)
    if (typeof res === 'string') {
      console.log(res)
      setErrorMessage(res)
    }
  };

  return (
      <div>
        <AddEntryForm createNewEntry={createNewEntry} errorMessage={errorMessage}></AddEntryForm>
        <Header name="Diary entries" />
        <DiaryEntryList entries={diaryEntries}></DiaryEntryList>
      </div>
  )
}

export default App

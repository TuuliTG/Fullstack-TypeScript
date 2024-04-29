import { useState } from "react"; 
import { NewDiaryEntry, Visibility, Weather } from "./types";

interface EntryFormProps {
  createNewEntry: (entry: NewDiaryEntry) => void,
  errorMessage: string
}

export const AddEntryForm = (props: EntryFormProps) => {
  const [date, setDate] = useState("")
  const [visibility, setVisibility] = useState("")
  const [weather, setWeather] = useState("")
  const [comment, setComment] = useState("")

  const emptyFormAndSendPostRequest = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newEntry: NewDiaryEntry = {
      date: date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment: comment
    }
    setDate("")
    setVisibility("")
    setWeather("")
    setComment("")
    props.createNewEntry(newEntry)
  }

  return (
    <div>
      <h1>Add a new diary entry:</h1>
      <p style={{ color: 'red' }}>{props.errorMessage}</p>
      <form 
        onSubmit={(e) => {
          emptyFormAndSendPostRequest(e)
        }
      }
        style={{ padding: "0em" }}
      >
        Insert date:
        <input
          value={date}
          onChange={(event) => setDate(event.target.value)} 
        />
        <br></br>
        Insert visibility:
        <input 
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)} 
        ></input>
        <br></br>
        Insert weather: 
        <input 
          value={weather}
          onChange={(event) => setWeather(event.target.value)} 
        ></input>
        <br></br>
        Insert comment:
        <input 
          value={comment}
          onChange={(event) => setComment(event.target.value)} 
        ></input>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}
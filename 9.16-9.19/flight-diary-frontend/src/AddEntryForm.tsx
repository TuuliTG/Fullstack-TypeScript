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
  const [checked, setChecked] = useState(false)

  const emptyFormAndSendPostRequest = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newEntry: NewDiaryEntry = {
      date: date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment: comment
    }
    setDate("")
    setComment("")
    setVisibility("")
    setWeather("")
    setChecked(false)
    props.createNewEntry(newEntry)
  }

  type radioButtonSection = "visibility"|"weather"
  const handleRadioButtons = (section: radioButtonSection, value: string) => {
    //setChecked(true)
    if(section === "visibility") {
      setVisibility(value)
    } else if (section === "weather") {
      setWeather(value)
    } else {
      console.log("error")
    }
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
          type="date"
          onChange={(event) => setDate(event.target.value)} 
        />
        <br></br>
        <div>
          Insert visibility:
          <input
            value="poor"
            id="visibility1"
            type="radio"
            name="visibility"
            checked={visibility === "poor"}
            onChange={(event) => handleRadioButtons("visibility", event.target.value)} 
          ></input>
          <label htmlFor="visibility1">Poor</label>

          <input
            value="ok"
            id="visibility2"
            type="radio"
            name="visibility"
            checked={visibility === "ok"}
            onChange={(event) => handleRadioButtons("visibility", event.target.value)} 
          ></input>
          <label htmlFor="visibility2">Ok</label>

          <input 
            value="good"
            id="visibility3"
            type="radio"
            name="visibility"
            checked={visibility === "good"}
            onChange={(event) => handleRadioButtons("visibility", event.target.value)} 
          ></input>
          <label htmlFor="visibility3">Good</label>
          <input 
            value="great"
            id="visibility4"
            type="radio"
            name="visibility"
            checked={visibility === "great"}
            onChange={(event) => handleRadioButtons("visibility", event.target.value)} 
          ></input>
          <label htmlFor="visibility4">Great</label>
        </div>
        
        <div>
          Insert weather: 
          <input 
              value="windy"
              id="weather1"
              type="radio"
              name="weather"
              checked={weather === "windy"}
              onChange={(event) => setWeather(event.target.value)} 
            ></input>
            <label htmlFor="weather1">Windy</label>
          <input 
              value="stormy"
              id="weather2"
              type="radio"
              name="weather"
              checked={weather === "stormy"}
              onChange={(event) => setWeather(event.target.value)} 
          ></input>
          <label htmlFor="weather2">Stormy</label>
          <input 
            value="cloudy"
            id="weather3"
            type="radio"
            name="weather"
            checked={weather === "cloudy"}
            onChange={(event) => setWeather(event.target.value)} 
          ></input>
          <label htmlFor="weather3">Cloudy</label>
          <input 
            value="rainy"
            id="weather4"
            type="radio"
            name="weather"
            checked={weather === "rainy"}
            onChange={(event) => setWeather(event.target.value)} 
          ></input>
          <label htmlFor="weather4">Rainy</label>
          <input 
            value="sunny"
            id="weather5"
            type="radio"
            name="weather"
            checked={checked}
            onChange={(event) => setWeather(event.target.value)} 
          ></input>
          <label htmlFor="weather5">Sunny</label>
        </div>
        
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
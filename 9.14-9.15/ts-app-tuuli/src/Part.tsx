import { CoursePart } from "./App";

interface PartProps {
  course: CoursePart;
}


export const Part = (props: PartProps) => {
  switch (props.course.kind) {
    case "basic":
      return (
          <i>{props.course.description}</i>
      )
    case "background":
      return (
        <div>
          <i>{props.course.description}</i>
          <br/>
          submit to {props.course.backgroundMaterial}
        </div>
      )
    case "group":
      return (
        <div>
          Project exercises {props.course.groupProjectCount}
        </div>
      )
    case "special":
      return (
        <div>
          <i>{props.course.description}</i>
          <br/>
          Required skills: 
          {props.course.requirements.map(r => (
            <> {r} </>
          ))}
        </div>
      )
    default:
      break;
  }
};


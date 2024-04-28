import { CoursePart } from "./App";
import { Part } from "./Part";

export interface CourseParts {
  courses: CoursePart[];
}

export const Content = (props: CourseParts) => {
  return (
    <div>
      {props.courses.map(course => (
        <div>
          <p key={course.name}>
            <b>{course.name} {course.exerciseCount}</b>
            <br/>
            <Part course={course}></Part>
          </p>
        </div>
      ))}
    </div>
  );
};


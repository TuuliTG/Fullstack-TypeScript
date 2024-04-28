import { CourseParts } from "./Content";
import { CoursePart } from "./App";

const totalExercises = (courseParts: CoursePart[]) => {
  return courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);
}

export const Total = (props: CourseParts) => {
  return (
    <div>
      <p>
        Number of exercises {totalExercises(props.courses)}
      </p>
    </div>
  );
};
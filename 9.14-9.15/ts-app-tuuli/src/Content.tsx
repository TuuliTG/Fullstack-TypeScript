export interface CoursePart {
  name: string;
  exerciseCount: number;
}


export interface CourseParts {
  courses: CoursePart[];
}


export const Content = (props: CourseParts) => {
  return (
    <div>
      {props.courses.map(course => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};


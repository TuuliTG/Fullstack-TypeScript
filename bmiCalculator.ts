export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height/100;
  const bmi = weight/Math.pow(heightInMeters, 2)
  const response = findCategory(bmi)
  if (response) {
    return response
  } else {
    throw new Error('Something went wrong')
  }
}

const findCategory = (bmi: number): string | undefined => {
  switch(true) {
    case bmi < 18.5:
      return "Underweight";
    case bmi < 25.0:
      return "Normal weight";
    case bmi < 30.0:
      return "Overweight";
    case bmi >= 30.0:
      return "Obese"
    default:
      return
  }
}

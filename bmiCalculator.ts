const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height/100;
  const bmi = weight/Math.pow(heightInMeters, 2)
  return findCategory(bmi)
}

const findCategory = (bmi: number): string => {
  switch(true) {
    case bmi < 18.5:
      return "Underweight";
    case bmi < 25.0:
      return "Normal weight";
    case bmi < 30.0:
      return "Overweight";
    case bmi >= 30.0:
      return "Obese"
  }
}


console.log(calculateBmi(160, 53))
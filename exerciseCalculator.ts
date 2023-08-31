type Rating = 1 | 2 | 3;

const calculateExercises = (trainingHours: number[], target: number) => {
  const avg = calculateAvg(trainingHours)
  const rating = getRating(avg, target)
  const result: Result = {
    numberOfDays: trainingHours.length,
    numberOfTrainingDays: trainingHours.filter(h => h !== 0).length,
    targetValue: target,
    avgTime: avg,
    targetReached: avg >= target,
    rating: rating,
    ratingDescription: getRatingDescription(rating)
  }
  printResult(result)
}

const getRating = (avg: number, target: number): Rating => {
  const percentage: number = avg / target
  switch (true) {
    case percentage < 0.7:
      return 1;
    case percentage <= 1:
      return 2;
    case percentage > 1:
      return 3
  }
}

const getRatingDescription = (rating: Rating): string => {
  switch(rating) {
    case 1:
      return "Try harder next time :)"
    case 2:
      return "Well done!"
    case 3:
      return "You exceeded you goals! Well done!"
  }
}

const calculateAvg = (trainingHours: number[]): number => {
  const sum = trainingHours.reduce((acc, current) => {
    return acc + current;
  }, 0);
  const avg = sum/trainingHours.length
  const fixed = (Math.round(avg * 100) / 100).toFixed(2)
  return parseFloat(fixed);
}

const printResult = (res: Result) => {
  console.log(`periodLength:${res.numberOfDays}`)
  console.log(`Number of training days:${res.numberOfTrainingDays}`)
  console.log(`Target:${res.targetValue}`)
  console.log(`Average training time: ${res.avgTime}`)
  console.log(`Target reached: ${res.targetReached}`)
  console.log(`Rating: ${res.rating}`)
  console.log(`Rating description: ${res.ratingDescription}`)
}

interface Result {
  numberOfDays: number;
  numberOfTrainingDays: number;
  targetValue: number,
  avgTime: number,
  targetReached: boolean,
  rating: number,
  ratingDescription: string
}

calculateExercises([3, 0, 1, 1, 0, 2, 1], 2)
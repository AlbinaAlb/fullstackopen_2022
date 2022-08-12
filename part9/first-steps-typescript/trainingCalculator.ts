interface Result {
  periodLength: Number
  trainingDays: Number
  success: Boolean
  rating: Number
  ratingDescription: String
  target: Number
  average: Number
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length
  const trainingDays = dailyHours.filter((hour) => hour > 0).length
  const average = dailyHours.reduce((a, b) => a + b) / periodLength
  const success = average >= target

  const getRating = (average: number, target: number): number => {
    if (average < target * 0.8) return 1
    if (average < target) return 2
    if (average >= target) return 3
  }

  const getratingDescription = (rating: number) => {
    if (rating === 1) return 'Not good. Do your best.'
    if (rating === 2) return 'Not too bad but could be better'
    if (rating === 3) return 'Well done. Keep it up!'
  }

  const rating = getRating(average, target)
  const ratingDescription = getratingDescription(rating)

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

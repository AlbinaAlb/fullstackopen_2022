interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export const calculateExercises = (target: number, dailyHours: number[]): Result => {
  const periodLength = dailyHours.length
  const trainingDays = dailyHours.filter((hour) => hour > 0).length
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength
  const success = average >= target

  const getRating = (target: number, average: number): number  => {
    if (average < target * 0.8) return 1
    if (average < target) return 2
    if (average >= target) return 3
    else return 0
  }

  const getratingDescription = (rating: number): string => {
    if (rating === 1) return 'Not enough. Do your best.'
    if (rating === 2) return 'Not too bad but could be better'
    if (rating === 3) return 'Well done. Keep it up!'
    else return 'An unexpected error occurred'
  }

  const rating = getRating(target, average)
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

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const daily: number = Number(process.argv[2])
const dailyHours: number[] = process.argv.slice(3).map((hour) => Number(hour))

console.log(calculateExercises(daily, dailyHours))

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

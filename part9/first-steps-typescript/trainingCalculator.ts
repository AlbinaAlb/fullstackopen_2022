interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (target: number, dailyHours: number[]): Result => {
  const periodLength = dailyHours.length
  const trainingDays = dailyHours.filter((hour) => hour > 0).length
  const average = dailyHours.reduce((a, b) => a + b) / periodLength
  const success = average >= target

  const getRating = (target: number, average: number): number => {
    if (average < target * 0.8) return 1
    if (average < target) return 2
    if (average >= target) return 3
  }

  const getratingDescription = (rating: number) => {
    if (rating === 1) return 'Not good. Do your best.'
    if (rating === 2) return 'Not too bad but could be better'
    if (rating === 3) return 'Well done. Keep it up!'
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

const daily: number = Number(process.argv[2])
const dailyHours: number[] = process.argv.slice(3).map((hour) => Number(hour))

console.log(calculateExercises(daily, dailyHours))

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

import { coursePart } from '../types'

const Total = ({ parts }: { parts: coursePart[] }) => {
  return (
    <div>
      <p>
        Number of exercises{' '}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

export default Total

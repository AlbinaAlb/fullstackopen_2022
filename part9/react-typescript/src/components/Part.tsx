import { CoursePart } from '../types'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount} 
          </p>
          <p>{part.description}</p>
          <hr></hr>
        </div>
      )
    case 'groupProject':
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <p>project exercises {part.groupProjectCount}</p>
          <hr></hr>
        </div>
      )
    case 'submission':
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <p>{part.description}</p>
          <p>
            submit to {' '}
            <a href={part.exerciseSubmissionLink}>
             { part.exerciseSubmissionLink}
            </a>
          </p>
          <hr></hr>
        </div>
      )
    case 'special':
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <p>{part.description}</p>
          <p>required skills: {part.requirements.join(', ')}</p>
          <hr></hr>
        </div>
      )
    default:
      return assertNever(part)
  }
}

export default Part

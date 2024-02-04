const Header = (props) =>{
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part={props.courseDetails[0]} />
      <Part part={props.courseDetails[1]} />
      <Part part={props.courseDetails[2]} />
    </div>
  )
}

const Total = (props) =>{
  console.log(props)
  const totalExercises = props.courseDetails[0].exercises + props.courseDetails[1].exercises +props.courseDetails[2].exercises
  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const courseDetails = [part1, part2, part3]

  return (
    <div>
       <Header course={course} />
      
       <Content courseDetails = {courseDetails}/>
       
       <Total  courseDetails = {courseDetails}/>
    </div>
  )
}
export default App

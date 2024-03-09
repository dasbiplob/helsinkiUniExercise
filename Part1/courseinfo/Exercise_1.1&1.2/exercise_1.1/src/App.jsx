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
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.courseDetails[0].part1} exercises={props.courseDetails[0].exercises1} />
      <Part part={props.courseDetails[1].part2} exercises={props.courseDetails[1].exercises2} />
      <Part part={props.courseDetails[2].part3} exercises={props.courseDetails[2].exercises3} />
    </div>
  )
}

const Total = (props) =>{
  console.log(props)
  const totalExercises = props.courseDetails[0].exercises1 + props.courseDetails[1].exercises2 +props.courseDetails[2].exercises3
  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const courseDetails = [
    {part1 : 'Fundamentals of React', exercises1: 10},
    {part2: 'Using props to pass data', exercises2: 7},
    {part3: 'State of a component', exercises3: 14}
  ]
  return (
    <div>
       <Header course={course} />
      
       <Content courseDetails = {courseDetails}/>
       
       <Total  courseDetails = {courseDetails}/>
    </div>
  )
}

export default App

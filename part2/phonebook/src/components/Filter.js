const Filter = (props) => {
  return (
    <div>
      filter shown with
      <input value={props.value} onChange={props.onChange} type="text" />
    </div>
  )
}
export default Filter
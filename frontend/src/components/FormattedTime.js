
const FormattedTime = ({time}) => {
  return (
    new Date(time).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
  )
}

export default FormattedTime
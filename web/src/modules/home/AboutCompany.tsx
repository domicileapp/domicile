import { useParams } from 'react-router-dom'

export default function AboutCompany() {
  const { info, id } = useParams()

  return (
    <h1>
      Company info: {info} {id}
    </h1>
  )
}

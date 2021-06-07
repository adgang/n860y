import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import Title from './Title'
// import moment from 'moment'

const GET_PROFILE_QUERY = gql`
  # query getProfile(name: String!) {
  {
    people(options: { limit: 10, sort: { name: ASC } }) {
      name
    }
    # books(written_by: { name: $name }) {
    #   title
    # }
  }
`

export default function PersonDetails() {
  const { name } = useParams()
  const { loading, error, data } = useQuery(GET_PROFILE_QUERY, {
    // variables: { name },
  })
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <React.Fragment>
      <Title>{name}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.people.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

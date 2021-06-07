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
  query getProfile($name: String!) {
    people(where: { name: $name }) {
      name
      books {
        title
        year
        publisher
      }
      meetings {
        name
        during
        at {
          name
        }
      }
    }
  }
`

export default function PersonDetails() {
  const { name } = useParams()
  const { loading, error, data } = useQuery(GET_PROFILE_QUERY, {
    variables: { name },
  })
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <React.Fragment>
      <Title>{name}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Book</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Publisher</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.people[0].books.map((row) => (
            <TableRow key={row.title}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.year}</TableCell>
              <TableCell>{row.publisher}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Occasion</TableCell>
            <TableCell>During</TableCell>
            <TableCell>Place</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.people[0].meetings.map((row) => (
            <TableRow key={row.title}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.during}</TableCell>
              <TableCell>{row.at.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

import React, { useContext, useRef } from 'react'
import Title from './Title'
import { NoteContext } from '../App'
import {
  Button,
  CardActions,
  CardContent,
  Divider,
  TextareaAutosize,
  // TextField,
  Typography,
} from '@material-ui/core'
import Card from '@material-ui/core/Card'

export default function Notes() {
  const notes = useContext(NoteContext)
  console.log(notes)
  const additions = []
  additions.push(useRef(''))
  additions.push(useRef(''))
  const previewArticle = () => {}

  return (
    <React.Fragment>
      <Title>Notes</Title>
      <TextareaAutosize style={{ width: '80%' }}></TextareaAutosize>
      {notes.map((n, index) => {
        return (
          <>
            <Card style={{ width: '80%' }}>
              <CardContent>
                <Typography variant="body2" component="p">
                  {n.statement}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Remove</Button>
              </CardActions>
            </Card>
            <TextareaAutosize
              style={{ width: '80%' }}
              ref={additions[index]}
            ></TextareaAutosize>
          </>
        )
      })}
      <Divider></Divider>
      <Button onClick={previewArticle}>Preview</Button>
      <Button>Save</Button>
    </React.Fragment>
  )
}

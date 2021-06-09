import React, { useContext, useRef, useState } from 'react'
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
import { Tab, Tabs } from '@material-ui/core'

export default function Notes() {
  const notes = useContext(NoteContext)
  const additions = []
  for (let i = 0; i < notes.length + 1; i++) {
    additions.push(useRef(''))
  }
  const [value, setValue] = useState(0)

  function a11yProps(index) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // function Snipper(props) {
  //   if (props.note.meeting) {

  //   } else {

  //   }
  //   return
  // }

  function getReferences() {
    return notes.map((n, index) => {
      return (
        <p key={'reference' + index}>
          [{index + 1}]
          {' ' +
            (n.meeting
              ? [n.meeting.name, new Date(n.meeting.during).getFullYear()].join(
                  ', '
                )
              : [n.book.title, n.book.year].join(', '))}
        </p>
      )
    })
  }

  function getBody() {
    const textList = []
    textList.push(additions[0].current.value)
    for (var i = 0; i < notes.length; i++) {
      textList.push(notes[i].statement)
      textList.push(additions[i + 1].current.value)
    }
    return textList.map((t, index) => <p key={'para-' + index}>{t}</p>)
  }

  return (
    <React.Fragment>
      <Title>Notes</Title>
      <Tabs value={value} onChange={handleChange} aria-label="Tabs">
        <Tab label="Edit" {...a11yProps(0)} />
        <Tab label="Preview" {...a11yProps(1)} />
      </Tabs>
      <div key={0} hidden={value !== 0}>
        <TextareaAutosize
          style={{ width: '80%' }}
          ref={additions[0]}
        ></TextareaAutosize>
        {notes.map((n, i) => {
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
                ref={additions[i + 1]}
              ></TextareaAutosize>
            </>
          )
        })}
        <Divider></Divider>
        <Button>Save</Button>
      </div>

      {notes.length > 0 ? (
        <div key={1} hidden={value !== 1}>
          {getBody()}
          <br />
          References:
          {getReferences()}
        </div>
      ) : (
        ''
      )}
    </React.Fragment>
  )
}

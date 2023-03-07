import React, { useEffect, useState } from 'react'
import * as AuthService from '@/services/auth.service'
import EventBus from '@/common/EventBus'
import { Link } from 'react-router-dom'
import {
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Navbar from '@/components/Navbar'

const Tasks: React.FC = () => {
  const getTasks = (): Promise<any> =>
    axios.get('http://localhost:3000/api/v1/tasks')
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })

  if (isLoading) {
    return <span>Loading...</span>
  }
  if (isError) {
    // @ts-expect-error Error is unknown????
    return <span>Error: {error.message}</span>
  }
  return (
    <div>
      <Navbar />
      <Typography variant='h2'>Tasks</Typography>
      <List>
        {data.data.map((task: any) => (
          <div>
            <ListItem key={task.id} disablePadding>
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox
                    edge='start'
                    checked={task.complete}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': task.title }}
                  />
                </ListItemIcon>
                <ListItemText id={task.id} primary={task.title} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  )
}

export default Tasks

export type TaskDataProps = {
  id: string
  columnId: string
  name: string
  description: string
  attachment?: string
  completed: boolean
  daysLeft: number
  tags: string[]
  members: Array<{ id: number; name: string; avatar: string }>
}

// NOTE: Typing is fuzzy, always returns a value even if key does not exist
export interface ColumnDataProps {
  [key: string]: {
    title: string
    tasks: Array<TaskDataProps>
  }
}

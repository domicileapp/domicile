interface ITodo {
  title: string
  description: string
  completed: boolean
}

interface TodoProps {
  todo: ITodo
}

export type { ITodo, TodoProps }

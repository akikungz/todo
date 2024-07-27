import { useState } from 'react'
import { Todo } from './types';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');

  const [newTodo, setNewTodo] = useState<Todo>({ title: '', description: '', isDone: false });

  const handleSetDone = (id: number, isDone: boolean) => {
    setTodos(prev => prev.map((todo, index) => {
      if (index === id) {
        console.log(todo, isDone)
        return { ...todo, isDone: isDone }
      }
      return todo
    }))
  }

  const handleEditTodo = (id: number, todo: Todo) => {
    setTodos(prev => prev.map((baseTodo, index) => {
      if (index === id) {
        return todo
      }
      return baseTodo
    }))
  }

  return (
    <div className="flex flex-col w-full p-8 gap-4">
      {/* Search */}
      <div className="flex flex-row gap-2">
        <input placeholder="Search" className="p-2 border border-gray-300 w-full" onChange={e => setQuery(e.target.value)} />
      </div>
      <div className="flex flex-col w-full gap-2">
        <h1 className="text-3xl font-bold">Todos</h1>
        <input placeholder="Title" 
          value={newTodo.title}
          onChange={
            (e) => setNewTodo(prev => ({ ...prev, title: e.target.value }))
          } 
          className="p-2 border border-gray-300" 
        />
        <input placeholder="Description" 
          value={newTodo.description}
          onChange={
            (e) => setNewTodo(prev => ({ ...prev, description: e.target.value }))
          }
          className="p-2 border border-gray-300" 
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setTodos(prev => [...prev, newTodo]);
            setNewTodo({ title: '', description: '', isDone: false });
          }}
        >
          Add todo
        </button>
      </div>
      { todos
        .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
        .map((todo, id) => <TodoItem key={id} id={id} todo={todo} handleEditTodo={handleEditTodo} handleSetDone={handleSetDone} />)
      }
    </div>
  )
}

export default App

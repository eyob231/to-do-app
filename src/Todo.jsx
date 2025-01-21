import { useState } from 'react';

function Todo() {
  const [todo, setTodo] = useState([
    { id: 1, text: "set alarm", completed: false, priority: "low" },
    { id: 2, text: "do the dishes", completed: false, priority: "medium" },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [editing, setEditing] = useState(null);

  const handleAddTodo = () => {
    if (newTodo !== '') {
      setTodo([...todo, { id: todo.length + 1, text: newTodo, completed: false, priority: "low" }]);
      setNewTodo('');
    } else {
      alert("Please enter a task");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodo(todo.filter((item) => item.id !== id));
  };

  const handleEditTodo = (id) => {
    setEditing(id);
  };

  const handleSaveTodo = (id, text) => {
    setTodo(todo.map((item) => (item.id === id ? { ...item, text } : item)));
    setEditing(null);
  };

  const handleToggleCompleted = (id) => {
    setTodo(todo.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  };

  const handlePrioritizeTodo = (id, priority) => {
    setTodo(todo.map((item) => (item.id === id ? { ...item, priority } : item)));
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todo.map((item) => (
          <li key={item.id}>
            {editing === item.id ? (
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleSaveTodo(item.id, e.target.value)}
              />
            ) : (
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.text}
              </span>
            )}
            <button onClick={() => handleToggleCompleted(item.id)}>
              {item.completed ? "Uncomplete" : "Complete"}
            </button>
            <button onClick={() => handlePrioritizeTodo(item.id, "high")}>
              High Priority
            </button>
            <button onClick={() => handlePrioritizeTodo(item.id, "medium")}>
              Medium Priority
            </button>
            <button onClick={() => handlePrioritizeTodo(item.id, "low")}>
              Low Priority
            </button>
            <button onClick={() => handleEditTodo(item.id)}>Edit</button>
            <button onClick={() => handleDeleteTodo(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
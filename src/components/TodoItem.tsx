import { useState } from "react";
import { Todo } from "../types";

interface TodoItemProps {
    todo: Todo;
    handleSetDone: (id: number, isDone: boolean) => void;
    handleEditTodo: (id: number, todo: Todo) => void;
    id: number;
}

export default function TodoItem({ todo, handleEditTodo, handleSetDone, id }: TodoItemProps) {
    const [isEdit, setIsEdit] = useState(false);

    if (isEdit) {
        return (
            <div className="flex flex-col gap-2 p-4">
                <label className="text-lg font-bold">Edit Todo #{id}</label>
                <span>Title</span>
                <input placeholder="Title" value={todo.title} onChange={(e) => handleEditTodo(id, { ...todo, title: e.target.value })} className="p-2 border border-gray-300" />
                <span>Description</span>
                <input placeholder="Description" value={todo.description} onChange={(e) => handleEditTodo(id, { ...todo, description: e.target.value })} className="p-2 border border-gray-300" />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsEdit(false)}>Save</button>
            </div>
        )
    } else {
        return (
            <div className={"flex flex-col gap-2 p-4 rounded-2xl" + (todo.isDone ? " bg-green-500/50" : " bg-gray-500/50")}>
                <div className="flex flex-row gap-2">
                    <input type="checkbox" checked={todo.isDone} onChange={(e) => handleSetDone(id, e.target.checked)} />
                    <label className="text-lg font-bold">Todo #{id}</label>
                </div>
                <div className="flex flex-row gap-2">
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold">{todo.title}</h1>
                        <p>{todo.description}</p>
                    </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsEdit(true)}>Edit</button>
            </div>
        )
    }
}
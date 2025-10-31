"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "dailyResetTodos";

const defaultTodos = [
  {
    id: "default-1",
    text: "Brain dump tasks",
    completed: false,
  },
  {
    id: "default-2",
    text: "Review calendar commitments",
    completed: false,
  },
  {
    id: "default-3",
    text: "Set one highlight",
    completed: false,
  },
  {
    id: "default-4",
    text: "Tidy your digital desktop",
    completed: false,
  },
];

function normalizeTodos(todos) {
  if (!Array.isArray(todos)) {
    return defaultTodos;
  }

  return todos
    .filter((item) => typeof item?.text === "string" && item.text.trim().length > 0)
    .map((item, index) => ({
      id: item.id || `restored-${index}-${item.text}`,
      text: item.text.trim(),
      completed: Boolean(item.completed),
    }));
}

function getInitialTodos() {
  if (typeof window === "undefined") {
    return [...defaultTodos];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [...defaultTodos];
    }

    const parsed = JSON.parse(stored);
    const restored = normalizeTodos(parsed);

    if (restored.length === 0) {
      return [...defaultTodos];
    }

    const incomplete = restored.filter((todo) => !todo.completed);
    const complete = restored.filter((todo) => todo.completed);
    return [...incomplete, ...complete];
  } catch (error) {
    console.warn("Unable to load stored Daily reset list", error);
    return [...defaultTodos];
  }
}

function moveTodo(todos, toggled) {
  const remaining = todos.filter((todo) => todo.id !== toggled.id);
  const incomplete = remaining.filter((todo) => !todo.completed);
  const complete = remaining.filter((todo) => todo.completed);

  if (toggled.completed) {
    return [...incomplete, ...complete, toggled];
  }

  return [toggled, ...incomplete, ...complete];
}

function addTodoToList(todos, newTodo) {
  const incomplete = todos.filter((todo) => !todo.completed);
  const complete = todos.filter((todo) => todo.completed);
  return [newTodo, ...incomplete, ...complete];
}

export default function DailyResetChecklist() {
  const [todos, setTodos] = useState(getInitialTodos);
  const [draft, setDraft] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.warn("Unable to persist Daily reset list", error);
    }
  }, [todos]);

  const completedCount = useMemo(() => todos.filter((todo) => todo.completed).length, [todos]);

  function handleSubmit(event) {
    event.preventDefault();
    const value = draft.trim();
    if (!value) {
      return;
    }

    const newTodo = {
      id: `todo-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text: value,
      completed: false,
    };

    setTodos((current) => addTodoToList(current, newTodo));
    setDraft("");
    setEditing(null);
  }

  function handleToggle(id) {
    setEditing((current) => (current?.id === id ? null : current));
    setTodos((current) => {
      let toggledTodo = null;
      const updated = current.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        toggledTodo = { ...todo, completed: !todo.completed };
        return toggledTodo;
      });

      if (!toggledTodo) {
        return current;
      }

      return moveTodo(updated, toggledTodo);
    });
  }

  function startEditing(todo) {
    setEditing({ id: todo.id, text: todo.text });
  }

  function cancelEditing() {
    setEditing(null);
  }

  function applyEditing() {
    if (!editing) {
      return;
    }

    const next = editing.text.trim();
    if (!next) {
      setEditing(null);
      return;
    }

    setTodos((current) =>
      current.map((todo) => {
        if (todo.id !== editing.id) {
          return todo;
        }

        return { ...todo, text: next };
      }),
    );
    setEditing(null);
  }

  function handleEditingKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      applyEditing();
    } else if (event.key === "Escape") {
      event.preventDefault();
      cancelEditing();
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/95 p-5 shadow-md shadow-slate-200/50">
      <div className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Daily reset</h2>
        <p className="text-base text-slate-600">
          A lightweight checklist to recentre your focus in under five minutes. Add your own tasks to make it yours.
        </p>
      </div>

      <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="daily-reset-add">
          Add a new Daily reset item
        </label>
        <input
          id="daily-reset-add"
          name="daily-reset-add"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Add a quick focus reminder"
          autoComplete="off"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!draft.trim()}
        >
          Add
        </button>
      </form>

      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="group flex items-center gap-3 rounded-2xl bg-slate-50/90 px-4 py-2.5"
          >
            <button
              type="button"
              onClick={() => handleToggle(todo.id)}
              className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full border border-slate-300 bg-white text-[12px] font-semibold text-slate-500 transition hover:border-blue-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-pressed={todo.completed}
              aria-label={todo.completed ? "Mark task as not done" : "Mark task as done"}
            >
              {todo.completed ? "✓" : ""}
            </button>
            {editing?.id === todo.id ? (
              <input
                value={editing.text}
                onChange={(event) =>
                  setEditing((current) =>
                    current && current.id === todo.id
                      ? { ...current, text: event.target.value }
                      : current,
                  )
                }
                onBlur={applyEditing}
                onKeyDown={handleEditingKeyDown}
                autoFocus
                className="flex-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            ) : (
              <span
                onDoubleClick={() => startEditing(todo)}
                className={`flex-1 leading-snug transition group-hover:text-slate-700 ${
                  todo.completed ? "text-slate-400 line-through" : ""
                }`}
              >
                {todo.text}
              </span>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs leading-relaxed text-slate-400">
        This list lives entirely in your browser — nothing is sent to any servers. Clearing your local storage will remove
        your Daily reset items.
      </p>

      {completedCount > 0 && (
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
          {completedCount} {completedCount === 1 ? "task" : "tasks"} complete
        </p>
      )}
    </div>
  );
}

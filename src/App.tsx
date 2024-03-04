import React, { useState } from 'react';
import Form from './components/Form'; // Assuming Form component is defined elsewhere
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { CircularProgress } from '@mui/material';
import './App.css';

interface Task {
  id: number;
  title: string;
  ischecked: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [value, setValue] = useState(0); // Tab state
  const [loading, setLoading] = useState(false); // Loading state for each tab

  const handleTaskSubmit = (title: string) => {
    setLoading(true);
    const newTask: Task = {
      id: Date.now(),
      title,
      ischecked: false,
    };
    setTasks([...tasks, newTask]);
    setLoading(false);
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const taskId = parseInt(event.target.id.replace('myCheckbox', ''));
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ischecked: event.target.checked } : task
    );
    setTasks(updatedTasks);
  };

  const handleCheckboxChangeC = (event: React.ChangeEvent<HTMLInputElement>) => {
    const taskId = parseInt(event.target.id.replace('myCheckbox', ''));
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, ischecked: false };
      const updatedCompletedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks([...updatedCompletedTasks, updatedTask]);
    }
  };

  const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="max-w-md mx-auto px--4 py--8">
      <h1 className="text-3xl font-bold text-center mb-4">Task Management System</h1>

      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Tabs">
          <Tab label="Active Tasks" />
          <Tab label="Completed Tasks" />
        </Tabs>

        {value === 0 && (
          <Box sx={{ p: 3 }}>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Create a Task</h2>
              <Form onSubmit={handleTaskSubmit} />
            </div>

            <h2 className="text-xl font-semibold mb-2">Active Tasks</h2>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
             ) : (
              <>
                {tasks.filter((task) => !task.ischecked).length > 0 ? (
                  <div className="grid gap-4">
                    {tasks
                      .filter((task) => !task.ischecked)
                      .map((task) => (
                        <div key={task.id} className="bg-white rounded-lg shadow-md p-4">
                          <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                          <label className="mb-1 flex items-center">
                            Check to Complete:
                            <input
                              type="checkbox"
                              id={`myCheckbox${task.id}`}
                              onChange={handleCheckboxChange}
                              className="rounded-md cursor-pointer mr-2 p-2 ml-3"
                            />
                          </label>

                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                  </div>
                ) : (
                  <h2 className="text-gray-500">No Active Tasks.</h2>
                )}
              </>
            )}
          </Box>
        )}

        {value === 1 && (
          <Box sx={{ p: 3 }}>
            <h2 className="text-xl font-semibold mb-2">Completed Tasks</h2>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                {tasks.filter((task) => task.ischecked).length > 0 ? (
                  <div className="grid gap-4">
                    {tasks
                      .filter((task) => task.ischecked)
                      .map((task) => (
                        <div key={task.id} className="bg-white rounded-lg shadow-md p-4">
                          <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                          <label className="mb-1 flex items-center">
                            Check to reactivate:
                            <input
                              type="checkbox"
                              id={`myCheckbox${task.id}`}
                              onChange={handleCheckboxChangeC}
                              className="rounded-md cursor-pointer mr-2 p-2 ml-3"
                            />
                          </label>

                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                  </div>
                ) : (
                  <h2 className="text-gray-500">No Completed Tasks.</h2>
                )}
              </>
            )}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default App;

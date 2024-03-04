import React, { FC, useState } from "react";

interface TaskFormProps {
  onSubmit: (title: string) => void;
  initialTitle?: string;
}

const Form: FC<TaskFormProps> = ({
  onSubmit,
  initialTitle = "",
}) => {
  const [title, setTitle] = useState(initialTitle);

  // Disable button ONLY, not the input field
  const isButtonDisabled = title.trim() === "";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(title);
    setTitle("");
  };

  return (
    <form
      className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label htmlFor="title" className="mb-1">
          Task Name:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-md"
          // Input field is no longer disabled
        />
      </div>

      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" disabled={isButtonDisabled}>
        Create Task
      </button>
    </form>
  );
};

export default Form;

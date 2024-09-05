import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

//ICONS
import {
  GiPumpkinLantern,
  GiGhost,
  GiSpellBook,
  GiPointyHat,
  GiScrollQuill,
} from "react-icons/gi";
import { FaSkullCrossbones } from "react-icons/fa6";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState({
    task: "",
    completed: false,
  });

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:3000/api");
    console.log(response.data.legs);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  //For Getting Input Fields Values
  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  }

  //To Handle Submit (Add tasks or Save Changes)
  function handleSubmit() {
    if (isEditing) {
      //For Editing The tasks
      setTasks((prevTasks) =>
        prevTasks.map((task, index) =>
          index === currentIndex ? { ...input } : task
        )
      );
      setCurrentIndex(null);
      setIsEditing(false);
    } else {
      //For New tasks
      if (input.task === "") {
        console.log("Task is required!");
      } else {
        setTasks((prevTasks) => [...prevTasks, input]);
      }
      console.log(tasks);
    }
    setInput({ task: "", completed: false });
  }

  function deleteTask(indexToDelete) {
    setTasks((prevTasks) =>
      prevTasks.filter((task, index) => indexToDelete !== index)
    );
  }

  function editTask(indexToEdit) {
    const taskToEdit = tasks[indexToEdit];
    setInput({ task: taskToEdit.task });
    setIsEditing(true);
    setCurrentIndex(indexToEdit);
  }

  function taskCompleted(indexToToggle) {
    setTasks((prevTasks) =>
      prevTasks.map((task, index) =>
        indexToToggle === index ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black p-5 flex items-center justify-center">
      <div className="bg-purple-800 rounded-md w-full max-w-4xl">
        <div className="container mx-auto p-4">
          <h1 className="text-center text-green-400 text-4xl font-serif mb-8">
            Spooky To-Do List
          </h1>
          <div className="flex flex-col items-center mb-4">
            <div className="flex justify-center">
              <input
                type="text"
                name="task"
                id="task"
                className="p-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="What's brewing?"
                value={input.task}
                onChange={handleChange}
              />
              <button
                className="ml-2 bg-orange-500 hover:bg-orange-600 text-black font-bold p-2 rounded-md transition duration-300"
                onClick={handleSubmit}
              >
                {isEditing ? (
                  <GiSpellBook size={30} />
                ) : (
                  <GiPointyHat size={30} />
                )}
              </button>
            </div>
            <div className="flex flex-col mt-5 overflow-x-auto max-h-96">
              <div className="w-full max-w-xl">
                <table className="table-auto text-white w-full">
                  <thead className="bg-orange-500">
                    <tr>
                      <th className="px-4 py-2 w-64">Task</th>
                      <th className="px-4 py-2 w-32">Status</th>
                      <th className="px-4 py-2 w-48">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {tasks.length === 0 ? (
                      <tr>
                        <td className="px-4 py-2" colSpan="3">
                          No Task Found
                        </td>
                      </tr>
                    ) : (
                      tasks.map((item, index) => (
                        <tr key={`task-${index}`}>
                          <td className="px-4 py-2 text-start">
                            {item.task.length > 20
                              ? `${item.task.slice(0, 20)}...`
                              : item.task}
                          </td>
                          <td className="px-4 py-2">
                            {item.completed ? "Completed" : "Pending"}
                          </td>
                          <td className="px-4 py-2 flex justify-center">
                            <div className="flex items-center space-x-2">
                              <span
                                className="bg-orange-500 text-black p-2 rounded-md hover:bg-orange-600 shadow-lg transition duration-300 cursor-pointer"
                                onClick={() => editTask(index)}
                              >
                                <GiScrollQuill size={30} />
                              </span>
                              <span
                                className="bg-orange-500 text-black p-2 rounded-md hover:bg-orange-600 shadow-lg transition duration-300 cursor-pointer"
                                onClick={() => taskCompleted(index)}
                              >
                                {item.completed ? (
                                  <GiPumpkinLantern size={30} />
                                ) : (
                                  <GiGhost size={30} />
                                )}
                              </span>
                              <span
                                className="bg-orange-500 text-black p-2 rounded-md hover:bg-orange-600 shadow-lg transition duration-300 cursor-pointer"
                                onClick={() => deleteTask(index)}
                              >
                                <FaSkullCrossbones size={30} />
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

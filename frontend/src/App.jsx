import { useEffect, useState } from "react";
import "./App.css";

//ICONS
import {
  GiPumpkinLantern,
  GiGhost,
  GiSpellBook,
  GiPointyHat,
  GiScrollQuill,
} from "react-icons/gi";
import { FaSkullCrossbones } from "react-icons/fa6";
import Toast from "./toast";

function App() {
  //Toast VAriable
  const [toast, setToast] = useState({ toastType: "Added", show: false });

  //Initialize the tasks with localstorage tasks array.
  const [tasks, setTasks] = useState(() => {
    //Getting the storedTasks from localStorge and parsing them back from JSON string to JSON Object
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    //Storing the retrieved tasks into tasks array if localStorage is not empty
    if (storedTasks) return storedTasks;
  });
  const [input, setInput] = useState({
    task: "",
    completed: false,
  });

  //To set the tasks in the localstorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
          index === currentIndex ? { ...input, completed: false } : task
        )
      );
      setCurrentIndex(null);
      setIsEditing(false);
      showToast("Task Edited!");
    } else {
      //For New tasks
      if (input.task === "") {
        console.log("Task is required!");
        showToast("Task Required!");
      } else {
        setTasks((prevTasks) => [...prevTasks, input]);
        showToast("Task Added!");
      }
    }
    setInput({ task: "", completed: false });
  }
  //To delete tasks
  function deleteTask(indexToDelete) {
    setTasks((prevTasks) =>
      prevTasks.filter((task, index) => indexToDelete !== index)
    );
    showToast("Task Deleted!");
  }
  //To edit tasks
  function editTask(indexToEdit) {
    const taskToEdit = tasks[indexToEdit];
    setInput({ task: taskToEdit.task });
    setIsEditing(true);
    setCurrentIndex(indexToEdit);
  }
  //To mark the task completed
  function taskCompleted(indexToToggle) {
    setTasks((prevTasks) =>
      prevTasks.map((task, index) =>
        indexToToggle === index ? { ...task, completed: !task.completed } : task
      )
    );
    showToast("Task Completed!");
  }

  //To show toast
  function showToast(type) {
    setToast((prevState) => ({ ...prevState, toastType: type, show: true }));
    setTimeout(() => {
      setToast((prevState) => ({ ...prevState, toastType: "", show: false }));
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black p-5 flex items-center justify-center">
      <div className="bg-purple-800 rounded-md w-full max-w-4xl shadow-md shadow-orange-500">
        <div className="container mx-auto p-4">
          <h1 className="text-center text-green-400 text-4xl font-serif mb-8">
            Spooky To-Do List
          </h1>
          <div className="flex flex-col items-center mb-4 w-full">
            <Toast toastType={toast.toastType} showToast={toast.show} />
            <div className="w-full max-w-xl flex justify-center">
              <input
                type="text"
                name="task"
                id="task"
                className="w-full p-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
            <div className="flex flex-col mt-5">
              <div className="-m-1.5">
                <div className="p-1.5 min-w-full inline-block align-middle rounded-md">
                  <div className="w-full max-w-xl border border-orange-500 rounded-md">
                    <table className="w-full divide-y divide-orange-500 rounded-md"
                    >
                      <thead>
                        <tr className="bg-orange-500">
                          <th
                            scope="col"
                            className="w-60 px-6 py-3 text-start text-xs font-medium text-white uppercase "
                          >
                            Task
                          </th>
                          <th
                            scope="col"
                            className="w-32 px-6 py-3 text-start text-xs font-medium text-white uppercase "
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="w-48 px-6 py-3 text-end text-xs font-medium text-white uppercase "
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasks.length === 0 ? (
                          <tr className="bg-white">
                            <td
                              className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-800 "
                              colSpan={3}
                            >
                              No Task Found
                            </td>
                          </tr>
                        ) : (
                          tasks.map((item, index) => (
                            <tr
                              key={`task-${index}`}
                              className={`${
                                !item.completed ? "bg-white" : "bg-gray-300"
                              }`}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                                {item.task.length > 20
                                  ? `${item.task.slice(0, 20)}...`
                                  : item.task}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                {item.completed ? "Completed" : "Pending"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
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
            {/* <div className="flex flex-col mt-5 overflow-x-auto max-h-96">
              <div
                className="w-full max-w-xl "
              >
                <table className="table-auto text-white w-full  rounded-md border border-orange-500 ">
                  <thead className="bg-orange-500">
                    <tr>
                      <th className="px-4 py-2 w-60 border border-orange-500">
                        Task
                      </th>
                      <th className="px-4 py-2 w-32 border border-orange-500">
                        Status
                      </th>
                      <th className="px-4 py-2 w-48 border border-orange-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {tasks.length === 0 ? (
                      <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800">
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200"
                          colSpan={3}
                        >
                          No Task Found
                        </td>
                      </tr>
                    ) : (
                      tasks.map((item, index) => (
                        <tr key={`task-${index}`} className="">
                          <td className="px-4 py-2 border border-orange-500">
                            {item.task.length > 20
                              ? `${item.task.slice(0, 20)}...`
                              : item.task}
                          </td>
                          <td className="px-4 py-2 border border-orange-500">
                            {item.completed ? "Completed" : "Pending"}
                          </td>
                          <td className="px-4 py-2 flex justify-center border border-orange-500">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

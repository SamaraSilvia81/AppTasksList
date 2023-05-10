import axios from "axios";

const instance = axios.create({
  baseURL: "https://parseapi.back4app.com/classes",
  headers: {
    "X-Parse-Application-Id": "x4ErGydaXGJdSbeuehkJ9cYnC7LuJ1xG6gNiygJM",
    "X-Parse-REST-API-Key": "F6bsnNHIBJYMZTPRRixCuog53GGGZ2jSSKozMNPH",
  },
});

export const getTasks = () => instance.get("Task").then((res) => res.data);

export const createTask = ({description}) => {
  console.log("Descrição:", description)
  return instance.post("/Task", {
    description,
    done: false,
  });
};

export const updateTask = (task) => {
  return instance.put(`/Task/${task.objectId}`, task, {
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteTask = async (objectId) => {
  const res = await instance.delete(`/Task/${objectId}`);
  return res.data;
};
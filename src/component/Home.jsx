import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import axiosInstance from "../utilities/AxiosInstance";
import { toast, Toaster } from "sonner";

const dummyData = [
  {
    id: 1,
    name: "Project A",
    description: "Description of Project A",
    repo_link: "https://github.com/user/project-a",
    live_link: "https://project-a.com",
    image: "https://via.placeholder.com/150",
    tech_stack: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    name: "Project B",
    description: "Description of Project B",
    status: "Completed",
    repo_link: "https://github.com/user/project-b",
    live_link: "https://project-b.com",
    image: "https://via.placeholder.com/150",
    tech_stack: ["Vue.js", "Express", "MySQL"],
  },
  {
    id: 3,
    name: "Project C",
    description: "Description of Project C",
    status: "Not Started",
    repo_link: "https://github.com/user/project-c",
    live_link: "https://project-c.com",
    image: "https://via.placeholder.com/150",
    tech_stack: ["Angular", "Django", "PostgreSQL"],
  },
];

function Home() {
  const [addProjectModal, setAddProjectModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [projects, setProjects] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const getAllProjects = async () => {
    try {
      const response = await axiosInstance.get("/projects/get");
      console.log("Projects:", response);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "tech_stack") {
          formDataToSend.append(
            key,
            value.split(",").map((item) => item.trim())
          );
        } else {
          formDataToSend.append(key, value);
        }
      });
      const response = await axiosInstance.post(
        "/projects/create",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      toast.success("Project Added Successfully");
      setAddProjectModal(false);
      setFormData({});
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error Adding Project");
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-5 px-4">
      <Toaster position="top-center" />
      <h1 className="font-semibold text-gray-700 text-4xl">Projects:</h1>
      <div className="flex flex-row flex-wrap items-center gap-4">
        {location.pathname === "/admin" && (
          <div
            onClick={() => setAddProjectModal(true)}
            className="flex flex-col items-center justify-center p-4 text-white cursor-pointer bg-green-500 w-96 h-60 rounded"
          >
            <h2 className="text-2xl flex flex-row items-center justify-center gap-2 font-bold">
              <Icon icon="line-md:uploading-loop" width="50" height="50" />
              Upload Project's
            </h2>
          </div>
        )}
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-center p-4 text-white cursor-pointer bg-blue-500 w-[425px] h-60 rounded gap-4"
          >
            <div>
              <h2 className="text-2xl font-bold flex flex-row items-center">
                <Icon icon="line-md:hash" width="24" height="24" />
                {project.name}
              </h2>
              <p className="mt-2">{project.description}</p>
              <p className="mt-2">
                Tech Stack:{" "}
                <span className="font-semibold">
                  {Array.isArray(project?.tech_stack)
                    ? project.tech_stack.join(", ")
                    : project?.tech_stack}
                </span>{" "}
              </p>
            </div>
            <div className="flex flex-col group bg-[#ffffff30] overflow-hidden rounded-md h-52 w-full items-center justify-center relative">
              <img
                src={project.image}
                alt={project.name}
                className="w-24 rounded absolute group-hover:hidden flex"
              />
              <div className="hidden flex-col group-hover:flex gap-2 w-44 text-nowrap px-4">
                <a
                  href={project.repo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00000050] text-white p-2 rounded w-full text-center"
                >
                  Repo Link
                </a>
                <a
                  href={project.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00000050] text-white p-2 rounded w-full text-center"
                >
                  Live Link
                </a>
                {location.pathname === "/admin" && (
                  <button className="bg-[#00000050] text-white p-2 rounded w-full">
                    Edit Project
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {addProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <div className="mb-4 flex flex-row items-center justify-between">
              <h2 className="text-xl font-semibold">Add New Project</h2>
              <button
                onClick={() => setAddProjectModal(false)}
                className="hover:text-red-500 text-gray-600 hover:scale-110 ease-in-out duration-150 bg-gray-200 rounded-full"
              >
                <Icon icon="line-md:close-small" width="24" height="24" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Project Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <textarea
                placeholder="Project Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
                required
              ></textarea>
              <input
                type="text"
                placeholder="Tech Stack (comma separated)"
                name="tech_stack"
                value={formData.tech_stack}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="url"
                placeholder="Repository Link"
                name="repo_link"
                value={formData.repo_link}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="url"
                placeholder="Live Link"
                name="live_link"
                value={formData.live_link}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded w-full"
              >
                Add Project
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

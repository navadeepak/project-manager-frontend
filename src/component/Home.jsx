import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import axiosInstance from "../utilities/AxiosInstance";
import { toast, Toaster } from "sonner";

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

      let response;
      if (formData._id) {
        response = await axiosInstance.patch(
          `/projects/edit/${formData._id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Project Updated Successfully");
      } else {
        response = await axiosInstance.post(
          "/projects/create",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Project Added Successfully");
      }

      console.log("Response:", response.data);
      setAddProjectModal(false);
      setFormData({});
      getAllProjects();
    } catch (error) {
      console.error("Error:", error);
      toast.error(id ? "Error Updating Project" : "Error Adding Project");
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
            className="flex flex-row items-center justify-center p-4 text-white cursor-pointer bg-blue-500 min-w-fit h-60 rounded gap-4"
          >
            <div className="flex flex-col h-full gap-2 w-64">
              <h2 className="text-2xl font-bold flex flex-row items-center">
                <Icon icon="line-md:hash" width="24" height="24" />
                {project.name}
              </h2>
              <p className="">
                <span className="font-bold text-black">Tech Stack: </span>
                <span className="">
                  {Array.isArray(project?.tech_stack)
                    ? project.tech_stack.join(", ")
                    : project?.tech_stack}
                </span>{" "}
              </p>
              <p className="text-wrap w-56">{project.description}</p>
            </div>
            <div className="flex flex-col group bg-[#ffffff30] overflow-hidden rounded-md h-52 w-80 items-center justify-center relative">
              <img
                src={project.image}
                alt={project.name}
                className="h-36 rounded absolute group-hover:hidden flex"
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
                  <button
                    onClick={() => {
                      setAddProjectModal(true);
                      // getProjectById(project._id);
                      setFormData(project);
                    }}
                    className="bg-[#00000050] text-white p-2 rounded w-full"
                  >
                    Edit Project
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {addProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <div className="mb-4 flex flex-row items-center justify-between">
              <h2 className="text-xl font-semibold">
                {formData._id ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={() => {
                  setAddProjectModal(false);
                  setFormData({});
                }}
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
                value={formData.name || ""}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <textarea
                placeholder="Project Description"
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
              ></textarea>
              <input
                type="text"
                placeholder="Tech Stack (comma separated)"
                name="tech_stack"
                value={
                  Array.isArray(formData.tech_stack)
                    ? formData.tech_stack.join(", ")
                    : formData.tech_stack || ""
                }
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="url"
                placeholder="Repository Link"
                name="repo_link"
                value={formData.repo_link || ""}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="url"
                placeholder="Live Link"
                name="live_link"
                value={formData.live_link || ""}
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
                required={!formData._id}
              />
              {formData.image && <img src={formData.image} alt="" />}
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded w-full"
              >
                {formData._id ? "Update Project" : "Add Project"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

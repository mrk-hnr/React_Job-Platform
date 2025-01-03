import React from "react";
import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage"; // added jsconfig and manually located path coz causing error when I rely on auto
import JobsPage from "../pages/JobsPage";
import JobPage, { jobLoader } from "../pages/JobPage";
import NotFoundPage from "../pages/NotFoundPage";
import AddJobPage from "../pages/AddJobPage";
import EditJobPage from "../pages/EditJobPage";
import MainLayout from "../src/layouts/MainLayout";

const App = () => {
  // ADD NEW JOB
  const addJob = async (newJob) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  // DELETE JOB

  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    return;
  };

  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    return;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "jobs",
          element: <JobsPage />,
        },
        {
          path: "jobs/:id",
          element: <JobPage deleteJob={deleteJob} />,
          loader: jobLoader,
        },
        {
          path: "edit-job/:id",
          element: <EditJobPage updateJobSubmit={updateJob} />,
          loader: jobLoader,
        },
        {
          path: "add-job",
          element: <AddJobPage addJobSubmit={addJob} />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
export default App;

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function CreateMovielist() {
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    isPublic: "false",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("user/createPlaylist", formData);
      console.log("Form submitted successfully", response);
      if (response) {
        navigateTo("/home");
      }
    } catch (error) {
      console.log("Error while submitting form", error);
    }
  };

  return (
    <section>
        <Navbar/>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-lg 2xl:max-w-xl border border-gray-300 rounded-lg py-[3%] px-[8%]">
          <h2 className="text-center text-4xl font-bold leading-tight text-white">
            Create MovieList
          </h2>
          <form action="" method="POST" onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <div className="mt-2">
                <label className="text-white">Name:</label>
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-[#191926] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter List Name"
                    required
                  ></input>
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <label className="text-white">Visibility:</label>
                  <select
                    className="flex h-10 w-full rounded-md border cursor-pointer border-gray-300 bg-[#191926] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    name="isPublic"
                    value={formData.isPublic}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="true">Public</option>
                    <option value="false">Private</option>
                  </select>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-blue-900 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-900/80"
                >
                  Create List <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateMovielist;

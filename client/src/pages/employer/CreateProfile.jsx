import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateProfile = ({ id }) => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
    industry: "",
    website: "",
    email: "",
    phone: "",
    headquarters: { country: "", city: "" },
    size: "",
    foundedYear: "",
    mission: "",
    vision: "",
    values: [""],
    specialties: [""],
    socialMedia: { linkedin: "", twitter: "", facebook: "", instagram: "" },
    picture: null, // Changed to null to handle file input
    positions: [""],
  });

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await axios.get(`/company/profile/me`);
        setCompanyData(response.data.data);
      } catch (error) {
        console.error("Error fetching company profile:", error.response.data);
        // Optionally, show an error message to the user
      }
    };

    fetchCompanyProfile();
  }, [id]);

  const handleChange = (index, arrayName, newValue) => {
    setCompanyData((prevData) => ({
      ...prevData,
      [arrayName]: prevData[arrayName].map((item, idx) =>
        idx === index ? newValue : item
      ),
    }));
  };

  const handleAddItem = (name, defaultValue = "") => {
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: [...prevData[name], defaultValue],
    }));
  };

  const handleRemoveItem = (name, index) => {
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: prevData[name].filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Check if a file is selected
    if (file) {
      const reader = new FileReader();

      // Read the file as a data URL
      reader.readAsDataURL(file);

      // Set the companyData.picture when the file is loaded
      reader.onload = () => {
        setCompanyData((prevData) => ({
          ...prevData,
          picture: reader.result,
        }));
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send updated company profile data to the server
    axios
      .put(`/company/profile`, companyData)
      .then((response) => {
        navigate("/employer-dashboard/company-profile");
        localStorage.setItem("hasProfile", "true");
        toast.success("Profile Updated Successfully");

        // Reload the website after successful profile update
        window.location.reload(true);
      })
      .catch((error) => {
        console.error("Error updating company profile:", error);
        // Optionally, you can show an error message to the user
      });
  };

  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Create Company Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold">Name:</label>
            <input
              type="text"
              name="name"
              value={companyData.name}
              onChange={(e) =>
                setCompanyData({ ...companyData, name: e.target.value })
              }
              required
              className="form-input mt-1 block w-full px-3 py-2"
            />
            <label className="block font-bold">Description:</label>
            <textarea
              name="description"
              value={companyData.description}
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  description: e.target.value,
                })
              }
              required
              className="form-textarea mt-1 block w-full border-2 rounded"
            ></textarea>
            <label className="block font-bold">Industry:</label>
            <input
              type="text"
              name="industry"
              value={companyData.industry}
              onChange={(e) =>
                setCompanyData({ ...companyData, industry: e.target.value })
              }
              required
              className="form-input mt-1 block w-full px-3 py-2"
            />
            <label className="block font-bold">Website:</label>
            <input
              type="text"
              name="website"
              value={companyData.website}
              onChange={(e) =>
                setCompanyData({ ...companyData, website: e.target.value })
              }
              className="form-input mt-1 block w-full px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-bold">Email:</label>
            <input
              type="email"
              name="email"
              value={companyData.email}
              onChange={(e) =>
                setCompanyData({ ...companyData, email: e.target.value })
              }
              required
              className="form-input mt-1 block w-full px-3 py-2"
            />
            <label className="block font-bold">Phone:</label>
            <input
              type="number"
              name="phone"
              value={companyData.phone}
              onChange={(e) =>
                setCompanyData({ ...companyData, phone: e.target.value })
              }
              required
              className="form-input mt-1 block w-full px-3 py-2"
            />
            <label className="block font-bold">Headquarters Country:</label>
            <input
              type="text"
              name="headquarters.country"
              value={companyData.headquarters.country}
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  headquarters: {
                    ...companyData.headquarters,
                    country: e.target.value,
                  },
                })
              }
              required
              className="form-input mt-1 block w-full px-3 py-2"
            />
            <label className="block font-bold">Headquarters City:</label>
            <input
              type="text"
              name="headquarters.city"
              value={companyData.headquarters.city}
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  headquarters: {
                    ...companyData.headquarters,
                    city: e.target.value,
                  },
                })
              }
              required
              className="form-input mt-1 block w-full px-3 py-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold">Size:</label>
            <input
              type="text"
              name="size"
              value={companyData.size}
              onChange={(e) =>
                setCompanyData({ ...companyData, size: e.target.value })
              }
              required
              className="form-input mt-1 block w-full px-3 py-2"
            />
            <label className="block font-bold">Founded Year:</label>
            <input
              type="number"
              name="foundedYear"
              value={companyData.foundedYear}
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  foundedYear: e.target.value,
                })
              }
              min="1900"
              max="2100"
              required
              className="form-input mt-1 block w-full px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-bold">Mission:</label>
            <textarea
              name="mission"
              value={companyData.mission}
              onChange={(e) =>
                setCompanyData({ ...companyData, mission: e.target.value })
              }
              required
              className="form-textarea mt-1 block w-full border-2 rounded h-auto"
            ></textarea>
            <label className="block font-bold">Vision:</label>
            <textarea
              name="vision"
              value={companyData.vision}
              onChange={(e) =>
                setCompanyData({ ...companyData, vision: e.target.value })
              }
              required
              className="form-textarea mt-1 block w-full border-2 rounded h-auto"
            ></textarea>
          </div>
        </div>
        <div>
          <label className="block font-bold">Values:</label>
          {companyData.values.map((value, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(index, "values", e.target.value)}
                className="form-input mt-1 block w-full px-3 py-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem("values", index)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("values")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2"
          >
            Add Value
          </button>
        </div>
        <div>
          <label className="block font-bold">Specialties:</label>
          {companyData.specialties.map((specialty, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={specialty}
                onChange={(e) =>
                  handleChange(index, "specialties", e.target.value)
                }
                className="form-input mt-1 block w-full px-3 py-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem("specialties", index)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("specialties")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2"
          >
            Add Specialty
          </button>
        </div>
        <div>
          <label className="block font-bold ">LinkedIn:</label>
          <input
            type="text"
            name="socialMedia.linkedin"
            value={companyData.socialMedia.linkedin}
            onChange={(e) =>
              setCompanyData({
                ...companyData,
                socialMedia: {
                  ...companyData.socialMedia,
                  linkedin: e.target.value,
                },
              })
            }
            className="form-input mt-1 block w-full px-3 py-2"
          />
          <label className="block font-bold">Twitter:</label>
          <input
            type="text"
            name="socialMedia.twitter"
            value={companyData.socialMedia.twitter}
            onChange={(e) =>
              setCompanyData({
                ...companyData,
                socialMedia: {
                  ...companyData.socialMedia,
                  twitter: e.target.value,
                },
              })
            }
            className="form-input mt-1 block w-full px-3 py-2"
          />
          <label className="block font-bold">Facebook:</label>
          <input
            type="text"
            name="socialMedia.facebook"
            value={companyData.socialMedia.facebook}
            onChange={(e) =>
              setCompanyData({
                ...companyData,
                socialMedia: {
                  ...companyData.socialMedia,
                  facebook: e.target.value,
                },
              })
            }
            className="form-input mt-1 block w-full px-3 py-2"
          />
          <label className="block font-bold">Instagram:</label>
          <input
            type="text"
            name="socialMedia.instagram"
            value={companyData.socialMedia.instagram}
            onChange={(e) =>
              setCompanyData({
                ...companyData,
                socialMedia: {
                  ...companyData.socialMedia,
                  instagram: e.target.value,
                },
              })
            }
            className="form-input mt-1 block w-full px-3 py-2 "
          />
        </div>
        <div>
          <label className="block font-bold">Picture:</label>
          <input
            type="file"
            name="picture"
            onChange={handleImageChange}
            accept="image/*"
            className="form-input mt-1 block w-full"
          />
          {companyData.picture && (
            <img
              src={companyData.picture}
              alt="Company Logo"
              className="mt-2 max-w-full"
            />
          )}
        </div>
        <div>
          <label className="block font-bold">Positions:</label>
          {companyData.positions.map((position, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={position}
                onChange={(e) =>
                  handleChange(index, "positions", e.target.value)
                }
                className="form-input mt-1 block w-full px-3 py-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem("positions", index)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("positions")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2"
          >
            Add Position
          </button>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfile;

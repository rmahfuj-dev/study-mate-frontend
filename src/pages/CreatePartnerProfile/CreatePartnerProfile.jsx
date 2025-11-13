import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useComposedRefs } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const CreatePartnerProfile = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        "https://studymate-indol.vercel.app/create-profile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, partnerCount: 0 }), // only partnerCount forced 0
        }
      );

      const responseData = await res.json();

      if (!res.ok) {
        toast.error(responseData.error || "Failed to create profile", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Profile Created",
        text: "Your partner profile has been created successfully!",
        confirmButtonColor: "#22c55e",
      });

      reset();
    } catch (err) {
      toast.error(err.message || "Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-base-100 shadow-xl rounded-2xl p-8 md:p-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          Create Partner Profile
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-6"
        >
          <label className="form-control w-full">
            <span className="label-text font-medium">Full Name</span>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter full name"
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text font-medium">Profile Image URL</span>
            <input
              {...register("profileimage", { required: true })}
              defaultValue={
                user?.photoURL ||
                "https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black-thumbnail.png"
              }
              type="text"
              placeholder="Enter image URL"
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text font-medium">Subject</span>
            <input
              {...register("subject", { required: true })}
              type="text"
              placeholder="e.g., Math, Programming"
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text font-medium">Study Mode</span>
            <select
              {...register("studyMode", { required: true })}
              className="select select-bordered"
            >
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </label>

          <label className="form-control w-full">
            <span className="label-text font-medium">Availability Time</span>
            <select
              {...register("availabilityTime", { required: true })}
              className="select select-bordered"
            >
              <option value="">Select Time</option>
              <option value="Morning 6–9 AM">Morning 6–9 AM</option>
              <option value="Afternoon 2–5 PM">Afternoon 2–5 PM</option>
              <option value="Evening 6–9 PM">Evening 6–9 PM</option>
            </select>
          </label>

          <label className="form-control w-full">
            <span className="label-text font-medium">Location</span>
            <input
              {...register("location", { required: true })}
              type="text"
              placeholder="Enter city or area"
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text font-medium">Experience Level</span>
            <select
              {...register("experienceLevel", { required: true })}
              className="select select-bordered"
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </label>

          <label className="form-control w-full">
            <span className="label-text font-medium">Rating</span>
            <input
              {...register("rating", { required: true })}
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="Enter rating"
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full md:col-span-2">
            <span className="label-text font-medium">Email (Read Only)</span>
            <input
              {...register("email")}
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full bg-base-300 cursor-not-allowed"
            />
          </label>

          <div className="md:col-span-2 mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full text-base"
            >
              {isSubmitting ? "Creating..." : "Create Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePartnerProfile;

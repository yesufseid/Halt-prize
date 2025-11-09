"use client"

import { useForm } from "react-hook-form"
import { supabase } from '@/lib/supabaseClient'
import { useEffect } from 'react'

interface RegistrationData {
  fullName: string
  idNumber: string
  department: string
  batch: string
  phoneNumber: string
  teamRoles: string[]
  unSdgs: string[]
  skills: string[]
  socialInteraction: string
  ideaGeneration: string
  teamLeadingExperience: string
  preferredTeamSize: string
  preferredMeetingTime: string
}

const TEAM_ROLES = [
  "The Idea Person (Strategist)",
  "The Builder (Developer)",
  "The Hype Person (Marketer)",
  "The User's Friend (Designer)",
  "The Fact-Checker (Researcher)",
]

const UN_SDGS = Array.from({ length: 17 }, (_, i) => `Goal ${i + 1}`)

const SKILLS = [
  "Problem solving and critical thinking",
  "Communication and teamwork",
  "Adaptability and learning agility",
  "Responsibility",
  "Emotional intelligence",
]

export default function RegistrationForm({ onSubmit }: { onSubmit: () => void }) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegistrationData>({
    defaultValues: {
      teamRoles: [],
      unSdgs: [],
      skills: [],
    },
  })

  const watchTeamRoles = watch("teamRoles")
  const watchSdgs = watch("unSdgs")
  const watchSkills = watch("skills")

  const onSubmitForm = async (data: RegistrationData) => {
    // Validate minimum UN SDGs
    if (data.unSdgs.length < 3) {
      alert("Please select at least 3 UN SDGs")
      return
    }

    // Load existing students
    const existing = localStorage.getItem("students")
    const students = existing ? JSON.parse(existing) : []

    // Add new student
    const newStudent = {
      id: Date.now().toString(),
      ...data,
    }

    students.push(newStudent)
    localStorage.setItem("students", JSON.stringify(students))
    console.log(data);
    
     
       const { error } = await supabase.from('students').upsert([
      {
        full_name: data.fullName,
        student_id: data.idNumber,
        department: data.department,
        batch: data.batch,
        phone: data.phoneNumber,
        roles: data.teamRoles,
        sdgs: data.unSdgs,
        skills: data.skills,
        social_interaction: data.socialInteraction,
        idea_generation: data.ideaGeneration,
        team_leading: data.teamLeadingExperience,
        preferred_team_size: data.preferredTeamSize,
        preferred_meeting_time: data.preferredMeetingTime,
      },
    ],
     {
      onConflict: 'student_id', // this column must be UNIQUE in the table
    }
  )

    if (error) {
      console.error('Error inserting data:', error.message)
      alert('Failed to submit. Please try again.')
    } else {
      onSubmit()
    }
    

    
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
      {/* Personal Information */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold mb-4">Personal Information</legend>

        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("fullName", { required: "Full name is required" })}
            type="text"
            id="fullName"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="idNumber" className="block text-sm font-medium mb-1">
              ID Number <span className="text-red-500">*</span>
            </label>
            <input
             {...register("idNumber", {
  required: "ID number is required",
  pattern: {
    value: /^ETS\d{4}\/\d{2}$/,
    message: "ID must be in the format ETS1450/14",
  },
})}
              type="text"
              id="idNumber"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="ETS1450/14"
            />
            {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber.message}</p>}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              {...register("phoneNumber", { required: "Phone number is required" })}
              type="tel"
              id="phoneNumber"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="+251"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
  <label htmlFor="department" className="block text-sm font-medium mb-1">
    Department <span className="text-red-500">*</span>
  </label>

  <select
    {...register("department", { required: "Department is required" })}
    id="department"
    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    defaultValue=""
  >
    <option value="" disabled>
      Select your department
    </option>
    <option value="Software">Software</option>
    <option value="Civil">Civil</option>
    <option value="Electrical">Electrical</option>
    <option value="Architecture">Architecture</option>
    <option value="Environmental">Environmental</option>
    <option value="Chemical">Chemical</option>
    <option value="Mining">Mining</option>
    <option value="Electro Mechanical">Electro Mechanical</option>
    <option value="Applied">Applied</option>
  </select>

  {errors.department && (
    <p className="text-red-500 text-sm mt-1">
      {errors.department.message}
    </p>
  )}
</div>


          <div>
  <label htmlFor="batch" className="block text-sm font-medium mb-1">
    Batch <span className="text-red-500">*</span>
  </label>

  <select
    {...register("batch", { required: "Batch is required" })}
    id="batch"
    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    defaultValue=""
  >
    <option value="" disabled>
      Select your batch
    </option>
    <option value="Freshman">Freshman</option>
    <option value="2nd">2nd</option>
    <option value="3rd">3rd</option>
    <option value="4th">4th</option>
    <option value="5th">5th</option>
    <option value="Out of batch">Out of batch</option>
  </select>

  {errors.batch && (
    <p className="text-red-500 text-sm mt-1">
      {errors.batch.message}
    </p>
  )}
</div>

        </div>
      </fieldset>

      {/* Team Roles */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold mb-4">
          Team Roles <span className="text-red-500">*</span>
        </legend>
        <div className="space-y-3">
          {TEAM_ROLES.map((role) => (
            <label key={role} className="flex items-center gap-3 cursor-pointer">
              <input
                {...register("teamRoles")}
                type="checkbox"
                value={role}
                className="w-4 h-4 border border-border rounded focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm">{role}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* UN SDGs */}
        <fieldset className="mt-4">
  <legend className="block text-sm font-medium mb-2">
    Sustainable Development Goals (SDGs) <span className="text-red-500">*</span>
  </legend>

  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {[
      "No Poverty",
      "Zero Hunger",
      "Good Health and Well-being",
      "Quality Education",
      "Gender Equality",
      "Clean Water and Sanitation",
      "Affordable and Clean Energy",
      "Decent Work and Economic Growth",
      "Industry, Innovation and Infrastructure",
      "Reduced Inequalities",
      "Sustainable Cities and Communities",
      "Responsible Consumption and Production",
      "Climate Action",
      "Life Below Water",
      "Life on Land",
      "Peace, Justice and Strong Institutions",
      "Partnerships for the Goals",
    ].map((goal) => (
      <label key={goal} className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          value={goal}
          {...register("unSdgs", {
            validate: (value) =>
              value && value.length > 0 ? true : "Please select at least one SDG",
          })}
          className="w-4 h-4 border border-border rounded focus:ring-2 focus:ring-primary"
        />
        <span className="text-sm">{goal}</span>
      </label>
    ))}
  </div>

  {errors.unSdgs && (
    <p className="text-red-500 text-sm mt-2">{errors.unSdgs.message}</p>
  )}
</fieldset>
      {/* Skills */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold mb-4">
          Skills <span className="text-red-500">*</span>
        </legend>
        <div className="space-y-3">
          {SKILLS.map((skill) => (
            <label key={skill} className="flex items-center gap-3 cursor-pointer">
              <input
                {...register("skills")}
                type="checkbox"
                value={skill}
                className="w-4 h-4 border border-border rounded focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm">{skill}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Experience Ratings */}
      <fieldset className="space-y-6">
        <legend className="text-lg font-semibold mb-4">Experience & Preferences</legend>

        <div>
          <label htmlFor="socialInteraction" className="block text-sm font-medium mb-3">
            Social Interaction <span className="text-red-500">*</span>
          </label>
          <select
            {...register("socialInteraction", { required: "This field is required" })}
            id="socialInteraction"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select...</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>
          {errors.socialInteraction && <p className="text-red-500 text-sm mt-1">{errors.socialInteraction.message}</p>}
        </div>

        <div>
          <label htmlFor="ideaGeneration" className="block text-sm font-medium mb-3">
            Idea Generation Ability <span className="text-red-500">*</span>
          </label>
          <select
            {...register("ideaGeneration", { required: "This field is required" })}
            id="ideaGeneration"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select...</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>
          {errors.ideaGeneration && <p className="text-red-500 text-sm mt-1">{errors.ideaGeneration.message}</p>}
        </div>

        <div>
          <label htmlFor="teamLeadingExperience" className="block text-sm font-medium mb-3">
            Team Leading Experience <span className="text-red-500">*</span>
          </label>
          <select
            {...register("teamLeadingExperience", { required: "This field is required" })}
            id="teamLeadingExperience"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select...</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>
          {errors.teamLeadingExperience && (
            <p className="text-red-500 text-sm mt-1">{errors.teamLeadingExperience.message}</p>
          )}
        </div>
      </fieldset>

      {/* Preferences */}
      <fieldset className="space-y-6">
        <legend className="text-lg font-semibold mb-4">Team Preferences</legend>

        <div>
          <label htmlFor="preferredTeamSize" className="block text-sm font-medium mb-3">
            Preferred Team Size <span className="text-red-500">*</span>
          </label>
          <select
            {...register("preferredTeamSize", { required: "This field is required" })}
            id="preferredTeamSize"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select...</option>
            <option value="2">2 members</option>
            <option value="3">3 members</option>
            <option value="4">4 members</option>
          </select>
          {errors.preferredTeamSize && <p className="text-red-500 text-sm mt-1">{errors.preferredTeamSize.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            Preferred Meeting Time <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2 grid grid-cols-2 sm:grid-cols-3 gap-3 ">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                {...register("preferredMeetingTime", { required: "This field is required" })}
                type="radio"
                value="Weekend"
                className="w-4 h-4 border border-border rounded-full focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm">Weekend</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                {...register("preferredMeetingTime", { required: "This field is required" })}
                type="radio"
                value="Weekday"
                className="w-4 h-4 border border-border rounded-full focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm">Morning</span>
            </label>
             <label className="flex items-center gap-3 cursor-pointer">
              <input
                {...register("preferredMeetingTime", { required: "This field is required" })}
                type="radio"
                value="Weekday"
                className="w-4 h-4 border border-border rounded-full focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm">Lunch Time</span>
            </label>
             <label className="flex items-center gap-3 cursor-pointer">
              <input
                {...register("preferredMeetingTime", { required: "This field is required" })}
                type="radio"
                value="Weekday"
                className="w-4 h-4 border border-border rounded-full focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm">Afternoon</span>
            </label>
             <label className="flex items-center gap-3 cursor-pointer">
              <input
                {...register("preferredMeetingTime", { required: "This field is required" })}
                type="radio"
                value="Weekday"
                className="w-4 h-4 border border-border rounded-full focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm">Evening</span>
            </label>
             <label className="flex items-center gap-3 cursor-pointer">
              <input
                {...register("preferredMeetingTime", { required: "This field is required" })}
                type="radio"
                value="Weekday"
                className="w-4 h-4 border border-border rounded-full focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm">  <nav>Night</nav></span>
            </label>
          </div>
          {errors.preferredMeetingTime && (
            <p className="text-red-500 text-sm mt-1">{errors.preferredMeetingTime.message}</p>
          )}
        </div>
      </fieldset>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Register"}
      </button>
    </form>
  )
}

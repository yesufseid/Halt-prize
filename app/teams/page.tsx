"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getTeamsByStudentId } from "@/lib/teammet"


type Student = {
  id: string
  student_id: string
  full_name: string
  department: string
  batch: string
  sdgs: string[]
  skills: string[]
  preferred_team_size: number,
  roles:string[],
  phone:string

}
type students={
    students:Student
}
type Team = {
  id: string
  name: string
preferred_size: number
  team_members: students[]
}
const MemberCard: React.FC<{ member:students }> = ({ member }) => {
    
  return (
    <div className="border rounded-lg p-3 bg-gray-50">
      <h3 className="font-semibold">{member.students.full_name}</h3>
      {member.students.id && <p>ID: {member.students.student_id}</p>}
      <p>Department: {member.students.department}</p>
      <p>Batch: {member.students.batch}</p>
      <p>phone: {member.students.phone}</p>
      <p>Id: {member.students.student_id}</p>

      {member.students.roles && member.students.roles.length > 0 && (
        <div className="mt-1">
          <p className="font-semibold">Roles:</p>
          <ul className="list-disc list-inside text-sm">
            {member.students.roles.map((role, idx) => (
              <li key={idx}>{role}</li>
            ))}
          </ul>
        </div>
      )}

      {member.students.sdgs&& member.students.sdgs.length > 0 && (
        <div className="mt-1">
          <p className="font-semibold">UN SDGs:</p>
          <ul className="list-disc list-inside text-sm">
            {member.students.sdgs.map((sdg, idx) => (
              <li key={idx}>{sdg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
// TeamCard component
const TeamCard: React.FC<{ team: Team }> = ({ team }) => {
    console.log(team);
    
  const isFull = team?.team_members?.length >= team?.preferred_size;

  return (
    <div className={`border rounded-xl shadow-md mx-auto lg:w-[800px] p-4 bg-white ${isFull ? "" : "border-yellow-500"}`}>
      <h2 className="text-xl font-bold mb-2">{team?.name}</h2>
      <p className="text-sm text-gray-500 mb-2">Preferred Size: {team?.preferred_size}</p>
      {!isFull && <p className="text-yellow-600 font-semibold mb-2">Team is not full yet!</p>}

      <div className="space-y-3">
        {team?.team_members.map((member:students) => (
          <MemberCard key={member.students.id} member={member} />
        ))}
      </div>
    </div>
  );
};
export default function TeamsPage() {
  const [students, setStudents] = useState<Team[]>([])
  const [noteam, setNoteam] = useState(false)
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false)
  
   const isValidFormat = /^ETS\d{4}\/\d{2}$/.test(studentId);
  const handle=async()=>{
    setLoading(true)
    setNoteam(false)
    const data:any=await getTeamsByStudentId(studentId)
    if(data.length===0){
      setStudents(data)
      setNoteam(true)
    }else{
      setStudents(data)
    }
    setLoading(false)
  }


  return (
    <main className="min-h-screen bg-background text-foreground">
       <div
      className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        Enter Student ID
      </h2>

      <input
        type="text"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value.toUpperCase())}
        placeholder="ETS****/**"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
        pattern="^ETS\d{4}/\d{2}$"
        required
      />


      <button
        type="submit"
         onClick={handle}
 disabled={!isValidFormat}
        className={`w-full font-semibold py-2 rounded-lg transition ${
          isValidFormat
            ? "bg-amber-400 text-white hover:bg-amber-500"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}      >
          Search Teams{loading&&"..."}
      </button>
    </div>
       
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
       {students.length>0&& <TeamCard  key={students[0].id} team={students&&students[0]} />}
       {noteam&&  <p  className="text-pink-600 font-bold text-xl justify-center text-center py-32">Your matches are on their way!
Check back soon!</p>}
      </section> 

     
      <footer className="border-t border-border mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2025 Hult Prize AASTU. Building solutions for a better world.</p>
        </div>
      </footer>
    </main>
  )
}

"use client";

import { useEffect, useState } from "react";
import { getTeamsByStudentId } from "@/lib/teammet";
import { addTeamMember } from "@/lib/addTeamMember"; // ⬅️ make sure correct path
import {removeTeamMember} from "@/lib/RemoveTeamMember"
import Link from 'next/link'

type Student = {
  id: string;
  student_id: string;
  full_name: string;
  department: string;
  batch: string;
  sdgs: string[];
  skills: string[];
  preferred_team_size: number;
  roles: string[];
  phone: string;
};
type students = {
  students: Student;
};
type Team = {
  id: string;
  name: string;
  preferred_size: number;
  team_members: students[];
};

const MemberCard: React.FC<{
  member: students;
  onRemove: (id: string) => void;
}> = ({ member, onRemove }) => {
  return (
    <div className="border rounded-lg p-3 bg-gray-50 relative">
      <h3 className="font-semibold">{member.students.full_name}</h3>
      <p>ID: {member.students.student_id}</p>
      <p>Department: {member.students.department}</p>
      <p>Batch: {member.students.batch}</p>
      <p>Phone: {member.students.phone}</p>

      <button
        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded"
        onClick={() => onRemove(member.students.student_id)}
      >
        Remove
      </button>

      {member.students.roles?.length > 0 && (
        <div className="mt-1">
          <p className="font-semibold">Roles:</p>
          <ul className="list-disc list-inside text-sm">
            {member.students.roles.map((role, idx) => (
              <li key={idx}>{role}</li>
            ))}
          </ul>
        </div>
      )}

      {member.students.sdgs?.length > 0 && (
        <div className="mt-1">
          <p className="font-semibold">UN SDGs:</p>
          <ul className="list-disc list-inside text-sm">
            {member.students.sdgs.map((sdg, idx) => (
              <li key={sdg}>{sdg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const TeamCard: React.FC<{
  team: Team;
  refresh: () => void;
}> = ({ team, refresh }) => {
  const [newMemberId, setNewMemberId] = useState("");

  const isFull = team?.team_members?.length >= team?.preferred_size;

  const handleAdd = async () => {
    if (!/^ETS\d{4}\/\d{2}$/.test(newMemberId)) {
      alert("Invalid Student ID format!");
      return;
    }

    const res = await addTeamMember(team.id, newMemberId);
    if (res.error) alert(res.error);

    setNewMemberId("");
    refresh();
  };

  const handleRemove = async (studentId: string) => {
    const res = await removeTeamMember(team.id, studentId);
    if (res.error) alert(res.error);
    refresh();
  };

  return (
    <div className="border rounded-xl shadow-md mx-auto lg:w-[800px] p-4 bg-white">
      <h2 className="text-xl font-bold mb-2">{team.name}</h2>
      <p className="text-sm text-gray-500 mb-2">
        Preferred Size: {team.preferred_size}
      </p>
      {!isFull && (
        <p className="text-yellow-600 font-semibold mb-2">
          Team is not full yet!
        </p>
      )}

      {/* Add Member Section */}
      <div className="flex items-center gap-2 mb-4">
        <input
          value={newMemberId}
          onChange={(e) => setNewMemberId(e.target.value.toUpperCase())}
          placeholder="ETS****/**"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={handleAdd}
          disabled={isFull}
          className={`px-4 py-2 rounded text-white ${
            isFull ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Add
        </button>
      </div>

      {/* Team Members */}
      <div className="space-y-3">
        {team.team_members.map((member) => (
          <MemberCard
            key={member.students.id}
            member={member}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [noteam, setNoteam] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidFormat = /^ETS\d{4}\/\d{2}$/.test(studentId);

  const handleSearch = async () => {
    setLoading(true);
    setNoteam(false);

    const data:any = await getTeamsByStudentId(studentId);
    setTeams(data);
    if (data.length === 0) setNoteam(true);

    setLoading(false);
  };

  const refresh = async () => {
    const data:any = await getTeamsByStudentId(studentId);
    setTeams(data);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Link 
        className=" bg-primary  px-3 ml-3 cursor-pointer w-32 text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"

      href={"/admin-teamup"} >back</Link>
      {/* SEARCH */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Enter Student ID
        </h2>

        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value.toUpperCase())}
          placeholder="ETS****/**"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        <button
          onClick={handleSearch}
          disabled={!isValidFormat}
          className={`w-full font-semibold py-2 rounded-lg transition ${
            isValidFormat
              ? "bg-amber-400 text-white hover:bg-amber-500"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Search Teams {loading && "..."}
        </button>
      </div>

      {/* TEAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {teams.length > 0 && (
          <TeamCard key={teams[0].id} team={teams[0]} refresh={refresh} />
        )}

        {noteam && (
          <p className="text-pink-600 font-bold text-xl text-center py-32">
            Your matches are on their way! Check back soon!
          </p>
        )}
      </section>
    </main>
  );
}

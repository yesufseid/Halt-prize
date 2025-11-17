// pages/index.tsx
import React from "react";

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

type Team = {
  id: string
  name: string  
preferred_size: number
  team_members: students[]
}
type students={
    students:Student
}


// MemberCard component
const MemberCard: React.FC<{ member:students }> = ({ member }) => {
    
  return (
    <div className="border rounded-lg p-3 bg-gray-50">
      <h3 className="font-semibold">{member.students.full_name}</h3>
      {member.students.id && <p>ID: {member.students.student_id}</p>}
      <p>Department: {member.students.department}</p>
      <p>Batch: {member.students.batch}</p>
      <p>phone: {member.students.phone}</p>

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
    console.log(team.team_members);
    
  const isFull = team.team_members?.length >= team.preferred_size;

  return (
    <div className={`border rounded-xl shadow-md p-4 bg-white ${isFull ? "" : "border-yellow-500"}`}>
      <h2 className="text-xl font-bold mb-2">{team.name}</h2>
      <p className="text-sm text-gray-500 mb-2">Preferred Size: {team.preferred_size}</p>
      {!isFull && <p className="text-yellow-600 font-semibold mb-2">Team is not full yet!</p>}

      <div className="space-y-3">
        {team.team_members.map((member:students) => (
          <MemberCard key={member.students.id} member={member} />
        ))}
      </div>
    </div>
  );
};

// TeamList component
const TeamList: React.FC<{ teams: Team[] }> = ({ teams }) => {
    console.log(teams);
    
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-0 md:p-4">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
};



export default TeamList;

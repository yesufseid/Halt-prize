"use server"
import { supabase } from "@/lib/supabaseClient";

export async function getTeamsByStudentId(studentId:string) {
   // 1️⃣ Find the student's UUID using the string student_id
  const { data: studentData, error: studentError } = await supabase
    .from("students")
    .select("id")
    .eq("student_id",studentId)
    .single();

  // if (studentError) throw new Error(studentError.message);
  if (!studentData) return [];

  const studentUUID = studentData.id;

  // 2️⃣ Find team_members rows for this student UUID
  const { data: memberships, error: memberError } = await supabase
    .from("team_members")
    .select("team_id")
    .eq("student_id", studentUUID);

  // if (memberError) throw new Error(memberError.message);
  if (!memberships || memberships.length === 0) return [];

  const teamIds = memberships.map(m => m.team_id);

  // 3️⃣ Fetch teams with their members
  const { data: teams, error: teamError } = await supabase
    .from("teams")
    .select(`
      id,
      name,
      preferred_size,
      team_members (
        students (
          student_id,
          full_name,
          department,
          batch,
          sdgs,
          skills,
          preferred_team_size,
          phone,
          roles
        )
      )
    `)
    .in("id", teamIds);

  // if (teamError) throw new Error(teamError.message);
  if (!teams || teams.length === 0) return [];
 
  return teams;
}

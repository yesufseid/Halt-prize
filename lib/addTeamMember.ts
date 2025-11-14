"use server";
import { supabase } from "@/lib/supabaseClient";

export async function addTeamMember(teamId: string, studentStringId: string) {
  // 1️⃣ Fetch student's UUID
  const { data: studentData, error: studentError } = await supabase
    .from("students")
    .select("id")
    .eq("student_id", studentStringId)
    .single();

  if (!studentData) {
    return { error: "Student not found" };
  }

  const studentUUID = studentData.id;

  // 2️⃣ Insert into team_members
  const { data, error } = await supabase
    .from("team_members")
    .insert([{ team_id: teamId, student_id: studentUUID }]);

  if (error) return { error: error.message };

  return { success: true };
}

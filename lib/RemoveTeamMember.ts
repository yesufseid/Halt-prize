"use server";
import { supabase } from "@/lib/supabaseClient";

export async function removeTeamMember(teamId: string, studentStringId: string) {
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

  // 2️⃣ Delete from team_members
  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("team_id", teamId)
    .eq("student_id", studentUUID);

  if (error) return { error: error.message };

  return { success: true };
}

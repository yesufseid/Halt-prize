"use server"
import { supabase } from '@/lib/supabaseClient'

export async function getTeamsWithMembers() {
  const { data, error } = await supabase
    .from("teams")
    .select(`
      id,
      name,
      preferred_size,
      team_members (
        students (
          id,
          student_id,
          full_name,
          department,
          batch,
          sdgs,
          skills,
          preferred_team_size

        )
      )
    `)

  if (error) {
    console.error("❌ Error fetching teams:", error);
    return [];
  }

  return data;
}

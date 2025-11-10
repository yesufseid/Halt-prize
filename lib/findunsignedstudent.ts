"use server"

import { supabase } from "@/lib/supabaseClient"

type Student = {
  id: string
  student_id: string
  full_name: string
  department: string
  batch: string
  sdgs: string[]
  skills: string[]
  preferred_team_size: number,
  roles:string[]

}

type Team = {
  id: string
  name: string
  preferredSize: number
  members: Student[]
}



// ✅ Main function: create/update teams
export async function findunsigned() {

  // 1️⃣ Fetch all students
  const { data: students, error: studentError } = await supabase
    .from("students")
    .select("*")

  if (studentError) throw new Error(studentError.message)

  // 2️⃣ Fetch all existing teams and their members
  const { data: existingTeamsData, error: teamError } = await supabase
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

  if (teamError) throw new Error(teamError.message)

  const existingTeams: Team[] =
    existingTeamsData?.map((t: any) => ({
      id: t.id,
      name: t.name,
      preferredSize: t.preferred_size,
      members: t.team_members?.map((m: any) => m.students) || [],
    })) || []

  // 3️⃣ Determine which students are already assigned
  const assignedIds = existingTeams.flatMap(team =>
   team.members.map(m => m.id)
  )

  const unassigned:Student[] = students.filter(
    s => !assignedIds.includes(s.id)
  )
const unassign=unassigned.map((un)=>un.student_id)
  console.log(`📊 Found ${unassigned.length} unassigned students`)
  return {allstudent:students.length,unsign:unassign}

}

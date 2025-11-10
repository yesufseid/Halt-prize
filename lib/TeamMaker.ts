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

// ✅ Compatibility check
function isCompatible(team: Team, student: Student): boolean {
  if (!team.members || team.members.length === 0) return true

  const mixedDepartments = new Set(team.members.map(m => m.department))
  mixedDepartments.add(student.department)

  const hasCommonSDG = team.members.some(
    m =>
      Array.isArray(m.sdgs) &&
      m.sdgs.some(goal => student.sdgs?.includes(goal))
  )

  return (
    team.members.length < team.preferredSize &&
    hasCommonSDG &&
    mixedDepartments.size > 1
  )
}

// ✅ Main function: create/update teams
export async function formTeams() {
  console.log("🚀 Starting team formation...")

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

  console.log(`📊 Found ${unassigned.length} unassigned students`)

  const newTeams: Team[] = []

  // 4️⃣ Build teams dynamically
  for (const student of unassigned) {
    let compatibleTeam =
      existingTeams.find(t => isCompatible(t, student)) ||
      newTeams.find(t => isCompatible(t, student))

    if (compatibleTeam) {
      compatibleTeam.members.push(student)
       const { error: memberError } = await supabase
        .from("team_members")
        .insert({
          team_id:compatibleTeam.id,
          student_id: student.id, // <-- use UUID, not idNumber
        })

      if (memberError) {
        console.error(`❌ Error adding ${student.full_name}:`, memberError.message)
      }
      console.log(`✅ Added ${student.full_name} to ${compatibleTeam.name}`)
    } else {
      const newTeam: Team = {
        id: `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: `Team-${existingTeams.length + newTeams.length + 1}`,
        preferredSize: student.preferred_team_size || 3,
        members: [student],
      }
      newTeams.push(newTeam)
      console.log(`🆕 Created new team ${newTeam.name} with ${student.full_name}`)
    }
  }

  // 5️⃣ Insert new teams into Supabase
  for (const team of newTeams) {
    console.log(team);
    
    const { data: insertedTeam, error: insertError } = await supabase
      .from("teams")
      .insert({
        name: team.name,
        preferred_size: team.preferredSize,
      })
      .select()
      .single()

    if (insertError) {
      console.error(`❌ Error creating team ${team.name}:`, insertError.message)
      continue
     }

    // 6️⃣ Add members to `team_members`
    for (const member of team.members) {
      console.log(member);
      
      const { error: memberError } = await supabase
        .from("team_members")
        .insert({
          team_id: insertedTeam.id,
          student_id: member.id, // <-- use UUID, not idNumber
        })

      if (memberError) {
        console.error(`❌ Error adding ${member.full_name}:`, memberError.message)
      }
    }
   }

  console.log("✅ Team formation complete.")
}

"use server";
import { supabase } from "@/lib/supabaseClient";

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
};

type Team = {
  id: string;
  name: string;
  preferredSize: number;
  members: Student[];
};

// ✅ Compatibility check
function isCompatible(team: Team, student: Student): boolean {
  if (!team.members || team.members.length === 0) return true;

  const hasCommonSDG = team.members.some(
    (m) =>
      Array.isArray(m.sdgs) &&
      m.sdgs.some((goal) => student.sdgs?.includes(goal))
  );

  const mixedDepartments = new Set(team.members.map((m) => m.department));
  mixedDepartments.add(student.department);

  return (
    team.members.length < team.preferredSize &&
    hasCommonSDG &&
    mixedDepartments.size > 1
  );
}

export async function formTeams() {
  console.log("🚀 Starting team formation...");

  // 1️⃣ Fetch all students
  const { data: students, error: studentError } = await supabase
    .from("students")
    .select("*");
  if (studentError) throw new Error(studentError.message);

  // ✅ Normalize team sizes: cap at 3 but keep 2
  const normalizedStudents: Student[] = students.map((s: Student) => ({
    ...s,
    preferred_team_size:
      s.preferred_team_size > 3 ? 3 : Math.max(s.preferred_team_size, 2),
  }));

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
    `);

  if (teamError) throw new Error(teamError.message);

  const existingTeams: Team[] =
    existingTeamsData?.map((t: any) => ({
      id: t.id,
      name: t.name,
      preferredSize: Math.min(Math.max(t.preferred_size, 2), 3),
      members: t.team_members?.map((m: any) => m.students) || [],
    })) || [];

  // 3️⃣ Determine unassigned students
  const assignedIds = existingTeams.flatMap((team) =>
    team.members.map((m) => m.id)
  );
  const unassigned = normalizedStudents.filter(
    (s) => !assignedIds.includes(s.id)
  );
  console.log(`📊 Found ${unassigned.length} unassigned students`);

  const newTeams: Team[] = [];

  // 4️⃣ Form new teams or join existing ones
  for (const student of unassigned) {
    let compatibleTeam =
      existingTeams.find(
        (t) => isCompatible(t, student) && t.members.length < t.preferredSize
      ) ||
      newTeams.find(
        (t) => isCompatible(t, student) && t.members.length < t.preferredSize
      );
 // ✅ If team is full, skip and create new one
    if (compatibleTeam && compatibleTeam.members.length >= compatibleTeam.preferredSize) {
      console.log(`⚠️ ${compatibleTeam.name} is full. Creating a new team for ${student.full_name}.`);
      compatibleTeam = undefined;
    }
    if (compatibleTeam) {
      compatibleTeam.members.push(student);

      // Directly update existing team_members if team exists in DB
      if (!String(compatibleTeam.id).startsWith("tmp-")) {
        const { error: memberError } = await supabase
          .from("team_members")
          .insert({
            team_id: compatibleTeam.id,
            student_id: student.id,
          });
        if (memberError)
          console.error(
            `❌ Error adding ${student.full_name}:`,
            memberError.message
          );
        else console.log(`✅ Added ${student.full_name} to ${compatibleTeam.name}`);
      }
    } else {
      const preferredSize = student.preferred_team_size; // already normalized
      const newTeam: Team = {
        id: `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: `Team-${existingTeams.length + newTeams.length + 1}`,
        preferredSize,
        members: [student],
      };
      newTeams.push(newTeam);
      console.log(`🆕 Created ${newTeam.name} (size ${preferredSize})`);
    }
  }

  // 5️⃣ Save new teams
  let size2Count = 0;
  let size3Count = 0;

  for (const team of newTeams) {
    const { data: insertedTeam, error: insertError } = await supabase
      .from("teams")
      .insert({
        name: team.name,
        preferred_size: team.preferredSize,
      })
      .select()
      .single();

    if (insertError) {
      console.error(`❌ Error creating ${team.name}:`, insertError.message);
      continue;
    }

    if (team.preferredSize === 2) size2Count++;
    if (team.preferredSize === 3) size3Count++;

    for (const member of team.members) {
      const { error: memberError } = await supabase
        .from("team_members")
        .insert({
          team_id: insertedTeam.id,
          student_id: member.id,
        });

      if (memberError)
        console.error(
          `❌ Error adding ${member.full_name}:`,
          memberError.message
        );
      else console.log(`✅ Added ${member.full_name} to ${team.name}`);
    }
  }

  console.log(
    `📦 Created ${newTeams.length} new teams: ${size3Count}×3-size, ${size2Count}×2-size`
  );
  console.log("✅ Team formation complete.");
}

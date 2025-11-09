"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface Student {
  id: string
  fullName: string
  department: string
  teamRoles: string[]
  skills: string[]
}

export default function TeamsPage() {

  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load students from localStorage
    const saved = localStorage.getItem("students")
    if (saved) {
      const parsed = JSON.parse(saved)
      setStudents(parsed)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">HP</span>
              </div>
              <span className="text-lg font-semibold">Hult Prize AASTU</span>
            </Link>
          </nav>
        </header>
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
     
         <p  className="text-pink-600 font-bold text-xl justify-center text-center py-32">Your matches are on their way!
Check back soon!</p>
      {/* Content
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Registered Members</h1>
          <p className="text-muted-foreground">
            {students.length} {students.length === 1 ? "student" : "students"} registered
          </p>
        </div>

        {students.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <p className="text-muted-foreground text-lg">No members registered yet</p>
            <Link
              href="/form"
              className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition inline-block"
            >
              Be the First to Register
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <div
                key={student.id}
                className="border border-border rounded-lg p-6 space-y-4 hover:shadow-md transition"
              >
                <div>
                  <h3 className="text-xl font-semibold">{student.fullName}</h3>
                  <p className="text-sm text-muted-foreground">{student.department}</p>
                </div>

                {student.teamRoles && student.teamRoles.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Team Roles</p>
                    <div className="flex flex-wrap gap-2">
                      {student.teamRoles.map((role) => (
                        <span key={role} className="bg-secondary text-sm px-2 py-1 rounded-full text-foreground">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {student.skills && student.skills.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {student.skills.map((skill) => (
                        <span key={skill} className="bg-primary/10 text-primary text-sm px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section> */}

      {/* Footer */}
      <footer className="border-t border-border mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2025 Hult Prize AASTU. Building solutions for a better world.</p>
        </div>
      </footer>
    </main>
  )
}

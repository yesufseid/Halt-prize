"use client"

import { useState } from "react"
import Link from "next/link"
import RegistrationForm from "@/components/registration-form"

export default function FormPage() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-primary rounded-lg mx-auto flex items-center justify-center">
            <span className="text-white text-2xl">✓</span>
          </div>
          <h1 className="text-3xl font-bold">Registration Complete!</h1>
          <p className="text-muted-foreground">
            Your profile has been saved successfully. We'll match you with compatible team members soon.
          </p>
          <Link
            href="/"
            className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition inline-block"
          >
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* Form Section */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-pink-600">Find your Team</h1>
          <p className="text-muted-foreground">Tell us about yourself and find your perfect team</p>
        </div>
        <RegistrationForm onSubmit={() => setSubmitted(true)} />
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2025 Hult Prize AASTU. Building solutions for a better world.</p>
        </div>
      </footer>
    </main>
  )
}

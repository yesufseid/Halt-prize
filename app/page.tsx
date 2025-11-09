import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">HP</span>
            </div>
            <span className="text-lg font-semibold">Hult Prize AASTU</span>
          </div>
          <Link
            href="/form"
            className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition"
          >
            Join Team
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl font-bold text-balance leading-tight">
            Build the Future <br /> with Your Team
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Join innovative students at AASTU to tackle the UN Sustainable Development Goals. Find your perfect team
            members based on skills, roles, and shared vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/form"
              className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition inline-block"
            >
              Start Registering
            </Link>
            <Link
              href="/"
              className="border border-border px-8 py-3 rounded-full font-medium hover:bg-secondary transition inline-block"
            >
              View Teams
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold">Register</h3>
              <p className="text-muted-foreground">Complete your profile with skills, experience, and preferences</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold">Match</h3>
              <p className="text-muted-foreground">
                Get matched with teammates who share your goals and complement your skills
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold">Innovate</h3>
              <p className="text-muted-foreground">Build your solution for sustainable development challenges</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold">Ready to Change the World?</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Register now and start building your dream team to tackle global challenges.
        </p>
        <Link
          href="/form"
          className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition inline-block"
        >
          Register Now
        </Link>
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

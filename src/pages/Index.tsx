
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { AuthModal } from "../components/auth/AuthModal";
import { useAuth } from "../contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleGetStartedClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="hero-gradient py-20 px-4 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Academic Project Collaboration Made Easy
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: "200ms" }}>
              Connect students and mentors, manage projects, track progress, and foster seamless academic teamwork.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
              <Button 
                size="lg" 
                onClick={handleGetStartedClick} 
                className="bg-white text-academe-700 hover:bg-gray-100 hover:text-academe-800"
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-4 bg-white dark:bg-gray-950">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              A Complete Academic Collaboration Platform
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg animate-scale-in">
                <div className="w-12 h-12 bg-academe-100 text-academe-700 dark:bg-academe-900/50 dark:text-academe-300 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Project Management</h3>
                <p className="text-muted-foreground">
                  Create, assign, and monitor academic projects. Track progress and manage deadlines efficiently.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg animate-scale-in" style={{ animationDelay: "100ms" }}>
                <div className="w-12 h-12 bg-academe-100 text-academe-700 dark:bg-academe-900/50 dark:text-academe-300 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Team Collaboration</h3>
                <p className="text-muted-foreground">
                  Form teams, assign roles, and collaborate effectively. Communicate and share resources within your group.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg animate-scale-in" style={{ animationDelay: "200ms" }}>
                <div className="w-12 h-12 bg-academe-100 text-academe-700 dark:bg-academe-900/50 dark:text-academe-300 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Task Management</h3>
                <p className="text-muted-foreground">
                  Assign and track individual tasks. Update progress and receive notifications for efficient workflow.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg animate-scale-in" style={{ animationDelay: "300ms" }}>
                <div className="w-12 h-12 bg-academe-100 text-academe-700 dark:bg-academe-900/50 dark:text-academe-300 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Reports & Evaluation</h3>
                <p className="text-muted-foreground">
                  Generate progress reports and evaluate team members' contributions for fair assessment.
                </p>
              </div>
              
              {/* Feature 5 */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg animate-scale-in" style={{ animationDelay: "400ms" }}>
                <div className="w-12 h-12 bg-academe-100 text-academe-700 dark:bg-academe-900/50 dark:text-academe-300 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Role-Based Access</h3>
                <p className="text-muted-foreground">
                  Different features for mentors, team leaders, and students to ensure appropriate access control.
                </p>
              </div>
              
              {/* Feature 6 */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg animate-scale-in" style={{ animationDelay: "500ms" }}>
                <div className="w-12 h-12 bg-academe-100 text-academe-700 dark:bg-academe-900/50 dark:text-academe-300 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Communication</h3>
                <p className="text-muted-foreground">
                  Built-in messaging and commenting system for team discussions and feedback.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-academe-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Enhance Academic Collaboration?</h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Join thousands of students and mentors already using our platform to manage academic projects efficiently.
            </p>
            <Button 
              size="lg" 
              onClick={handleGetStartedClick}
              className="bg-academe-500 hover:bg-academe-600 text-white"
            >
              Get Started For Free
            </Button>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 px-4 bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Academe</h3>
                <p className="text-sm text-muted-foreground">
                  A comprehensive platform for academic project collaboration, bringing students and mentors together.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" className="text-muted-foreground hover:text-academe-500">Home</Link></li>
                  <li><Link to="/about" className="text-muted-foreground hover:text-academe-500">About</Link></li>
                  <li><Link to="/contact" className="text-muted-foreground hover:text-academe-500">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Email: info@academe-collab.com
                </p>
                <p className="text-sm text-muted-foreground">
                  Phone: +1 (555) 123-4567
                </p>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Academe. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onOpenChange={setIsAuthModalOpen} 
      />
    </>
  );
};

export default Index;

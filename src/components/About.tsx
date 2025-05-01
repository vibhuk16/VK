
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, User, Book } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    "JavaScript/TypeScript", "React", "Node.js", "CSS/SCSS", 
    "Responsive Design", "UI/UX", "Git", "REST APIs"
  ];
  
  return (
    <section id="about" className="bg-secondary/50">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div className="animate-fade-up">
            <p className="mb-4 text-lg">
              I'm a passionate web developer with a focus on creating intuitive, user-friendly experiences. With several years of experience in the industry, I've developed a strong understanding of modern web development practices.
            </p>
            <p className="mb-4 text-lg">
              My approach combines technical expertise with an eye for design, ensuring that the applications I build are not only functional but also aesthetically pleasing and enjoyable to use.
            </p>
            <p className="text-lg">
              When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or enjoying outdoor activities to maintain a healthy work-life balance.
            </p>
          </div>
          
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold mb-4">Skills & Expertise</h3>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="bg-background p-3 rounded-md shadow-sm">
                  {skill}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card className="card-hover">
                <CardContent className="flex flex-col items-center p-6">
                  <Briefcase className="h-10 w-10 mb-4 text-primary" />
                  <h4 className="font-bold">Experience</h4>
                  <p className="text-center text-sm text-muted-foreground">5+ Years Professional</p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="flex flex-col items-center p-6">
                  <User className="h-10 w-10 mb-4 text-primary" />
                  <h4 className="font-bold">Clients</h4>
                  <p className="text-center text-sm text-muted-foreground">25+ Happy Clients</p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="flex flex-col items-center p-6">
                  <Book className="h-10 w-10 mb-4 text-primary" />
                  <h4 className="font-bold">Projects</h4>
                  <p className="text-center text-sm text-muted-foreground">40+ Completed</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, User, Book } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    "Product Strategy", "Data Analytics", "User Research", 
    "A/B Testing", "Agile Leadership", "Cross-functional Collaboration",
    "SQL", "Tableau", "Go-to-Market Strategy"
  ];
  
  return (
    <section id="about" className="bg-secondary/50">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div className="animate-fade-up">
            <p className="mb-4 text-lg">
              With over 8 years of experience across e-commerce, foodtech, logistics, and advertising technologies, I specialize in building and scaling digital products that create value for users and businesses alike.
            </p>
            <p className="mb-4 text-lg">
              I currently work as a Senior Product Manager at MediaMarktSaturn, Europe's leading consumer electronics retailer, where I lead retail media product development across 11 countries. Prior to this, I've built and optimized data-driven products for Delivery Hero and Stryber, driving millions in savings and new revenue streams through analytics and innovation.
            </p>
            <p className="mb-4 text-lg">
              I hold a Master's in Computational Science from TU Munich, with a strong foundation in product strategy, marketing, and innovation management. Over the years, I've also led award-winning sustainability projects, including a food waste reduction initiative backed by the European Institute of Innovation & Technology.
            </p>
            <p className="text-lg">
              Beyond work, I live for adventures—whether scuba diving in open waters or paragliding across the Alps. I'm also an avid reader and biker, always curious to explore new ideas, places, and challenges.
            </p>
          </div>
          
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="mb-8 flex justify-center">
              <div className="w-64 h-64 rounded-full overflow-hidden shadow-lg">
                <img
                  src={`${import.meta.env.BASE_URL}db033ea9-09fc-44c2-bafe-74b18ca602ff.png`}
                  alt="Vibhu Kumar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
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
                  <p className="text-center text-sm text-muted-foreground">8+ Years Professional</p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="flex flex-col items-center p-6">
                  <User className="h-10 w-10 mb-4 text-primary" />
                  <h4 className="font-bold">Leadership</h4>
                  <p className="text-center text-sm text-muted-foreground">Cross-Market Teams</p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="flex flex-col items-center p-6">
                  <Book className="h-10 w-10 mb-4 text-primary" />
                  <h4 className="font-bold">Education</h4>
                  <p className="text-center text-sm text-muted-foreground">MSc TU Munich</p>
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

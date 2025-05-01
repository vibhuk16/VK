
import React from 'react';
import { FileText, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Resume: React.FC = () => {
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      period: "2021 - Present",
      description: "Led the development of client-facing web applications. Improved site performance by 40% and implemented CI/CD pipelines for streamlined deployment."
    },
    {
      title: "Web Developer",
      company: "Digital Innovations",
      period: "2018 - 2021",
      description: "Developed responsive websites and web applications for various clients. Collaborated with designers to implement UI/UX improvements."
    },
    {
      title: "Junior Developer",
      company: "StartUp Studio",
      period: "2016 - 2018",
      description: "Assisted in developing and maintaining client websites. Gained experience in modern JavaScript frameworks and responsive design principles."
    }
  ];
  
  const education = [
    {
      degree: "Master of Computer Science",
      institution: "Tech University",
      year: "2016",
      description: "Specialized in web technologies and user experience design."
    },
    {
      degree: "Bachelor of Software Engineering",
      institution: "State University",
      year: "2014",
      description: "Graduated with honors. Completed capstone project on responsive web application architecture."
    }
  ];
  
  return (
    <section id="resume" className="bg-secondary/50">
      <div className="container">
        <h2 className="section-title">Resume</h2>
        
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-1/2">
            <div className="flex items-center mb-6">
              <FileText className="mr-2 text-primary" size={24} />
              <h3 className="text-2xl font-bold">Experience</h3>
            </div>
            
            {experiences.map((exp, index) => (
              <Card key={index} className="mb-4 card-hover animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h4 className="text-lg font-bold">{exp.title}</h4>
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">{exp.period}</span>
                  </div>
                  <p className="text-muted-foreground mb-2">{exp.company}</p>
                  <p>{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="md:w-1/2">
            <div className="flex items-center mb-6">
              <FileText className="mr-2 text-primary" size={24} />
              <h3 className="text-2xl font-bold">Education</h3>
            </div>
            
            {education.map((edu, index) => (
              <Card key={index} className="mb-4 card-hover animate-fade-up" style={{ animationDelay: `${index * 0.1 + 0.3}s` }}>
                <CardContent className="p-6">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h4 className="text-lg font-bold">{edu.degree}</h4>
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">{edu.year}</span>
                  </div>
                  <p className="text-muted-foreground mb-2">{edu.institution}</p>
                  <p>{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col items-center text-center">
          <p className="text-lg mb-6 max-w-2xl">
            For more details about my work experience, skills, and education, you can download my complete resume.
          </p>
          
          <div className="flex gap-4">
            <Button className="btn-primary animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <Download className="mr-2" size={16} />
              Download Resume
            </Button>
            <Button variant="outline" asChild className="animate-fade-up" style={{ animationDelay: '0.6s' }}>
              <a href="#contact">
                Contact Me <ArrowRight className="ml-2" size={16} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;

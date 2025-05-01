
import React from 'react';
import { FileText, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Resume: React.FC = () => {
  const experiences = [
    {
      title: "Senior Product Manager",
      company: "MediaMarktSaturn",
      period: "2021 - Present",
      description: "Leading retail media product development across 11 countries for Europe's largest consumer electronics retailer. Building and scaling adtech data products that enable brands to access closed-loop measurement and targeting capabilities."
    },
    {
      title: "Global Product Operations Manager",
      company: "Delivery Hero",
      period: "2019 - 2021",
      description: "Monitored product usage in 70 countries and collaborated with regional teams to improve engagement. Led initiatives resulting in 35% increase in product usage and €6M cost savings in MENA region."
    },
    {
      title: "Data Scientist & Product Strategist",
      company: "Stryber",
      period: "2017 - 2019",
      description: "Designed self-service data platform to help teams track KPIs and make informed decisions. Reduced manual reporting time by 70% and implemented data-driven decision frameworks."
    }
  ];
  
  const education = [
    {
      degree: "Master of Science in Computational Science",
      institution: "Technical University of Munich",
      year: "2016",
      description: "Specialized in data analytics and computational modeling with focus on business applications."
    },
    {
      degree: "Bachelor of Technology",
      institution: "Amity University",
      year: "2014",
      description: "Graduated with honors. Completed capstone project on data-driven business decision systems."
    }
  ];
  
  return (
    <section id="resume" className="bg-secondary/50">
      <div className="container">
        <h2 className="section-title">Resume</h2>
        
        <div className="mb-8 max-w-3xl">
          <p className="text-lg mb-4">
            I am an experienced product leader with a strong track record of driving business outcomes through digital innovation and data-driven decision-making. Currently leading adtech product initiatives at MediaMarktSaturn, I've previously held global roles at Delivery Hero and Stryber, where I built scalable solutions across multiple markets and verticals.
          </p>
          <p className="text-lg">
            With a solid academic foundation from TU Munich and diverse hands-on experience, I bring a rare mix of strategic vision, technical understanding, and executional grit.
          </p>
        </div>
        
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
            <Button className="btn-primary animate-fade-up" style={{ animationDelay: '0.5s' }} asChild>
              <a href="https://docs.google.com/document/d/1w-_0Cez3CX4lOLcv6l0E81dr8luGcg_t/edit" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2" size={16} />
                Download Resume
              </a>
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

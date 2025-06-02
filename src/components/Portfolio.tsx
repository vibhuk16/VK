import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { trackPageView, trackEvent } from '@/services/analytics';

interface Project {
  id: number;
  title: string;
  role: string;
  description: string;
  impact: string;
  tools: string;
  image: string;
  category: string[];
  link: string;
}

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();
  
  // Track page view when the component mounts
  useEffect(() => {
    trackPageView('portfolio');
  }, []);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Retail Media Platform for MediaMarktSaturn",
      role: "Senior Product Manager",
      description: "Built and scaled adtech data products across 11 countries, enabling brands to access closed-loop measurement and improve customer targeting.",
      impact: "Drove €11M in revenue in 2023; enabled monetization of 1st-party data.",
      tools: "Jira, Tableau, SQL, GDPR-compliant data architecture",
      image: `${import.meta.env.BASE_URL}lovable-uploads/97f3d287-0da0-44c1-a5fa-b8031c5b47f0.png`,
      category: ["adtech", "data"],
      link: "#"
    },
    {
      id: 2,
      title: "Global Product Operations at Delivery Hero",
      role: "Global Product Operations Manager",
      description: "Monitored product usage in 70 countries and collaborated with regional teams to improve engagement.",
      impact: "Achieved 35% increase in product usage and saved €6M in the MENA region.",
      tools: "Jira, SQL, analytics dashboards",
      image: `${import.meta.env.BASE_URL}lovable-uploads/4b41a4a5-4dc3-46ca-b7b6-83276e517ac6.png`,
      category: ["foodtech", "operations"],
      link: "#"
    },
    {
      id: 3,
      title: "Food Waste Sustainability Venture",
      role: "Co-Founder / Lead",
      description: "Launched a food waste reduction initiative across delivery platforms.",
      impact: "Supported by the EIT Climate-KIC; funded by EU.",
      tools: "Business model innovation, analytics",
      image: `${import.meta.env.BASE_URL}lovable-uploads/b6d373d9-9a84-4d2d-9d10-0aedb2048cbc.png`,
      category: ["sustainability", "innovation"],
      link: "#"
    },
    {
      id: 4,
      title: "Self-Service Data Platform at Stryber",
      role: "Data Scientist & Product Strategist",
      description: "Designed internal platform to help teams track KPIs and make informed decisions.",
      impact: "Reduced manual reporting time by 70%.",
      tools: "Tableau, SQL, Python, Figma",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      category: ["data", "analytics"],
      link: "#"
    }
  ];
  
  const categories = ['all', 'adtech', 'data', 'foodtech', 'operations', 'sustainability', 'innovation', 'analytics'];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category.includes(filter));
    
  // Function to handle when a project is clicked
  const handleProjectClick = (projectTitle: string) => {
    // Track project view event
    trackEvent('project_view', { project: projectTitle });
  };
  
  return (
    <section id="portfolio">
      <div className="container">
        <h2 className="section-title">Portfolio</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
          A selection of my key projects across different industries and roles. Each project represents measurable impact and innovative problem-solving.
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setFilter(category);
                trackEvent('filter_change', { category });
              }}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id} 
              className="card-hover overflow-hidden animate-fade-up" 
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleProjectClick(project.title)}
            >
              <div className="h-52 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm font-medium text-primary mb-2">{project.role}</p>
                <p className="text-muted-foreground mb-3">{project.description}</p>
                <div className="mb-3">
                  <span className="font-semibold">Impact: </span>
                  <span>{project.impact}</span>
                </div>
                <div className="mb-3">
                  <span className="font-semibold">Tools: </span>
                  <span className="text-muted-foreground">{project.tools}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.category.map(cat => (
                    <Badge key={cat} variant="secondary" className="capitalize">{cat}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="link" className="p-0 h-auto" asChild>
                  <a 
                    href={project.link} 
                    className="inline-flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      trackEvent('project_link_click', { project: project.title });
                    }}
                  >
                    View Project <ArrowRight className="ml-2" size={16} />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

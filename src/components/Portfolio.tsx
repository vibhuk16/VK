
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string[];
  link: string;
}

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('all');
  
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Website",
      description: "A modern e-commerce platform with product filtering and secure checkout.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      category: ["web", "frontend"],
      link: "#"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A drag-and-drop task management application with team collaboration features.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      category: ["web", "fullstack"],
      link: "#"
    },
    {
      id: 3,
      title: "Finance Dashboard",
      description: "Interactive dashboard with data visualization for financial analytics.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      category: ["design", "frontend"],
      link: "#"
    },
    {
      id: 4,
      title: "Travel Blog",
      description: "A responsive travel blog with custom CMS and interactive maps.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      category: ["web", "design"],
      link: "#"
    },
    {
      id: 5,
      title: "Recipe App",
      description: "Mobile-first recipe application with search and favorites functionality.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      category: ["mobile", "fullstack"],
      link: "#"
    },
    {
      id: 6,
      title: "Fitness Tracker",
      description: "Workout tracking application with progress charts and social sharing.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      category: ["mobile", "web"],
      link: "#"
    }
  ];
  
  const categories = ['all', 'web', 'mobile', 'design', 'frontend', 'fullstack'];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category.includes(filter));
  
  return (
    <section id="portfolio">
      <div className="container">
        <h2 className="section-title">Portfolio</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
          Here are some of my recent projects. Each one represents a unique challenge and solution.
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Card key={project.id} className="card-hover overflow-hidden animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="h-52 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.category.map(cat => (
                    <Badge key={cat} variant="secondary" className="capitalize">{cat}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="link" className="p-0 h-auto" asChild>
                  <a href={project.link} className="inline-flex items-center">
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


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, User, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">Contact Me</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
          Have a project in mind or want to discuss opportunities? Feel free to reach out.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 animate-fade-up">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message here..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <ArrowRight className="ml-2" size={16} />}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 flex items-start">
                  <div className="bg-primary/10 p-3 rounded mr-4">
                    <Mail className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <a href="mailto:your.email@example.com" className="text-primary hover:underline">
                      your.email@example.com
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3">Connect with me</h3>
                  <div className="flex gap-3">
                    <a href="#" className="bg-primary/10 p-3 rounded hover:bg-primary/20 transition-colors">
                      <User className="text-primary" />
                    </a>
                    <a href="#" className="bg-primary/10 p-3 rounded hover:bg-primary/20 transition-colors">
                      <User className="text-primary" />
                    </a>
                    <a href="#" className="bg-primary/10 p-3 rounded hover:bg-primary/20 transition-colors">
                      <User className="text-primary" />
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3">Availability</h3>
                  <p>I'm currently available for freelance work and open to discussing new opportunities.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

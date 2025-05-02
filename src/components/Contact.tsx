import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Linkedin, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email notification using Email.js or a similar service
      // This is a placeholder for the email sending functionality
      // In a real implementation, you would use a service like EmailJS, FormSpree, or your own backend
      
      const response = await fetch('https://formspree.io/f/yourformspree-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });
      
      if (response.ok) {
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
        setIsSubmitted(true);
        
        // Reset the submitted state after showing success for a while
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "Your message couldn't be sent. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">Let's Collaborate</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
          Have an idea, opportunity, or just want to chat? Reach out — I'm always open to meaningful conversations.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 animate-fade-up">
            <Card>
              <CardContent className="p-6">
                {isSubmitted ? (
                  <div className="py-8 text-center">
                    <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
                    <p className="mb-6">Your message has been sent successfully. I'll get back to you as soon as possible.</p>
                    <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
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
                )}
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
                    <a href="mailto:vibhu.kumar@tum.de" className="text-primary hover:underline">
                      vibhu.kumar@tum.de
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex items-start">
                  <div className="bg-primary/10 p-3 rounded mr-4">
                    <Linkedin className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">LinkedIn</h3>
                    <a href="https://linkedin.com/in/vibhukumar" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      linkedin.com/in/vibhukumar
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3">Connecting</h3>
                  <p>I prefer connecting via LinkedIn for professional networking. Please include a brief note when sending a connection request.</p>
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

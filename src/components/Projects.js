import React from 'react';

function Projects() {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React frontend and Node.js backend. Features include user authentication, payment processing, and admin dashboard.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      date: '2024'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      tech: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      date: '2023'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A beautiful weather dashboard that displays current conditions and forecasts for multiple cities. Built with React and integrated with weather APIs.',
      tech: ['React', 'API Integration', 'Chart.js'],
      date: '2023'
    },
    {
      id: 4,
      title: 'AI Chatbot Integration',
      description: 'An intelligent chatbot system integrated with multiple AI APIs, featuring natural language processing and context-aware responses.',
      tech: ['React', 'Python', 'OpenAI API', 'FastAPI'],
      date: '2024'
    }
  ];

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="bg-white rounded-lg p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
            data-project-id={project.id}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-semibold text-gray-800">{project.title}</h3>
              <span className="text-gray-500 text-sm">{project.date}</span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                  {tech}
                </span>
              ))}
            </div>
            <button className="w-full bg-blue-600 text-white py-2 px-6 rounded transition-colors hover:bg-blue-700 text-sm">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;

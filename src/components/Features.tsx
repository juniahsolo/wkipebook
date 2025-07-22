import React from 'react';
import { Shield, Search, Share2, Award } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Preserve Languages',
      description: 'Help preserve endangered languages and dialects for future generations',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Search,
      title: 'Discover Cultures',
      description: 'Explore rich cultural traditions and stories from around the world',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Share2,
      title: 'Share Stories',
      description: 'Connect with others by sharing your own language and cultural experiences',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Award,
      title: 'Learn Together',
      description: 'Build a global community of language learners and cultural enthusiasts',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Lango AI?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of contributors in building the world's most comprehensive 
            database of languages and cultures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Share Your Story?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join our global community and help preserve the world's linguistic diversity
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
            Start Contributing Today
          </button>
        </div>
      </div>
    </section>
  );
};
import { Calendar, ArrowRight } from 'lucide-react';

const insights = [
  {
    image: '/insights/insight1.jpg',
    title: 'Reducing Machine Downtime by 40% in Manufacturing',
    excerpt: 'How smart spare allocation helped a leading automotive manufacturer cut downtime costs significantly.',
    date: 'Feb 10, 2026',
    category: 'Case Study',
    readTime: '5 min read'
  },
  {
    image: '/insights/insight2.jpg',
    title: 'The Future of Industrial Logistics',
    excerpt: 'Exploring AI-driven supplier matching and predictive spare part allocation in modern factories.',
    date: 'Feb 8, 2026',
    category: 'Industry Trends',
    readTime: '4 min read'
  },
  {
    image: '/insights/insight3.jpg',
    title: 'Optimizing Delivery Routes for Emergency Parts',
    excerpt: 'Real-time route optimization algorithms that ensure fastest delivery during critical breakdowns.',
    date: 'Feb 5, 2026',
    category: 'Technology',
    readTime: '6 min read'
  }
];

export function InsightsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-semibold text-slate-900">
              Latest Insights
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Industry updates and best practices from our team
            </p>
          </div>
          <a 
            href="#" 
            className="hidden md:flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((insight, i) => (
            <article 
              key={i}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition group cursor-pointer overflow-hidden"
            >
              <div className="relative aspect-video bg-slate-100">
                <img 
                  src={insight.image} 
                  alt={insight.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-4">
                  <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 font-medium">
                    {insight.category}
                  </span>
                  <span>•</span>
                  <span>{insight.readTime}</span>
                </div>

                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {insight.title}
                </h3>

                <p className="text-slate-600 mb-4 line-clamp-2">
                  {insight.excerpt}
                </p>

                <div className="flex items-center text-sm text-slate-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{insight.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a 
            href="#" 
            className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
          >
            <span>View All Insights</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

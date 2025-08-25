import React from 'react';
import { TrendingUp, Users, Target, DollarSign } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      title: 'Total Leads',
      value: '124',
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Conversion Rate',
      value: '23%',
      change: '+4%',
      icon: Target,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Pipeline Value',
      value: '$86,500',
      change: '+8%',
      icon: DollarSign,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Monthly Growth',
      value: '18%',
      change: '+2%',
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-500'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={index} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-lg" />
          <div className="relative bg-gradient-to-br p-6 rounded-2xl shadow-xl border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-semibold text-green-500 mt-2 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
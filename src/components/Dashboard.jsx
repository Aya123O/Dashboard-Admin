import React, { useEffect } from 'react';
import Header from './Header';
import Stats from './Stats';
import LeadsTable from './LeadsTable';
import { useLeadsStore } from '../store/LeadsStore';

const Dashboard = () => {
  const { fetchLeads } = useLeadsStore();
  
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50">
      <Header />
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 mb-6 tracking-tight">
            Dashboard Overview
          </h1>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-1 mb-8 border border-white/20">
            <Stats />
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
            <LeadsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
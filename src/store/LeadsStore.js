import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const mockLeads = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    company: "Acme Inc",
    status: "new",
    date: "2023-10-15",
    value: 5000
  },
  {
    id: 2,
    name: "Emma Johnson",
    email: "emma.j@example.com",
    company: "Beta Corp",
    status: "contacted",
    date: "2023-10-14",
    value: 3200
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@example.com",
    company: "Gamma LLC",
    status: "qualified",
    date: "2023-10-13",
    value: 7500
  },
  {
    id: 4,
    name: "Sarah Davis",
    email: "sarahd@example.com",
    company: "Delta Co",
    status: "proposal",
    date: "2023-10-12",
    value: 4200
  },
  {
    id: 5,
    name: "David Wilson",
    email: "dwilson@example.com",
    company: "Epsilon Ltd",
    status: "closed",
    date: "2023-10-11",
    value: 9800
  },
  {
    id: 6,
    name: "Jennifer Taylor",
    email: "jenn.t@example.com",
    company: "Zeta Inc",
    status: "new",
    date: "2023-10-10",
    value: 2100
  },
  {
    id: 7,
    name: "Christopher Martinez",
    email: "cmartinez@example.com",
    company: "Eta Corp",
    status: "contacted",
    date: "2023-10-09",
    value: 5400
  },
  {
    id: 8,
    name: "Amanda Anderson",
    email: "a.anderson@example.com",
    company: "Theta LLC",
    status: "qualified",
    date: "2023-10-08",
    value: 6700
  },
  {
    id: 9,
    name: "James Thomas",
    email: "jthomas@example.com",
    company: "Iota Co",
    status: "new",
    date: "2023-10-07",
    value: 3300
  },
  {
    id: 10,
    name: "Lisa Jackson",
    email: "ljackson@example.com",
    company: "Kappa Ltd",
    status: "proposal",
    date: "2023-10-06",
    value: 8900
  },
  {
    id: 11,
    name: "Robert White",
    email: "rwhite@example.com",
    company: "Lambda Inc",
    status: "closed",
    date: "2023-10-05",
    value: 7600
  },
  {
    id: 12,
    name: "Olivia Harris",
    email: "oliviah@example.com",
    company: "Mu Enterprises",
    status: "new",
    date: "2023-10-04",
    value: 2900
  },
  {
    id: 13,
    name: "William Clark",
    email: "wclark@example.com",
    company: "Nu Solutions",
    status: "qualified",
    date: "2023-10-03",
    value: 8100
  },
  {
    id: 14,
    name: "Sophia Lewis",
    email: "slewis@example.com",
    company: "Xi Corp",
    status: "contacted",
    date: "2023-10-02",
    value: 4600
  },
  {
    id: 15,
    name: "Daniel Young",
    email: "dyoung@example.com",
    company: "Omicron LLC",
    status: "proposal",
    date: "2023-10-01",
    value: 7200
  },
  {
    id: 16,
    name: "Isabella King",
    email: "ik@example.com",
    company: "Pi Ltd",
    status: "closed",
    date: "2023-09-30",
    value: 9900
  },
  {
    id: 17,
    name: "Matthew Scott",
    email: "mscott@example.com",
    company: "Rho Inc",
    status: "new",
    date: "2023-09-29",
    value: 2500
  },
  {
    id: 18,
    name: "Mia Green",
    email: "miag@example.com",
    company: "Sigma Co",
    status: "contacted",
    date: "2023-09-28",
    value: 3800
  },
  {
    id: 19,
    name: "Ethan Baker",
    email: "ebaker@example.com",
    company: "Tau Ltd",
    status: "qualified",
    date: "2023-09-27",
    value: 6400
  },
  {
    id: 20,
    name: "Charlotte Adams",
    email: "cadams@example.com",
    company: "Upsilon LLC",
    status: "proposal",
    date: "2023-09-26",
    value: 8300
  },
  {
    id: 21,
    name: "Alexander Nelson",
    email: "anelson@example.com",
    company: "Phi Inc",
    status: "new",
    date: "2023-09-25",
    value: 3100
  },
  {
    id: 22,
    name: "Amelia Carter",
    email: "acarter@example.com",
    company: "Chi Corp",
    status: "closed",
    date: "2023-09-24",
    value: 8700
  },
  {
    id: 23,
    name: "Benjamin Mitchell",
    email: "bmitchell@example.com",
    company: "Psi Ltd",
    status: "qualified",
    date: "2023-09-23",
    value: 4500
  },
  {
    id: 24,
    name: "Evelyn Perez",
    email: "eperez@example.com",
    company: "Omega Enterprises",
    status: "proposal",
    date: "2023-09-22",
    value: 9300
  },
  {
    id: 25,
    name: "Mason Hall",
    email: "mhall@example.com",
    company: "Alpha Systems",
    status: "new",
    date: "2023-09-21",
    value: 2800
  },
  {
    id: 26,
    name: "Harper Allen",
    email: "hallen@example.com",
    company: "BetaSoft",
    status: "contacted",
    date: "2023-09-20",
    value: 5200
  },
  {
    id: 27,
    name: "Elijah Wright",
    email: "ewright@example.com",
    company: "GammaWare",
    status: "qualified",
    date: "2023-09-19",
    value: 6900
  },
  {
    id: 28,
    name: "Abigail King",
    email: "aking@example.com",
    company: "DeltaWorks",
    status: "proposal",
    date: "2023-09-18",
    value: 8400
  },
  {
    id: 29,
    name: "Henry Rodriguez",
    email: "hrodriguez@example.com",
    company: "EpsilonTech",
    status: "closed",
    date: "2023-09-17",
    value: 9100
  },
  {
    id: 30,
    name: "Emily Turner",
    email: "eturner@example.com",
    company: "ZetaGroup",
    status: "new",
    date: "2023-09-16",
    value: 3700
  }
];


const useLeadsStore = create(devtools((set, get) => ({
  leads: mockLeads,
  filteredLeads: mockLeads,
  searchQuery: '',
  statusFilter: 'all',
  sortBy: 'date',
  sortOrder: 'desc',
  
  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().filterLeads();
  },
  
  setStatusFilter: (status) => {
    set({ statusFilter: status });
    get().filterLeads();
  },
  
  setSort: (sortBy, sortOrder) => {
    set({ sortBy, sortOrder });
    get().filterLeads();
  },
  
  filterLeads: () => {
    const { leads, searchQuery, statusFilter, sortBy, sortOrder } = get();
    
    let filtered = [...leads];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.company.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
    
    set({ filteredLeads: filtered });
  },
  
  // Simulate API fetch
  fetchLeads: async () => {
    // In a real app, you would fetch from an API
    set({ leads: mockLeads, filteredLeads: mockLeads });
  }
})));

const LeadsProvider = ({ children }) => {
  return children;
};

export { useLeadsStore, LeadsProvider };
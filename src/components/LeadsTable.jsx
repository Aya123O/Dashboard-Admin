// src/components/LeadsTable.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useLeadsStore } from '../store/LeadsStore';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  ChevronDown, 
  ChevronUp, 
  Edit, 
  Trash2, 
  Eye,
  Mail,
  Phone,
  Calendar,
  User,
  Building,
  TrendingUp,
  Download,
  Plus,
  X
} from 'lucide-react';

const LeadsTable = () => {
  const { 
    filteredLeads, 
    searchQuery, 
    statusFilter, 
    setSearchQuery, 
    setStatusFilter, 
    setSort,
    deleteLead,
    updateLeadStatus
  } = useLeadsStore();
  
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [activeActionMenu, setActiveActionMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeads, setSelectedLeads] = useState(new Set());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const actionMenuRef = useRef(null);
  const itemsPerPage = 10;
  
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'new', label: 'New', color: 'bg-blue-500' },
    { value: 'contacted', label: 'Contacted', color: 'bg-yellow-500' },
    { value: 'qualified', label: 'Qualified', color: 'bg-purple-500' },
    { value: 'proposal', label: 'Proposal', color: 'bg-indigo-500' },
    { value: 'closed', label: 'Closed', color: 'bg-green-500' }
  ];
  
  const statusActions = [
    { value: 'new', label: 'Mark as New', color: 'text-blue-600', icon: <div className="w-2 h-2 rounded-full bg-blue-600 mr-2"></div> },
    { value: 'contacted', label: 'Mark as Contacted', color: 'text-yellow-600', icon: <div className="w-2 h-2 rounded-full bg-yellow-600 mr-2"></div> },
    { value: 'qualified', label: 'Mark as Qualified', color: 'text-purple-600', icon: <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"></div> },
    { value: 'proposal', label: 'Mark as Proposal', color: 'text-indigo-600', icon: <div className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></div> },
    { value: 'closed', label: 'Mark as Closed', color: 'text-green-600', icon: <div className="w-2 h-2 rounded-full bg-green-600 mr-2"></div> }
  ];
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setActiveActionMenu(null);
      }
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSort = (field) => {
    const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
    setSort(field, newOrder);
  };
  
  const getStatusClass = (status) => {
    const statusClasses = {
      new: 'bg-blue-100 text-blue-800 border border-blue-200',
      contacted: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      qualified: 'bg-purple-100 text-purple-800 border border-purple-200',
      proposal: 'bg-indigo-100 text-indigo-800 border border-indigo-200',
      closed: 'bg-green-100 text-green-800 border border-green-200'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800 border border-gray-200';
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronDown className="h-4 w-4 opacity-30" />;
    return sortOrder === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };
  
  const toggleActionMenu = (leadId, e) => {
    e.stopPropagation();
    setActiveActionMenu(activeActionMenu === leadId ? null : leadId);
  };
  
  const handleStatusChange = (leadId, newStatus) => {
    updateLeadStatus(leadId, newStatus);
    setActiveActionMenu(null);
  };
  
  const handleDeleteLead = (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      deleteLead(leadId);
      setActiveActionMenu(null);
    }
  };
  
  const toggleSelectLead = (leadId, e) => {
    e.stopPropagation();
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(leadId)) {
      newSelected.delete(leadId);
    } else {
      newSelected.add(leadId);
    }
    setSelectedLeads(newSelected);
  };
  
  const toggleSelectAll = () => {
    if (selectedLeads.size === paginatedLeads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(paginatedLeads.map(lead => lead.id)));
    }
  };
  
  // Pagination logic
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage);
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = isMobile ? 3 : 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }
      
      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always include last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-4 sm:px-6 py-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <div className="mb-4 lg:mb-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Leads Management</h2>
            <p className="text-sm text-gray-500 mt-1">Track and manage your sales pipeline</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none z-10">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full pl-3 pr-8 py-2.5 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl appearance-none bg-gray-50 transition-colors"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <button className="flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm">
              <Plus className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Add Lead</span>
            </button>
          </div>
        </div>
        
        {/* Selected actions bar */}
        {selectedLeads.size > 0 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 gap-2">
            <div className="flex items-center">
              <span className="text-sm font-medium text-blue-800">
                {selectedLeads.size} {selectedLeads.size === 1 ? 'lead' : 'leads'} selected
              </span>
            </div>
            <div className="flex items-center flex-wrap gap-1">
              <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 p-1 sm:p-2">
                <Mail className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Email</span>
              </button>
              <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 p-1 sm:p-2">
                <Download className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button 
                className="flex items-center text-sm text-red-600 hover:text-red-800 p-1 sm:p-2"
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete ${selectedLeads.size} leads?`)) {
                    selectedLeads.forEach(id => deleteLead(id));
                    setSelectedLeads(new Set());
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Delete</span>
              </button>
              <button 
                className="p-1 text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedLeads(new Set())}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
        
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedLeads.size === paginatedLeads.length && paginatedLeads.length > 0}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition-colors group"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 sm:mr-2 text-gray-400 group-hover:text-gray-600" />
                    <span className="hidden sm:inline">Lead</span>
                    <SortIcon field="name" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition-colors group"
                  onClick={() => handleSort('company')}
                >
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1 sm:mr-2 text-gray-400 group-hover:text-gray-600 hidden sm:block" />
                    <span>Company</span>
                    <SortIcon field="company" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition-colors group"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    <span>Status</span>
                    <SortIcon field="status" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition-colors group"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 sm:mr-2 text-gray-400 group-hover:text-gray-600 hidden sm:block" />
                    <span className="hidden sm:inline">Date</span>
                    <SortIcon field="date" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition-colors group"
                  onClick={() => handleSort('value')}
                >
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1 sm:mr-2 text-gray-400 group-hover:text-gray-600 hidden sm:block" />
                    <span>Value</span>
                    <SortIcon field="value" />
                  </div>
                </th>
                <th scope="col" className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedLeads.length > 0 ? (
                paginatedLeads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    className={`hover:bg-gray-50/50 transition-colors ${selectedLeads.has(lead.id) ? 'bg-blue-50/30' : ''}`}
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedLeads.has(lead.id)}
                          onChange={(e) => toggleSelectLead(lead.id, e)}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center border border-blue-100/50 shadow-sm">
                            <span className="text-blue-600 font-medium text-xs sm:text-sm">
                              {lead.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-2 sm:ml-4">
                          <div className="text-sm font-semibold text-gray-900">{lead.name}</div>
                          <div className="text-xs sm:text-sm text-gray-500 flex items-center mt-0.5">
                            <Mail className="h-3.5 w-3.5 mr-1 hidden sm:block" />
                            <span className="truncate max-w-[100px] sm:max-w-none">{lead.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-[80px] sm:max-w-none">{lead.company}</div>
                      <div className="text-xs sm:text-sm text-gray-500 truncate max-w-[80px] sm:max-w-none">{lead.industry || 'Unknown industry'}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 sm:px-3 sm:py-1.5 inline-flex text-xs leading-4 font-semibold rounded-full ${getStatusClass(lead.status)}`}>
                        <span className="hidden sm:inline">{lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}</span>
                        <span className="sm:hidden">{lead.status.charAt(0).toUpperCase()}</span>
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm text-gray-500 flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-gray-400 hidden sm:block" />
                        {formatDate(lead.date)}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatCurrency(lead.value)}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                      <button 
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={(e) => toggleActionMenu(lead.id, e)}
                      >
                        <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      
                      {activeActionMenu === lead.id && (
                        <div 
                          ref={actionMenuRef}
                          className="absolute right-4 sm:right-6 top-10 z-20 mt-1 w-48 sm:w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 border border-gray-200"
                        >
                          <div className="py-2">
                            <button className="group flex items-center px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left rounded-t-lg">
                              <Eye className="h-4 w-4 mr-2 sm:mr-3 text-gray-500 group-hover:text-gray-700" />
                              View Details
                            </button>
                            <button className="group flex items-center px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                              <Edit className="h-4 w-4 mr-2 sm:mr-3 text-gray-500 group-hover:text-blue-600" />
                              Edit Lead
                            </button>
                            <button className="group flex items-center px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                              <Mail className="h-4 w-4 mr-2 sm:mr-3 text-gray-500 group-hover:text-indigo-600" />
                              Send Email
                            </button>
                            <button className="group flex items-center px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left rounded-b-lg">
                              <Phone className="h-4 w-4 mr-2 sm:mr-3 text-gray-500 group-hover:text-green-600" />
                              Log Call
                            </button>
                          </div>
                          <div className="py-2">
                            <div className="px-3 sm:px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">Change Status</div>
                            {statusActions.map(action => (
                              <button 
                                key={action.value}
                                className={`group flex items-center px-3 sm:px-4 py-2 text-sm hover:bg-gray-50 w-full text-left ${action.color}`}
                                onClick={() => handleStatusChange(lead.id, action.value)}
                              >
                                {action.icon}
                                {action.label}
                              </button>
                            ))}
                          </div>
                          <div className="py-2">
                            <button 
                              className="group flex items-center px-3 sm:px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full text-left rounded-lg"
                              onClick={() => handleDeleteLead(lead.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2 sm:mr-3" />
                              Delete Lead
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-16 w-16 sm:h-20 sm:w-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                        <Search className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                      </div>
                      <p className="text-base font-medium text-gray-700">No leads found</p>
                      <p className="text-sm text-gray-500 mt-1 max-w-md text-center">
                        Try adjusting your search or filter criteria. Or add a new lead to get started.
                      </p>
                      <button className="mt-4 flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Your First Lead
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {filteredLeads.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-2 sm:px-4 py-4 mt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 sm:gap-0">
              <div>
                <p className="text-xs sm:text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredLeads.length)}</span> of{' '}
                  <span className="font-medium">{filteredLeads.length}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-l-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                  </button>
                  
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                      className={`relative inline-flex items-center px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold ${
                        page === currentPage
                          ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                          : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                      } ${page === '...' ? 'cursor-default' : ''}`}
                      disabled={page === '...'}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center rounded-r-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                      currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">Next</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsTable;
import React, { useState, useMemo } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { downloadCsv } from '../../utils/helpers';
import { AuditEvent } from '../../types';

const ITEMS_PER_PAGE = 10;

const AuditLog = () => {
  const { auditLog } = useSettings();
  const [filters, setFilters] = useState({ user: '', module: '', startDate: '', endDate: '' });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredLog = useMemo(() => {
    return auditLog.filter(event => {
      const eventDate = new Date(event.timestamp);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      if (startDate && eventDate < startDate) return false;
      if (endDate && eventDate > endDate) return false;
      if (filters.user && !event.user.toLowerCase().includes(filters.user.toLowerCase())) return false;
      if (filters.module && !event.entity.toLowerCase().includes(filters.module.toLowerCase())) return false;
      
      return true;
    });
  }, [auditLog, filters]);

  const totalPages = Math.ceil(filteredLog.length / ITEMS_PER_PAGE);
  const paginatedLog = filteredLog.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  
  const handleExport = () => {
      const formattedLog = filteredLog.map((event: AuditEvent) => ({
        timestamp: event.timestamp,
        user: event.user,
        action: event.action,
        entity: event.entity,
        summary: `Changed ${Object.keys(event.details.after).length} properties`,
      }));
      downloadCsv(formattedLog, 'filtered-audit-log.csv');
  };

  return (
    <Card title="Audit Log">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-md dark:border-gray-600">
            <Input label="Filter by User" value={filters.user} onChange={e => setFilters({...filters, user: e.target.value})} />
            <Input label="Filter by Module/Entity" value={filters.module} onChange={e => setFilters({...filters, module: e.target.value})} />
            <Input type="date" label="Start Date" value={filters.startDate} onChange={e => setFilters({...filters, startDate: e.target.value})} />
            <Input type="date" label="End Date" value={filters.endDate} onChange={e => setFilters({...filters, endDate: e.target.value})} />
        </div>
        <Button onClick={handleExport}>Export Filtered as CSV</Button>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">When</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Who</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Entity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Summary</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedLog.map(event => (
                <tr key={event.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(event.timestamp).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{event.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{event.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{event.entity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Details available in export</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center">
            <Button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
            <span>Page {currentPage} of {totalPages}</span>
            <Button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
        </div>
      </div>
    </Card>
  );
};

export default AuditLog;

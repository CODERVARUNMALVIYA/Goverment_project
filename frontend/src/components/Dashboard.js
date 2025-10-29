import React, { useEffect, useState } from 'react';
import { t } from '../i18n';
import { FaCalendarAlt, FaSyncAlt, FaChartBar, FaUsers, FaBriefcase, FaRupeeSign, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard({ district, currentLang }) {
  const [districtData, setDistrictData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    if (!district) return;
    
    setIsLoading(true);
    setError(null);
    
    const apiBase = process.env.REACT_APP_API_BASE_URL || '/api';
    const endpoint = `${apiBase}/mgnrega/district/${encodeURIComponent(district)}`;
    
    fetch(endpoint)
      .then(response => {
        if (response.status === 404) {
          throw new Error(t('noData'));
        }
        if (!response.ok) {
          throw new Error(t('loading'));
        }
        return response.json();
      })
      .then(jsonData => {
        if (jsonData.ok && jsonData.data) {
          setDistrictData(jsonData.data);
          if (jsonData.data.length > 0) {
            setSelectedYear(jsonData.data[0].year);
          }
        } else {
          setError(jsonData.message || t('noData'));
          setDistrictData(null);
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message || t('noData'));
        setDistrictData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [district]);

  if (isLoading) {
    return (
      <div className="panel loading-panel">
        <div className="spinner"></div>
        <p>{t('loading')} {t(district)}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="panel error-panel">
        <p className="error-msg">{error}</p>
        <button onClick={() => window.location.reload()}>
          <FaSyncAlt /> फिर से कोशिश करें
        </button>
      </div>
    );
  }

  if (!districtData || districtData.length === 0) {
    return (
      <div className="panel empty-panel">
        <FaChartBar size={48} color="#ccc" />
        <p>{t('noData')}</p>
        <small>District: {t(district)}</small>
      </div>
    );
  }

  const yearData = districtData.find(d => d.year === selectedYear) || districtData[0];
  const availableYears = [...new Set(districtData.map(d => d.year))].sort((a, b) => b - a);
  const metricsData = yearData.metrics || [];

  // Calculate summary stats
  const totalJobcards = yearData.totalJobcards || 0;
  const totalWorkers = yearData.totalWorkers || 0;
  const totalPersondays = yearData.totalPersondaysGenerated || 0;
  const totalExpenditure = yearData.totalExpenditureRs || 0;

  // Calculate comparison with previous year
  const previousYearData = districtData.find(d => d.year === selectedYear - 1);
  const jobcardsChange = previousYearData ? 
    ((totalJobcards - (previousYearData.totalJobcards || 0)) / (previousYearData.totalJobcards || 1) * 100).toFixed(1) : null;
  const workersChange = previousYearData ?
    ((totalWorkers - (previousYearData.totalWorkers || 0)) / (previousYearData.totalWorkers || 1) * 100).toFixed(1) : null;

  // Prepare chart data
  const chartData = metricsData.map(m => ({
    month: t(m.month) || m.month,
    value: m.value || 0
  }));
  
  console.log('📊 Chart Debug Info:');
  console.log('  metricsData length:', metricsData.length);
  console.log('  chartData length:', chartData.length);
  console.log('  chartData:', chartData);

  return (
    <div className="panel dashboard-panel">
      <div className="panel-header">
        <div className="header-left">
          <h2>{t(district)}</h2>
          <div className="meta-info">
            <FaCalendarAlt /> 
            <span>{t('lastUpdated')}: {new Date(yearData.sourceUpdatedAt || yearData.updatedAt).toLocaleDateString('en-IN')}</span>
          </div>
        </div>
        
        <div className="year-selector">
          {availableYears.map(yr => (
            <button 
              key={yr}
              className={selectedYear === yr ? 'year-btn active' : 'year-btn'}
              onClick={() => setSelectedYear(yr)}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards with Icons */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon green-icon">
            <FaUsers size={28} />
          </div>
          <div className="stat-content">
            <h3>{totalWorkers.toLocaleString('en-IN')}</h3>
            <p>{t('workersLabel')}</p>
            {workersChange && (
              <div className={`stat-change ${parseFloat(workersChange) >= 0 ? 'positive' : 'negative'}`}>
                {parseFloat(workersChange) >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                {Math.abs(workersChange)}% {t('fromLastYear')}
              </div>
            )}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue-icon">
            <FaBriefcase size={28} />
          </div>
          <div className="stat-content">
            <h3>{totalJobcards.toLocaleString('en-IN')}</h3>
            <p>{t('jobcardsLabel')}</p>
            {jobcardsChange && (
              <div className={`stat-change ${parseFloat(jobcardsChange) >= 0 ? 'positive' : 'negative'}`}>
                {parseFloat(jobcardsChange) >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                {Math.abs(jobcardsChange)}% {t('fromLastYear')}
              </div>
            )}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange-icon">
            <FaCalendarAlt size={28} />
          </div>
          <div className="stat-content">
            <h3>{totalPersondays.toLocaleString('en-IN')}</h3>
            <p>{t('persondaysLabel')}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple-icon">
            <FaRupeeSign size={28} />
          </div>
          <div className="stat-content">
            <h3>₹{totalExpenditure.toLocaleString('en-IN')}</h3>
            <p>{t('expenditureLabel')}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      {metricsData && metricsData.length > 0 ? (
        <>
          <div className="chart-section">
            <h3 className="section-title">{t('monthlyTrend')}</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" style={{fontSize: '12px'}} />
                <YAxis style={{fontSize: '12px'}} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#2b7a78" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-section">
            <h3 className="section-title">{t('monthlyComparison')}</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" style={{fontSize: '12px'}} />
                <YAxis style={{fontSize: '12px'}} />
                <Tooltip />
                <Bar dataKey="value" fill="#4fb3b2" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="chart-section">
          <p style={{textAlign: 'center', color: '#999'}}>
            {t('noData')}
          </p>
        </div>
      )}

      <div className="panel-footer">
        <button className="refresh-btn" onClick={() => window.location.reload()}>
          <FaSyncAlt /> {t('refresh')}
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';
import { Box, Container, Grid } from '@mui/material';
import Navbar from './components/navbar/Navbar';
import EmployeeList from './components/employee-list/EmployeeList';
import OrgChart from './components/org-chart/OrgChart';
import server from './utils/api';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch('/api/employees');
    const data = await response.json();
    setEmployees(data);
    setFilteredEmployees(data);
    const uniqueTeams = [...new Set(data.map(emp => emp.team))];
    setTeams(uniqueTeams);
  };

  const handleSearch = (searchTerm) => {
    const filtered = employees.filter(emp =>
      Object.values(emp)
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const handleTeamFilter = (team) => {
    const filtered = team
      ? employees.filter(emp => emp.team === team)
      : employees;
    setFilteredEmployees(filtered);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/employees/${id}`, { method: 'DELETE' });
    fetchEmployees();
  };

  const handleManagerUpdate = async (employeeId, newManagerId) => {
    await fetch(`/api/employees/${employeeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ manager: newManagerId })
    });
    fetchEmployees();
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <motion.div
        className="w-5 h-5 rounded-full fixed pointer-events-none z-50 opacity-50 bg-primary-light dark:bg-primary-dark"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{
          type: 'spring',
          damping: 10,
          stiffness: 50,
          mass: 0.1,
        }}
      />
      <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
        <Navbar 
          onSearch={handleSearch} 
          onTeamFilter={handleTeamFilter} 
          teams={teams}
          isDarkMode={isDarkMode}
          onThemeToggle={toggleTheme}
        />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <EmployeeList employees={filteredEmployees} onDelete={handleDelete} />
            </Grid>
            <Grid item xs={12} md={8}>
              <OrgChart employees={employees} onManagerUpdate={handleManagerUpdate} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;

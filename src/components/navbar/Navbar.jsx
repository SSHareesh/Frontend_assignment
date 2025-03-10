import { useState } from 'react';
import { AppBar, Toolbar, TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navbar = ({ onSearch, onTeamFilter, teams, isDarkMode, onThemeToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleTeamChange = (event) => {
    const value = event.target.value;
    setSelectedTeam(value);
    onTeamFilter(value);
  };

  return (
    <AppBar position="sticky" className="bg-background-paper-light dark:bg-background-paper-dark shadow-lg w-full transition-all duration-300 ease-in-out">
      <Toolbar className="justify-between">
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto p-2 gap-6">
          <div className="flex flex-1 gap-6">
            <TextField
              variant="outlined"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={handleSearchChange}
              size="small"
              className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
            />
            <FormControl className="min-w-[200px]" size="small">
              <InputLabel>Filter by Team</InputLabel>
              <Select
                value={selectedTeam}
                onChange={handleTeamChange}
                label="Filter by Team"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                <MenuItem value="">All Teams</MenuItem>
                {teams.map((team) => (
                  <MenuItem key={team} value={team}>
                    {team}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <IconButton
            onClick={onThemeToggle}
            className="transition-transform duration-200 hover:scale-110 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl ml-4"
            sx={{ color: 'inherit' }}
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
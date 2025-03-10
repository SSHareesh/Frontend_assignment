// import { useState } from 'react';
// import { AppBar, Toolbar, TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';

// const Navbar = ({ onSearch, onTeamFilter, teams, isDarkMode, onThemeToggle }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedTeam, setSelectedTeam] = useState('');

//   const handleSearchChange = (event) => {
//     const value = event.target.value;
//     setSearchTerm(value);
//     onSearch(value);
//   };

//   const handleTeamChange = (event) => {
//     const value = event.target.value;
//     setSelectedTeam(value);
//     onTeamFilter(value);
//   };

//   return (
//     <AppBar position="sticky" className="bg-background-paper-light dark:bg-background-paper-dark shadow-lg w-full transition-all duration-300 ease-in-out">
//       <Toolbar className="justify-between">
//         <div className="flex items-center justify-between w-full max-w-6xl mx-auto p-2 gap-6">
//           <div className="flex flex-1 gap-6">
//             <TextField
//               variant="outlined"
//               placeholder="Search employees..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               size="small"
//               className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
//             />
//             <FormControl className="min-w-[200px]" size="small">
//               <InputLabel>Filter by Team</InputLabel>
//               <Select
//                 value={selectedTeam}
//                 onChange={handleTeamChange}
//                 label="Filter by Team"
//                 className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
//               >
//                 <MenuItem value="">All Teams</MenuItem>
//                 {teams.map((team) => (
//                   <MenuItem key={team} value={team}>
//                     {team}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>
//           <IconButton
//             onClick={onThemeToggle}
//             className="transition-transform duration-200 hover:scale-110 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl ml-4"
//             sx={{ color: 'inherit' }}
//           >
//             {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//           </IconButton>
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;

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
    <AppBar 
      position="sticky" 
      className="bg-blue-600 shadow-md"
      elevation={0}
    >
      <Toolbar className="px-4 py-2">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto gap-4">
          <FormControl size="small" className="w-64">
            <InputLabel className="text-white">Filter by Team</InputLabel>
            <Select
              value={selectedTeam}
              onChange={handleTeamChange}
              label="Filter by Team"
              className="bg-white/10 text-white"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)'
                },
                '& .MuiSvgIcon-root': {
                  color: 'white'
                },
                '& .MuiSelect-select': {
                  color: 'white'
                }
              }}
            >
              <MenuItem value="">All Teams</MenuItem>
              {teams.map((team) => (
                <MenuItem key={team} value={team}>
                  {team}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="flex items-center gap-4">
            <TextField
              variant="outlined"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={handleSearchChange}
              size="small"
              className="w-64"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white'
                  }
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)'
                }
              }}
            />
            <IconButton
              onClick={onThemeToggle}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200"
            >
              {isDarkMode ? (
                <Brightness7Icon className="text-white" />
              ) : (
                <Brightness4Icon className="text-white" />
              )}
            </IconButton>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
import React, { useState } from "react";
import {
  Paper,
  Container,
  Typography,
  AppBar,
  Box,
  Toolbar,
  Button,
  InputBase,
  alpha,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const NavBar = () => (
  <AppBar position="fixed">
    <Container maxWidth="xl">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#"
          sx={{
            mr: 2,
            display: {
              xs: "none",
              md: "flex",
            },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          GO-BANANAS
        </Typography>

        <Box>
          <Button
            variant="text"
            color="primary"
            noWrap
            component="a"
            href="https://github.com/MD-Sharik/Assignment-List"
            sx={{
              mr: 2,
              display: {
                xs: "none",
                md: "flex",
              },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GITHUB
          </Button>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);

const SearchBar = ({ filter, setFilter }) => (
  <Box sx={{ flexGrow: 0, my: 4 }}>
    <SearchBox>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
        sx={{ backgroundColor: "white", width: "100%", borderRadius: "10px" }}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </SearchBox>
  </Box>
);

const List = ({ data }) => (
  <Container sx={{ pt: 12 }} maxWidth="lg">
    {data.map((item) => (
      <Paper
        elevation={0}
        sx={{
          my: 4,
          px: 8,
          py: 2,
          borderColor: "primary.main",
          borderRadius: "16px",
        }}
        key={item.id}
      >
        <Typography variant="subtitle1" color="initial" fontWeight="bold">
          {item.title}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {item.body}
        </Typography>
      </Paper>
    ))}
  </Container>
);

const App = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [anchorElNav, setAnchorElNav] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#00000010", minHeight: "100vh" }}>
      <NavBar
        handleOpenNavMenu={handleOpenNavMenu}
        handleCloseNavMenu={handleCloseNavMenu}
        anchorElNav={anchorElNav}
      />
      <Container sx={{ pt: 12, pb: 2 }} maxWidth="lg">
        <SearchBar filter={filter} setFilter={setFilter} />
        <Button
          onClick={fetchData}
          sx={{
            display: "flex",
            justifyItems: "center",
            margin: "auto",
            backgroundColor: "blue",
            color: "white",
            "&:hover": {
              background: "black",
            },
          }}
          variant="contained"
        >
          Get List
        </Button>
        <List data={filteredData} />
      </Container>
    </div>
  );
};

export default App;

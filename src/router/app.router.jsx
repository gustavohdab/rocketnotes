import { Routes, Route } from "react-router-dom";

import { New } from "../Pages/New";
import { Home } from "../Pages/Home";
import { Details } from "../Pages/Details";
import { Profile } from "../Pages/Profile";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/details/:id" element={<Details />} />
    </Routes>
  );
}

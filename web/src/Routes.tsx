// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import DefaultLayout from 'src/layouts/DefaultLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="AuthDetails" titleTo="authDetails" buttonLabel="New AuthDetail" buttonTo="newAuthDetail">
        <Route path="/auth-details/new" page={AuthDetailNewAuthDetailPage} name="newAuthDetail" />
        <Route path="/auth-details/{id}/edit" page={AuthDetailEditAuthDetailPage} name="editAuthDetail" />
        <Route path="/auth-details/{id}" page={AuthDetailAuthDetailPage} name="authDetail" />
        <Route path="/auth-details" page={AuthDetailAuthDetailsPage} name="authDetails" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
        <Route path="/users/new" page={UserNewUserPage} name="newUser" />
        <Route path="/users/{id}/edit" page={UserEditUserPage} name="editUser" />
        <Route path="/users/{id}" page={UserUserPage} name="user" />
        <Route path="/users" page={UserUsersPage} name="users" />
      </Set>
      <Set wrap={DefaultLayout}>
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

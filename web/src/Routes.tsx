// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import DefaultLayout from 'src/layouts/DefaultLayout'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="AuthDetails" titleTo="authDetails" buttonLabel="New AuthDetail" buttonTo="newAuthDetail">
        <Route path="/auth-details/new" page={AuthDetailNewAuthDetailPage} name="newAuthDetail" />
        <Route path="/auth-details/{id}/edit" page={AuthDetailEditAuthDetailPage} name="editAuthDetail" />
        <Route path="/auth-details/{id}" page={AuthDetailAuthDetailPage} name="authDetail" />
        <Route path="/auth-details" page={AuthDetailAuthDetailsPage} name="authDetails" />
      </Set>
      <Set wrap={DefaultLayout}>
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

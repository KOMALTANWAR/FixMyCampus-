# MINI PROJECT REPORT
## FixMyCampus – Campus Issue Reporter

**Student Name:** ______________________________  
**Roll Number:** _______________________________  
**Class / Section:** ____________________________  
**Subject:** Agile Software Development and DevOps  
**Project Type:** Mini Project / Laboratory Work

### 1. Aim
To explore tools related to Agile Development and DevOps and develop a small project using these technologies.

### 2. Problem Statement
Campus problems such as water leakage, damaged lights, cleanliness issues and weak internet connectivity may not reach the responsible team quickly. FixMyCampus provides a simple digital portal where students can report an issue and view its progress.

### 3. Objectives
- Develop a clean and responsive campus issue reporting portal.
- Allow users to submit issues with category, location, priority and description.
- Generate a unique report ID and track report status.
- Provide search and filters for reports.
- Demonstrate Agile planning with Trello.
- Demonstrate version control, automated testing and CI using Git, GitHub and GitHub Actions.

### 4. Software and Tools Required
- Visual Studio Code – code editor.
- HTML – page structure.
- CSS – responsive user interface.
- JavaScript – application logic.
- Node.js – automated test runner.
- Git – version control.
- GitHub – remote repository.
- Trello – Agile backlog and sprint planning.
- GitHub Actions – Continuous Integration.
- Docker and Nginx – optional containerized hosting.
- Modern web browser – run the application.

### 5. Project Description
FixMyCampus is a front-end campus issue reporting portal. Students can submit a report containing a title, category, location, priority, description and optional image. Each report receives a unique ID and begins with Pending status. The reports page supports searching and filtering. Admin demo mode allows the status to be changed to In Progress or Resolved. Dashboard statistics and the status chart update automatically.

### 6. Main Modules
1. **Overview Dashboard:** Displays total, pending, in-progress and resolved reports.
2. **Issue Submission:** Collects issue details and optional photo.
3. **Report Tracking:** Displays report IDs, categories, locations and statuses.
4. **Search and Filters:** Filters reports by status, category and text.
5. **Admin Demo Mode:** Demonstrates status updates.
6. **Local Storage:** Saves reports in the current browser.

### 7. Agile Methodology
The project follows a simplified Scrum workflow:
- **Product Backlog:** Collect features such as issue form, report list, filters, status update, testing and CI.
- **Sprint Planning:** Select the essential features for one short development sprint.
- **Development:** Build the dashboard, form and tracking features in small increments.
- **Daily Progress:** Move Trello cards as work advances.
- **Sprint Review:** Demonstrate issue submission, filtering and status update.
- **Retrospective:** Note improvements such as backend storage and real authentication.

Suggested Trello lists: Product Backlog, Sprint To Do, In Progress, Testing / Review and Done.

### 8. DevOps Tools and Their Use
| Tool | Purpose in this project |
|---|---|
| VS Code | Writing and editing source code |
| Git | Tracking code changes locally |
| GitHub | Hosting source code and collaboration |
| Trello | Managing backlog and sprint tasks |
| Node.js Test Runner | Running unit tests |
| GitHub Actions | Running tests automatically on push and pull request |
| Docker + Nginx | Optional packaging and hosting |

### 9. Implementation Details
HTML defines the application layout. CSS creates the responsive dashboard and form. JavaScript handles report creation, filtering, status changes, dashboard counts and localStorage. Reusable validation and filtering functions are placed in `js/task-utils.js`. Unit tests are stored in `tests/task-utils.test.js`. The CI workflow is stored in `.github/workflows/ci.yml`.

### 10. Testing
| Test ID | Test case | Expected result |
|---|---|---|
| TC-01 | Submit valid issue | Report appears with a unique ID |
| TC-02 | Submit with missing required field | Submission is blocked |
| TC-03 | Filter by status | Matching reports are shown |
| TC-04 | Search by location | Matching report is shown |
| TC-05 | Enable Admin demo view | Status selectors appear |
| TC-06 | Update report status | Dashboard counters update |
| TC-07 | Refresh browser | Reports remain saved |
| TC-08 | Upload image larger than limit | Validation message appears |

### 11. Result
The FixMyCampus prototype was developed with issue submission, report tracking, search, filters, status updates and a dashboard. Unit tests and a GitHub Actions CI workflow are included to demonstrate basic DevOps practices.

### 12. Conclusion
The project provides practical exposure to Agile planning and DevOps tools. Trello is used for sprint management, Git and GitHub for version control and code hosting, Node.js for automated tests and GitHub Actions for Continuous Integration.

### 13. Future Scope
- Add secure student and admin login.
- Connect a backend API and shared database.
- Send notifications when issue status changes.
- Add department assignment and analytics.
- Deploy the application for a real campus environment.

### 14. Viva Questions
1. **What is Agile?** An iterative approach to software development that delivers work in small increments.
2. **What is Scrum?** An Agile framework that organizes work into short sprints.
3. **What is a Product Backlog?** A prioritized list of features and work required for a product.
4. **What is Trello?** A visual task management tool using boards, lists and cards.
5. **What is Git?** A distributed version control system.
6. **What is GitHub?** A platform for hosting and collaborating on Git repositories.
7. **What is CI?** Continuous Integration; automatically checking code changes, commonly by running tests.
8. **What are GitHub Actions?** GitHub automation workflows for tasks such as testing.
9. **What is localStorage?** Browser storage that saves key-value data for a website on that browser.
10. **Why is Docker used?** It packages an application and its runtime environment into a container.
11. **What is a Kanban board?** A visual board showing work moving through workflow stages.
12. **What is the limitation of this prototype?** It stores reports in one browser and does not provide real authentication or shared cloud storage.

# FixMyCampus — Campus Issue Reporter

A responsive campus issue reporting and tracking portal built as a small Agile Development + DevOps laboratory project.

## Features
- Student dashboard with report statistics and status chart.
- Submit issue with title, category, location, priority, description and optional image.
- Unique report ID and status tracking.
- Search and filter by status/category.
- Admin demo mode to update report status.
- Browser localStorage persistence.
- Responsive desktop and mobile layout.
- Automated unit tests and GitHub Actions CI.
- Optional Docker deployment using Nginx.

> **Demo note:** This is a front-end educational prototype. It stores data in the current browser only. The Admin demo switch is not real authentication; do not use it for sensitive or real campus complaints.

## Tools
| Tool | Purpose |
|---|---|
| VS Code | Edit project files |
| HTML/CSS/JavaScript | Front-end application |
| Node.js | Run automated tests |
| Git | Version control |
| GitHub | Remote repository and collaboration |
| Trello | Agile backlog and sprint board |
| GitHub Actions | Continuous Integration |
| Docker + Nginx | Optional containerized hosting |

## Run locally
1. Install Node.js 20+ and VS Code.
2. Extract the project ZIP and open the `FixMyCampus` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run `npm test` to execute the unit tests.
5. Start a local static server. Easiest: install the VS Code **Live Server** extension, right-click `index.html`, choose **Open with Live Server**.
6. Alternatively run `npx serve .` and open the local URL printed in the terminal.

No database or backend setup is needed for this demo.

## Try the demo
- The dashboard starts with four sample campus reports.
- Click **Report an issue**, fill the required fields and submit.
- Open **All reports** to search and filter.
- Click **Student view** in the top-right to switch to **Admin demo view**.
- In Admin demo view, change a report's status. The dashboard counters and chart update.
- Refresh the page; data remains in that browser.

Use the browser's local storage to reset the demo: open Developer Tools → Application/Storage → Local Storage → delete `fixmycampus-reports-v1`, then refresh.

## Agile / Trello workflow
Create a Trello board called **FixMyCampus – Agile Sprint Board**. Create lists:
1. Product Backlog
2. Sprint To Do
3. In Progress
4. Testing / Review
5. Done

Suggested cards:
- Design dashboard layout (2 points)
- Build issue submission form (3 points)
- Generate unique report IDs (2 points)
- Add report list and filters (3 points)
- Add admin status update (3 points)
- Save reports in localStorage (2 points)
- Add unit tests (3 points)
- Configure GitHub Actions CI (2 points)
- Write project report and capture screenshots (2 points)

Sprint goal: Deliver a working campus issue reporting prototype with status tracking and automated tests.

## Git and GitHub
Create an empty GitHub repository named `FixMyCampus`, then run these commands from this folder (replace the URL with your repository URL):

```bash
git init
git add .
git commit -m "Initial FixMyCampus campus issue reporter"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

After pushing, open the **Actions** tab in GitHub. The workflow `.github/workflows/ci.yml` runs the test suite on pushes and pull requests to `main`.

## Optional Docker run
From the project folder:

```bash
docker build -t fixmycampus .
docker run --name fixmycampus -p 8080:80 -d fixmycampus
```

Open `http://localhost:8080`. To stop the container: `docker stop fixmycampus`.

## Test cases
| ID | Test | Expected result |
|---|---|---|
| TC-01 | Submit valid issue | New report appears with unique ID |
| TC-02 | Leave required title blank | Browser blocks submission |
| TC-03 | Select status filter | Only matching reports appear |
| TC-04 | Search by location | Matching report appears |
| TC-05 | Switch to Admin demo view | Status selectors appear |
| TC-06 | Change status to Resolved | Counts and chart update |
| TC-07 | Refresh browser | Reports remain in localStorage |
| TC-08 | Upload image above 1.5 MB | Friendly validation message appears |

## Project structure
```text
FixMyCampus/
├── index.html
├── css/styles.css
├── js/app.js
├── js/task-utils.js
├── tests/task-utils.test.js
├── .github/workflows/ci.yml
├── docs/PROJECT_REPORT.md
├── screenshots/
├── Dockerfile
├── package.json
└── README.md
```

## Limitations and future scope
- Current prototype uses browser localStorage, not a shared database.
- Admin mode is a demonstration toggle, not secure role-based access.
- Future version can add backend APIs, authentication, database, email notifications and real-time updates.

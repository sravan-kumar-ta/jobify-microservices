# Job Portal Frontend (React)
>This repository contains the frontend for a Job Portal application built using **React**. The Job Portal provides distinct functionalities for job seekers, companies, and platform administrators, offering an intuitive and responsive user interface.  
Backend (Django) 👉 [Job Portal Backend](https://github.com/sravan-kumar-ta/Job-portal-Django.git)

## Features

### Job Seeker
- **Job Listings**: Search, filter, sort, and load more job opportunities.
- **Profile Management**: Create, update, and manage your profile, including uploading resumes and adding bio information.
- **Job Applications**: Apply for jobs using selected resumes and track the status of your applications.

### Company
- **Company Profile**: Create and update company profiles.
- **Job Management**: Create, list, and update jobs (accessible only to the job creator).
- **Application Management**: View and manage all job applications for positions listed by the company.

### Admin
- **Admin Dashboard**: Get an overview of the platform, including the total number of job seekers and companies.
- **Analytics & Reports**: Access platform-wide data and performance reports.
- **User Management**: Manage all user accounts, including job seekers and companies.
- **Company Approvals**: Review and approve company registrations before they can create job listings.

## Tech Stack

<table>
    <tr>
        <td align="center">
            <img height="40"
                src="https://github-production-user-asset-6210df.s3.amazonaws.com/62091613/261395532-b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35.png">
            <br>Vite
        </td>
        <td align="center">
            <img height="40"
                src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png">
            <br>React
        </td>
        <td align="center">
            <img height="40"
                src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png">
            <br>Tailwind
        </td>
        <td align="center">
            <img height="40"
                src="https://github.com/user-attachments/assets/c792694c-66a5-482a-a7b8-15684e95cb89">
            <br>Formik
        </td>
        <td align="center">
            <img height="40"
                src="https://github.com/user-attachments/assets/a3e40bf1-82d5-4907-b3bd-10d2eb4b00f5">
            <br>React Query
        </td>
    </tr>
</table>

- **Frontend**: React.js `^18.3.1`
- **Data Fetching & Caching**: React Query (`@tanstack/react-query`)
- **API Communication**: Axios `^1.7.5`
- **Routing**: React Router DOM `^6.26.0`
- **Authentication**: React Query Auth `^2.3.0`
- **Form and Validation**: Formik `^2.4.6` & Yup `^1.4.0`
- **Icons**: React Icons `^5.3.0`
- **Skeleton Loading**: React Loading Skeleton `^3.4.0`

## Screenshots
<table>
    <tr>
        <td style="padding: 20px 30px;">
            <img height="300"
                src="https://github.com/user-attachments/assets/c87b3b08-6249-48e5-b392-8e839a89ac1b">
        </td>
        <td style="padding: 20px 30px;">
            <img height="300"
                src="https://github.com/user-attachments/assets/1fd18b4e-0177-4623-9ecc-78b99e819759">
        </td>
    </tr>
    <tr>
        <td style="padding: 20px 30px;">
            <img height="300"
                src="https://github.com/user-attachments/assets/46e50c9a-d894-4008-a12d-0f1c5819940c">
        </td>
        <td style="padding: 20px 30px;">
            <img height="300"
                src="https://github.com/user-attachments/assets/8c55feb1-d911-4f93-af11-561d2225fefc">
        </td>
    </tr>
</table>

## Getting Started

### Installation
To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/sravan-kumar-ta/Job-portal-React.git
cd Job-portal-React
npm install
```
-----
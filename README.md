# Hiring Info App

This project is a web application designed to gather information for a person being hired. It collects scores for clothing items and the name for the badge.

## Project Structure

```
hiring-info-app
├── src
│   ├── app
│   │   ├── layout.tsx        # Defines the root layout of the application
│   │   ├── page.tsx          # Main page that renders the HireForm component
│   │   └── components
│   │       └── HireForm.tsx  # Component to collect hiring information
│   ├── styles
│   │   └── globals.css        # Global CSS styles for the application
│   └── types
│       └── PersonInfo.ts      # TypeScript interface for person information
├── package.json                # npm configuration file
├── tsconfig.json               # TypeScript configuration file
└── README.md                   # Documentation for the project
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd hiring-info-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Usage Guidelines

- Navigate to the main page to fill out the hiring information form.
- Enter the scores for shirt, pants, and boots, along with the name for the badge.
- Submit the form to gather the information.

## License

This project is licensed under the MIT License.# form-test

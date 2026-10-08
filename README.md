# Ajay Kumar Jaiswal — Portfolio

## Overview

Welcome to the personal developer portfolio repository of **Ajay Kumar Jaiswal**, a Computer Science and Engineering student specializing in Data Science at Lovely Professional University. This portfolio showcases practical engineering projects spanning full-stack software development, generative AI integrations, relational database architectures, business intelligence dashboards, and predictive machine learning models.

## About

The purpose of this portfolio is to present a focused, recruiter-friendly summary of technical competencies, academic foundation, and hands-on projects. It highlights a multidisciplinary approach to engineering: building responsive client-side web applications, extracting insights from complex datasets, designing executive decision-support dashboards, and deploying applied machine learning pipelines.

## Featured Projects

### 1. FeedbackIQ — AI Customer Feedback Analyzer
- **GitHub**: [https://github.com/Ajay-Kumar-Jaiswal/FeedbackIQ](https://github.com/Ajay-Kumar-Jaiswal/FeedbackIQ)
- **Category**: AI & Intelligence
- **Overview**: An AI-powered customer feedback analysis application that integrates the Google Gemini API to automatically classify sentiment, categories, priorities, and generate summaries from user feedback.
- **Key Capabilities**:
  - AI-driven sentiment analysis, categorization, and priority detection
  - Automated executive feedback summarization
  - Structured Gemini API prompt validation and fallback analysis handling
  - Secure JWT authentication with Bcrypt password hashing
  - Relational persistence with MySQL
- **Technologies**: Python, Flask, React, MySQL, Gemini API, JWT, Bcrypt

### 2. SecureBank — Banking Management System
- **GitHub**: [https://github.com/Ajay-Kumar-Jaiswal/securebank-banking-management-system](https://github.com/Ajay-Kumar-Jaiswal/securebank-banking-management-system)
- **Category**: FinTech & Security
- **Overview**: A full-stack banking management system designed with secure authentication, multi-tier account handling, audit controls, and transaction integrity.
- **Key Capabilities**:
  - Secure authentication and Role-Based Access Control (RBAC)
  - Account lifecycle management, deposits, withdrawals, and inter-account transfers
  - Beneficiary management and transaction history tracking
  - Administrative oversight and audit logging
  - Comprehensive automated test suite (106 tests)
- **Technologies**: Python, FastAPI, React, MySQL, SQLAlchemy, JWT, RBAC

### 3. Retail Sales Analytics Dashboard
- **GitHub**: [https://github.com/Ajay-Kumar-Jaiswal/Retail-Analytics-Dashboard](https://github.com/Ajay-Kumar-Jaiswal/Retail-Analytics-Dashboard)
- **Category**: Business Intelligence
- **Overview**: An end-to-end retail business intelligence solution analyzing transactional data to evaluate sales performance, customer purchase behavior, product trends, and revenue growth.
- **Key Capabilities**:
  - RFM (Recency, Frequency, Monetary) customer segmentation
  - Product line and regional performance analysis
  - Relational schema modeling and metric aggregation in SQL/MySQL
  - Interactive executive dashboards and DAX measures in Power BI
- **Technologies**: Python, Pandas, NumPy, MySQL, SQL, Power BI, DAX

### 4. Indian Crop Production Analysis & Prediction
- **GitHub**: [https://github.com/Ajay-Kumar-Jaiswal/state-wise-crop-production-analysis](https://github.com/Ajay-Kumar-Jaiswal/state-wise-crop-production-analysis)
- **Category**: Machine Learning
- **Overview**: An agricultural analytics and machine learning project exploring historical Indian crop production data and predicting crop yields using regression algorithms.
- **Key Capabilities**:
  - State-wise, crop-wise, seasonal, and yearly trend analysis
  - Exploratory data analysis, outlier treatment, and feature preprocessing
  - Crop production prediction modeling with Random Forest Regression ($R^2 = 0.91$)
  - Exploratory visualization with Matplotlib, Seaborn, and Power BI
- **Technologies**: Python, Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, Power BI

## Skills & Technologies

The skills below represent the technical proficiencies demonstrated across the portfolio:

### Data Science & Analytics
- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Exploratory Data Analysis (EDA)
- Statistical Modeling
- Data Cleaning

### Business Intelligence & SQL
- SQL
- MySQL
- Power BI
- Relational Schema Design
- RFM Segmentation
- Executive Dashboards
- Excel Analytics

### Web & Frontend
- HTML5 (Semantic Markup)
- CSS3 (Custom Properties, Flexbox, Grid)
- JavaScript (ES6+)
- DOM Manipulation
- Responsive Web Design
- RESTful APIs
- LocalStorage State Handling

### Core CS & Developer Tools
- Data Structures & Algorithms
- Object-Oriented Programming (OOP)
- Git & GitHub
- VS Code
- Jupyter Notebooks
- Plotly Dash

## Portfolio Features

The portfolio website includes the following implemented features:

- **Fully Responsive Architecture**: Mobile-first layout tested across resolutions from mobile phones ($375\text{px}$) to wide desktop displays ($1440\text{px}$).
- **Dual Theme Support**: Smooth dark and light theme switching with `localStorage` persistence and automatic system preference detection.
- **High-Contrast Design System**:
  - **Dark Mode**: Dark navy/black background with subtle indigo and cyan atmospheric lighting.
  - **Light Mode**: Cool off-white background (`#F7F8FC`) with elevated pure white cards, `#DDE2EA` borders, and high-contrast navy headings.
- **Active Navigation Spy**: Scroll-aware navbar highlighting the active section in real-time.
- **Sticky Glassmorphic Navigation**: Translucent navbar with backdrop blur and dynamic scroll shadow.
- **Accessible Mobile Drawer**: Slide-out navigation drawer with ARIA attributes, keyboard Escape support, and scroll locking.
- **Scroll Progress Indicator**: Top-level gradient progress bar tracking reading position.
- **Hardware-Accelerated Reveal Animations**: IntersectionObserver-powered scroll reveals.
- **Unified Case-Study Grid**: Consistent 4-card project showcase with schematic technical headers and direct GitHub links.
- **Direct Communication Cards**: One-click `mailto:` email and `tel:` telephone links without unnecessary form friction.
- **Back-to-Top Button**: Floating return-to-top control with smooth scrolling.

## Tech Stack

The portfolio website itself is built using zero external frontend frameworks or heavy dependencies:

- **Markup**: Semantic HTML5 (WCAG AA accessibility considerations, semantic headings, ARIA roles)
- **Styles**: Vanilla CSS3 (CSS Variables, Flexbox, CSS Grid, media queries, backdrop filters)
- **Script**: Vanilla JavaScript (Modular ES6+, IntersectionObserver API, LocalStorage API)
- **Typography**: Plus Jakarta Sans, Inter, JetBrains Mono (Google Fonts)
- **Icons**: Native inline SVG icons

## Project Structure

```
Portfolio/
├── assets/
│   ├── port.jpeg
│   └── Resume.pdf
├── index.html
├── script.js
├── style.css
└── README.md

## License

This project and its assets are personal portfolio work.

# Startup Software Store

## Multi-Tenant Software Marketplace & Business Application Platform

**Version:** 1.0
**Initial Target:** Web applications
**Future Target:** Desktop applications + downloadable software
**Deployment:** Self-hosted server
**Database:** Server-local PostgreSQL
**Architecture:** Multi-tenant SaaS + modular applications

---

# 1. Product Vision

The platform will be a central website where a company can:

1. Create an account.
2. Create/manage its organization.
3. Browse available software.
4. Select applications/services.
5. Install or activate them.
6. Access them from one dashboard.
7. Manage employees/users.
8. Control permissions.
9. Store company data securely on the server.
10. Upgrade/downgrade applications.
11. Eventually download desktop applications.
12. Purchase software subscriptions.
13. Manage all installed software from one place.

The long-term goal is to create:

> **A complete software store and business software ecosystem for small and medium-sized companies.**

---

# 2. Important Architectural Principle

Do NOT build each application as an isolated project.

Instead:

```text
                    SOFTWARE STORE
                          |
             +------------+------------+
             |                         |
        PLATFORM CORE             SOFTWARE CATALOG
             |                         |
      +------+-------+          +------+------+
      |              |          |             |
 Authentication   Tenant      CRM           HR
 Users             Company    Finance       Projects
 Roles             Billing    Inventory     Support
 Permissions       License    etc.          etc.
      |
      +--------------------------------+
                                       |
                              APPLICATION PLATFORM
```

Every application should use common platform services.

For example:

```text
CRM
 ├── Authentication
 ├── Tenant
 ├── Users
 ├── Roles
 ├── Audit Logs
 ├── Notifications
 ├── Billing
 └── Application-specific modules
```

This makes future products much faster to build.

---

# 3. Recommended Technology Stack

## Frontend

### Primary

**Next.js + React + TypeScript**

Why:

* Excellent web application framework
* SEO-friendly store
* Excellent dashboard support
* TypeScript
* Easy API integration
* Good component ecosystem
* Can later become a PWA
* Easy to create admin dashboards
* Suitable for both marketplace and applications

Recommended:

```text
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
TanStack Query
Zod
React Hook Form
```

---

# 4. Backend

Use:

### NestJS + TypeScript

Structure:

```text
Frontend
   |
REST API
   |
NestJS
   |
+-----------------------------+
|                             |
Auth                       Business APIs
|                             |
Users                      CRM
Tenants                    HR
Roles                      Finance
Permissions                Projects
                           etc.
```

NestJS gives the platform a clean modular architecture.

---

# 5. Database

Use:

## PostgreSQL

Initially:

```text
Your Server
│
├── Application Server
├── PostgreSQL
├── Redis
├── File Storage
└── Reverse Proxy
```

PostgreSQL should be the primary database.

Do NOT use SQLite for the production SaaS platform.

"Local DB" should mean:

> PostgreSQL running on your own server.

This keeps the data under your infrastructure while allowing multiple companies to use the platform.

---

# 6. Multi-Tenant Architecture

This is one of the most important parts.

The platform should support:

```text
Platform
│
├── Company A
│   ├── Admin
│   ├── Employees
│   ├── CRM data
│   └── Finance data
│
├── Company B
│   ├── Admin
│   ├── Employees
│   ├── CRM data
│   └── Finance data
│
└── Company C
    ├── Admin
    ├── Employees
    ├── CRM data
    └── Finance data
```

Company A must NEVER be able to access Company B's data.

---

# 7. Recommended Tenant Strategy

Initially use:

## Shared database + tenant_id

Example:

```text
users
-------------------------
id
tenant_id
name
email
role_id
```

```text
customers
-------------------------
id
tenant_id
name
email
phone
```

```text
projects
-------------------------
id
tenant_id
name
status
```

Every business table contains:

```text
tenant_id
```

The backend automatically applies tenant filtering.

---

# 8. Stronger Tenant Isolation

Do not rely only on developers remembering:

```sql
WHERE tenant_id = ?
```

Eventually implement:

## PostgreSQL Row Level Security

This gives another layer of protection.

Architecture:

```text
Request
   ↓
Authentication
   ↓
Identify Tenant
   ↓
Set PostgreSQL Tenant Context
   ↓
Row Level Security
   ↓
Database
```

This becomes particularly important when the platform is sold to multiple companies.

---

# 9. Core Platform Modules

Before building individual business applications, build the following.

## Phase 1 — Platform Foundation

### Authentication

Support:

* Email/password
* Email verification
* Forgot password
* Password reset
* Session management
* Refresh tokens
* Logout
* Optional 2FA later

---

## Organization Management

```text
Organization
 ├── Company details
 ├── Logo
 ├── Address
 ├── Contact details
 ├── Subscription
 ├── Users
 └── Enabled applications
```

---

# 10. User Management

Each company gets:

```text
Company
   |
   +-- Owner
   +-- Admin
   +-- Manager
   +-- Employee
   +-- Custom Roles
```

Build RBAC.

Example:

```text
Role: Sales Manager

CRM
 ├── View customers       ✓
 ├── Create customers     ✓
 ├── Edit customers       ✓
 ├── Delete customers     ✗
 └── Export customers     ✓
```

---

# 11. Permission System

Do not hardcode permissions.

Create:

```text
permissions
-------------------------
id
module
resource
action
```

Example:

```text
crm.customer.view
crm.customer.create
crm.customer.update
crm.customer.delete
crm.customer.export
```

This will allow every future application to use the same permission engine.

---

# 12. Application Registry

This is the foundation of your software store.

Create an application registry:

```text
applications
-------------------------
id
name
slug
description
icon
version
category
status
pricing_type
web_url
download_url
```

Example:

```text
CRM
HR
Invoice
Expense
Project Management
Inventory
Helpdesk
Attendance
```

---

# 13. Company Application Installation

A company can install applications.

Create:

```text
tenant_applications
-------------------------
id
tenant_id
application_id
status
version
installed_at
expires_at
```

Example:

```text
Company A
   |
   +-- CRM             ACTIVE
   +-- HR              ACTIVE
   +-- Invoice         ACTIVE
   +-- Inventory       NOT INSTALLED
```

---

# 14. Software Store

The public website should have:

```text
Home
Products
Categories
Pricing
Solutions
Resources
Login
Register
```

Product page:

```text
CRM Software

Description

Features
✓ Lead management
✓ Customer management
✓ Sales pipeline
✓ Reports

Screenshots

Pricing

[Try Free]

[Install]

[Learn More]
```

---

# 15. User Dashboard

After login:

```text
Dashboard
│
├── Overview
├── My Applications
├── Store
├── Users
├── Roles
├── Organization
├── Billing
├── Notifications
├── Audit Logs
└── Settings
```

---

# 16. Application Launcher

Make the platform feel like an operating system.

Example:

```text
┌─────────────────────────────────────────┐
│ Kruthagna Software                     │
├─────────────────────────────────────────┤
│                                         │
│   CRM        HR        Finance          │
│   ●          ●          ●               │
│                                         │
│   Projects   Support   Inventory        │
│   ●          ●          ●               │
│                                         │
│             + Add Application            │
└─────────────────────────────────────────┘
```

Clicking CRM opens:

```text
/store/crm
```

or:

```text
/app/crm
```

depending on your architecture.

---

# 17. Do Not Make Every Application a Separate Backend Initially

Use a modular monolith first.

Backend:

```text
backend/
│
├── auth/
├── tenants/
├── users/
├── roles/
├── permissions/
├── billing/
├── notifications/
├── audit/
├── applications/
│
├── crm/
├── hr/
├── finance/
├── projects/
└── support/
```

This is much easier to develop and maintain than immediately creating:

```text
CRM microservice
HR microservice
Finance microservice
...
```

Microservices can come later.

---

# 18. Backend Architecture

Use:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

Example:

```text
CRMController
      ↓
CRMService
      ↓
CustomerRepository
      ↓
PostgreSQL
```

Keep business logic out of controllers.

---

# 19. API Architecture

Use versioned APIs:

```text
/api/v1/auth
/api/v1/users
/api/v1/tenants
/api/v1/applications

/api/v1/crm/customers
/api/v1/crm/leads

/api/v1/hr/employees
/api/v1/hr/attendance

/api/v1/invoices
```

Later:

```text
/api/v2/...
```

This protects existing customers when APIs evolve.

---

# 20. File Storage

Do not store large files directly in PostgreSQL.

Use:

```text
PostgreSQL
    ↓
Metadata

File Storage
    ↓
Actual file
```

Examples:

```text
/company/logo.png
/company/documents/...
/crm/attachments/...
/hr/documents/...
```

Initially this can be local server storage.

Later you can support:

* S3
* Cloudflare R2
* Azure Blob
* Google Cloud Storage

without changing the application architecture.

---

# 21. Redis

Add Redis for:

* Sessions
* Caching
* Rate limiting
* Background jobs
* Notifications
* Temporary data

Architecture:

```text
NestJS
  |
  +---- PostgreSQL
  |
  +---- Redis
```

---

# 22. Background Jobs

Some operations should not happen during normal API requests.

Example:

```text
Generate report
Send 500 emails
Process uploaded file
Generate invoice PDF
Send notification
Create backup
```

Use:

```text
NestJS
   ↓
Queue
   ↓
Worker
```

BullMQ + Redis is a good starting point.

---

# 23. Notification System

Create a common notification service.

Support:

```text
Email
In-app
Push
SMS
WhatsApp (future)
```

Applications should call:

```text
NotificationService.send(...)
```

instead of implementing their own email system.

---

# 24. Audit Logging

This is essential for a business platform.

Store:

```text
audit_logs
-------------------------
id
tenant_id
user_id
action
module
resource
resource_id
ip_address
timestamp
metadata
```

Example:

```text
Anagha
Updated customer
CRM
Customer #128
21 Sep 2026 18:30
```

---

# 25. Subscription Architecture

Even if you don't charge initially, build the architecture.

```text
Plan
 |
 +-- Applications
 +-- Users
 +-- Storage
 +-- Features
 +-- Limits
```

Example:

```text
FREE
├── 3 users
├── 1 application
└── 1 GB storage

STARTER
├── 10 users
├── 5 applications
└── 20 GB storage

BUSINESS
├── 50 users
├── Unlimited applications
└── 100 GB storage
```

---

# 26. Feature Flags

Add feature flags from the beginning.

Example:

```text
CRM_ADVANCED_REPORTS = true
AI_ASSISTANT = false
WHATSAPP_INTEGRATION = false
```

This allows features to be enabled per company.

---

# 27. Store vs Application Architecture

Separate:

```text
Public Store
        |
        ↓
Platform
        |
        ↓
Applications
```

The store should NOT contain the application business logic.

The store manages:

* Catalog
* Pricing
* Plans
* Installation
* Licensing
* Downloads

The application manages:

* Business functionality
* Data
* Workflows
* Reports

---

# 28. Future Desktop Architecture

Do NOT build desktop applications now.

But prepare for them.

Later:

```text
Software Store
      |
      +---- Web Application
      |
      +---- Windows App
      |
      +---- macOS App
      |
      +---- Linux App
```

Desktop application:

```text
Desktop Client
      ↓
Authentication
      ↓
Platform API
      ↓
PostgreSQL
```

The desktop application should NOT directly connect to PostgreSQL.

Always:

```text
Desktop → API → Backend → Database
```

---

# 29. Download Manager

Eventually the store can provide:

```text
Application
Version
Operating System
Architecture
Download
```

Example:

```text
CRM Desktop

Windows
[Download]

macOS
[Download]

Linux
[Download]
```

Store metadata:

```text
application_versions
-------------------------
application_id
version
platform
architecture
download_url
checksum
release_notes
published_at
```

---

# 30. Software Installation

For downloadable applications, eventually implement:

```text
Store
 ↓
Download installer
 ↓
Install
 ↓
Login
 ↓
License verification
 ↓
Application activated
```

The desktop client periodically checks:

```text
Is license valid?
Is application enabled?
Is version supported?
```

---

# 31. Security Architecture

Minimum:

```text
HTTPS
JWT/session security
Password hashing
RBAC
Tenant isolation
Rate limiting
Input validation
CSRF protection where applicable
XSS protection
SQL injection protection
Audit logging
Secure headers
File upload validation
Backup
```

Passwords:

```text
Argon2id
```

Prefer this over storing passwords with basic hashing.

---

# 32. Testing Strategy

Testing should be part of development, not a final phase.

## Unit Tests

Test:

```text
AuthService
TenantService
PermissionService
CRMService
InvoiceService
```

Example:

```text
should not allow Company A
to access Company B customer
```

This particular test is critical.

---

# 33. Integration Tests

Test:

```text
API
 ↓
Service
 ↓
Database
```

Examples:

```text
Create company
Create user
Create customer
Assign role
Login
Access CRM
```

---

# 34. End-to-End Testing

Use Playwright.

Example:

```text
Register
 ↓
Create company
 ↓
Login
 ↓
Open Store
 ↓
Install CRM
 ↓
Open CRM
 ↓
Create customer
 ↓
Logout
 ↓
Login again
 ↓
Verify customer exists
```

---

# 35. Security Testing

Test specifically for:

### Tenant isolation

```text
Company A user
      ↓
request customer belonging to Company B
      ↓
403 / not found
```

### Permission escalation

```text
Employee
 ↓
attempt admin API
 ↓
403
```

### API abuse

```text
1000 requests
 ↓
Rate limiter
```

---

# 36. Performance Testing

Eventually use:

```text
k6
```

Test:

```text
100 concurrent users
500 concurrent users
1000 concurrent users
```

Measure:

* Response time
* CPU
* Memory
* Database load
* Error rate

---

# 37. CI/CD

Use GitHub Actions or GitLab CI.

Pipeline:

```text
Git Push
   ↓
Lint
   ↓
Type Check
   ↓
Unit Tests
   ↓
Integration Tests
   ↓
Build
   ↓
Docker Image
   ↓
Deploy
   ↓
Health Check
```

Never deploy manually once production starts.

---

# 38. Docker

Containerize the system.

```text
docker-compose.yml

services:

  frontend
  backend
  postgres
  redis
  nginx
```

Production:

```text
Nginx
   ↓
Frontend
   ↓
Backend
   ↓
PostgreSQL
   ↓
Redis
```

---

# 39. Initial Server Architecture

Your server could initially run:

```text
                  INTERNET
                     |
                   HTTPS
                     |
                  NGINX
                     |
        +------------+------------+
        |                         |
     Next.js                  NestJS
        |                         |
        |                +--------+--------+
        |                |                 |
        |             Redis           PostgreSQL
        |                |
        |              Jobs
        |
      Files
```

For the first release, this is enough.

---

# 40. Repository Structure

I recommend a monorepo.

```text
software-store/
│
├── apps/
│   ├── web/
│   ├── api/
│   └── admin/
│
├── packages/
│   ├── ui/
│   ├── types/
│   ├── validation/
│   ├── auth/
│   ├── permissions/
│   └── config/
│
├── modules/
│   ├── crm/
│   ├── hr/
│   ├── finance/
│   └── projects/
│
├── infrastructure/
│   ├── docker/
│   ├── nginx/
│   └── deployment/
│
├── tests/
│
└── docs/
```

Use Turborepo or Nx if desired.

---

# 41. Admin Panel

You need a separate platform administration area.

```text
/platform-admin
```

Admin can:

```text
Dashboard
Companies
Users
Applications
Versions
Categories
Plans
Subscriptions
Licenses
Downloads
System logs
Audit logs
Feature flags
Announcements
Support
```

---

# 42. Company Admin Pa

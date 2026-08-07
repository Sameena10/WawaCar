require('dotenv').config();

const users = {
    administrator: {
        name: 'John Smith',
        role: 'Administrator',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
    },

    generalManager: {
        name: 'Rachel Morgan',
        role: 'General Manager',
        email: process.env.GM_EMAIL,
        password: process.env.GM_PASSWORD
    },

    salesManager: {
        name: 'David Chen',
        role: 'Sales Manager',
        email: process.env.SALES_MANAGER_EMAIL,
        password: process.env.SALES_MANAGER_PASSWORD
    },

    serviceManager: {
        name: 'Priya Naidoo',
        role: 'Service Manager',
        email: process.env.SERVICE_MANAGER_EMAIL,
        password: process.env.SERVICE_MANAGER_PASSWORD
    },

    financeManager: {
        name: 'Marcus van der Berg',
        role: 'Finance Manager',
        email: process.env.FINANCE_MANAGER_EMAIL,
        password: process.env.FINANCE_MANAGER_PASSWORD
    },

    salesConsultantSarah: {
        name: 'Sarah Johnson',
        role: 'Sales Consultant',
        email: process.env.SARAH_EMAIL,
        password: process.env.SARAH_PASSWORD
    },

    salesConsultantMike: {
        name: 'Mike Brown',
        role: 'Sales Consultant',
        email: process.env.MIKE_EMAIL,
        password: process.env.MIKE_PASSWORD
    },

    serviceAdvisor: {
        name: 'Emma Davis',
        role: 'Service Advisor',
        email: process.env.EMMA_EMAIL,
        password: process.env.EMMA_PASSWORD
    },

    financeConsultant: {
        name: 'James Patel',
        role: 'F&I Consultant',
        email: process.env.JAMES_EMAIL,
        password: process.env.JAMES_PASSWORD
    },

    partsAdvisor: {
        name: 'Linda Botha',
        role: 'Parts Advisor',
        email: process.env.LINDA_EMAIL,
        password: process.env.LINDA_PASSWORD
    }
};

module.exports = { users };
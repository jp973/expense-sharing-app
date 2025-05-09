const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

  .then(() => {
    console.log('MongoDB Connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error(err));

const groupRoutes = require('./routes/groupRoutes');
app.use('/api/groups', groupRoutes);

const expenseRoutes = require('./routes/expenseRoutes');
app.use('/api/groups', expenseRoutes);

const balanceRoutes = require('./routes/balanceRoutes');
app.use('/api/groups/:groupId/balances', balanceRoutes);


const settlementRoutes = require('./routes/settlementRoutes');
app.use('/api/groups/:groupId/settlements', settlementRoutes);



const expenseRoutes = require('./routes/expenseRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const settlementRoutes = require('./routes/settlementRoutes');

app.use('/api/groups', expenseRoutes);     // For /:groupId/expenses
app.use('/api/groups', balanceRoutes);     // For /:groupId/balances
app.use('/api', settlementRoutes);         // For /users/:userId/settlements

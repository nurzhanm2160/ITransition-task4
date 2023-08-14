// @ts-ignore
const UserController = require('./controllers/UserController');
// @ts-ignore
const authMiddleware = require('./middlewares/authMiddleware');
// @ts-ignore
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors())


app.post('/register', UserController.registerUser);
app.post('/login', UserController.loginUser);

// Защищенные маршруты
app.get('/users', authMiddleware, UserController.getUsers);
app.put('/block/:userId', authMiddleware, UserController.blockUser);
app.put('/unblock/:userId', authMiddleware, UserController.unblockUser);
app.delete('/delete/:userId', authMiddleware, UserController.deleteUser);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
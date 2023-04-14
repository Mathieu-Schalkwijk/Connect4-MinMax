const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

const { findBestMoveStringToArray } = require('./evalFuncArray');

// Middleware for serving static files from the "front" folder
app.use(express.static(path.join(__dirname, 'front')));

// Route for receiving GET requests
app.get('/move', (req, res) => {
    const board = req.query.b; // b is the 42 chars board string

    if (!board) return res.status(400).json({ error: 'No board or b' });
    if (board.length < 43) return res.status(400).json({ error: 'Board is too short ' + board.length + ' (should be 43)' });
    if (board.length > 43) return res.status(400).json({ error: 'Board is too long ' + board.length + ' (should be 43)' });
    if (board.match(/[^0hm]/)) return res.status(400).json({ error: 'Board contains invalid characters' });


    const columnToPlay = findBestMoveStringToArray(board);
    if (columnToPlay === undefined) return res.status(400).json({ error: 'No valid move' });
    if (columnToPlay === -1) return res.status(420).json({ column: "gameover" });

    res.status(200).json({ column: columnToPlay });
});

// Route for serving game.html on root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'game.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
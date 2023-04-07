const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const { findBestMoveStringToArray } = require('./evalFuncArray');

// Route for receiving GET requests
app.get('/move', (req, res) => {
    const board = req.query.b; // b is the 42 chars board string

    if (!board) return res.status(400).json({ error: 'No board or b' });
    if (board.length < 42) return res.status(400).json({ error: 'Board is too short' });
    if (board.length > 42) return res.status(400).json({ error: 'Board is too long' });
    if (board.match(/[^0hm]/)) return res.status(400).json({ error: 'Board contains invalid characters' });


    const columnToPlay = findBestMoveStringToArray(board);
    if (columnToPlay === undefined) return res.status(400).json({ error: 'No valid move' });
    if (columnToPlay === "lose") return res.status(420).json({ column: "gameover" });

    res.status(200).json({ column: columnToPlay });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
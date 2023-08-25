const fs = require('fs');
const path = "public/assets/sample.mp4"

const playVideo = (req, res) => {
    fs.stat(path, (err, stat) => {

        // Handle file not found
        if (err !== null && err.code === 'ENOENT') {
            res.sendStatus(404);
        }
    
        const fileSize = stat.size
        const range = req.headers.range
    
        if (range) {
    
            const parts = range.replace(/bytes=/, "").split("-");
    
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
            
            const chunksize = (end-start)+1;
            const file = fs.createReadStream(path, {start, end});
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }
            
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
    
            res.writeHead(200, head);
            fs.createReadStream(path).pipe(res);
        }
    });  
};

module.exports = {
    playVideo,
};
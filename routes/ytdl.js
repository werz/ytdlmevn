import express from 'express';
import { abort } from 'process';
const router = express.Router();
const Lame = require("node-lame").Lame;
var ytdl = require('ytdl-core');
var path = require('path');
var fs = require('fs');
const http = require('http')
var mime = require('mime');


// Get con parámetros
router.post('/ytdl', async(req, res) => {
    const url = req.body.url; 
    const filepath = './public/uploads/'

    fs.readdir(filepath, (err, files) => {
    if (err) throw err;
    
    for (const file of files) {
        fs.unlink(path.join(filepath, file), err => {
        if (err) throw err;
        });
    }
    }); 
     try {            
        var video = ytdl.getInfo(url).then(data=>{
            console.log(data.videoDetails.title);
            let title= data.videoDetails.title;
            const fullpath =filepath+title+'.mp3'
            
            var yvideo=ytdl(url,{ filter: format => format.itag === 140 })
            .pipe(fs.createWriteStream(fullpath))
            
            yvideo.on('finish',function(){
                var abpath = path.resolve(fullpath);
                var filename=title+'.mp3';
                //res.set('Content-Type', 'audio/mp3');
                res.download(abpath,filename)
                //res.sendFile(abpath)
                //res.status(200).send({message:abpath})
            })
              
        },error=>{
            console.log(error);
        });          
     
    } catch (error) {
        return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
        })
    }

    

});

module.exports = router;
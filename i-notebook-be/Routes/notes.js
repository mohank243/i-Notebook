const express = require('express')
const router = express.Router()
const fetchuser = require('../Middleware/fetchuser');
const Note = require('../Modals/Notes');
const { body, validationResult } = require('express-validator');

//To get user Notes GET (api/notes/fetchallnotes) : Login Required
router.get('/fetchallnotes',fetchuser,async(req ,res )=>{
    
       
       try {
          const notes = await Note.find({user: req.user.id})
          res.json(notes);

       } catch (error) {
           console.error(error.message);
           return res.status(500).send("Internal Server Error");
       }
})

//To get user Notes GET (api/notes/addnote) : Login Required
router.post('/addnote',fetchuser,[
    body('title','title must be atleast 3 chars').isLength({min:3}),
    body('description', 'description should consist atleast 5 chars').isLength({min:5})
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
 }
 try {
    const note = new Note({
        //this can be done through destructuring also
        title:req.body.title,
        description:req.body.description,
        tag:req.body.tag,
        user:req.user.id
    })
    const savedNote = await note.save();
    res.json(savedNote);
 } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
}
})

//To get user Notes PUT (api/notes/updatenote/:id) : Login Required
router.put('/updatenote/:id',fetchuser, async(req,res)=>{
    try {
        const {title, description,tag} = req.body
        //storing the notes recieved through body in newNote obj
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        //checking the Note is availble or not
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status('404').send("Not Found")
        }
        //validating the user for accessing his/her notes
       
        //note.user because schema is designed like that
        if(note.user.toString() !== req.user.id){
            return res.status('404').send("Not Allowed")
        }

        //updating the notes
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote},{new:true})
        res.json(note);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})
//To delete user Notes DELETE (api/notes/deletenote/:id) : Login Required
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
    try {
        const note = await Note.findById(req.params.id);
        //validating the note is available or not
        if(!note){
            return res.status(404).send("Not Found")
        }
        
        //validating whether the note belongs to the authenticated user
        if(note.user.toString() !== req.user.id){
            return res.status(404).send("Not Allowed")
        }

        //Deleting the notes
        Note.findByIdAndDelete(req.params.id);
        res.json({
            sucess:"Note Deleted",
            note:note
        })

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})

module.exports = router;
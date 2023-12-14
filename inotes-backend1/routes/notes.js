const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


const router = express.Router();

/*Route 1: Get all notes [GET] [Login required] */
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        /*find the all notes with req.user.id and return it*/
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error is occured");
    }

});


/*Route 2: Add a new node [POST] [Login required] */
router.post('/addnote', fetchuser, [
    /*some condition for notes content*/
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Descreption must be atleast 5 characters').isLength({ min: 5 }),
    async (req, res) => {


        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({ errors: errors.array() });
            /*create a new note with requested content*/
            const note = new Note({
                title, description, tag, user: req.user.id
            })

            const savedNote = await note.save();

            res.json(savedNote);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error is occured");
        }
    }
])


/*Route 3: Update a Note[PUT] [Login required] */
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;

    try {

        /*create a new note*/
        const newNote = {};

        if (title)
            newNote.title = title;
        if (description)
            newNote.description = description;
        if (tag)
            newNote.tag = tag;

        /*find the node to be updated*/
        let note = await Note.findById(req.params.id);
        // console.log(note);
        if (!note)
            return res.status(404).send("Not Found");

        /*check weather user is updating its own note*/
        if (note.user.toString() !== req.user.id)
            return res.status(401).send("Not Allowed");
        /*update note*/
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error is occured");
    }

})

/*Route 4: Delete a Note[DELETE] [Login required] */
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        /*find the node to be deleted*/
        let note = await Note.findById(req.params.id);
        // console.log(note);
        if (!note)
            return res.status(404).send("Not Found");

        /*check weather user is deleting its own note*/
        if (note.user.toString() !== req.user.id)
            return res.status(401).send("Not Allowed");
        /*delete the note*/
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error is occured");
    }

})

module.exports = router;